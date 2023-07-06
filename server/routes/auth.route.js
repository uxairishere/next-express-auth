const express = require('express');
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const multer = require('multer')
const UserModel = require('../models/user.model');

// middleware 
const { generateAccessToken, authenticateToken, generateRefreshToken } = require('../middlewares/authware');

let refreshTokens = [];

// new token 
router.post('/api/token', (req, res) => {
    const refreshToken = req.body.token;
  
    if (refreshToken == null) {
      return res.sendStatus(401);
    }
    if (!refreshTokens.includes(refreshToken)) {
      return res.sendStatus(403);
    }
  
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      const user_info = { name: user.name, email: user.email };
      const accessToken = generateAccessToken(user_info);
      const newRefreshToken = generateRefreshToken(user_info);
  
      refreshTokens.push(newRefreshToken);
      return res.json({ accessToken: accessToken, refreshToken: newRefreshToken });
    });
  });

// delete access token 
router.delete('/api/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204);
})

// register
router.post('/api/register', async (req, res) => {
  try {
    const { name, email, password, company, occupation } = req.body;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.create({
      name,
      email,
      password: hashedPassword,
      company,
      occupation
    });

    res.status(201).json({ status: 'User Created' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//login
router.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await UserModel.findOne({ email: email });
  
      if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);
  
        if (isPasswordValid) {
          const user_info = { name: user.name, email: user.email };
          const userdata = {
            name: user.name,
            email: user.email,
            profileImg: user.profileImg,
            role: user.role,
          };
  
          const accessToken = generateAccessToken(user_info);
          const refreshToken = jwt.sign(user_info, process.env.REFRESH_TOKEN_SECRET);
  
          refreshTokens.push(refreshToken);
  
          return res.json({ accessToken, refreshToken, user: userdata });
        } else {
          return res.json({ user: false, error: "Invalid password" });
        }
      } else {
        return res.json({ user: false, error: "User not found" });
      }
    } catch (e) {
      console.log(e);
      res.json({ status: 'error', user: false });
    }
  });
  


router.post("/api/users", authenticateToken, async (req, res) => {
    if (req.user) {
        const allusers = await UserModel.find();
        res.json({ allusers: allusers });
    } else {
        res.json("You are not allowed to perform action!");
    }
});

module.exports = router;