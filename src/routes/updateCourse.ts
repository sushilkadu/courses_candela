import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../middleware/validate-request";
import { Course } from "../models/course";
import { NotFoundError } from "../errors/not-found-error";

const router = express.Router();

router.put("/api/course/:id", async (req: Request, res: Response) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    throw new NotFoundError();
  }

  let { title, author, category } = req.body;

  title = title || course.title;
  author = author || course.author;
  category = category || course.category;

  course.set({
    title,
    author,
    category,
  });

  await course.save();

  res.send(course);
});

export { router as updateCourseRouter };
