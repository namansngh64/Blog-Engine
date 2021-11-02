var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

var commentSchema = new mongoose.Schema(
  {
    commentBody: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    user: {
      type: ObjectId,
      ref: "User",
      required: true
    },
    blog: {
      type: ObjectId,
      ref: "Blog",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
