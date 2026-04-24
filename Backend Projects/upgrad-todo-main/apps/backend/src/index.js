import express from "express";
import cors from "cors";
import path from "node:path";
import { connect } from "./modules/db/index.js";
import { uiRouter } from "./modules/ui/ui.router.js";
import { todosRouter } from "./modules/todo/todo.router.js";
import dotenv from "dotenv";

async function main() {
  dotenv.config();

  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(express.static(path.resolve("./src/public")));
  app.set("view engine", "ejs");
  app.set("views", path.resolve("./src/views"));

  await connect(process.env.DB_URI);

  app.use("/todos", todosRouter);
  app.use("/ui", uiRouter);

  // Redirect root to /ui
  app.get("/", (req, res) => {
    res.redirect("/ui");
  });

  app.use((req, res, next) => {
    return res.status(404).json({
      status: "error",
      message: "API not found",
    });
  });

  app.use((err, req, res, next) => {
    const message = err?.message || "Something went wrong";
    const status = err?.status || 500;
    const { error, data } = err;
    console.log(err);

    const responseObject = {
      status: "error",
      message,
    };

    if (error) {
      responseObject.error = error;
    }

    if (data) {
      responseObject.data = data;
    }

    return res.status(status).json(responseObject);
  });

  const PORT = process.env.PORT || 3500;

  app.listen(PORT, () => {
    console.log(`Started backend server on port ${PORT}`);
  });
}

main();
