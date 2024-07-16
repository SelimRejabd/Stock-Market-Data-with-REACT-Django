# Stock Market Data

## Steps/commands to run this project
1. git clone https://github.com/username/Stock-Market-Data-with-REACT-Django.git
2. cd Stock-Market-Data-with-REACT-Django
3. On Windows, use venv\Scripts\activate (activate virtual environment for django)
4. pip install -r requirements.txt
5. python manage.py makemigrations
6. python manage.py migrate
7. cd frontend
8. npm install
9. npm run build
10. cd ..
11. python manage.py runserver

## Description

This repository contains the source code for the Janata WiFi Task backend project. It is built using Django and is designed to perform CRUD operation on stocks data.

## Features

- CRUD operations for managing stocks
- Pagination

## Installation

1. Clone the repository: `git clone https://github.com/SelimRejabd/Stock-Market-Data-with-REACT-Django`
2. Install the required dependencies: `pip install -r requirements.txt`
3. Set up the database: `python manage.py migrate`
4. Start the development server: `python manage.py runserver`
5. If you want to use a new database, to load data from json file to database: `python manage.py load_data`

## Usage and api

1. Access the application at `http://localhost:8000/`
2. Get stocks data from Json file `api/stocks/`
3. Get stocks data from database `api/stocks-data/`
4. Get single stock data from database `api/stocks-data/<int:pk>/`
5. Add new stock data `api/stocks-data/add/`
6. Edit stock data `api/stocks-data/update/<int:pk>/`
7. Delete stock data `api/stocks-data/delete/<int:pk>/`

## Contributing

Contributions are welcome! If you have any suggestions or find any issues, please open an issue or submit a pull request.
