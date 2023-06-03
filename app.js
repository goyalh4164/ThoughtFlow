import express from "express"
import {config} from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"

export const app = express();

config({
    path:"./data/config.env"
})

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin : [process.env.FRONTEND],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))

app.get("/",(req,res)=>{
    res.send("Welcome to ThoughtFlow")
})