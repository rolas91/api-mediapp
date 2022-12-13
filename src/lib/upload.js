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
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);

        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
            cb(new Error("Unsupported file type!"), false);
            return;
        } else {
            cb(null, true);
        }
    }
});