# JobGenius

This App is a multi-service marketplace that connects service providers and customers, streamlining the process of finding, comparing, and booking services. Providers can showcase their offerings and manage bookings, while customers can easily discover and request services.

## Tech Stack

- Front-end:

  - React
  - Material-UI (MUI)
  - Axios
  - React Router

- Back-end:

  - Node.js
  - Express
  - PostgreSQL

- Auth and Security:
  - bcrypt
  - jsonwebtoken
  - dotenv
  - cors

## Features

- User authentication and authorization (signup, login) with JWT for session persistence (24-hour expiration)
- Browse and search for services
- Provider profiles with service listings
- Booking management for providers
- Review services for customers
- Responsive design for desktop and mobile devices

## Planning

Trello: https://trello.com/b/ihiHjWM9/plan

## Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Set up environment variables
4. Set up the database and run migrations.
5. Run the back-end server with `npm run server`.
6. In another terminal, run the front-end with `npm start`.

## How to Run

1. Start the back-end server with `npm run server`.
2. In another terminal, run the front-end with `npm start`.
3. Open your browser and navigate to `http://localhost:3000`.

## Future Improvements

- Implement real-time notifications for service providers and customers.
- Add a messaging feature for direct communication between users.
- Integrate payment processing for seamless transactions.
- Add a forgot password option which sends a link the users email to reset

Created by Mohammed T Ali for my final project at General Assembly
