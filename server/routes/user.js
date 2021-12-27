const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const saltRounds = parseInt(process.env.SALT_ROUNDS);

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: "Internal server error",
            });
        } else {
            try {
                const user = await User.create({
                    name,
                    email,
                    password: hash
                });
                const token = jwt.sign({
                    id: user._id
                }, process.env.JWT_SECRET, {
                    expiresIn: "1h"
                });
                return res.status(201).json({
                    token: token,
                });
            } catch (err) {
                return res.status(409).json({
                    error: "Email already exists"
                });
            }
        }
    });
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({
        email: email
    });
    if (!user) {
        return res.status(401).json({
            error: "User not found"
        });
    }
    bcrypt.compare(password, user.password, async (err, result) => {
        if (err) {
            return res.status(401).json({
                error: "Password incorrect"
            });
        }
        if (result) {
            const token = jwt.sign({
                id: user._id
            }, process.env.JWT_SECRET, {
                expiresIn: "1h"
            });
            return res.status(200).json({
                token: token,
            });
        }
        else {
            return res.status(401).json({
                error: "Password incorrect"
            });
        }
    });
});

router.post("/verifyToken",async (req, res) => {
    const { token } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (user) {
        return res.status(200).json({
            user: user
        });
    }
    else {
        return res.status(401).json({
            error: "User not found"
        });
    }
});

module.exports = router;