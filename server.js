const express = require("express");
const connectDB = require("./config/db");

//Importing Routes
const postRoutes = require("./routes/api/posts");
const userRoutes = require("./routes/api/users");
const authRoutes = require("./routes/api/auth");
const profileRoutes = require("./routes/api/profile");

const app = express();

//middlewares
app.use(express.json({ extended: false }));

//connect database
connectDB();
app.get("/", (req, res) => {
  res.send("API Running");
});

//defining routes
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
