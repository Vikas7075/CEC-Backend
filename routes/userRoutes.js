import express from "express"
import multer from "multer";
import { createUser, deleteUser, getUserById, myprofile, login, logout, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from "../middleware/auth.middleware.js";
import uploadToCloudinary from "../utils/cloudinaryUpload.js";
const router = express.Router();

const storage = multer.memoryStorage()
const upload = multer({ storage: storage });

router.post("/", upload.single('profilePicture'), uploadToCloudinary, createUser);
router.get("/", verifyToken, myprofile);
router.post("/login", login);
router.post("/logout", verifyToken, logout);
router.get("/:userId", verifyToken, getUserById);
router.put("/:userId", verifyToken, updateUser);
router.delete("/:userId", verifyToken, deleteUser);

export default router;
