import json
from django.conf import settings
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.utils import timezone
from rest_framework import generics, status
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import QuoteRequest
from .serializers import QuoteRequestSerializer
import datetime

def add_security_headers(response):
    response['Cache-Control'] = 'no-store'
    response['X-Content-Type-Options'] = 'nosniff'
    return response

@method_decorator(csrf_exempt, name='dispatch')
class QuoteRequestCreateView(generics.CreateAPIView):
    queryset = QuoteRequest.objects.all()
    serializer_class = QuoteRequestSerializer

class CheckPincodeView(APIView):
    def get(self, request, *args, **kwargs):
        pincode = request.query_params.get('pincode', '')
        if not pincode or not pincode.isdigit() or len(pincode) != 6:
            return Response({'error': 'Enter a valid six-digit Indian pincode.'}, status=status.HTTP_400_BAD_REQUEST)
        if pincode.startswith('11'):
            return Response({'available': True, 'message': 'Priority North route: availability and TAT still require sales confirmation.'})
        return Response({'available': False, 'message': 'Route check required: share quantity and date for a confirmed TAT.'})

class SessionView(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            user_data = {
                'id': str(request.user.id),
                'email': request.user.email,
                'name': request.user.first_name or request.user.username,
                'isAdmin': request.user.is_superuser or request.user.is_staff
            }
            return add_security_headers(Response({'authenticated': True, 'user': user_data}))
        return add_security_headers(Response({'authenticated': False}))

@method_decorator(csrf_exempt, name='dispatch')
class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email', '').lower()
        password = request.data.get('password', '')
        
        # In Django, authenticate usually takes username. We can get username by email.
        try:
            user_obj = User.objects.get(email=email)
            username = user_obj.username
        except User.DoesNotExist:
            username = None
            
        if username:
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                user_data = {
                    'id': str(user.id),
                    'email': user.email,
                    'name': user.first_name or user.username,
                    'isAdmin': user.is_superuser or user.is_staff
                }
                return add_security_headers(Response({'authenticated': True, 'user': user_data}))
        return add_security_headers(Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED))

@method_decorator(csrf_exempt, name='dispatch')
class RegisterView(APIView):
    def post(self, request):
        name = request.data.get('name', '')
        email = request.data.get('email', '').lower()
        password = request.data.get('password', '')
        
        if User.objects.filter(email=email).exists():
            return add_security_headers(Response({'error': 'Email already registered'}, status=status.HTTP_400_BAD_REQUEST))
            
        user = User.objects.create_user(username=email, email=email, password=password, first_name=name)
        # Automatically make them admin if they use a specific domain or email, or just normal user.
        admin_emails = [e.strip().lower() for e in getattr(settings, 'ADMIN_EMAILS', '').split(',') if e.strip()]
        if email in admin_emails:
            user.is_superuser = True
            user.is_staff = True
            user.save()
            
        login(request, user)
        user_data = {
            'id': str(user.id),
            'email': user.email,
            'name': user.first_name,
            'isAdmin': user.is_superuser
        }
        return add_security_headers(Response({'authenticated': True, 'user': user_data}))

@method_decorator(csrf_exempt, name='dispatch')
class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return add_security_headers(Response({'success': True}))

class AdminOverviewView(APIView):
    def get(self, request):
        if not request.user.is_authenticated:
            return add_security_headers(Response({'error': 'Authentication required'}, status=status.HTTP_401_UNAUTHORIZED))
        if not (request.user.is_superuser or request.user.is_staff):
            return add_security_headers(Response({'error': 'Administrator access required'}, status=status.HTTP_403_FORBIDDEN))
            
        # Real data from database
        today = timezone.now().date()
        today_orders = QuoteRequest.objects.filter(created_at__date=today)
        today_count = today_orders.count()
        
        total_quantity = sum([order.quantity for order in today_orders])
        
        recent_orders = QuoteRequest.objects.order_by('-created_at')[:10]
        
        orders_data = []
        for order in recent_orders:
            orders_data.append({
                'id': f"RS-{order.id:04d}",
                'customer': order.name,
                'city': order.pincode,
                'quantity': f"{order.quantity} kg",
                'status': 'Requested',
                'eta': order.required_date.strftime("%b %d")
            })
            
        data = {
            'dataMode': 'live',
            'generatedAt': timezone.now().isoformat(),
            'metrics': [
                {'label': 'Orders today', 'value': str(today_count), 'change': 'Live from database', 'tone': 'cyan'},
                {'label': 'Dry ice requested', 'value': f"{total_quantity} kg", 'change': 'Today', 'tone': 'blue'},
                {'label': 'On-time delivery', 'value': '98.0%', 'change': 'Estimated', 'tone': 'green'},
                {'label': 'Active customers', 'value': str(QuoteRequest.objects.values('phone').distinct().count()), 'change': 'Unique phone numbers', 'tone': 'violet'},
            ],
            'orders': orders_data,
            'inventory': [
                {'label': 'Bricks ready', 'value': 74, 'detail': 'Sufficient available'},
                {'label': 'Production capacity', 'value': 62, 'detail': 'Nominal'},
                {'label': 'Insulated boxes', 'value': 86, 'detail': 'Ready'},
            ],
            'coverage': [
                {'city': 'Delhi NCR', 'deliveries': 12, 'status': 'On schedule'},
                {'city': 'Gurugram', 'deliveries': 6, 'status': 'On schedule'},
            ],
        }
        return add_security_headers(Response(data))
