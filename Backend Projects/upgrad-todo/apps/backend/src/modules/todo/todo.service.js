
import { Todo } from "./todo.model.js";

class DBTodoService {
    #formatDocument(doc) {
        if (!doc) return null;
        const obj = doc.toObject ? doc.toObject() : doc;
        obj.id = obj._id.toString();
        delete obj._id;
        delete obj.__v;
        return obj;
    }

    async createTodo(todo) {
        const doc = await Todo.create(todo);
        return this.#formatDocument(doc);
    }

    async updateTodo(id, todo) {
        const doc = await Todo.findByIdAndUpdate(id, todo, { returnDocument: 'after' });
        return this.#formatDocument(doc);
    }

    async deleteTodo(id) {
        const doc = await Todo.findByIdAndDelete(id);
        return this.#formatDocument(doc);
    }

    async getTodo(id) {
        const doc = await Todo.findById(id);
        return this.#formatDocument(doc);
    }

    async getTodos() {
        const docs = await Todo.find();
        return docs.map(doc => this.#formatDocument(doc));
    }
}

export const todoService = new DBTodoService();

const DEFAULT_TODOS = [
  {
    id: 1,
    content: "This is a simple",
    isComplete: false,
  },
  {
    id: 2,
    content: "This is another todo",
    isComplete: false,
  },
  {
    id: 3,
    content: "Another sample todo",
    isComplete: false,
  },
  {
    id: 4,
    content: "This is a completed todo",
    isComplete: false,
  },
];

const objectCopy = (x) => {
  if (!x) {
    return x;
  }

  if (Array.isArray(x)) {
    return [...x];
  }

  return { ...x };
}

class ItemsInMemoryModel {
  constructor(defaultItems = []) {
    this.items = defaultItems?.map(objectCopy) || [];
    this.counter = this.items.length;
  }

  async insert(x) {
    x.id = ++this.counter;
    this.items.push(x);
    return x;
  }

  async update(finder, x) {
    const item = this.items.find(finder);

    if (!item) {
      throw new Error("Item not found.");
    }

    Object.assign(item, x);
    return item;
  }

  async find(finder) {
    return this.items.find(finder);
  }

  async findAll(finder = () => true) {
    return this.items.filter(finder);
  }

  async delete(finder) {
    const index = this.items.findIndex(finder);
    if (index === -1) {
      throw new Error("Item not found.");
    }

    this.items.splice(index, 1);
    return true;
  }
}
