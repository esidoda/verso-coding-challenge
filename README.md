### Project Overview

This is a Vue.js application that allows users to create, edit and delete orders and products.

### Running the mock API (json-server)

This project uses json-server as a mock backend for development purposes. To start the mock server, run the following command:

```bash
json-server --watch db.json --port 3001
```

## Running the application locally

Before you start, you need to install the necessary dependencies. Run the following command in your project directory:

```bash
npm install
```

Once the dependencies are installed, start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running the application with Docker

To build the Docker image, run the following command in the root of the project:

```bash
docker build -t verso-challenge .
```

Once the image is built, run the container using:

```bash
docker run -p 3000:3000 aampere-challenge
```

After running the container, open your browser and navigate to [http://localhost:3000](http://localhost:3000) to verify that the application is running inside the Docker container.

## Running Tests

To run the tests, use the following command:

```bash
npm run test
```
