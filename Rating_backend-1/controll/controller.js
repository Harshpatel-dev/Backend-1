const mongoose = require("mongoose");
const user_rating = require("./../modle/user_rating");
exports.getAll = async (req, res) => {
  try {
    const userData = await user_rating.find();

    res.status(200).json({
      status: "success",
      results: userData.length,
      data: {
        userData,
      },
    });
  } catch (err) {
    console.log("Error : ", err);
  }
};

exports.createOne = async (req, res) => {
  try {
    //console.log(req.body);
    const userData = await user_rating.findOne({ uid: req.body.uid });

    if (userData.length === 0) {
      //if user doesn't exist
      await user_rating.create({
        uid: req.body.uid,
        obj_uid: [
          {
            by_uid: req.body.obj_uid,
            ratings: req.body.ratings,
          },
        ],
        avg_rating: req.body.ratings,
        count: 1,
      });
    } else {
      //if user already exist
      //and rated by someone
      let { obj_uid } = userData;

      // ahiya thi tane index madse
      const index = obj_uid.findIndex((data) => {
        return (
          data.by_uid === req.body.obj_uid && data.ratings !== req.body.ratings
        );
      });
      //console.log(index);

      if (index !== -1) {
        userData.obj_uid[index].ratings = req.body.ratings;

        const upd = user_rating.aggregate([
          {
            $match: { uid: req.body.uid },
          },
          {
            $group: {
              _id: null,
              avg_rating: { $avg: "$obj_uid.ratings" },
            },
          },
        ]);
        console.log(upd);
        await userData.save();
        //update avg_rating
      } else {
        userData.obj_uid.push({
          by_uid: req.body.obj_uid,
          ratings: req.body.ratings,
        });

        await userData.save();
        //avg_rating and count will change
      }
    }

    res.status(200).json({
      status: "success",
      message: "Your ratings are rated",
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err.message,
    });
  }
};
