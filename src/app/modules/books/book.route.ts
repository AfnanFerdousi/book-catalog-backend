import express from "express";
import bookController from "./book.controller";

const router = express.Router();

router.get("/:id", bookController.getSingleBook)
router.patch("/:id", bookController.updateBook)
router.delete("/:id", bookController.deleteBook)
router.get("/", bookController.getAllBooks)
router.post("/add-book", bookController.postBook)

export default router;