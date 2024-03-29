import express from "express"
import multer from "multer";
import { createUser, deleteUser, getUserById, myprofile, login, logout, updateUser, getAllUsers } from '../controllers/user.controller.js';
import { verifyToken } from "../middleware/auth.middleware.js";
import uploadToCloudinary from "../utils/cloudinaryUpload.js";
import { isAdmin } from "../middleware/isAdmin.js";
const router = express.Router();

const storage = multer.memoryStorage()
const upload = multer({ storage: storage });

router.post("/", upload.single('profilePicture'), uploadToCloudinary, createUser);
router.post("/login", login);
router.post("/logout", verifyToken, logout);

router.get("/", verifyToken, myprofile);
router.get("/:userId", verifyToken, getUserById);
router.get("/all/users", verifyToken, getAllUsers);

router.put("/:userId", verifyToken, updateUser);
router.delete("/:userId", verifyToken, deleteUser);

export default router;
