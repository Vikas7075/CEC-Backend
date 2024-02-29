import express from 'express'
export const app = express();
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js'
import experianceRoutes from './routes/experiance.routes.js'
import educationRoutes from './routes/education.routes.js'
import postRoutes from './routes/Post/post.routes.js'
import likeRoutes from './routes/Post/like.routes.js';
import commentRoutes from './routes/Post/comment.routes.js';


app.use(express.json())
// app.use(express.urlencoded({ extended: true, limit: "16kb" }))  // for receiving url data
app.use(express.static('uploads'))

app.use(cookieParser())  // cookie related data handled and work that receive in user browser

dotenv.config({
    path: './.env'
})

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["POST", "PUT", "GET", "DELETE"],
    credentials: true
}));



// import useRoutes
app.use("/api/users", userRoutes);
app.use("/api/experiance", experianceRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/post", postRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/post/comment", commentRoutes);


app.get('/', (req, res) => {
    res.json({
        messgae: "Jay Shree Ram...!"
    })
})
