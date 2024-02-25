import { User } from "../models/User.js";
import bcrypt from 'bcrypt'
import { setCookie } from "../utils/features.js";

// creating users
export const createUser = async (req, res) => {
    try { //username, email, password, skills, country, city, bio, College, degree, startDate, endDate, employee, designation, achievements
        const { username, email, password, headline, bio, userType, skills, country, city, college, degree, startDate, endDate, currentEmployee, designation, achievments } = req.body;

        const exitingUser = await User.findOne({ email });

        if (exitingUser) {
            return res.status(400).json({
                success: false,
                message: "User already Exits!"
            });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        // create a new user 
        const user = await User.create({ username, profilePicture: req.body.profilePicture, email, password: hashPassword, headline, bio, userType, skills, country, city, college, degree, startDate, endDate, currentEmployee, designation, achievments })
        setCookie(user, res, "Registered Successfully", 201);
    } catch (error) {
        console.error("Error during registration : ", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

// login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User Not Found...!',
            });
        }
        const isMatch = await bcrypt.compare(password.trim(), user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid Or password..',
            });
        }
        setCookie(user, res, `Welcome back ${user.username}`, 200);
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error.',
        });
    }

}

//logout 
export const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({
            success: true,
            message: 'Logout successful.',
        });
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error.',
        });

    }

}



export const myprofile = async (req, res) => {
    const user = req.user;
    // console.log(user)
    try {
        const fullUserDetails = await User.findById(user.userId);

        if (!fullUserDetails) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({
            success: true,
            user: fullUserDetails
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


export const getUserById = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const updateUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
            new: true,
        });
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

