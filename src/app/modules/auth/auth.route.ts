import express from 'express';
import authController from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { loginZodValidationSchema, refreshZodValidationSchema } from './auth.validation';

const router = express.Router();

router.post("/signup", authController.createUser);
router.post("/login", validateRequest(loginZodValidationSchema), authController.loginUser);
router.post("/refresh", validateRequest(refreshZodValidationSchema),authController.refreshToken);
router.patch("/add-to-wish/:id", authController.addToWishList);
router.get("/wishlist/:id", authController.getWishList);
router.get("/user/:id", authController.getSingleUser);
router.patch("/remove-wish/:id", authController.removeWishList);

export default router;