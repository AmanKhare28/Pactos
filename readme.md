# ERN Marketplace

A simple marketplace application built using the ERN stack (Express.js, React, Node.js) that allows users to browse products, list items for sale, and place orders.

## Features

### Product Listings

- Users can browse and search for products.
- Users can add, edit, or delete their own product listings.

### Order Placement

- Users can place orders for available products.
- Users can view a list of their placed or received orders.

## Tech Stack

- **Frontend:** React, Axios
- **Backend:** Node.js, Express.js
- **Database:** Airtable
- **Deployment:** Render, Vercel

## API Endpoints

### Products API

- `GET /api/products` - Get all products
- `POST /api/products` - Add a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

### Orders API

- `POST /api/orders` - Place an order
- `GET /api/orders` - Get user orders

## Deployment

1. Deploy the backend to a hosting service Render.
2. Deploy the frontend to a static site host Vercel.
