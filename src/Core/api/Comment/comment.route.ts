import { Router } from "express";
import { CommentController } from "./comment.controller";
import { useAuth } from "../../middlewares/auth.middleware";

export const commentRoutes = Router();
const controller = CommentController();

commentRoutes.post("/create/:id", useAuth, controller.addComment);
commentRoutes.delete("/delete/:id", useAuth, controller.deleteComment);