import express from 'express'
export const app = express();
import cors from 'cors'
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js'
import experianceRoutes from './routes/experiance.routes.js'
import educationRoutes from './routes/education.routes.js'

// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }))

app.use(express.json())
// app.use(express.urlencoded({ extended: true, limit: "16kb" }))  // for receiving url data
app.use(express.static("public"))

app.use(cookieParser())  // cookie related data handled and work that receive in user browser

// import useRoutes
app.use("/api/users", userRoutes);
app.use("/api/experiance", experianceRoutes);
app.use("/api/education", educationRoutes);


app.get('/', (req, res) => {
    res.json({
        messgae: "Jay Shree Ram...!"
    })
})
