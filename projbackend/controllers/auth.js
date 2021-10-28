const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
var nodemailer = require("nodemailer");
const { validationResult } = require("express-validator");

exports.signin = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      error: errors.array()[0].msg
    });
  }
  // console.log(req.body);
  const { email, password, isCookie } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.json({
        error: `No user found!`
      });
    }
    if (user.authenticate(password)) {
      const token = jwt.sign({ _id: user._id }, process.env.SECRET, {
        expiresIn: "120s"
      });

      if (isCookie) {
        const refToken = jwt.sign({ _id: user._id }, process.env.REFSECRET, {
          expiresIn: "30d",
          audience: "ref"
        });
        res.cookie("reftoken", refToken, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          httpOnly: true
          // secure: true
          // secure: isSecure,
          // signed: true
        });
      } else {
        const refToken = jwt.sign({ _id: user._id }, process.env.REFSECRET, {
          expiresIn: "15h",
          audience: "ref"
        });
        res.cookie("reftoken", refToken, {
          // maxAge: 30 * 24 * 60 * 60 * 1000,
          httpOnly: true
          // secure: true
          // secure: isSecure,
          // signed: true
        });
      }
      const { _id, name, email, role } = user;
      // console.log(req.cookies.reftoken);
      // const hehe = jwt.verify(req.cookies.reftoken, process.env.REFSECRET);
      // console.log(hehe);
      // console.log(req.session);
      return res.json({ token, user: { _id, name, email, role } });
    } else {
      return res.json({
        error: "Username or password incorrect"
      });
    }
  });
};

const sendVerifyMail = (userId, otp) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hackersteam64@gmail.com",
      pass: process.env.EPASS
    }
  });

  var mailOptions = {
    from: "hackersteam64@gmail.com",
    to: userId,
    subject: "Verify your Account",
    html: `<center>
    <h1>Hey There! Welcome to Blog Engine!</h1><br>
    <h2>${otp}</h2>
          <br>
          <h3>
         is your OTP for activating the account<br>
         Happy Blogging!
         </h3></center>
        
          `
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "NOT able to save user in DB"
      });
    }
    const otp = Math.floor(Math.random() * 100000);

    const enc_otp = jwt.sign({ otp: otp }, process.env.OTPSECRET, {
      expiresIn: "300s",
      audience: "otp"
    });
    res.cookie("otp", enc_otp, {
      maxAge: 3 * 60 * 1000,
      httpOnly: true
      // secure: true
      // secure: isSecure,
      // signed: true
    });

    sendVerifyMail(user.email, otp);
    res.json({
      name: user.name,
      email: user.email,
      id: user._id
    });
  });
};

exports.verifyOtp = (req, res) => {
  const { otp } = req.body;
  if (!req.profile._id) {
    return res.json({
      error: "No User found"
    });
  }
  console.log(req.cookies);
  if (!req.cookies.otp) {
    return res.json({
      error: "Something went wrong"
    });
  }
  const c_otp = jwt.verify(req.cookies.otp, process.env.OTPSECRET);
  if (c_otp.aud != "otp") {
    return res.json({ error: "Oops something went wrong!" });
  }
  if (c_otp.otp != otp) {
    return res.json({
      error: "Incorrect OTP"
    });
  }
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { activated: 1 },
    { new: true },
    (err, user) => {
      if (err || !user) {
        return res.json({
          error: "No user found!"
        });
      }
      return res.json({
        message: "Account activated successfully!!"
      });
    }
  );
};

exports.signout = (req, res) => {
  res.clearCookie("reftoken");
  res.json({
    message: "User signed out successfully!"
  });
};
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  algorithms: ["HS256"],
  requestProperty: "auth"
});
exports.genToken = (req, res) => {
  if (!req.cookies.reftoken) {
    return res.json({
      token: undefined
    });
  }
  const refToken = jwt.verify(req.cookies.reftoken, process.env.REFSECRET);
  if (refToken.aud != "ref") {
    return res.json({
      token: undefined
    });
  }
  const token = jwt.sign({ _id: refToken._id }, process.env.SECRET, {
    expiresIn: "120s"
  });
  return res.status(200).json({
    token: token
  });
};
