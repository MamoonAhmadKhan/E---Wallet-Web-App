const mongoose =  require("mongoose");

mongoose.connect("mongodburl");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 5,
        maxLength: 30
    },

    password: {
        type: String,
        required: true,
        minLength: 6
    },

    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },

    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const transactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account', // Assuming you have an Account model
        required: true
    },
});

const Transaction = mongoose.model('Transaction', transactionSchema);
const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = {
    User,
    Account,
    Transaction
};
