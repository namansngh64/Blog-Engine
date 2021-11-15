const { validationResult } = require("express-validator");
const Comment = require("../models/comment");

exports.createComment = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json({
      error: errors.array()[0].msg
    });
  }
  const comment = new Comment(req.body);
  comment.user = req.profile;
  comment.blog = req.blog;
  comment.save((err, comment) => {
    if (err) {
      return res.json({ error: "Something Went Wrong!" });
    }
    return res.json(comment);
  });
};

exports.getBlogComments = (req, res) => {
  Comment.find({ blog: req.blog })
    .populate("user", "_id name")
    .populate("blog", "_id title")
    .exec((err, comments) => {
      if (err || !comments) {
        return res.json({ error: "No comments found" });
      }
      return res.json(comments);
    });
};

exports.getCommentById = (req, res, next, id) => {
  Comment.findById(id).exec((err, comment) => {
    if (err || !comment) {
      return res.json({ error: "No comment found!" });
    }
    req.comment = comment;
    next();
  });
};

exports.deleteComment = (req, res) => {
  if (
    JSON.stringify(req.comment.user._id) !== JSON.stringify(req.profile._id)
  ) {
    return res.json({
      error: "You are not authorized to delete this comment!"
    });
  }
  Comment.findOneAndDelete({ _id: req.comment }, (err, comment) => {
    if (err) {
      return res.json({ error: "Not able to delete comment" });
    }
    return res.json(comment);
  });
};
