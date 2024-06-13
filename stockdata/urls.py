from django.urls import path
from . import views

urlpatterns = [
    path('stocks/', views.get_stocks, name='stocks'),
]
