import { app } from './app.js'
import dotenv from 'dotenv'
import { ConnectDb } from './db/db.js'


dotenv.config({
    path: './.env'
})

ConnectDb();
app.listen(process.env.PORT, (req, res) => {
    console.log(`Server is listening on PORT ${process.env.PORT} in ${process.env.Node_env} Mode `)
})