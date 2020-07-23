import request from "supertest";
import { app } from "../../app";
import { Course } from "../../models/course";
import mongoose from "mongoose";

const course = {
  title: "Some title",
  author: "Some author",
  category: "Some category",
};

it("return 404 when course is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app).get(`/api/course/${id}`).send().expect(404);
});

it("returns the course if course is found", async () => {
  // store a course
  const response = await createCourse();
  const receivedCourse = await request(app)
    .get(`/api/course/${response.body.id}`)
    .send()
    .expect(200);

  expect(receivedCourse.body.title).toEqual(course.title);
  expect(receivedCourse.body.author).toEqual(course.author);
  expect(receivedCourse.body.category).toEqual(course.category);
});

it("return empty array when no courses are available", async () => {
  const response = await request(app).get("/api/course/").send().expect(200);

  expect(response.body.length).toEqual(0);
});

it("it should return array of courses", async () => {
  await createCourse();
  await createCourse();
  await createCourse();
  await createCourse();

  const response = await request(app).get("/api/course/").send().expect(200);
  expect(response.body.length).toEqual(4);
});

const createCourse = async () => {
  return await request(app).post("/api/course/").send(course).expect(201);
};
