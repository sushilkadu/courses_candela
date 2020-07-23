import request from "supertest";
import { app } from "../../app";
import { Course } from "../../models/course";

it("has a route handler listening /api/course for post request", async () => {
  const response = await request(app).post("/api/course").send({});
  expect(response.status).not.toEqual(404);
});

it("returns a bad request if no data is sent", async () => {
  const response = await request(app).post("/api/course").send({});
  expect(response.status).toEqual(400);
});

it("returns a bad request if author or title or category is missing", async () => {
  let response = await request(app).post("/api/course").send({
    author: "Some Author",
    category: "Category #1",
  });
  expect(response.status).toEqual(400);

  response = await request(app).post("/api/course").send({
    title: "Some Title",
    category: "Category #1",
  });
  expect(response.status).toEqual(400);

  response = await request(app).post("/api/course").send({
    author: "Some Author",
    title: "Some title",
  });
  expect(response.status).toEqual(400);
});

it("creates a course when valid data is provided", async () => {
  let courses = await Course.find({});
  expect(courses.length).toEqual(0);

  const title = "Some title";
  const author = "Some author";

  await request(app)
    .post("/api/course")
    .send({
      title,
      author,
      category: "Some category",
    })
    .expect(201);

  courses = await Course.find({});
  expect(courses.length).toEqual(1);
  expect(courses[0].title).toEqual(title);
  expect(courses[0].author).toEqual(author);
});
