const mongoose = require('mongoose');
const { Schema } = mongoose;
const getNextSequenceValue = require("../middleware/counter");

const UserSchema = new Schema({
    id: {
        type: Number,
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    photo: {
        type: String,
    },
}, {
    timestamps: true
});


UserSchema.pre("save", async function (next) {
    if (this.id == null) {
        const seq = await getNextSequenceValue("User");
        this.id = seq;
    }
    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;