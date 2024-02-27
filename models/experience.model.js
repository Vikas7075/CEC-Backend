import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    position: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date
    },
    desc: {
        type: String
    }
}, { timestamps: true });

const Experience = mongoose.model('Experience', experienceSchema);

export default Experience;
