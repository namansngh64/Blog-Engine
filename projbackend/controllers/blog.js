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
  const uploadFolder = `../projfrontend/public/images/${JSON.stringify(
    req.profile._id
  ).replace(/['"]+/g, "")}/`;
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.multiples = true;
  form.uploadDir = uploadFolder;
  let images = [];
  let hehe = 0;
  const isFileValid = (file) => {
    const type = file.mimetype.split("/").pop();
    const validTypes = ["jpg", "jpeg", "png"];
    if (validTypes.indexOf(type) === -1) {
      return false;
    }
    return true;
  };

  // form.on("field", function (name, field) {
  //   if (field === "") {
  //     console.log(field);
  //     hehe = 1;
  //   }
  // });
  // if (hehe !== 2) {
  //   return res.json({
  //     error: "Please provide all the necessary details!"
  //   });
  // }

  form.on("fileBegin", function (name, file) {
    const isValid = isFileValid(file);
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

    file.filepath = newPath;
    images.push(newPath);
  });

  // form.on("file", function (field, file) {
  //   //rename the incoming file to the file's name
  //   // fs.renameSync(file.filepath, form.uploadDir + "/" + file.newFilename);
  //   // console.log(field, file);
  //   // hehe.push([field, file]);
  //   // console.log(file);
  // });

  // const handleImages = (file) => {
  //   // checks if the file is valid
  //   const isValid = isFileValid(file);

  //   // creates a valid name by removing spaces
  //   const fileName = encodeURIComponent(file.newFilename.replace(/\s/g, "-"));

  //   if (!isValid) {
  //     // throes error if file isn't valid
  //     return res.json({
  //       status: "Fail",
  //       error: "The file type is not a valid type"
  //     });
  //   }
  //   const newPath =
  //     uploadFolder + fileName + "." + file.mimetype.split("/").pop();
  //   try {
  //     // console.log(JSON.stringify(newPath));
  //     // console.log(JSON.stringify(file.filepath));
  //     // console.log(JSON.stringify(file.mimetype));
  //     // renames the file in the directory
  //     fs.renameSync(file.filepath, newPath);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   images.push(newPath);
  // };

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.json({
        error: "Oops! Something went wrong!"
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
    // var i = 0;

    // let filesArray = [];

    // let json = JSON.parse(JSON.stringify(files));
    // console.log(json);

    // let key = Object.keys(json);
    // console.log(key);

    // json[key].forEach((j) => {
    //   filesArray.push(j.path.split("\\")[1]);
    // });

    // console.log(filesArray);
    // for (const file of Object.entries(files)) {
    //   const a = `myFile.${i++}`;
    //   // const fileName = encodeURIComponent(
    //   //   files[a].newFilename.replace(/\s/g, "-")
    //   // );
    //   // const newPath =
    //   //   uploadFolder + fileName + "." + files[a].mimetype.split("/").pop();
    //   // files[a].filepath = newPath;
    //   // fs.renameSync(files[a].filepath, newPath);
    //   // console.log(files[a]);
    //   // console.log(files[a]);
    //   // console.log(files[a]);
    //   // handleImages(files[a]);
    // }
    // console.log(hehe[0][1]);
    // console.log(images);

    // return res.json("bhehe");
    // if (files.myFile !== undefined) {
    //   if (!files.myFile.length) {
    //     //Single file

    //     const file = files.myFile;
    //     // console.log(file);

    //     // checks if the file is valid
    //     const isValid = isFileValid(file);

    //     // creates a valid name by removing spaces
    //     const fileName = encodeURIComponent(
    //       file.newFilename.replace(/\s/g, "-")
    //     );

    //     if (!isValid) {
    //       // throes error if file isn't valid
    //       return res.json({
    //         status: "Fail",
    //         error: "The file type is not a valid type"
    //       });
    //     }
    //     const newPath =
    //       uploadFolder + fileName + "." + file.mimetype.split("/").pop();
    //     try {
    //       // console.log(JSON.stringify(newPath));
    //       // console.log(JSON.stringify(file.filepath));
    //       // console.log(JSON.stringify(file.mimetype));
    //       // renames the file in the directory
    //       fs.renameSync(file.filepath, newPath);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //     images.push(newPath);
    //     // console.log(images);
    //     // try {
    //     //   // stores the fileName in the database
    //     //   const newFile = await File.create({
    //     //     name: `files/${fileName}`,
    //     //   });
    //     //   return res.status(200).json({
    //     //     status: "success",
    //     //     message: "File created successfully!!",
    //     //   });
    //     // } catch (error) {
    //     //   res.json({
    //     //     error,
    //     //   });
    //     // }
    //   } else {
    //     // Multiple files
    //   }
    // }
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

exports.getBlogById = (req, res, next, id) => {
  Blog.findById(id)
    .populate("author", "_id name")
    .exec((err, blog) => {
      if (err || !blog) {
        return res.json({ error: "No blog found" });
      }
      req.blog = blog;
      next();
    });
};

exports.getBlog = (req, res) => {
  return res.json(req.blog);
};

exports.getAllBlogs = (req, res) => {
  Blog.find()
    .populate("author", "_id name")
    .exec((err, blogs) => {
      if (err || !blogs) {
        return res.json({ error: "hehe" });
      }
      return res.json(blogs);
    });
};

exports.updateBlog = (req, res) => {
  // console.log(JSON.stringify(req.blog.author._id));
  // console.log(req.profile._id != req.blog.author._id);
  if (JSON.stringify(req.blog.author._id) !== JSON.stringify(req.profile._id)) {
    return res.json({ error: "You are not authorized to edit this blog!" });
  }
  const uploadFolder = `../projfrontend/public/images/${JSON.stringify(
    req.profile._id
  ).replace(/['"]+/g, "")}/`;

  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.multiples = true;
  form.uploadDir = uploadFolder;
  let images = [];
  let remImgs = [];
  const isFileValid = (file) => {
    const type = file.mimetype.split("/").pop();
    const validTypes = ["jpg", "jpeg", "png"];
    if (validTypes.indexOf(type) === -1) {
      return false;
    }
    return true;
  };

  form.on("fileBegin", function (name, file) {
    const isValid = isFileValid(file);
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

    file.filepath = newPath;
    images.push(newPath);
  });

  form.on("field", function (name, field) {
    if (name == "remImgs") {
      remImgs.push(field);
    }
  });

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
    // console.log(files.myFile);
    // if (files.myFile !== undefined) {
    //   if (!files.myFile.length) {
    //     //Single file

    //     const file = files.myFile;
    //     // console.log(file);

    //     // checks if the file is valid
    //     const isValid = isFileValid(file);

    //     // creates a valid name by removing spaces
    //     const fileName = encodeURIComponent(
    //       file.newFilename.replace(/\s/g, "-")
    //     );

    //     if (!isValid) {
    //       // throes error if file isn't valid
    //       return res.json({
    //         status: "Fail",
    //         error: "The file type is not a valid type"
    //       });
    //     }
    //     const newPath =
    //       uploadFolder + fileName + "." + file.mimetype.split("/").pop();
    //     try {
    //       // console.log(JSON.stringify(newPath));
    //       // console.log(JSON.stringify(file.filepath));
    //       // console.log(JSON.stringify(file.mimetype));
    //       // renames the file in the directory
    //       fs.renameSync(file.filepath, newPath);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //     images.push(newPath);
    //     fields.images = images;
    //   } else {
    //     // Multiple files
    //     console.log("inside");
    //   }
    // }

    let prevImgs = req.blog.images;
    if (remImgs.length !== 0) {
      remImgs.map((img) => {
        var index = prevImgs.indexOf(img);
        if (index !== -1) {
          prevImgs.splice(index, 1);
        }
        fs.stat(img, (err, stats) => {
          if (err) {
            return;
          }
          fs.unlinkSync(img);
        });
      });
    }
    images.push(...prevImgs);
    fields.images = images;
    fields.author = req.profile;

    //save to db
    Blog.findOneAndUpdate(
      { _id: req.blog._id },
      { $set: fields },
      { new: true, useFindAndModify: false },
      (err, blog) => {
        if (err) {
          return res.json("Something Went Wrong!");
        }
        return res.json(blog);
      }
    );
  });
};
exports.deleteBlog = (req, res) => {
  if (JSON.stringify(req.blog.author._id) !== JSON.stringify(req.profile._id)) {
    return res.json({ error: "You are not authorized to delete this blog!" });
  }

  Blog.findOneAndDelete({ _id: req.blog._id }, (err, blog) => {
    if (err) {
      return res.json({ error: "Can't delete this blog!" });
    }
    let remImgs = blog.images;
    remImgs.map((img) => {
      fs.stat(img, (err, stats) => {
        if (err) {
          return;
        }
        fs.unlinkSync(img);
      });
    });
    return res.json(blog);
  });
};

exports.getUserBlogs = (req, res) => {
  Blog.find({ author: req.profile })
    .populate("author", "_id name")
    .sort([["updatedAt", "desc"]])
    .exec((err, blogs) => {
      if (err || !blogs) {
        return res.json({ error: "No blogs found" });
      }
      return res.json(blogs);
    });
};
