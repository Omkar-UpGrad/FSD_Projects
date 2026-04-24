import express from "express";
import { todoService } from "../todo/todo.service.js";
import {
  createTodoSchema,
  deleteTodoSchema,
  updateTodoSchema,
} from "../todo/todo.validation.js";
import { validate } from "../validation/validation.middleware.js";

export const uiRouter = express.Router();

uiRouter.get("/", async (req, res) => {
  try {
    const todos = await todoService.getTodos();
    res.render("index", { todos });
  } catch (err) {
    res.status(500).send("Error loading todos");
  }
});

uiRouter.post("/", validate(createTodoSchema), async (req, res) => {
  try {
    const { content } = req.body;
    await todoService.createTodo({ content, isComplete: false });
    res.redirect("/ui");
  } catch (err) {
    res.status(500).send("Error creating todo");
  }
});

uiRouter.post("/toggle/:id", async (req, res) => {
  try {
    const todoId = req.params.id;
    const item = await todoService.getTodo(todoId);
    if (item) {
      await todoService.updateTodo(todoId, { isComplete: !item.isComplete });
    }
    res.redirect("/ui");
  } catch (err) {
    res.status(500).send("Error toggling todo");
  }
});

uiRouter.get("/edit/:id", async (req, res) => {
  try {
    const todoId = req.params.id;
    const todo = await todoService.getTodo(todoId);
    if (!todo) return res.status(404).send("Todo not found");

    res.render("edit", { todo });
  } catch (err) {
    res.status(500).send("Error loading edit page");
  }
});

uiRouter.post("/edit/:id", validate(updateTodoSchema), async (req, res) => {
  try {
    const todoId = req.params.id;
    const { content } = req.body;
    await todoService.updateTodo(todoId, { content });
    res.redirect("/ui");
  } catch (err) {
    res.status(500).send("Error updating todo");
  }
});

uiRouter.post("/delete/:id", validate(deleteTodoSchema), async (req, res) => {
  try {
    const todoId = req.params.id;
    await todoService.deleteTodo(todoId);
    res.redirect("/ui");
  } catch (err) {
    res.status(500).send("Error deleting todo");
  }
});

uiRouter.use((req, res, next) => {
  return res.status(404).send("Page not Found.");
});
