import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../middleware/validate-request";
import { Course } from "../models/course";

const router = express.Router();

router.post(
  "/api/course",
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("author").not().isEmpty().withMessage("Author is required"),
    body("category").not().isEmpty().withMessage("Category is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, author, category } = req.body;

    const course = Course.build({
      title,
      author,
      category,
    });

    await course.save();

    res.status(201).send(course);
  }
);

export { router as createCourseRouter };
