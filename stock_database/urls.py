from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_stocks, name='stocks-data'),
    path('<int:pk>/', views.get_stock, name='stock-data'),
    path('add/', views.add_stock, name='add-stock'),
    path('update/<int:pk>/', views.update_stock, name='update-stock'),
    path('delete/<int:pk>/', views.delete_stock, name='delete-stock'),
]