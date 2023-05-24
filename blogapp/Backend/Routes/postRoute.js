import express from "express";
const router = express.Router();
import { authGuard, isAdmin } from "../middleware/authGuard.js";
import {
  CreatePostController,
  UpdatePostController,
} from "../Controllers/postController.js";

router.post("/", authGuard, isAdmin, CreatePostController);
router.put("/:slug", authGuard, UpdatePostController);

export default router;
