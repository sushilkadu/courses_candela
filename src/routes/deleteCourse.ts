import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../middleware/validate-request";
import { Course } from "../models/course";
import { NotFoundError } from "../errors/not-found-error";

const router = express.Router();

router.delete("/api/course/:id", async (req: Request, res: Response) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    throw new NotFoundError();
  }

  await course.deleteOne();

  res.send(course);
});

export { router as deleteCourseRouter };
