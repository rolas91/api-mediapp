import multer from 'multer';
import {v2 as cloudinary} from 'cloudinary'
import {CloudinaryStorage} from 'multer-storage-cloudinary'
import uui from '../utils/uui.js';
import { fileURLToPath } from 'url';
import path, { dirname } from "path"

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure:true
});

var storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder: 'some-folder-name',
        format: async(req, file) => 'png',// supports promises as well
        public_id: (req, file) => 'computed-filename-using-request',
    },
});

export const upload = multer({ storage: storage })

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const storage = multer.diskStorage({
//     destination:(req, file, cb) => {
//         cb(null, path.join(__dirname,'../../public/uploads/avatars/'))
//     },
//     filename: (req, file, cb) => {
//         const fileName = file.originalname.toLowerCase().split(' ').join('-');
//         cb(null, uui() + '-' + fileName)
//     }
// })

// export const upload = multer({
//     storage: multer.diskStorage({}),
//     fileFilter: (req, file, cb) => {
//         let ext = path.extname(file.originalname);

//         if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
//             cb(new Error("Unsupported file type!"), false);
//             return;
//         } else {
//             cb(null, true);
//         }
//     }
// });