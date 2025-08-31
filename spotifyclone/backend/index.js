const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors()); // Allow frontend on 5173 to access
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/spotifyclone", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const songRoutes = require("./routes/songs");
app.use("/api/songs", songRoutes);

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
