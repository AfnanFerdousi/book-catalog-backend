"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = __importDefault(require("./book.controller"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const book_validation_1 = require("./book.validation");
const router = express_1.default.Router();
router.get("/:id", book_controller_1.default.getSingleBook);
router.patch("/:id", (0, validateRequest_1.default)(book_validation_1.updateBookZodValidationSchema), book_controller_1.default.updateBook);
router.delete("/:id", book_controller_1.default.deleteBook);
router.post("/addReview/:id", (0, validateRequest_1.default)(book_validation_1.addReviewZodValidationSchema), book_controller_1.default.postReview);
router.get("/", book_controller_1.default.getAllBooks);
router.post("/add-book", (0, validateRequest_1.default)(book_validation_1.createBookZodValidationSchema), book_controller_1.default.postBook);
exports.default = router;
