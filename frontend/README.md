# Dynamic Chart App

This project is a simple dynamic chart application that allows users to visualize commodity prices over time. It includes a backend server built with Node.js, Express, and MongoDB, and a frontend built with React and Chart.js.

## Project Structure

- **dynamic-chart-app/** (Main Project Directory)
  - **frontend/** (React application)
  - **backend/** (Express server with MongoDB integration)

## Prerequisites

Make sure you have the following installed on your system:

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (You can use a local instance or MongoDB Atlas for a cloud-based solution)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/dynamic-chart-app.git
cd dynamic-chart-app


## Backend Setup

Navigate to the backend directory: cd backend

Install the required dependencies: npm install

Create a .env file in the backend directory and add the following environment variables:
MONGODB_URI=<your-mongodb-uri>
PORT=5000

Start the backend server: node server.js

## Frontend Setup


Navigate to the frontend directory: cd frontend

Install the required dependencies: npm install

Create a .env file in the frontend directory and add the following environment variables:

REACT_APP_API_URL=http://localhost:5000/api

Start the React application: npm start