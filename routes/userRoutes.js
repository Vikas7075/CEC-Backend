import express from "express"
import { createUser, deleteUser, getUserById, getUsers, login, logout, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/", createUser);
router.get("/", verifyToken, getUsers);
router.post("/login", login);
router.post("/logout", verifyToken, logout);
router.get("/:userId", getUserById);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);

export default router;
