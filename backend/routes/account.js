const express = require("express");
const { authMiddleware } = require("../middleware");
const router = express.Router();
const { Account, Transaction } = require("../db");
const mongoose = require("mongoose");

router.get("/balance", authMiddleware, async function (req, res) {
    const account = await Account.findOne({
        userId: req.userId
    });

    res.status(200).json({
        balance: account.balance
    });
});

router.post("/transfer", authMiddleware, async function (req, res) {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: req.userId }).session(session);
    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient Balance !"
        });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);
    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid Account !"
        });
    }

    // Perform the Transaction
    await Account.updateOne({
        userId: req.userId
    }, {
        $inc: {
            balance: -amount
        }
    }).session(session);

    await Account.updateOne({
        userId: to
    }, {
        $inc: {
            balance: amount
        }
    }).session(session);

    // Commit the Transaction
    await session.commitTransaction();

    // Log the transaction
    const transaction = new Transaction({
        amount: -amount,
        date: new Date(),
        description: `Transfer to ${to}`,
        userId: req.userId,
    });
    await transaction.save();

    res.status(200).json({
        message: "Transaction Successfull"
    });
});

// Endpoint to fetch transaction history
router.get("/transactions", authMiddleware, async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.userId })
        .sort({ date: -1 });

        if (!transactions) {
            return res.status(404).json({ message: "No transaction found." })
        }

        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: "Error fetching transactions" });
    }
});

module.exports = router;