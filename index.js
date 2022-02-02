// IMPORTS //
const express = require("express");
const exphbs = require("express-handlebars");
const todos = require("./data/todos.js");
const getNewId = require("./lib/newId");
const app = express();

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

// GET: / home
app.get("/", (req, res) => {
  res.render("home", { todos });
});

// GET: / Completed todos
app.get("/todos-completed", (req, res) => {
  res.render("todos-completed", { todos });
});

// GET: / home
app.get("/todos-incompleted", (req, res) => {
  res.render("todos-incompleted", { todos });
});

// GET: / New Todo
app.get("/newTodo", (req, res) => {
  res.render("add");
});

// POST: / Add
app.post("/add", (req, res) => {
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

//GET: / Toggle Done
app.get("/todo/:id/done", (req, res) => {
  const id = parseInt(req.params.id) - 1;

  // Toggle todo between True & False //
  if (todos[id].done) todos[id].done = false;
  else todos[id].done = true;

  res.redirect("/");
});

//GET: Delete todo //
app.get("/todo/:id/delete", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((i) => i.id === id);

  res.render("delete", { todo });
});

// POST: Delete
app.post("/todo/:id/delete", (req, res) => {
  const id = parseInt(req.params.id) - 1;
  const index = todos.findIndex((i) => i.id === id);

  todos.splice(index, 1);
  res.redirect("/");
});

//GET: Edit
app.get("/todo/:id/edit", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((i) => i.id === id);

  res.render("edit", { todo });
});

// POST / Update
app.post("/todo/:id/update", (req, res) => {
  const id = parseInt(req.params.id) - 1;
  todos[id].description = req.body.description;
  todos[id].done = req.body.done;
  res.redirect("/");
});

// GET: / Sort ascending
app.get("/todos/asc", (req, res) => {
  const sortedTodos = todos;
  sortedTodos.sort((a, b) => {
    return a.created - b.created;
  });
  res.render("home", { sortedTodos });
});

// GET: / Sort descending
app.get("/todos/desc", (req, res) => {
  const sortedTodos = todos;
  sortedTodos.sort((a, b) => {
    return b.created - a.created;
  });

  res.render("home", { sortedTodos });
});

app.listen(8000, () => {
  console.log("http://localhost:8000");
});
