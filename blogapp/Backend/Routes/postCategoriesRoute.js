import express from "express";
const router = express.Router();
import {
    createPostCategory,
    getAllPostCategories,
    updatePostCategories,
    deletePostCategories
} from "../Controllers/postCategoriesController.js";
import { isAdmin, authGuard } from "../middleware/authGuard.js";

router
    .route("/")
    .post(authGuard, isAdmin, createPostCategory)
    .get(getAllPostCategories);

router
    .route("/:postCategoryId")
    .put(authGuard, isAdmin, updatePostCategories)
    .delete(authGuard, isAdmin, deletePostCategories);

export default router;
