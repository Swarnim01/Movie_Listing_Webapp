const express = require('express');
const mongoose = require('mongoose');
const protected = require('../middleware/protected');

const LogoutRouter = express.Router();

LogoutRouter.route('/').get(protected, (req, res) => {
    res.clearCookie('token');
    res.status(200).json('Logged Out Successfully');

});

module.exports = LogoutRouter;
