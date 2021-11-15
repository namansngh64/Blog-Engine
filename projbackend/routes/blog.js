var express = require("express");
var router = express.Router();
const { check, body } = require("express-validator");
const {
  createBlog,
  getBlogById,
  getBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog
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
router.put(
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

router.delete("/delete/blog/:blogId/:userId", deleteBlog);
module.exports = router;
