from django.db import models

class QuoteRequest(models.Model):
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=15)
    pincode = models.CharField(max_length=10)
    quantity = models.DecimalField(max_digits=10, decimal_places=2)
    required_date = models.DateField()
    application = models.CharField(max_length=255)
    consent = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.quantity}kg to {self.pincode}"
