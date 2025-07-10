const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const changePassword = async (req, res) => {
    const { currentPassword, newPassword , confirmPassword } = req.body;

    try {
        const token = req.cookies.token;
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(payload.id);
        const currentPasswordMatch = await bcrypt.compare(currentPassword , user.password);

        if (!currentPasswordMatch) return res.status(400).json({ message: 'Current password is incorrect' });

        if (newPassword.length < 6) return res.status(400).json({ message: 'New password must be at least 6 characters long' });

        if (newPassword !== confirmPassword) return res.status(400).json({ message: 'New password and confirmation do not match' });

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        await User.findByIdAndUpdate(user._id, { password: hashedNewPassword });

        return res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Error changing password:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { changePassword };
