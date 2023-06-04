import express from "express";
const router = express.Router();
import { authGuard } from "../middleware/authGuard.js";
import {
  CreateComment,
  DeleteComment,
  UpdateComment,
} from "../Controllers/commentsController.js";

router.post("/", authGuard, CreateComment);
router
  .route("/:commentId")
  .put(authGuard, UpdateComment)
  .delete(authGuard, DeleteComment);

export default router;
