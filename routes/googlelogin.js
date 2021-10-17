const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const client = new OAuth2(process.env.GOOGLE_CLIENT_ID);
const Users = require("../models/user");
app.use(cookieParser());

const GoogleSignInRouter = express.Router();

GoogleSignInRouter.use(express.json());

GoogleSignInRouter.route("/").post(async (req, res, next) => {
  try {
    console.log("in google sign in router");
    console.log(req.body.response.tokenId);
    const { tokenId } = req.body.response;
    const verify = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { email, name, picture } = verify.payload;
    var savedperson = await Users.findOne({ email: email });
    if (savedperson) {
      const token = jwt.sign({ id: savedperson._id }, process.env.JWT_SECRET);
      res.cookie("token", token, { httpOnly: true });
      res.status(200).json({ token, savedperson });
    } else {
      try {
        savedperson = new Users({
          email: email,
          username: name,
        });
        await savedperson.save();
      } catch (error) {
        console.log(error);
      }
      const token = jwt.sign({ id: savedperson._id }, process.env.JWT_SECRET);
      res.cookie("token", token, { httpOnly: true });
      res.status(200).json({ token, savedperson });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
});

module.exports = GoogleSignInRouter;
