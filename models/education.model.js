import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    institution: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date
    }
}, { timestamps: true });

const Education = mongoose.model('Education', educationSchema);

export default Education;
