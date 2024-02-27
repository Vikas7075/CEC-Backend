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
            user: user.userId, position, company, start_date, end_date, desc
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
// get experiences records of users
export const getExperience = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log(userId)
        // Find experience records for the specified user ID
        const experienceRecords = await Experience.find({ user: userId });

        if (!experienceRecords || experienceRecords.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Experience records not found for the user"
            });
        }

        return res.status(200).json({
            success: true,
            experience: experienceRecords
        });
    } catch (error) {
        console.error("Error fetching experience:", error);
        return res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
};
// update experinace records 
export const updatedExperience = async (req, res) => {
    const user = req.user;
    const { experienceId } = req.params;
    const { position, company, start_date, end_date, desc } = req.body;

    if (!position || !company || !start_date) {
        return res.status(400).json({
            success: false,
            message: "Please provide all required details",
        });
    }

    try {
        const updatedExperience = await Experience.findOneAndUpdate(
            { _id: experienceId, user: user.userId },
            { position, company, desc, start_date, end_date },
            { new: true }
        );

        if (!updatedExperience) {
            return res.status(404).json({
                success: false,
                message: "Experiance record not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Experience record updated successfully",
            experience: updatedExperience,
        });
    } catch (error) {
        console.error("Error updating education", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
// Delete experinace record
export const deleteExperience = async (req, res) => {
    const user = req.user;
    const { experienceId } = req.params;

    try {
        const deletedExperience = await Experience.findOneAndDelete({ _id: experienceId, user: user.userId });

        if (!deletedExperience) {
            return res.status(404).json({
                success: false,
                message: "Experiance record not found",
            });
        }

        // Remove education ID from user's education array
        const updatedUser = await User.findByIdAndUpdate(
            user.userId,
            { $pull: { experience: experienceId } },
            { new: true }
        );

        if (!updatedUser) {
            console.error("User not found");
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Experience record deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting experience", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};