import { v2 as cloudinary } from 'cloudinary';
import { config } from "dotenv";
import multer from 'multer';

config();

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
    secure: true
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

export default { cloudinary, upload };