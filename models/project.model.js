import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: false
    },
    links: {
        type: String
    }
})
export const Project = mongoose.model("Project", projectSchema);