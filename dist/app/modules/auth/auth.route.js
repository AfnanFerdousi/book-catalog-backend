"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("./auth.controller"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const router = express_1.default.Router();
router.post("/signup", auth_controller_1.default.createUser);
router.post("/login", (0, validateRequest_1.default)(auth_validation_1.loginZodValidationSchema), auth_controller_1.default.loginUser);
router.post("/refresh", (0, validateRequest_1.default)(auth_validation_1.refreshZodValidationSchema), auth_controller_1.default.refreshToken);
router.patch("/add-to-wish/:id", auth_controller_1.default.addToWishList);
router.get("/wishlist/:id", auth_controller_1.default.getWishList);
router.get("/user/:id", auth_controller_1.default.getSingleUser);
router.patch("/remove-wish/:id", auth_controller_1.default.removeWishList);
exports.default = router;
