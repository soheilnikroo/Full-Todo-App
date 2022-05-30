//third-party packages and libs
const multer = require('multer');

//configuring uploding file
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|png|jpeg)$/)){
            return cb(new Error('file format must be jpg, png or jpeg'));
        }

        cb(undefined, true)
    }
});

//exporting section
module.exports = upload;