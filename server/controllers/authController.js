const User = require("../models/userSchema");
const Otp = require("../models/otpSchema");
const jwt = require("jsonwebtoken");
const bcrypt  = require("bcrypt") ; 

const { generateOtp } = require("../utils/otpGenerator");
const { sendEmail } = require("../utils/mailSender");

exports.signup = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const otp = await generateOtp();

    const newOtp = await Otp.create({ email, otp });

    const options = {
      email: email,
      subject: "OTP for verification",
      message: `<h1>${otp}</h1>`,
    };
    sendEmail(options);
    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to Signup",
      error: error.message,
    });
  }
};

exports.validateOtp = async (req, res) => {
  try {
    const { email, submittedOtp } = req.body;
    const otpRecord = await Otp.findOne({ email, isUsed: false });

    if (!otpRecord) {
      return res
        .status(502)
        .json({ success: false, message: "No OTP found or already used" }); // No OTP found or already used
    }

    const isValid = submittedOtp == otpRecord.otp;

    if (!isValid) {
      return res
        .status(502)
        .json({ success: false, message: "OTP does not match" }); // OTP does not match
    }

    // Mark OTP as used
    otpRecord.isUsed = true;
    await otpRecord.save();

    return res.status(200).json({
      success: true,
      message: "Otp verified successfully ",
    }); // OTP is valid
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to verify otp",
      error: error.message,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password, name, role, age, gender, preferences, city } =
      req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const newUser = new User({
      email,
      name,
      password,
      role,
      age,
      gender,
      preferences,
      searchingCity: city, // Password will be hashed in the User model pre-save hook
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res
      .status(200)
      .json({
        success: true,
        message: "Registered successfully ",
        user: newUser,
        token,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to register user",
      error: error.message,
    });
  }
};


exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // Verify the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // Generate JWT
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // Respond with the user and JWT
      res.status(200).json({
        success : true , 
        message : "Login successful" , 
        user , 
        token
      });
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
