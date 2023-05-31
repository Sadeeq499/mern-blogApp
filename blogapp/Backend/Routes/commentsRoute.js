import express from "express";
const router = express.Router();
import { authGuard } from "../middleware/authGuard.js";
import { CreateComment } from "../Controllers/commentsController.js";

router.post("/", authGuard, CreateComment);

export default router;
