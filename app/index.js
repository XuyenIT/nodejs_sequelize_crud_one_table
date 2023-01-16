const express = require("express");
const path = require("path");
const session = require("express-session");
const rootRouter = require("./routers/rootRouter");
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//set view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//static file
const publictPathDirectory = path.join(__dirname, "public");
app.use(express.static(publictPathDirectory));

// goi use session truoc use router
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "somesecret",
    cookie: { maxAge: 60000 },
  })
);
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});
app.use(rootRouter);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
//setup sequelize
const { sequelize } = require("./models");
// sequelize.sync({ alter: true });
