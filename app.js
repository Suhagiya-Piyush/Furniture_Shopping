require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.get("/", (req, res) => {
  res.send(
    '<h1 style="text-align: center;margin-top: 50px;">Welcome to Furniture Shopping Project...!</h1>'
  );
});

const userRoutes = require('./routes/user.routes');

app.use('/api/user', userRoutes);

app.listen(port, async (req, res) => {
  await mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connection established successfully...");
  })
  .catch((error) => {console.log('Error', error);
  });
  console.log(`Server start at http://localhost:${port}`);
});
