import express from "express";
import { getAllUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/api/users", getAllUser);

export default router;
