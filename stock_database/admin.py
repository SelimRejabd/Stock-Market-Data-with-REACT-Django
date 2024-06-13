from django.contrib import admin
from .models import StockData

@admin.register(StockData)
class StockDataAdmin(admin.ModelAdmin):
    list_display = ('date', 'trade_code', 'high', 'low', 'open', 'close', 'volume')
    list_filter = ('trade_code', 'date')
    search_fields = ('trade_code', 'date')
