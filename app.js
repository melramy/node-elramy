const express = require("express");
const app = express();
const port =process.env.PORT || 3001;
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static("public"));

var methodOverride = require("method-override");
app.use(methodOverride("_method"));
const allRoutes = require('./routes/allRoutes')
const addUserRoute = require('./routes/addUser')


//  auto refrech
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

const connectLivereload = require("connect-livereload");
const { resourceLimits } = require("worker_threads");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});


mongoose
  .connect(
    "mongodb+srv://Elramy:diBIw9PAdylIiz84@cluster0.vcymlvu.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });


  app.use(allRoutes)
  app.use("/user/add.html",addUserRoute)