import json
from django.core.management.base import BaseCommand
from stock_database.models import StockData
import os

def read_json():
    file_path = os.path.join(os.path.dirname(__file__), 'stock_market_data.json')
    try:
        with open(file_path, 'r') as file:
            data = json.load(file)
            return data
    except FileNotFoundError:
        print(f"No such file or directory: '{file_path}'")
        return None

def clean_data(number):
    return float(number.replace(',', ''))


class Command(BaseCommand):
    help = 'Load stock data from a JSON file'
    
    def handle(self, *args, **kwargs):
        data = read_json()
        if data is None:
            self.stdout.write(self.style.ERROR('No data loaded from JSON file'))
            return
        
        for stock in data:
            try:
                
                stock_data = StockData(
                    date=stock['date'],
                    trade_code=stock['trade_code'],
                    high=clean_data(stock['high']),
                    low=clean_data(stock['low']),
                    open=clean_data(stock['open']),
                    close=clean_data(stock['close']),
                    volume=clean_data(stock['volume']),
                )
                stock_data.save()
            except Exception as e:
                self.stdout.write(self.style.ERROR(f"Error saving stock data: {e}"))

        self.stdout.write(self.style.SUCCESS('Data loaded successfully'))

