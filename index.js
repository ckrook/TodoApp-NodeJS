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

app.post("/todos/add", (req, res) => {
  console.log(req.body);
  const id = getNewId(todos);
  const newTodo = {
    id: id,
    created: new Date(),
    description: req.body.description,
    done: false,
  };
  todos.push(newTodo);
});

app.get("/todo/:id/done", (req, res) => {
  const id = parseInt(req.params.id) - 1;
  if (todos[id].done) {
    todos[id].done = false;
  } else {
    todos[id].done = true;
  }
  res.redirect("/");
});

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

app.get("/todos/:id/edit", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((i) => i.id === id);

  res.render("edit", { todo });
});

app.post("/todos/:id/update", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((i) => i.id === id);
  todo[id].description = req.body.description;
  res.redirect("/", { todo });
});

///////////////////////////////

app.set("view engine", "hbs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.listen(8000, () => {
  console.log("http://localhost:8000");
});
