const express = require("express");
const zod = require("zod");
const router = express.Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("./config");
const { User } = require("../db");

const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()    
});

router.post("/signup", async function (req, res) {
    const body = signupSchema.safeParse(req.body);

    if (!body.success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs !"
        });
    }

    const existingUser = await User.findOne({
        username: req.body.username
    });
    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs !"
        });
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });
    const userId = user._id;

    const token = jwt.sign({ userId }, JWT_SECRET);

    return res.status(200).json({
        message: "User created sucsessfully",
        token: token
    });
});

const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string()
});

router.post("/signin", async function (req, res) {
    const body = signinSchema.safeParse(req.body);

    if (!body.success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect Inputs !"
        });
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });
    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

        res.json({
            token: token
        });

        return ;
    }

    res.status(411).json({
        message: "Error while logging in !"
    });
});

module.exports = router;