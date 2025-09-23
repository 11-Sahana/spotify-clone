import express from "express";
import cors from "cors";
import "dotenv/config";
import songRouter from "./src/routes/songRoute.js";
import albumRouter from "./src/routes/albumRoutes.js";
import ConnectDB from "./src/config/mongodb.js";
import connectCloudinary from "./src/config/cloudinary.js";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 8000;

// DB & Cloudinary connection
ConnectDB();
connectCloudinary();

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use("/api/song", songRouter);
app.use("/api/album", albumRouter);

app.get("/", (req, res) => {
  res.send("API working");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
