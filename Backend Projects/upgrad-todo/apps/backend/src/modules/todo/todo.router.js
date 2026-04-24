import express from "express";
import { validate } from "../../modules/validation/validation.middleware.js";
import { todoService } from "./todo.service.js";
import {
  createTodoSchema,
  deleteTodoSchema,
  updateTodoSchema,
} from "./todo.validation.js";

export const todosRouter = express.Router();

todosRouter.get("/", async (req, res) => {
  const result = await todoService.getTodos();

  return res.json({
    status: "ok",
    message: "Todos retrieved successfully.",
    data: result,
  });
});

todosRouter.post("/", validate(createTodoSchema), async (req, res) => {
  const { content, isComplete } = req.body;

  const item = await todoService.createTodo({
    content,
    isComplete: !!isComplete,
  });

  return res.json({
    status: "ok",
    message: "Todo created successfully",
    data: item,
  });
});

todosRouter.put("/:id", validate(updateTodoSchema), async (req, res) => {
  const todoId = req.params.id;
  const { content, isComplete } = req.body;

  const item = await todoService.getTodo(todoId);

  if (!item) {
    return res.status(404).body({
      status: "error",
      message: "Todo not found.",
    });
  }

  const update = {};
  if (content != null) {
    update.content = content;
  }

  if (isComplete != null) {
    update.isComplete = isComplete;
  }

  const result = await todoService.updateTodo(todoId, update);

  return res.json({
    status: "ok",
    message: "Todo updated successfully",
    data: result,
  });
});

todosRouter.delete("/:id", validate(deleteTodoSchema), async (req, res) => {
  const todoId = req.params.id;

  const item = await todoService.getTodo(todoId);

  if (!item) {
    return res.status(404).body({
      status: "error",
      message: "Todo not found.",
    });
  }

  await todoService.deleteTodo(todoId);

  return res.json({
    status: "ok",
    message: "Todo deleted successfully",
  });
});
