// imports
import express, { Application } from "express";
import cors from 'cors';
import morgan from 'morgan';
import config from './Configs/configTypes'
import router from "./routes";
import helmet from "helmet";


// Initialising app
const app: Application = express();


// Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors({origin:true}))

// Server setup
app.listen(config.PORT,()=>console.log(`Server listening on port ${config.PORT}`))

app.use(helmet())

app.use(router)


