import { Course } from "./../course";

it("implements optimistic concurrency control", async (done) => {
  const course = Course.build({
    title: "Some title",
    author: "Some Author",
    category: "Some category",
  });

  await course.save();

  const firstInstance = await Course.findById(course.id);
  const secondInstance = await Course.findById(course.id);

  firstInstance?.set({ category: "New category" });
  secondInstance?.set({ category: "Another cateory" });

  await firstInstance?.save();

  try {
    await secondInstance?.save();
  } catch (e) {
    return done();
  }

  throw new Error("Throw an error");
});

it("increments the version number on multiple saves", async () => {
  const course = Course.build({
    title: "Some title",
    author: "Some Author",
    category: "Some category",
  });

  await course.save();
  expect(course.version).toEqual(0);

  await course.save();
  expect(course.version).toEqual(1);

  await course.save();
  expect(course.version).toEqual(2);
});
