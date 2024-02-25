import { v2 as cloudinary } from 'cloudinary';
import { writeFile } from 'fs/promises';
import fs from 'fs';
import path from 'path';

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'dyulwgfs1',
    api_key: '925568674871672',
    api_secret: 'Mn4Dc3cLi6jtQdPJ8KrjsEaTafs'
});



const uploadToCloudinary = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided' });
        }

        // Write buffer data to a temporary file
        const tempFilePath = path.join(process.cwd(), 'uploads', `${Date.now()}-${req.file.originalname}`);
        await writeFile(tempFilePath, req.file.buffer);


        // Upload temporary file to Cloudinary
        const result = await cloudinary.uploader.upload(tempFilePath, {
            folder: 'uploads',
            resource_type: 'auto' // Automatically detect the file type
        });

        // Delete temporary file
        fs.unlinkSync(tempFilePath);

        // Add Cloudinary image URL to req.body
        req.body.image = result.secure_url;
        req.body.profilePicture = result.secure_url;


        next();
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export default uploadToCloudinary;
