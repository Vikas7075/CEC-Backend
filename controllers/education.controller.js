import { User } from "../models/User.js";
import Education from "../models/education.model.js";

export const create = async (req, res) => {
    const users = req.user;
    const { user, institution, degree, start_date, end_date } = req.body;

    if (!institution || !degree || !start_date) {
        return res.status(404).json({
            success: false,
            message: "Fill required details",
        });
    }
    try {
        const eduactionObj = { user: users.userId, institution, degree, start_date, end_date };
        const educations = await Education.create(eduactionObj);
        const updatedUser = await User.findOneAndUpdate(
            { _id: users.userId },
            { $push: { education: educations._id } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        // console.log(updatedUser);

        return res.status(200).json({
            success: true,
            educations
        });
    } catch (error) {
        console.log("Error creating education", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

// Get education records of a user
export const getEducation = async (req, res) => {
    const { userId } = req.params;
    try {
        const educationRecords = await Education.find({ user: userId });

        if (!educationRecords) {
            return res.status(404).json({
                success: false,
                message: "Education records not found for the user"
            });
        }

        return res.status(200).json({
            success: true,
            education: educationRecords,
        });
    } catch (error) {
        console.error("Error fetching education", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// Update education record
export const updateEducation = async (req, res) => {
    const user = req.user;
    const { educationId } = req.params;
    const { institution, degree, start_date, end_date } = req.body;

    if (!institution || !degree || !start_date) {
        return res.status(400).json({
            success: false,
            message: "Please provide all required details",
        });
    }

    try {
        const updatedEducation = await Education.findOneAndUpdate(
            { _id: educationId, user: user.userId },
            { institution, degree, start_date, end_date },
            { new: true }
        );

        if (!updatedEducation) {
            return res.status(404).json({
                success: false,
                message: "Education record not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Education record updated successfully",
            education: updatedEducation,
        });
    } catch (error) {
        console.error("Error updating education", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
// Delete education record
export const deleteEducation = async (req, res) => {
    const user = req.user;
    const { educationId } = req.params;

    try {
        const deletedEducation = await Education.findOneAndDelete({ _id: educationId, user: user.userId });

        if (!deletedEducation) {
            return res.status(404).json({
                success: false,
                message: "Education record not found",
            });
        }

        // remove education ID from user's education array
        const updatedUser = await User.findByIdAndUpdate(
            user.userId,
            { $pull: { education: educationId } },
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
            message: "Education record deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting education", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};