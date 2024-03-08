import { User } from "../models/User.js";

export const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.user.userId);
    if (user && user.role === 'admin') {
        return next();
    } else {
        return res.status(403).json({ message: "Unauthorized access" });
    }
}