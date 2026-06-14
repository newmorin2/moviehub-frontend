# Docker Frontend Application

This project is a Dockerized frontend application that serves as a template for building web applications using modern JavaScript frameworks.

## Project Structure

```
docker-frontend-app
├── src
│   ├── index.html        # Main HTML file
│   ├── index.js          # Main JavaScript file
│   ├── styles.css        # Styles for the application
│   ├── components        # Directory for React components
│   │   └── App.js        # Root component of the application
│   └── assets            # Static assets (images, fonts, etc.)
├── public
│   └── 404.html          # Custom 404 error page
├── Dockerfile             # Instructions to build the Docker image
├── nginx.conf            # Nginx server configuration
├── docker-compose.yml     # Defines services for Docker
├── .dockerignore         # Files to ignore when building Docker image
├── .gitignore            # Files to ignore in Git
├── package.json          # npm configuration file
└── README.md             # Project documentation
```

## Getting Started

To get started with this project, follow these steps:

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd docker-frontend-app
   ```

2. **Build the Docker image:**
   ```
   docker build -t docker-frontend-app .
   ```

3. **Run the application using Docker Compose:**
   ```
   docker-compose up
   ```

4. **Access the application:**
   Open your browser and navigate to `http://localhost:8080`.

## Development

- To make changes to the application, modify the files in the `src` directory.
- Use `npm` scripts defined in `package.json` for development tasks.

## License

This project is licensed under the MIT License. See the LICENSE file for details.