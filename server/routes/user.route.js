const express = require('express');
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const multer = require('multer')
const UserModel = require('../models/user.model');
const cloudinary = require('../utils/cloudinary');

// middleware 
const { authenticateToken } = require('../middlewares/authware');
const { imageUpload, singleUpload } = require('../middlewares/useMulter');
const { getDataUri } = require('../utils/dataURI');

// get single account data 
router.post('/api/get-account-data', authenticateToken, async (req, res) => {
    const { email } = req.body
    if (email) {
        try {
            const user = await UserModel.findOne({ email: email });
            res.json({ user: user });
        } catch (error) {
            res.json("user not found")
            console.log(error)
        }
    } else {
        res.status(403).json("Unauthorized request for getting user!");
    }
})

// update account data 
router.patch('/api/update-account/:id', authenticateToken, imageUpload.single('image'), async (req, res) => {
    const { id } = req.params;
    const { name, email, occupation, company } = req.body;
    let profile = (req.file) ? req.file.filename : null;
    if (profile !== null) {
        await UserModel.findByIdAndUpdate(id, { profileImg: profile })
    }
    try {
        await UserModel.findByIdAndUpdate(id, { name, email, occupation, company })
        res.json("Account setting updated!");
    } catch (err) {
        console.log(err)
        res.send({ status: 'error', error: 'Dublicate email' })
    }
})

// uploading header video 
router.patch('/api/upload-video/:id', singleUpload, async (req, res) => {
    const { id } = req.params;
    const file = req.file;
    try {
        if (!file) {
            throw new Error('No file uploaded');
        }
        const fileUri = getDataUri(file);
        const videoResult = await cloudinary.uploader.upload(fileUri.content, {
            folder: 'store_headers'
        });

        await UserModel.findByIdAndUpdate(id, {
            store_header: {
                public_id: videoResult.public_id,
                url: videoResult.secure_url
            }
        });

        res.status(200).json("Video uploaded successfully!");
    } catch (error) {
        console.error(error);
        res.status(500).json("Error uploading video: " + error.message);
    }
});

module.exports = router;
