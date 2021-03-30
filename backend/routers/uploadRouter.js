import multer from 'multer';
import express from 'express';
import { isAuth } from '../utils.js';

const uploadRouter = express.Router();

//define storage
// diskStorage = use a folder in this project to store the images
// we can also upload to cloud server to store the images.
const storage = multer.diskStorage({
    //function accept request, file, callback
    destination(req, file, cb) {
        cb(null, 'uploads/');   //first parameter is null => no error
        //second parameter is 'uploads/' the folder that we save the file
        //'uploads/' is inside MTStore
    },
    // set name for the file
    filename(req, file, cb) {
        // null - no error
        // second parameter is name of the file by using the time where the file upload
        cb(null, `${Date.now()}.jpg`);
    },
});

//upload middleware is used inside router
const upload = multer({ storage });

//create a route 
// '/' == '/api/upload'
// when there is a file in this request, it's going to be uploaded automatically in 'uploads/' folder
// with the name of Date.now().jpg
uploadRouter.post('/', isAuth, upload.single('image'), (req, res) => {
    //send back the filename
    res.send(`/${req.file.path}`);
});

export default uploadRouter;