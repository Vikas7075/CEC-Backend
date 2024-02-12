import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({

    position: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    start_date: {
        type: String,
        required: true
    },
    end_date: {
        type: String
    },
    desc: {
        type: String
    }
}, { timestamps: true });

const Experience = mongoose.model('Experience', experienceSchema);

export default Experience;
