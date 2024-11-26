const express = require("express");
const zod = require("zod");
const router = express.Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("./config");
const { User, Account } = require("../db");
const { authMiddleware } = require("../middleware");

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

    // Creating a New Account
    await Account.create({
        userId: userId,
        balance: 1 + Math.random() * 10000
    });

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

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
});

router.put("/", authMiddleware, async function (req, res) {
    const body = updateBody.safeParse(req.body);
    if (!body.success) {
        return res.status(411).json({
            message: "Error while updating Information !"
        });
    }

    await User.updateOne({
        _id:req.userId
    }, req.body);

    return res.json({
        message: "Updated Successfully"
    });
});

router.get("/bulk", async function (req, res) {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter                
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    });

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    });
});

// Add this route to get the current authenticated user's data
router.get("/getCurrentUser", authMiddleware, async function (req, res) {
    try {
        // Fetch the user data using the userId from the token
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Return the current user's data
        res.status(200).json({
            currentUser: {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }
        });
    } catch (error) {
        console.error("Error fetching current user:", error.message);
        res.status(500).json({
            message: "Server error while fetching user data"
        });
    }
});


module.exports = router;