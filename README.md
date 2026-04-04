# Budget Manager

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
