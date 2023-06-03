import express from "express"
import {config} from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/User.js"
import blogRouter from "./routes/Blog.js"

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

// Using Routes
app.use("/api/v1/users",userRouter);
app.use("/api/v1/blog",blogRouter);

app.get("/",(req,res)=>{
    res.send("Welcome to ThoughtFlow")
})