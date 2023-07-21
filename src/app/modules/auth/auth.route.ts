import express from 'express';
import authController from './auth.controller';

const router = express.Router();

router.post("/signup", authController.createUser);
router.post("/login", authController.loginUser);
router.post("/refresh", authController.refreshToken);
router.patch("/add-to-wish/:id", authController.addToWishList);
router.get("/wishlist/:id", authController.getWishList);

export default router;