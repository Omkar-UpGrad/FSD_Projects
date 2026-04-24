import React, { useState } from "react";

import { MdEdit, MdCheck } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const addTodo = () => {
    if (!input.trim()) return;

    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: input,
        completed: false,
      },
    ]);
    setInput("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditingText(todo.text);
  };

  const saveEdit = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editingText } : todo
      )
    );
    setEditingId(null);
    setEditingText("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addTodo();
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full max-w-lg mx-auto border border-gray-300 rounded-md my-4">
        <div className="flex flex-col">
          <h3 className="text-center py-2 border-b border-gray-300 font-semibold bg-gray-50">
            Manage Todos
          </h3>

          <form className="p-4 flex gap-4" onSubmit={handleSubmit}>
            <input
              className="p-2 px-4 border border-gray-300 flex-1"
              placeholder="Enter a todo..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <button className="p-2 px-4 border border-gray-300 bg-gray-100 hover:bg-gray-200">
              + Add Todo
            </button>
          </form>

          <ul className="p-4 flex flex-col gap-4">
            {todos.map((todo, index) => (
              <li key={todo.id}>
                <div className="flex gap-2 items-center group">
                  <input
                    className="w-6 h-6"
                    type="checkbox"
                    id={`todo-${index}`}
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />

                  {editingId === todo.id ? (
                    <input
                      className="border border-gray-300 px-2 py-1 flex-1"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                    />
                  ) : (
                    <label
                      htmlFor={`todo-${index}`}
                      className={`flex-1 ${
                        todo.completed ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {todo.text}
                    </label>
                  )}

                  <div className="ms-auto flex gap-2">
                    {editingId === todo.id ? (
                      <button className="p-2" onClick={() => saveEdit(todo.id)}>
                        <MdCheck />
                      </button>
                    ) : (
                      <button className="p-2" onClick={() => startEdit(todo)}>
                        <MdEdit />
                      </button>
                    )}

                    <button className="p-2" onClick={() => deleteTodo(todo.id)}>
                      <IoMdTrash />
                    </button>
                  </div>
                </div>
              </li>
            ))}

            {todos.length === 0 && (
              <p className="text-center text-gray-400">No todos yet</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
