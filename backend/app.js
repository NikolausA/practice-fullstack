require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const routes = require("./routes");

const port = 3001;
const app = express();

app.use(express.static("../frontent/build"));
app.use(cookieParser());
app.use(express.json());

app.use("/", routes);

mongoose
  .connect(
    "mongodb+srv://nikaleksenko:an3KaRbbFRhb40i4@cluster0.vxcl4ie.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`App listen on port ${port}`);
    });
  });

//process.env.MONGODB_CONNECTION_STRING
