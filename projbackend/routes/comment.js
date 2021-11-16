var express = require("express");
var router = express.Router();
const { body } = require("express-validator");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getBlogById } = require("../controllers/blog");
const {
  createComment,
  getBlogComments,
  getCommentById,
  deleteComment
} = require("../controllers/comment");

const { getUserbyId } = require("../controllers/user");

//params
router.param("userId", getUserbyId);
router.param("blogId", getBlogById);
router.param("commentId", getCommentById);

//routes
router.post(
  "/create/comment/:blogId/:userId",
  [
    body("commentBody", "Comment should be atleast 2 char").isLength({ min: 2 })
  ],
  isSignedIn,
  isAuthenticated,
  createComment
);

router.get("/comments/:blogId", getBlogComments);

router.delete(
  "/delete/comment/:commentId/:userId",
  isSignedIn,
  isAuthenticated,
  deleteComment
);
module.exports = router;
