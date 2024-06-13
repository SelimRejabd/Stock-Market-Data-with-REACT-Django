from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
import json
import os

class CustomPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

def read_json():
    file_path = os.path.join(os.path.dirname(__file__), 'stock_market_data.json')
    try:
        with open(file_path, 'r') as file:
            data = json.load(file)
            return data
    except FileNotFoundError:
        print(f"No such file or directory: '{file_path}'")
        return None

@api_view(['GET'])
def get_stocks(request):
    data = read_json()
    if data is None:
        return Response({"error": "File not found"}, status=status.HTTP_404_NOT_FOUND)

    paginator = CustomPagination()
    result_page = paginator.paginate_queryset(data, request)
    return paginator.get_paginated_response(result_page)
