# mustaaaarrdd

A robust REST API built with Node.js, TypeScript, and PostgreSQL that provides user management capabilities with authentication. This project implements CRUD operations, JWT authentication, and follows DevOps best practices including containerization and CI/CD.

## Live Demo
- API Base URL: `https://mustaaaarrdd.onrender.com`
- API Documentation: `https://glikeaprayer/mustaaaarrdd/README.md`

## Tech Stack
- **Backend**: Node.js + TypeScript + Express
- **Database**: PostgreSQL
- **ORM**: KnexJS/ObjectionJS
- **Authentication**: JWT
- **Container**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **Hosting**: Render
- **Database Hosting**: Render Managed PostgreSQL

## Local Setup

### Prerequisites
- Node.js (v18 or higher)
- Docker and Docker Compose
- Git

### Environment Variables
Create a `.env` file in the root directory with the following variables:
```
NODE_ENV=development
PORT=3000
JWT_SECRET=your_jwt_secret
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ascent_db
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
```

### Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/likeaprayer/mustaaaarrdd.git
cd mustaaaarrdd
```

2. Using Docker Compose (Recommended):
```bash
# Start the application and database
docker-compose up -d

# Run database migrations
docker-compose exec api npm run migrate-up
```

3. Manual Setup (Alternative):
```bash
# Install dependencies
npm install

# Run database migrations
npm run migrate-up 

#N/B this assumes you have a postgres running locally

# Start development server
npm run dev
```

The API will be available at `http://localhost:7321`

## Authentication and Security

### JWT Authentication
- The API uses JSON Web Tokens (JWT) for authentication
- Tokens are valid for 7days (i know right)
- Protected routes require a valid JWT token in the Authorization header
- Token format: `Bearer <token>`

### Security Measures
1. **Rate Limiting**:
   - 100 requests per 15-minute window per IP
   - Helps prevent brute force attacks

2. **Input Validation**:
   - Request validation using `Joi`
   - Sanitization of user inputs

3. **Password Security**:
   - Passwords are hashed using bcrypt
   - Minimum password requirements enforced

### API Authentication Flow
1. Register a new user: `POST /api/auth/signup`
2. Login to get JWT: `POST /api/auth/login`
3. Use JWT for authenticated requests

## CI/CD Setup

### GitHub Actions Workflow
The pipeline automatically runs on push to main branch:

1. **Build & Test**:
   - Installs dependencies
   - Runs linting
   - Executes unit tests
   - Builds TypeScript code

2. **Docker Build**:
   - Builds Docker image
   - Tags with commit SHA

3. **Push to Docker Hub**:
   - Automatically pushes image to Docker Hub
   - Updates environment variables
   - Runs database migrations

### Deployment Architecture
- Application runs on Render Web Services automatically after a new commit has been made to the `main` branch
- PostgreSQL hosted on Render Managed Database
- Automatic SSL/TLS certification

## Challenges and Solutions

### 1. Docker Build Optimization
**Challenge**: Slow build times and large image size.

**Solution**:
- Implemented multi-stage builds
- Optimized node_modules installation
- Used .dockerignore to exclude unnecessary files
- Cached layers effectively


## API Endpoints

### Public Endpoints
```
POST /api/auth/signup - Register new user
POST /api/auth/login - Login user
```

### Protected Endpoints
```
GET /api/users - List all users
POST /api/users - Create a new user
GET /api/users/:id - Get user details
PUT /api/users/:id - Update user
DELETE /api/users/:id - Delete user
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.