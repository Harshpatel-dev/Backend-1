const mongoose = require("mongoose");
const { Schema } = mongoose;

const user_rating = new Schema({
  uid: {
    //jisko rating de raha hai
    type: Number,
    required: true,
    unique: true,
  },
  obj_uid: [
    {
      //jo rating de raha hai voh
      by_uid: {
        type: Number,
        required: true,
        unique: true,
      },
      ratings: {
        type: Number,
        required: true,
      },
    },
  ],
  avg_rating: {
    type: Number,
    default: 0,
  },
  count: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("user_rating", user_rating);
