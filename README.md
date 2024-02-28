# CEC Backend

This is the backend for a CEC application. It provides APIs for user authentication, post management, likes, comments, and other functionalities.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd cec-backend
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

Create a `.env` file in the root directory and provide the following environment variables:

```plaintext
PORT = 4000
MONGODB_URI = <Your mongoDb_URI>
JWT_SECRET=<JWT_SECRET>
CORS_ORIGIN =<your cors origin"

cloud_name = <cloud_name secret>
api_key = <api_key secret>
api_secret = <api_secret>

Node_env = development Or production 
```

4. Start the server:

```bash
npm start
```

## API Endpoints

### Authentication

- `POST /api/users`: Register a new user.
- `GET /api/users`: Current User details.
- `GET /api/users/:userId`: User details by Id.
- `PUT /api/users/:userId`: Update user by Id.
- `DELETE /api/users`: Register a new user.
- `POST /api/users/:userId`: Delete user by Id.
- `POST /api/users/logout`: Logout the current user.

### Posts

- `GET /api/posts`: Get all posts.
- `GET /api/posts/:userId`: Get a all post of user by userId.
- `POST /api/posts`: Create a new post.
- `PUT /api/posts/:id`: Update a post by ID.
- `DELETE /api/posts/:id`: Delete a post by ID.

### Educations

- `GET /api/education/:userId`: Get all education details of userID.
- `POST /api/education`: Create education details.
- `PUT /api/education/:educationId`: Update education details by Id.
- `DELETE /api/education/:educationId`: Delete a education by ID.

### Experiences

- `POST /api/experience`: Create experiance details.
- `GET /api/experience/:userId`: Get a all experiance details of user by userId.
- `PUT /api/experience/:experienceId`: Update a experiance details by id.
- `DELETE /api/experiance/:experienceId`: Delete a experience details by ID.

### Likes

- `POST /api/posts/:postId/toggle`: Like and Unlike a post.

### Comments

- `POST /api/posts/:postId/comments`: Add a comment to a post.
- `DELETE /api/posts/:postId/comment/:commentId`: Delete a comment from a post.

### Users

- `GET /api/users`: Get all users.
- `GET /api/users/:id`: Get a specific user by ID.
- `PUT /api/users/:id`: Update a user by ID.
- `DELETE /api/users/:id`: Delete a user by ID.

## Deployment

