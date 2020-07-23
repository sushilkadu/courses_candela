import request from "supertest";
import { app } from "../../app";
import { Course } from "../../models/course";
import mongoose from "mongoose";

const course = {
  title: "Some title",
  author: "Some author",
  category: "Some category",
};

const createCourse = async () => {
  return await request(app).post("/api/course/").send(course).expect(201);
};

it("Returns 404 if provided course id does not exists", async () => {
  const id = mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/course/${id}`)
    .send({
      title: "Updated title",
    })
    .expect(404);
});

it("updates the course provided with valid data", async () => {
  const courseResponse = await createCourse();

  const updatedTitle = "Updated title";
  const updatedAuthor = "Updated author";
  const updatedCategory = "Updated category";
  const updatedResponse = await request(app)
    .put(`/api/course/${courseResponse.body.id}`)
    .send({
      title: updatedTitle,
      author: updatedAuthor,
      category: updatedCategory,
    })
    .expect(200);

  expect(updatedResponse.body.title).toEqual(updatedTitle);
  expect(updatedResponse.body.author).toEqual(updatedAuthor);
  expect(updatedResponse.body.category).toEqual(updatedCategory);
});

it("updates the title of the course", async () => {
  const courseResponse = await createCourse();

  const updatedTitle = "Updated title";

  const updatedResponse = await request(app)
    .put(`/api/course/${courseResponse.body.id}`)
    .send({
      title: updatedTitle,
    })
    .expect(200);

  expect(updatedResponse.body.title).toEqual(updatedTitle);
});
