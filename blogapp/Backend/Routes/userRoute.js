import express from "express";
import {
  loginController,
  registerController,
  updateProfileController,
  updateProfilePicture,
  userProfileController,
} from "../Controllers/userController.js";
import { authGuard } from "../middleware/authGuard.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/profile", authGuard, userProfileController);
router.put("/updateProfile", authGuard, updateProfileController);
router.put("/uploadProfilePicture", authGuard, updateProfilePicture);

export default router;
