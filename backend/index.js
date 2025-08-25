import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import connectDB from "./database/db.js"
import userRoute from "./routes/user.route.js"
import projectRoute from "./routes/project.route.js"
import mediaRoute from "./routes/media.route.js"
import purchaseRoute from "./routes/purchaseProject.route.js"
import projectProgressRoute from "./routes/projectProgress.route.js"
import ideaRoute from "./routes/idea.route.js"
import path from "path";

dotenv.config({})
connectDB()
const app=express()
const PORT= process.env.PORT || 3000

const __dirname=path.resolve()

//default middleware
app.use(express.json());
app.use(cookieParser())
app.use(cors({
   origin: "http://localhost:5173",
   credentials:true,
}))

app.use("/api/v1/user", userRoute)
app.use("/api/v1/project", projectRoute)
app.use("/api/v1/media", mediaRoute)
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", projectProgressRoute);
app.use("/api/v1/idea", ideaRoute);

app.use(express.static(path.join(__dirname, "/frontend/dist")))

app.get(/.*/, (req, res) => { res.sendFile(path.resolve(__dirname, "frontend","dist", "index.html")); });

app.listen(PORT, ()=>{
    console.log(`Server listen at PORT ${PORT}`)
})