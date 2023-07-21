import express from "express";
import bookController from "./book.controller";

const router = express.Router();

router.get("/", bookController.getAllBooks)

export default router;