const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const MINUTES = 10;
const express = require('express');
const { SendMailOnResetPassword } = require('../utils/sendMail');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

module.exports = {
  forgotPassword: async (req, res) => {
    const getUser = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    if (!getUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const token = jwt.sign({ id: getUser.id }, process.env.JWT_RESET_SECRET, { expiresIn: '10m' });

    const addResetToken = await prisma.user.update({
      where: { id: getUser.id },
      data: {
        resetPassword: token,
        resetPasswordExpires: new Date(Date.now() + MINUTES * 60000).valueOf()
      },
    });

    if (!addResetToken) {
      return res.status(500).json({ message: 'Internal server error' });
    }

    SendMailOnResetPassword(getUser, token);

    return res.status(200).json({ message: 'Sended email' });
  }
};
