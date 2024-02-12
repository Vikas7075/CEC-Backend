import mongoose, { mongo } from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: [5, "Username must be at least 5 characters"],
        maxlength: [30, "Username cannot exceed 30 characters"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, "Provide a valid email"]
    },
    password: {
        type: String,
        required: true,

    },
    headline: {
        type: String,
        maxlength: 100
    },
    bio: {
        type: String,
        maxlength: 500
    },
    profilePicture: {
        type: String
    },
    experience: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Experience",
        }
    ],
    education: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Education",
        }
    ],
    skills: [{
        type: String,
        maxlength: 50 // Adjust max length based on your requirements
    }],
    connections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    connectionRequests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

export const User = mongoose.model("User", userSchema);
