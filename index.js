// IMPORTS //
const express = require("express");
const exphbs = require("express-handlebars");
const todosRouter = require("./routers/todos-routers");
const app = express();
const PORT = 8000;
////////////
// SETUP //
//////////

app.use(express.json());
app.engine(
  "hbs",
  exphbs.engine({
    defaultLayout: "main",
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use("/", todosRouter);

app.listen(PORT, () => {
  console.log("http://localhost:" + PORT.toString());
});
