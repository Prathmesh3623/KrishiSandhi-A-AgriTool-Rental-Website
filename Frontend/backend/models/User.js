const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    role: { type: String, enum: ['farmer', 'owner'], required: true },
    fullName: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    email: { type: String },
    password: { type: String, required: true },

    // Address Details
    address: {
        village: String,
        taluka: String,
        district: String,
        state: String,
        pincode: String
    },

    // Farmer specific
    landSize: Number,

    // Tool Owner specific
    shopName: String,
    tools: [{
        toolName: String,
        toolCategory: String,
        toolDescription: String,
        specifications: String,
        rentalPrice: Number,
        availableFrom: Date,
        availableTo: Date
    }],

    // OTP verification
    otp: {
        code: String,
        expiresAt: Date
    },
    isVerified: { type: Boolean, default: false },
    profilePicture: { type: String, default: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' },

    // Rental Tracking
    currentRentals: [{
        toolName: String,
        ownerName: String,
        startDate: Date,
        endDate: Date,
        totalPrice: Number,
        status: { type: String, default: 'Active' }
    }],
    rentalHistory: [{
        toolName: String,
        ownerName: String,
        startDate: Date,
        endDate: Date,
        totalPrice: Number,
        status: { type: String, default: 'Completed' }
    }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
