const Blog = require("../models/blog");
const formidable = require("formidable");
const User = require("../models/user");
const fs = require("fs");
const { validationResult } = require("express-validator");

exports.createBlog = (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.json({
  //     error: errors.array()[0].msg
  //   });
  // }
  const uploadFolder = `../public/${JSON.stringify(req.profile._id).replace(
    /['"]+/g,
    ""
  )}/images/`;
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.multiples = true;
  form.uploadDir = uploadFolder;
  let images = [];
  const isFileValid = (file) => {
    const type = file.mimetype.split("/").pop();
    const validTypes = ["jpg", "jpeg", "png"];
    if (validTypes.indexOf(type) === -1) {
      return false;
    }
    return true;
  };

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.json({
        error: err
      });
    }
    const { title, blogBody } = fields;
    if (!title || !blogBody) {
      return res.json({
        error: "Please provide all the necessary details"
      });
    }

    //handle file here
    // if (files.photo) {
    //   if (files.photo.size > 3000000) {
    //     return res.status(400).json({
    //       error: "File size too big!"
    //     });
    //   }
    // product.photo.data = fs.readFileSync(file.photo.path);
    // product.photo.contentType = file.photo.type;
    // Check if multiple files or a single file
    if (!files.myFile.length) {
      //Single file

      const file = files.myFile;
      // console.log(file);

      // checks if the file is valid
      const isValid = isFileValid(file);

      // creates a valid name by removing spaces
      const fileName = encodeURIComponent(file.newFilename.replace(/\s/g, "-"));

      if (!isValid) {
        // throes error if file isn't valid
        return res.json({
          status: "Fail",
          error: "The file type is not a valid type"
        });
      }
      const newPath =
        uploadFolder + fileName + "." + file.mimetype.split("/").pop();
      try {
        // console.log(JSON.stringify(newPath));
        // console.log(JSON.stringify(file.filepath));
        // console.log(JSON.stringify(file.mimetype));
        // renames the file in the directory
        fs.renameSync(file.filepath, newPath);
      } catch (error) {
        console.log(error);
      }
      images.push(newPath);
      // console.log(images);
      // try {
      //   // stores the fileName in the database
      //   const newFile = await File.create({
      //     name: `files/${fileName}`,
      //   });
      //   return res.status(200).json({
      //     status: "success",
      //     message: "File created successfully!!",
      //   });
      // } catch (error) {
      //   res.json({
      //     error,
      //   });
      // }
    } else {
      // Multiple files
    }
    fields.images = images;
    fields.author = req.profile;
    let blog = new Blog(fields);
    //save to the DB
    blog.save((err, blog) => {
      if (err) {
        res.json({
          error: err
        });
      }
      console.log("Blog Created");
      User.findOneAndUpdate(
        { _id: req.profile._id },
        { $push: { blogs: blog._id } },
        { new: true },
        (err, user) => {
          if (err) {
            return res.json({
              error: err
            });
          }
          console.log("User updated");
          res.json({
            message: "Blog Created Successfully!"
          });
        }
      );
    });
  });
};
