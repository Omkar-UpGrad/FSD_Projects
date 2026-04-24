import React, { useState } from "react";
import toast from "react-hot-toast";
import { Check, Trash2, Edit2, X, Plus } from "lucide-react";
import { useTodos, useCreateTodo, useUpdateTodo, useDeleteTodo } from "@/api/todo";

function TodosPage() {
  const { data: todos, isLoading, isError } = useTodos();
  const createTodo = useCreateTodo();
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();

  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    
    createTodo.mutate(
      { content: newTodo, isComplete: false },
      {
        onSuccess: () => {
          toast.success("Todo created successfully");
          setNewTodo("");
        },
        onError: () => toast.error("Failed to create todo"),
      }
    );
  };

  const handleToggleComplete = (todo) => {
    updateTodo.mutate(
      { id: todo.id, isComplete: !todo.isComplete },
      {
        onSuccess: () => toast.success(`Todo marked as ${!todo.isComplete ? 'completed' : 'pending'}`),
        onError: () => toast.error("Failed to update status"),
      }
    );
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditContent(todo.content);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditContent("");
  };

  const handleUpdate = (e, id) => {
    e.preventDefault();
    if (!editContent.trim()) return;

    updateTodo.mutate(
      { id, content: editContent },
      {
        onSuccess: () => {
          toast.success("Todo updated successfully");
          cancelEdit();
        },
        onError: () => toast.error("Failed to update todo"),
      }
    );
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this todo?")) {
      deleteTodo.mutate(id, {
        onSuccess: () => toast.success("Todo deleted successfully"),
        onError: () => toast.error("Failed to delete todo"),
      });
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-10">
      <div className="max-w-2xl mx-auto px-4">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-3xl font-bold mb-6 text-primary">Todo List</h2>
            
            <form onSubmit={handleCreate} className="flex gap-2 mb-8">
              <input
                type="text"
                placeholder="What needs to be done?"
                className="input input-bordered input-primary flex-1"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                disabled={createTodo.isPending}
              />
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={createTodo.isPending || !newTodo.trim()}
              >
                {createTodo.isPending ? <span className="loading loading-spinner"></span> : <Plus size={20} />}
                Add
              </button>
            </form>

            <div className="space-y-4">
              {isLoading && (
                <div className="flex justify-center py-8">
                  <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
              )}
              
              {isError && (
                <div className="alert alert-error">
                  <span>Error loading todos. Please try again later.</span>
                </div>
              )}

              {!isLoading && !isError && todos?.length === 0 && (
                <div className="text-center py-8 text-base-content/60">
                  <p>No todos yet. Add one above!</p>
                </div>
              )}

              {todos?.map((todo) => (
                <div 
                  key={todo.id} 
                  className={`group flex items-center gap-4 p-4 rounded-lg border transition-all overflow-hidden ${
                    todo.isComplete ? 'bg-base-200 border-base-300 opacity-70' : 'bg-base-100 border-base-200 hover:border-primary/30'
                  }`}
                >
                  <label className="cursor-pointer label p-0 shrink-0">
                    <input 
                      type="checkbox" 
                      className="checkbox checkbox-primary"
                      checked={todo.isComplete}
                      onChange={() => handleToggleComplete(todo)}
                    />
                  </label>

                  <div className="flex-1 min-w-0">
                    {editingId === todo.id ? (
                      <form onSubmit={(e) => handleUpdate(e, todo.id)} className="flex items-center gap-2">
                        <input
                          type="text"
                          className="input input-sm input-bordered flex-1 min-w-0"
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          autoFocus
                        />
                        <button type="submit" className="btn btn-sm btn-success btn-square shrink-0" disabled={updateTodo.isPending}>
                          <Check size={16} />
                        </button>
                        <button type="button" onClick={cancelEdit} className="btn btn-sm btn-ghost btn-square shrink-0">
                          <X size={16} />
                        </button>
                      </form>
                    ) : (
                      <span className={`text-lg transition-all break-words block ${todo.isComplete ? 'line-through text-base-content/50' : 'text-base-content'}`}>
                        {todo.content}
                      </span>
                    )}
                  </div>

                  {editingId !== todo.id && (
                    <div className="flex gap-2 shrink-0 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => startEdit(todo)}
                        className="btn btn-square btn-sm btn-ghost text-base-content/70 hover:text-primary"
                        title="Edit todo"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(todo.id)}
                        className="btn btn-square btn-sm btn-ghost text-base-content/70 hover:text-error"
                        title="Delete todo"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodosPage;
