import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middleware/error-handler";

import { createCourseRouter } from "./routes/createCourse";
import { showCourseRouter } from "./routes/showCourse";
import { updateCourseRouter } from "./routes/updateCourse";
import { deleteCourseRouter } from "./routes/deleteCourse";

const app = express();
app.use(json());

app.use(createCourseRouter);
app.use(showCourseRouter);
app.use(updateCourseRouter);
app.use(deleteCourseRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
