import db from "../database/index.js";

export function getAllPostsHandler(req, res) {
  const userId = req.user.userId;
  db.all("SELECT * FROM posts WHERE authorId = ?", [userId], (err, rows) => {
    if (err) return res.status(500).send({ message: "DB error" });
    res.send(rows);
  });
}

export function createPostHandler(req, res) {
  const userId = req.user.userId;
  const { title, subject, content, published } = req.body;
  if (!title) return res.status(400).send({ message: "Title required" });
  db.run(
    "INSERT INTO posts (title, subject, content, authorId, published) VALUES (?, ?, ?, ?, ?)",
    [title, subject, content, userId, published ? 1 : 0],
    function (err) {
      if (err) return res.status(500).send({ message: "DB error" });
      res.send({
        id: this.lastID,
        title,
        subject,
        content,
        authorId: userId,
        published,
      });
    },
  );
}

export function getPostByIdHandler(req, res) {
  const userId = req.user.userId;
  const id = req.params.id;
  db.get("SELECT * FROM posts WHERE id = ?", [id], (err, post) => {
    if (err) return res.status(500).send({ message: "DB error" });
    if (!post || (!post.published && post.authorId !== userId)) {
      return res.status(404).send({ message: "Post not found" });
    }
    res.send(post);
  });
}

export function updatePostHandler(req, res) {
  const userId = req.user.userId;
  const id = req.params.id;
  const { title, subject, content, published } = req.body;
  db.get("SELECT * FROM posts WHERE id = ?", [id], (err, postRow) => {
    if (err) return res.status(500).send({ message: "DB error" });
    if (!postRow || postRow.authorId !== userId) {
      return res.status(403).send({ message: "Not authorized" });
    }
    db.run(
      "UPDATE posts SET title = ?, subject = ?, content = ?, published = ? WHERE id = ?",
      [
        title || postRow.title,
        subject || postRow.subject,
        content || postRow.content,
        published !== undefined ? (published ? 1 : 0) : postRow.published,
        id,
      ],
      function (err) {
        if (err) return res.status(500).send({ message: "DB error" });
        res.send({ message: "Post updated" });
      },
    );
  });
}

export function deletePostHandler(req, res) {
  const userId = req.user.userId;
  const id = req.params.id;
  db.get("SELECT * FROM posts WHERE id = ?", [id], (err, postRow) => {
    if (err) return res.status(500).send({ message: "DB error" });
    if (!postRow || postRow.authorId !== userId) {
      return res.status(403).send({ message: "Not authorized" });
    }
    db.run("DELETE FROM posts WHERE id = ?", [id], function (err) {
      if (err) return res.status(500).send({ message: "DB error" });
      res.send({ message: "Post deleted" });
    });
  });
}

export function getPublishedPostsHandler(req, res) {
  const userId = req.user.userId;
  db.all("SELECT * FROM posts WHERE published = 1 ", (err, rows) => {
    if (err) return res.status(500).send({ message: "DB error" });
    res.send(rows);
  });
} 