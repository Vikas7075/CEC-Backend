import { User } from "../models/User.js";
import Experience from "../models/experience.model.js";

// create experiences
export const create = async (req, res) => {
    const user = req.user;
    const { position, company, start_date, end_date, desc } = req.body;
    if (!position || !company || !start_date) {
        return res.status(400).json({
            success: false,
            message: "Fill Required Details"
        });
    }

    try {
        const experienceObj = {
            position, company, start_date, end_date, desc
        };

        const experience = await Experience.create(experienceObj);
        //user.experience.push(experience._id);
        const updatedUser = await User.findOneAndUpdate(
            { _id: user.userId },
            { $push: { experience: experience._id } },
            { new: true } // Return the updated document
        );
        if (!updatedUser) {
            console.error("User not found");
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        // console.log(updatedUser);

        return res.status(200).json({
            success: true,
            experience
        });
    } catch (error) {
        console.error("Error creating experience:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
