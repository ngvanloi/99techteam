# Problem5 - Express App with TypeScript

## Overview

This project is a simple Express application built with TypeScript. It demonstrates basic CRUD functionality using Express, MongoDB, and TypeScript.

## Features

- Create, update, delete, and fetch products.
- Built with Express and TypeScript.
- Uses MongoDB for data storage.
- API responses in JSON format.
- Error handling and validation for inputs.

## Installation

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)

### Steps to set up the project:

1. Clone this repository to your local machine:

    ```bash
    git clone https://github.com/ngvanloi/99techteam.git
    cd 99techteam
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the development server:

    ```bash
    npm run dev
    ```

    The server will be available at `http://localhost:3001`.

4. Build the project for production:

    ```bash
    npm run build
    ```

5. Start the server in production:

    ```bash
    npm start
    ```

## API Endpoints

### Create Product
- **POST** `/create`
- **Body**: 
    ```json
    {
      "name": "Product Name",
      "image": "image_url",
      "type": "product_type",
      "countInStock": 10,
      "rating": 4.5,
      "description": "Product description",
      "discount": 10,
      "selled": 100,
      "price": 20
    }
    ```
- **Response**:
    ```json
    {
      "status": "OK",
      "message": "SUCCESS",
      "data": { ...product data... }
    }
    ```

### Get All Products
- **GET** `/`
- **Query Parameters**: `limit`, `page`, `sort`, `filter`
- **Example**: (http://localhost:3001/api/product?limit=5&page=0&sort=asc&sort=price&filter=name&filter=1)
- **Response**:
    ```json
    {
      "status": "OK",
      "data": [ ...products array... ],
      "total": 50,
      "pageCurrent": 1,
      "totalPage": 5
    }
    ```

### Get Product Details
- **GET** `/details/:id`
- **Response**:
    ```json
    {
      "status": "OK",
      "data": { ...product data... }
    }
    ```

### Update Product
- **PUT** `/:id`
- **Body**: 
    ```json
    {
      "name": "Updated Product Name",
      "image": "updated_image_url",
      "type": "updated_type",
      "countInStock": 15,
      "rating": 5,
      "description": "Updated product description",
      "discount": 15,
      "selled": 120,
      "price": 25
    }
    ```
- **Response**:
    ```json
    {
      "status": "OK",
      "message": "Update is successed",
      "data": { ...updated product data... }
    }
    ```

### Delete Product
- **DELETE** `/:id`
- **Response**:
    ```json
    {
      "status": "OK",
      "message": "Delete product success"
    }
    ```

## Development

### Commands

- `npm run dev`: Start the application in development mode with TypeScript.
- `npm run build`: Compile TypeScript to JavaScript.
- `npm start`: Start the application in production mode after building.

### Code Structure

- `src/`: Source files, including the main application, routes, controllers, and services.
- `src/index.ts`: Entry point for the application.
- `src/controllers/`: Controllers for handling API logic.
- `src/models/`: Mongoose models for MongoDB.
- `src/routes/`: Express routes to handle API requests.
