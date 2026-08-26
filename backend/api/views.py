from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import QuoteRequest
from .serializers import QuoteRequestSerializer
from rest_framework import status

class QuoteRequestCreateView(generics.CreateAPIView):
    queryset = QuoteRequest.objects.all()
    serializer_class = QuoteRequestSerializer

class CheckPincodeView(APIView):
    def get(self, request, *args, **kwargs):
        pincode = request.query_params.get('pincode', '')
        
        if not pincode or not pincode.isdigit() or len(pincode) != 6:
            return Response({'error': 'Enter a valid six-digit Indian pincode.'}, status=status.HTTP_400_BAD_REQUEST)
            
        if pincode.startswith('11'):
            message = 'Priority North route: availability and TAT still require sales confirmation.'
            available = True
        else:
            message = 'Route check required: share quantity and date for a confirmed TAT.'
            available = False
            
        return Response({
            'available': available,
            'message': message
        })
