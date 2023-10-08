import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express();

const db = new PrismaClient();

app.use(express.json());
app.get("/get", async (req, rest) => {
  const { title, completed, sort, page } = req.query;
  const pageCount = parseInt(page) ?? 1;
  const pageSize = 3;
  const skip = (pageCount - 1) * pageSize;
  const query = {
    skip,
    take: pageSize,
    // orderBy: { title: sort },
    // where: {
    //   OR: [
    //     {
    //       title: { contains: title },
    //       completed: completed === "true" ? true : false,
    //     },
    //   ],
    // },
  };

  if (sort) {
    query.orderBy = {
      title: sort,
    };
  }

  if (title) {
    query.where = {
      OR: [{ title: { contains: title } }],
    };
  }
  if (completed) {
    query.where = {
      OR: [{ completed: completed === "true" ? true : false }],
    };
  }

  const tasks = await db.task.findMany(query);
  rest.status(200).json(tasks);
});

app.get("/get-task/:id", async (req, res) => {
  const id = req.params.id;
  const task = await db.task.findUnique({ where: { id } });
  res.status(200).json(task);
});

app.post("/create", async (req, res) => {
  const { title, description } = req.body;
  const task = await db.task.create({ data: { title, description } });
  res.status(201).json(task);
});

app.listen(3000, () => {
  console.log("App running on port 3000");
});
