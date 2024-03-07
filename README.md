# AttomoChallenge-Frontend

## Project Overview
Welcome to the Attomo Challenge Frontend! This web application, developed using Next.js and TypeScript, allows users to vote for their most anticipated video game of 2023. The frontend interacts seamlessly with the backend, built with Express.js and MongoDB, to provide a complete voting experience.

## Project Structure
The project follows a well-organized structure, ensuring clarity and maintainability. The main directories inside the client folder include:

- app: Contains the core application logic and components.

- api: Manages Auth0 authentication and other API-related functionality.
- assets: Holds static assets such as images.
- components: Houses reusable React components for different parts of the application.
- context: Provides context for managing global state.
- services: Handles various services like Auth0 authentication.
- utils: Includes utility functions used throughout the application.
- pages: Contains the pages that define routes for the application.

- styles: Manages global styles and theme configurations.

## Installation
1. Clone the repository:
git clone https://github.com/LucasRiestra/AttomoChallenge-Frontend.git

2. Change to the client directory:
cd AttomoChallenge-Frontend/client

3. Install Dependencies:
npm install

4. Set Up Environment Variables: Create a .env file in the client directory with the following variables:
AUTH0_SECRET=use [openssl rand -hex 32] to generate a 32 bytes value
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=xxxxxxxx
AUTH0_CLIENT_ID=xxxxxxxx
AUTH0_CLIENT_SECRET=xxxxxxxx
NEXT_AUTH0_AUDIENCE=http://localhost:4000
NEXT_PUBLIC_API_URL=http://localhost:4000

5. Run the application
npm run dev

6. Acces to application
http://localhost:3000

## Libraries Used
The frontend utilizes the following libraries to enhance user experience and streamline development:
- Auth0: Implements secure user authentication for seamless login functionality.
- Bootstrap: Incorporates Bootstrap for creating modals, enhancing the overall user interface.
- React-hot-toast: Utilizes React-hot-toast for smooth and customizable toasts, providing user 

## Contributions
Contributions are welcome. If you find any issues or have any suggestions, feel free to open an issue or submit a pull request.

## Contact
For any questions or comments, please contact me at:

Lucas.riestra94@gmail.com
https://www.linkedin.com/in/lucasriestra/

## License
MIT License

Copyright (c)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.