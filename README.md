# Budget Manager

- [Project Description](#project-description)
- [Features](#features)
- [Technologies](#technologies)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Use and installations](#use-and-installations)
- [Interal API endpoint](#internal-api-endpoints)
  - [Get All Products](#get-all-products)
  - [Get By SKU](#get-product-by-sku)
  - [Create Product](#create-product)
  - [Delete Product](#delete-product)
  - [Get Official Exchange Rates](#get-official-exchange-rate)

## Project Description

The budget manager is designed to simulate the quoting core of an ERP/CRM system used in wholesale techology distribution.

In the B2B IT sector, corporate infraestructure (servers, networking, licenses) is internationally priced in dollars (USD). However, local quoting and billing in Argentina must be done in the local currency (ARS) strictly using the official exchange rate of the day.

## Features

- **Local inventory managment**: In-memory reading and processing of a corporate hardware catalog from a `JSON` file
- **Search and Filtering Engine**: Native JavaScript logic to search, filter, and sort inventory products.
- **External Integration and Security**: Real-time consumption of a public API (**DolarAPI**)
- **RESTful API**: Exposes `endpoints` that deliver pre-processedand calculated data, ready to be consumed by any client.
- **Dynamic Frontend**: A Single Page Application built with HTML, CSS and Vanilla JS that consumes the internal API to display the catalog and prices updated to the second.

## Technologies

### Backend

- Node.js (22.20.0)
- Express (5.2.1)
- JavaScript
- CORS
- [DolarAPI](https://dolarapi.com/docs/argentina/)

### Frontend

- HTML
- CSS
- JavaScript
- Bootstrap

## Use and Installations

1. Ensure you have [Node.js](https://nodejs.org/en/download) and [Git]() installed on your computer
2. Clone the repository

```bash
git clone https://github.com/Jeremias-Ezequiel/quotation-manager.git
```

3. Configure the backend
   1. Navigate to the backend folder `cd backend`
   2. Change the name of the `.env.example` file to `.env`file and set you environment variables
4. Install dependencies and start the server:

```bash
cd backend
npm install
npm run dev
```

5. Initialize the frontend in a second terminal or new terminal

```bash
# Optional: Recommended use live server extension in VS Code
# or use http-server installing it globaly
npm i -g http-server

cd frontend
# Set up the server
npx http-server -c-1 #-c is a flag that means 'cache' set how many time the navigation should save the static files in memory, -1 allows that the server don't use caché, dont save html,css and js files in local memory
```

## Internal API Endpoints

### Get All Products

Retrieve a list of products. Support filter through query params.

- Route: `GET /api/products`
- Query Params (Optionals):
  - `category` (string): Filter by category
  - `search` (String): Search by name
  - `sort` (string): Sort by name, price asc or price desc

### Get Product By SKU

Search a specific product by sku

- Route: `GET /api/products/:sku`
- Route parameter:
  - `sku` (string): SKU Product (e.g. XXX-XXX-XXX)

### Create Product

Add a new product in the database

- Route: `POST /api/products`
- Body Request (JSON):

```JSON
{
	"sku" : "XXX-XXX-XXX",
	"name" : "Example Product Name",
	"brand" : "Company name",
	"category" : "Example category",
	"price_usd" : 123,
	"stock" : 1,
	"is_active" : true
	"image_url" : "optional"
}
```

### Delete Product

Delete a product by sku

- Route: `DELETE /api/products/:sku`
- Route parameter:
  - `sku` (string): SKU Product (e.g. XXX-XXX-XXX)

### Get Official Exchange Rate

Use an external API to get the official exchange rate updated.

- Route: `GET /api/exchange-rate/official`

# Author

Omonte Jeremias Ezequiel - [Linkedin](https://www.linkedin.com/in/omontejeremias/)
