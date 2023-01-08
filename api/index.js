import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import roomsRoutes from "./routes/rooms.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.json("hello");
})


app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/rooms", roomsRoutes);

app.listen(8800, () => {
    console.log("Connect to backend!");
})