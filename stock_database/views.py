from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import StockData
from .serializers import StockDataSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework import status

class CustomPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

@api_view(['GET'])
def get_stocks(request):
    stocks = StockData.objects.all()
    paginator = CustomPagination()
    result_page = paginator.paginate_queryset(stocks, request)
    serializer = StockDataSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
def get_stock(request, pk):
    try:
        stock = StockData.objects.get(pk=pk)
    except StockData.DoesNotExist:
        return Response({"error": "Stock not found"}, status=404)
    serializer = StockDataSerializer(stock)
    return Response(serializer.data)

@api_view(['POST'])
def add_stock(request):
    serializer = StockDataSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['PUT'])
def update_stock(request, pk):
    try:
        stock = StockData.objects.get(pk=pk)
    except StockData.DoesNotExist:
        return Response({"error": "Stock not found"}, status=404)
    serializer = StockDataSerializer(stock, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
def delete_stock(request, pk):
    try:
        stock = StockData.objects.get(pk=pk)
    except StockData.DoesNotExist:
        return Response({"error": "Stock not found"}, status=404)
    stock.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)