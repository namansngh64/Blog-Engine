const User = require("../models/user");

exports.getUserbyId = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.json({
        error: "No User Found"
      });
    }
    req.profile = user;
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    next();
  });
};
