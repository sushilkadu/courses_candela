import express, { Request, Response } from "express";
import { Course } from "../models/course";
import { NotFoundError } from "../errors/not-found-error";

const router = express.Router();

router.get("/api/course/", async (req: Request, res: Response) => {
  res.send(await Course.find({}));
});

router.get("/api/course/:id", async (req: Request, res: Response) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    throw new NotFoundError();
  }

  res.send(course);
});

export { router as showCourseRouter };
