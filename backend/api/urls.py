from django.urls import path
from .views import QuoteRequestCreateView, CheckPincodeView

urlpatterns = [
    path('quote-request/', QuoteRequestCreateView.as_view(), name='quote-request'),
    path('check-pincode/', CheckPincodeView.as_view(), name='check-pincode'),
]
