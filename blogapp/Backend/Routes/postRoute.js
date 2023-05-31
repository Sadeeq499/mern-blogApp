import express from "express";
const router = express.Router();
import { authGuard, isAdmin } from "../middleware/authGuard.js";
import {
  CreatePostController,
  DeletePostController,
  UpdatePostController,
  getAllPosts,
  getPostController,
} from "../Controllers/postController.js";

router
  .route("/")
  .post(authGuard, isAdmin, CreatePostController)
  .get(getAllPosts);
// router.put("/:slug", authGuard, UpdatePostController);
router
  .route("/:slug")
  .put(authGuard, UpdatePostController)
  .delete(authGuard, isAdmin, DeletePostController)
  .get(getPostController);

export default router;
