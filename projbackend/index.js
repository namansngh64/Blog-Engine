require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

//Routes
const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blog");
const commentRoutes = require("./routes/comment");

//Middlewares
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Port
const port = process.env.PORT || 5000;
//Starting a server
app.listen(port, () => console.log(`Server running on port ${port}`));

//Database Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => console.log(err));

//myApi
app.use("/api", authRoutes);
app.use("/api", blogRoutes);
app.use("/api", commentRoutes);
