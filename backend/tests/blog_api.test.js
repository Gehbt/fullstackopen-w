import { connection } from "mongoose";
import supertest from "supertest";
import app from "../app/index.js";
import Blog from "../blogs/model.js";

const api = supertest(app);
const blogList = [
  {
    title: "title1",
    author: "author1",
    url: "/home",
    likes: 12,
  },
  {
    title: "title2",
    author: "author2",
    url: "/index",
    likes: 13,
  },
];
beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = blogList.map((note) => new Blog(note));
  const promiseArray = blogObjects.map((note) => note.save());
  await Promise.all(promiseArray);
  console.log("cleared");
});
afterAll(async () => {
  await Blog.deleteMany({});
  connection.close();
});
test("keep", () => {
  expect(1 + 1).toBe(2);
});

test("blog are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("blog add one", async () => {
  const blogList = await api.get("/api/blogs");
  const blogListLen = blogList.body.length;
  const newBlog = {
    title: "title3",
    author: "author3",
    url: "/404",
    likes: 15,
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const blogList2 = await api.get("/api/blogs");
  const blogListLen2 = blogList2.body.length;

  expect(blogListLen2).toEqual(blogListLen + 1);
});

test("posted blog`s likes with default", async () => {
  const newBlog = {
    title: "title4",
    author: "author4",
    url: "/robot",
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogs = await api.get("/api/blogs");
  const thatBlog = blogs.body.find((blog) => blog.title === "title4");
  // console.log("thatBlog :>> ", thatBlog);
  expect(thatBlog?.likes).toBe(0);
});
test("posted blog without title and url", async () => {
  const newBlog = {
    author: "gail",
  };
  await api.post("/api/blogs").send(newBlog).expect(400);
});
test("delete successfully", async () => {
  await api.delete("/api/blogs/index").expect(204);
  await api.delete("/api/blogs/index").expect(404);
});
test("update successfully", async () => {
  await api.put("/api/blogs/index").send({ title: "title2+" }).expect(201);

  const blogs = await api.get("/api/blogs").expect(200);
  console.log("blogs :>> ", blogs.body);
  const hasUpdatedBlog = blogs.body.find((blog) => blog.title === "title2+");
  expect(!!hasUpdatedBlog).toBe(true);
});
/**
 * TODO: add test for new version
 *
 */
