const { ObjectId } = require("mongoose");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    default: mongoose.Types.ObjectId,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  favourite: [{ movieId: { type: String }, poster_path: { type: String } }],
});

var Users = mongoose.model("User", UserSchema);
module.exports = Users;
