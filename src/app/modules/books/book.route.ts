import express from "express";
import bookController from "./book.controller";
import validateRequest from "../../middlewares/validateRequest";
import {
    addReviewZodValidationSchema,
    updateBookZodValidationSchema,
    createBookZodValidationSchema,
} from "./book.validation";

const router = express.Router();

router.get("/:id", bookController.getSingleBook);
router.patch(
    "/:id",
    validateRequest(updateBookZodValidationSchema),
    bookController.updateBook
);
router.delete("/:id", bookController.deleteBook);
router.post(
    "/addReview/:id",
    validateRequest(addReviewZodValidationSchema),
    bookController.postReview
);
router.get("/", bookController.getAllBooks);
router.post(
    "/add-book",
    validateRequest(createBookZodValidationSchema),
    bookController.postBook
);

export default router;
