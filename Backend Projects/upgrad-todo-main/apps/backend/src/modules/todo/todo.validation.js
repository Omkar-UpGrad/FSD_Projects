import * as z from "zod";

export const createTodoSchema = z.object({
  body: z.object({
    content: z
      .string()
      .min(1, "Content is required")
      .max(300, "Content is too long"),
    isComplete: z.boolean().optional(),
  }),
});

export const updateTodoSchema = z.object({
  body: z.object({
    content: z
      .string()
      .min(1, "Content is required")
      .max(300, "Content is too long")
      .optional(),
    isComplete: z.boolean().optional(),
  }),
});

export const deleteTodoSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Id is required"),
  }),
});
