import express from "express";
import { authMiddleware } from "../auth_middleware.js";
import {
  getAllPostsHandler,
  createPostHandler,
  getPostByIdHandler,
  updatePostHandler,
  deletePostHandler,
  getPublishedPostsHandler
} from "./postHandlers.js";

const post = express.Router();

// Create posts table if not exists
// id, title, subject, content, authorId, published

post.use(authMiddleware);

post.get("/", getAllPostsHandler);
post.get("/published", getPublishedPostsHandler);
post.post("/", createPostHandler);
post.get("/:id", getPostByIdHandler);
post.patch("/:id", updatePostHandler);
post.delete("/:id", deletePostHandler);

export default post;
