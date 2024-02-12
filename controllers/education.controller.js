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
        const eduactionObj = { user, institution, degree, start_date, end_date };
        const educations = await Education.create(eduactionObj);
        const updatedUser = await User.findOneAndUpdate(
            { _id: users.userId },
            { $push: { education: educations._id } },
            { new: true }
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