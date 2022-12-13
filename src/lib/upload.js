import multer from 'multer';
import uui from '../utils/uui.js';
import { fileURLToPath } from 'url';
import path, { dirname } from "path"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, path.join(__dirname,'../../public/uploads/avatars/'))
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uui() + '-' + fileName)
    }
})

export const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});