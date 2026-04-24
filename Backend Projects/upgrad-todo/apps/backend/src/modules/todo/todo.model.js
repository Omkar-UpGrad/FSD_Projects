
import mongoose from "mongoose";
import { db } from "../db/index.js";

const todoSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    isComplete: {
        type: Boolean,
        default: false,
    },
});

export const Todo = db.model("Todo", todoSchema);
