from django.urls import path
from .views import QuoteRequestCreateView, CheckPincodeView, SessionView, AdminOverviewView, LoginView, RegisterView, LogoutView

urlpatterns = [
    path('quote-request/', QuoteRequestCreateView.as_view(), name='quote-request'),
    path('check-pincode/', CheckPincodeView.as_view(), name='check-pincode'),
    path('session', SessionView.as_view(), name='session'),
    path('admin/overview', AdminOverviewView.as_view(), name='admin-overview'),
    path('login', LoginView.as_view(), name='login'),
    path('register', RegisterView.as_view(), name='register'),
    path('logout', LogoutView.as_view(), name='logout'),
]
