var express = require("express");
var router = express.Router();
const { check, body } = require("express-validator");
const {
  createBlog,
  getBlogById,
  getBlog,
  getAllBlogs,
  updateBlog
} = require("../controllers/blog");
const { getUserbyId } = require("../controllers/user");

//Params
router.param("userId", getUserbyId);
router.param("blogId", getBlogById);

//Routes
router.post(
  "/create/blog/:userId",
  [
    body("name", "Name should be at least 3 char").isLength({ min: 3 }),
    body("blogBody", "Blog Body is required").isLength({ min: 3 })
    //   body("password", "Password should be at least 3 char").isLength({ min: 3 })
  ],
  createBlog
);
router.post(
  "/edit/blog/:blogId/:userId",
  [
    body("name", "Name should be at least 3 char").isLength({ min: 3 }),
    body("blogBody", "Blog Body is required").isLength({ min: 3 })
    //   body("password", "Password should be at least 3 char").isLength({ min: 3 })
  ],
  updateBlog
);

router.get("/blog/:blogId", getBlog);
router.get("/blogs", getAllBlogs);
module.exports = router;
