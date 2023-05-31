const multer = require('multer')

// config multer 
const imageStorage = multer.diskStorage({
    // Destination to store image     
    destination: './public/images',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now()
            + file.originalname)
    }
});

const imageUpload = multer({
    storage: imageStorage,
    limits: {
        fileSize: 10000000 // 10000000 Bytes = 10 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            return cb(new Error('Please upload a Image'))
        }
        cb(undefined, true)
    }
});

module.exports = { imageUpload }