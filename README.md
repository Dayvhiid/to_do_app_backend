# To-Do App API

A comprehensive RESTful API for managing tasks built with Node.js, Express.js, MongoDB, and JWT authentication.

## Features

- **User Authentication**: Register and login with JWT token-based authentication
- **Task Management**: Create, read, update, delete, and toggle task status
- **Status Filtering**: Filter tasks by pending or completed status
- **User-specific Data**: Each user can only access their own tasks
- **Input Validation**: Server-side validation for all endpoints
- **Security**: Password hashing with bcrypt and protected routes

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcryptjs for password hashing
- **Validation**: express-validator
- **Environment**: dotenv for environment variables

## Project Structure

```
to_do_app/
├── controllers/
│   ├── authController.js    # Authentication logic (register/login)
│   └── taskController.js    # Task management logic
├── middleware/
│   └── auth.js             # JWT authentication middleware
├── models/
│   ├── User.js             # User schema and model
│   └── Task.js             # Task schema and model
├── routes/
│   ├── authRoutes.js       # Authentication routes
│   └── taskRoutes.js       # Task management routes
├── validators/
│   └── taskValidators.js   # Input validation rules
├── index.js                # Main server file
├── package.json            # Project dependencies
└── .env                    # Environment variables
```

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd to_do_app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   Create a `.env` file in the root directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=4000
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication Routes (`/api/auth`)

#### Register User
- **POST** `/api/auth/register`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**: Success message

#### Login User
- **POST** `/api/auth/login`
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Login successful",
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
  ```

### Task Routes (`/api/tasks`)
*All task routes require authentication (Bearer token)*

#### Create Task
- **POST** `/api/tasks`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "title": "Complete project",
    "description": "Finish the to-do app project"
  }
  ```

#### Get All Tasks
- **GET** `/api/tasks`
- **Headers**: `Authorization: Bearer <token>`
- **Optional Query Parameters**:
  - `?status=pending` - Get only pending tasks
  - `?status=completed` - Get only completed tasks

#### Get Task by ID
- **GET** `/api/tasks/:id`
- **Headers**: `Authorization: Bearer <token>`

#### Update Task
- **PUT** `/api/tasks/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "title": "Updated title",
    "description": "Updated description"
  }
  ```

#### Delete Task
- **DELETE** `/api/tasks/:id`
- **Headers**: `Authorization: Bearer <token>`

#### Toggle Task Status
- **PATCH** `/api/tasks/:id/toggle`
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Switches task status between 'pending' and 'completed'

## Data Models

### User Model
```javascript
{
  name: String (required, min: 5 characters),
  email: String (required, unique, valid email),
  password: String (required, min: 5 characters, hashed),
  createdAt: Date (default: now)
}
```

### Task Model
```javascript
{
  title: String (required, min: 5 characters),
  description: String (required, min: 10 characters),
  status: String (enum: ['pending', 'completed'], default: 'pending'),
  user: ObjectId (reference to User, required),
  createdAt: Date (default: now)
}
```

## Key Features Explained

### Authentication System
- **Registration**: Users create accounts with hashed passwords
- **Login**: Returns JWT token for subsequent requests
- **Protected Routes**: All task endpoints require valid JWT token

### Task Management
- **CRUD Operations**: Full create, read, update, delete functionality
- **User Isolation**: Users can only access their own tasks
- **Status Management**: Tasks can be pending or completed
- **Toggle Functionality**: Easy status switching with single endpoint

### Input Validation
- **Server-side Validation**: All inputs validated before processing
- **Error Handling**: Comprehensive error messages for debugging
- **Security**: Protection against invalid data and MongoDB injection

### Security Features
- **Password Hashing**: bcrypt with salt rounds for secure password storage
- **JWT Authentication**: Stateless token-based authentication
- **Route Protection**: Middleware ensures only authenticated users access protected routes
- **User Data Isolation**: Database queries filtered by user ID

## Usage Examples

### 1. Register and Login
```bash
# Register
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### 2. Task Operations
```bash
# Create task
curl -X POST http://localhost:4000/api/tasks \
  -H "Authorization: Bearer <your_token>" \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn Node.js","description":"Complete Node.js tutorial"}'

# Get all tasks
curl -X GET http://localhost:4000/api/tasks \
  -H "Authorization: Bearer <your_token>"

# Get pending tasks only
curl -X GET http://localhost:4000/api/tasks?status=pending \
  -H "Authorization: Bearer <your_token>"

# Toggle task status
curl -X PATCH http://localhost:4000/api/tasks/<task_id>/toggle \
  -H "Authorization: Bearer <your_token>"
```

## Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required)
- `404` - Not Found
- `500` - Internal Server Error

Error responses include descriptive messages:
```json
{
  "message": "Error description",
  "error": "Detailed error information"
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
