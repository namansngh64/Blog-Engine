const Blog = require("../models/blog");
const formidable = require("formidable");
const fs = require("fs");
const { validationResult } = require("express-validator");

exports.createBlog = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      error: errors.array()[0].msg
    });
  }

  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem with image"
      });
    }
    const { name, blogBody } = fields;
    if (!name || !blogBody) {
      return res.status(400).json({
        error: "Please provide all the necessary details"
      });
    }

    let blog = new Blog(fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!"
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    //save to the DB
    blog.save((err, blog) => {
      if (err) {
        res.status(400).json({
          error: "Saving blog in DB failed"
        });
      }
      res.json(blog);
    });
  });
};
