const express = require("express");
const mongoose = require("mongoose");
const Users = require("../models/user");
const protected = require("../middleware/protected");
const FavouriteRouter = express.Router();

FavouriteRouter.use(express.json());

FavouriteRouter.get("/fetchfavourite", protected, (req, res, next) => {
  Users.findById(req.user._id)
    .select("-password")
    .then((result) => {
      console.log(result);
      res.json({ result });
    })
    .catch((err) => {
      return res.status(422).json({ error: err });
    });
});

FavouriteRouter.post("/favourite", protected, async (req, res, next) => {
  const { id, poster_path } = req.body;
  console.log(req.user);
  const data = await Users.find({
    email: req.user.email,
    "favourite.movieId": id,
    "favourite.poster_path": poster_path,
  });
  console.log(data);
  if (!data.length) {
    Users.findByIdAndUpdate(
      req.user._id,
      { $push: { favourite: { movieId: id, poster_path } } },
      { new: true }
    )
      .select("-password")
      .then((result) => {
        console.log(result);
        res.json(result);
      })
      .catch((err) => {
        return res.status(422).json({ error: err });
      });
  } else {
    res
      .status(400)
      .json({ error: "You already have this movie in your favourites" });
  }
});

FavouriteRouter.delete("/delete/:movieId", protected, (req, res) => {
  const { movieId } = req.params;
  Users.findByIdAndUpdate(
    req.user._id,
    { $pull: { favourite: { movieId } } },
    { new: true }
  ).exec((err, result) => {
    console.log(result);
    if (err) return res.status(422).json({ error: err });
    else res.json({ result });
  });
});

module.exports = FavouriteRouter;
