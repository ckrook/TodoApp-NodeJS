const getDb = require("../database");

async function getTodos() {
  const db = await getDb();
  const dbTodos = db.collection("todos").find();
  const todos = [];

  await dbTodos.forEach((b) => {
    todos.push(b);
  });
  return todos;
}

async function getSortedTodos(i) {
  const db = await getDb();
  return await db.collection("todos").find().sort({ description: i }).toArray();
}

module.exports = { getTodos, getSortedTodos };
