const jwt = require('jsonwebtoken');
const User = require('../models/User');
const env = require('../config/env');

class AuthService {
  generateToken(user) {
    return jwt.sign({ id: user._id, role: user.role, email: user.email }, env.jwtSecret, {
      expiresIn: env.jwtExpiresIn,
    });
  }

  async register({ name, email, password, role = 'operator' }) {
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      throw new Error('User already exists with this email address.');
    }

    const user = await User.create({ name, email, password, role });
    const token = this.generateToken(user);

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async login({ email, password }) {
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
      throw new Error('Invalid email or password.');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error('Invalid email or password.');
    }

    user.lastLogin = new Date();
    await user.save();

    const token = this.generateToken(user);
    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async getUserById(id) {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('User not found.');
    }
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      lastLogin: user.lastLogin,
    };
  }
}

module.exports = new AuthService();
