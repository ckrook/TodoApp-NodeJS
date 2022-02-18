const express = require("express");
const { ObjectId } = require("mongodb");
const getNewId = require("../lib/newId");
const { getTodos, getSortedTodos } = require("../lib/getTodos");
const getDb = require("./../database");
const router = express.Router();
const COLLECTION_NAME = "todos";

router.get("/", async (req, res) => {
  const todos = await getTodos();
  res.render("home", { todos });
});

// GET: / incompleted
router.get("/incompleted", async (req, res) => {
  const todos = await getTodos();
  res.render("todos-incompleted", { todos });
});

// GET: / completed
router.get("/completed", async (req, res) => {
  const todos = await getTodos();
  res.render("todos-completed", { todos });
});

// GET: / New Todo
router.get("/newTodo", async (req, res) => {
  res.render("add");
});

// POST: / Add
router.post("/add", async (req, res) => {
  const todos = await getTodos();
  const id = getNewId(todos);
  const newTodo = {
    id: id,
    created: new Date(),
    description: req.body.description,
    done: false,
  };
  const db = await getDb();
  await db.collection(COLLECTION_NAME).insertOne(newTodo);
  res.redirect("/");
});

// GET: Delete todo //
router.get("/:id/delete", async (req, res) => {
  const id = req.params.id;
  const todos = await getTodos();
  const todo = todos.find((todo) => todo._id.toString() === id);
  res.render("delete", { todo });
});

// POST: Delete
router.post("/:id/delete", async (req, res) => {
  const id = ObjectId(req.params.id);
  const db = await getDb();
  await db.collection(COLLECTION_NAME).deleteOne({ _id: id });
  res.redirect("/");
});

//GET: Edit
router.get("/:id/edit", async (req, res) => {
  const id = req.params.id;
  const todos = await getTodos();
  const todo = todos.find((todo) => todo._id.toString() === id);
  res.render("edit", { todo });
});

// GET / Update
router.post("/:id/update", async (req, res) => {
  const id = ObjectId(req.params.id);
  const updatedTodo = {
    description: req.body.description,
    done: Boolean(req.body.done),
  };

  const db = await getDb();
  await db
    .collection(COLLECTION_NAME)
    .updateOne({ _id: id }, { $set: updatedTodo });
  res.redirect("/");
});

// GET: / Sort ascending
router.get("/asc", async (req, res) => {
  const todos = await getSortedTodos(1);

  res.render("home", { todos });
});

// GET: / Sort descending
router.get("/desc", async (req, res) => {
  const todos = await getSortedTodos(-1);
  console.log(todos);
  res.render("home", { todos });
});

module.exports = router;
