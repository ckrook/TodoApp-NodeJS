const express = require("express");
const exphbs = require("express-handlebars");
const todos = require("./data/todos.js");
const getNewId = require("./lib/newId");
const app = express();

app.use(express.json());

app.engine(
  "hbs",
  exphbs.engine({
    defaultLayout: "main",
    extname: ".hbs",
  })
);

// Home page //
app.get("/", (req, res) => {
  console.log(todos);
  res.render("home", { todos });
});

// Todo lista //
app.get("/todos", (req, res) => {
  res.render("todos-list", { todos });
});

// Add new todo //
app.get("/newTodo", (req, res) => {
  res.render("add");
});

app.post("/todos/add", (req, res) => {
  const id = getNewId(todos);
  const newTodo = {
    id: id,
    created: "formatted",
    description: req.body.description,
    done: false,
  };
  todos.push(newTodo);
  res.redirect("/");
});

// Mark todo as done //
app.get("/todo/:id/done", (req, res) => {
  const id = parseInt(req.params.id) - 1;

  // Toggle todo between True & False //
  if (todos[id].done) todos[id].done = false;
  else todos[id].done = true;

  res.redirect("/");
});

// Delete todo //
app.get("/todos/:id/delete", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((i) => i.id === id);

  res.render("delete", { todo });
});

app.post("/todos/:id/delete", (req, res) => {
  const id = parseInt(req.params.id) - 1;
  const index = todos.findIndex((i) => i.id === id);

  todos.splice(index, 1);
  res.redirect("/");
});

// Edit & update todo //
app.get("/todos/:id/edit", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((i) => i.id === id);

  res.render("edit", { todo });
});

app.post("/todos/:id/update", (req, res) => {
  const id = parseInt(req.params.id) - 1;
  todos[id].description = req.body.description;
  res.redirect("/");
});

///////////////////////////////

app.set("view engine", "hbs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.listen(8000, () => {
  console.log("http://localhost:8000");
});
