var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

var blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true
    },
    author: {
      type: ObjectId,
      ref: "User",
      required: true
    },
    blogBody: {
      type: String,
      required: true,
      trim: true
    },
    images: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
