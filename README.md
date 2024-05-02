# Drone Delivery Database Application

This application is a GUI for managing a drone delivery service. It provides interfaces for managing orders, customers, drones, products, pilots, and views.

## Setup Instructions

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install all the dependencies.

## Running the Application

1. In the project directory, run `npm start` to start the frontend. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
2. In mySQL add a user profile called "test" with password "test"
3. In a separate terminal, run `node server.js` to start the backend. Open [http://localhost:5000](http://localhost:5000) to view it in your browser.

## Technologies Used

We used React for the frontend to create a dynamic and responsive user interface. For the backend, we used Node.js and Express.js to handle HTTP requests and responses. We used MySQL for the database to store and retrieve data.

## Work Distribution

- **Namkhang Le**: Worked on the frontend managing routing between pages, as well as formatting user entries into sql after setting up the  backend connection.
- **Patrick Kim**: Worked on the frontend, specifically the interfaces for managing drones and products.
- **Jordan Miao**: Worked on setting up the database and writing SQL queries.
- **Akash Misra** Worked on setting up views.
