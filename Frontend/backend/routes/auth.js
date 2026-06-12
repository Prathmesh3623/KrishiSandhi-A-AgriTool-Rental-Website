const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const User = require('../models/User');

// Configure Twilio (Safely)
let twilioClient;
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_ACCOUNT_SID.startsWith('AC')) {
    twilioClient = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
} else {
    console.warn('⚠️ Twilio Credentials missing or invalid. SMS OTP will be MOCKED.');
}

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// @route POST /api/auth/register
// @desc Register user & Send OTP
router.post('/register', async (req, res) => {
    try {
        const {
            role, fullName, mobile, email, password,
            village, taluka, district, state, pincode,
            landSize, shopName, toolName, toolCategory,
            toolDescription, specifications, rentalPrice,
            availableFrom, availableTo
        } = req.body;

        // Check if user already exists
        let user = await User.findOne({ mobile });
        if (user) {
            return res.status(400).json({ message: 'User already exists with this mobile number' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        user = new User({
            role,
            fullName,
            mobile,
            email,
            password: hashedPassword,
            address: { village, taluka, district, state, pincode },
            landSize: role === 'farmer' ? landSize : undefined,
            shopName: role === 'owner' ? shopName : undefined,
            tools: role === 'owner' ? [{
                toolName, toolCategory, toolDescription,
                specifications, rentalPrice, availableFrom, availableTo
            }] : []
        });

        // Generate OTP
        const otpCode = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
        user.otp = {
            code: otpCode,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 mins expiry
        };

        await user.save();

        // Send OTP via Email (if email provided)
        if (email) {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'KrishiSandhi Registration OTP',
                text: `Your OTP for registration is: ${otpCode}. It expires in 10 minutes.`
            };
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) console.log('Email Error:', err);
                else console.log('Email sent:', info.response);
            });
        }

        // Send OTP via SMS
        if (twilioClient) {
            try {
                await twilioClient.messages.create({
                    body: `Your KrishiSandhi OTP is: ${otpCode}. It expires in 10 minutes.`,
                    from: process.env.TWILIO_PHONE_NUMBER,
                    to: `+91${mobile}`
                });
                console.log(`SMS sent to ${mobile}`);
            } catch (smsErr) {
                console.error('Twilio Error:', smsErr.message);
            }
        } else {
            console.log(`[SMS MOCK] Sending OTP ${otpCode} to ${mobile}`);
        }

        res.status(201).json({
            message: 'User registered. Please verify OTP sent to your email/mobile.',
            mobile
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route POST /api/auth/verify-otp
// @desc Verify OTP & Active User
router.post('/verify-otp', async (req, res) => {
    try {
        const { mobile, otp } = req.body;

        const user = await User.findOne({ mobile });
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (user.isVerified) return res.status(400).json({ message: 'User already verified' });

        if (user.otp.code !== otp || user.otp.expiresAt < new Date()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        user.isVerified = true;
        user.otp = undefined; // Clear OTP data
        await user.save();

        // Generate JWT
        const payload = { user: { id: user.id, role: user.role } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' }, (err, token) => {
            if (err) throw err;
            res.json({ token, user: { fullName: user.fullName, role: user.role } });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route POST /api/auth/login
// @desc Authenticate user & get token
router.post('/login', async (req, res) => {
    try {
        const { mobile, password } = req.body;

        const user = await User.findOne({ mobile });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        if (!user.isVerified) {
            return res.status(400).json({ message: 'Please verify your account first' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const payload = { user: { id: user.id, role: user.role } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' }, (err, token) => {
            if (err) throw err;
            res.json({ token, user: { fullName: user.fullName, role: user.role } });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

const auth = require('../middleware/auth');

// @route GET /api/auth/profile
// @desc Get user profile
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
