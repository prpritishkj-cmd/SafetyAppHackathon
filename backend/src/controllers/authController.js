const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign(
        { id: userId }, 
        process.env.JWT_SECRET, 
        { expiresIn: process.env.JWT_EXPIRE }
    );
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public (Admin only in production)
exports.register = async (req, res) => {
    try {
        const { employeeId, name, email, password, department, projectId, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [{ employeeId }, { email }]
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this employee ID or email'
            });
        }

        // Create new user
        const user = await User.create({
            employeeId,
            name,
            email,
            password,
            department,
            projectId,
            role: role || 'employee'
        });

        // Generate token
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            user: {
                id: user._id,
                employeeId: user.employeeId,
                name: user.name,
                email: user.email,
                role: user.role,
                department: user.department
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Error registering user',
            error: error.message
        });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    try {
        const { employeeId, password } = req.body;

        // Validate input
        if (!employeeId || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide employee ID and password'
            });
        }

        // Find user and include password
        const user = await User.findOne({ employeeId }).select('+password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Check password
        const isPasswordMatch = await user.comparePassword(password);

        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        // Generate token
        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                employeeId: user.employeeId,
                name: user.name,
                email: user.email,
                role: user.role,
                department: user.department
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Error during login',
            error: error.message
        });
    }
};

// @desc    Get current user profile
// @route   GET /api/auth/profile
// @access  Private
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching profile',
            error: error.message
        });
    }
};