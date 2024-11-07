
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: { type: String },  // Use 'String' instead of 'string'
        email: { type: String }, // Use 'String' instead of 'string'
        password: { type: String }, // Use 'String' instead of 'string'
        otp:{
            otp:{type: String},
            sendTime:{type: Number},
            token:{type: String},
        },

    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
