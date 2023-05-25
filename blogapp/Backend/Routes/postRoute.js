import express from "express";
const router = express.Router();
import { authGuard, isAdmin } from "../middleware/authGuard.js";
import {
  CreatePostController,
  DeletePostController,
  UpdatePostController,
} from "../Controllers/postController.js";

router.post("/", authGuard, isAdmin, CreatePostController);
// router.put("/:slug", authGuard, UpdatePostController);
router
  .route("/:slug")
  .put(authGuard, UpdatePostController)
  .delete(authGuard, isAdmin, DeletePostController);

export default router;
