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

it("Returns 404 when trying to delete a course which does not exists", async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  await request(app).put(`/api/course/${id}`).send().expect(404);
});

it("Successfully deletes the course", async () => {
  const response = await createCourse();

  let courses = await Course.find({});
  expect(courses.length).toEqual(1);

  await request(app)
    .delete(`/api/course/${response.body.id}`)
    .send()
    .expect(200);

  courses = await Course.find({});
  expect(courses.length).toEqual(0);
});
