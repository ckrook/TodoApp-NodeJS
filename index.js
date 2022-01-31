const express = require("express");
const exphbs = require("express-handlebars");
const todos = require("./data/todos.js");

function getNewId(list) {
  let maxId = 0;
  for (const Item of list) {
    if (Item.id > maxId) {
      maxId = Item.id;
    }
  }
  return maxId + 1;
}

const app = express();

app.engine(
  "hbs",
  exphbs.engine({
    defaultLayout: "main",
    extname: ".hbs",
  })
);

// Hem
app.get("/", (req, res) => {
  res.render("home", { todos });
});

// Todo lista
app.get("/todos", (req, res) => {
  res.render("todos-list", { todos });
});

// Visa en specifik todo
app.get("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((i) => i.id === id);

  res.render("todo-single", todo);
});

app.post("/todos/add", (req, res) => {
  const id = getNewId(todos);
  const newTodo = {
    id: id,
    title: req.body.title,
    value: parseInt(req.body.value),
  };
  todos.push(newTodo);
  res.redirect("/todos");
});

app.get("/todos/:id/remove", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((i) => i.id === id);

  res.render("/", todos);
});

app.post("/todos/:id/remove", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((i) => i.id === id);

  todos.splice(index, 1);
  res.redirect("/todos");
});

///////////////////////////////

app.set("view engine", "hbs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.listen(8000, () => {
  console.log("http://localhost:8000");
});
