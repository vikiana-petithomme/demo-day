const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");

exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect("/home");
  }
  res.render("login", {
    title: "Login/Signup",
  });
};

exports.postLogin = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "Password cannot be blank." });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/login");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("errors", info);
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", { msg: "Success! You are logged in." });
      res.redirect(req.session.returnTo || "/home");
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout(() => {
    console.log("User has logged out.");
  });
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null;
    res.redirect("/");
  });
};

exports.postSignup = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (!validator.isLength(req.body.originalPassword, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
  if (req.body.originalPassword !== req.body.confirmPassword)
    validationErrors.push({ msg: "Passwords do not match" });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("../login");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  let defaultAvatar = "../imgs/defaultAvatar.jpeg";

  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.originalPassword,
    fullName: req.body.userFullName,
    avatar: defaultAvatar,
  });

  User.findOne(
    { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
    (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        req.flash("errors", {
          msg: "Account with that email address or username already exists.",
        });
        return res.redirect("../login");
      }
      user.save((err) => {
        if (err) {
          return next(err);
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          const body = new FormData();

          console.log(
            "this is user information " +
              req.body.userFullName +
              req.body.originalPassword +
              req.body.userName +
              req.body.email
          );

          var myHeaders = new Headers();
          myHeaders.append(
            "Api-Key",
            "9c28a667d4b499b4305140da127b26603b9ceecc40ff078bcbbca80a84ba8db9"
          );
          myHeaders.append("Api-Username", "system");

          var requestOptions = {
            method: "POST",
            headers: myHeaders,
            redirect: "follow",
          };

          fetch(
            `https://concur.discourse.group/users.json?name=${req.body.userFullName}&email=${req.body.email}&password=${req.body.originalPassword}&username=${req.body.userName}r&active=true&approved=true`,
            requestOptions
          )
            .then((response) => response.json())
            .then((result) => {
              console.log(result);
              res.redirect("/home");
            })
            .catch((error) => console.log("error", error));
        });
      });
    }
  );
};

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// ===PASSWORD RECOVER AND RESET

// @route POST api/auth/recover
// @desc Recover Password - Generates token and Sends password reset email
// @access Public
exports.recover = (req, res) => {
  res.render("/recover.ejs", {
    title: "Recover password",
  });
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user)
        return res.status(401).json({
          message:
            "The email address " +
            req.body.email +
            " is not associated with any account. Double-check your email address and try again.",
        });

      //Generate and set password reset token
      user.generatePasswordReset();

      // Save the updated user object
      user
        .save()
        .then((user) => {
          // send email
          let link =
            "http://" +
            req.headers.host +
            "/api/auth/reset/" +
            user.resetPasswordToken;
          const mailOptions = {
            to: user.email,
            from: process.env.FROM_EMAIL,
            subject: "Password change request",
            text: `Hi ${user.userName} \n 
                    Please click on the following link ${link} to reset your password. \n\n 
                    If you did not request this, please ignore this email and your password will remain unchanged.\n`,
          };

          sgMail.send(mailOptions, (error, result) => {
            if (error) return res.status(500).json({ message: error.message });

            res.status(200).json({
              message: "A reset email has been sent to " + user.email + ".",
            });
          });
        })
        .catch((err) => res.status(500).json({ message: err.message }));
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

// @route POST api/auth/reset
// @desc Reset Password - Validate password reset token and shows the password reset view
// @access Public
exports.reset = (req, res) => {
  User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() },
  })
    .then((user) => {
      if (!user)
        return res
          .status(401)
          .json({ message: "Password reset token is invalid or has expired." });

      //Redirect user to form with the email address
      res.render("reset", { user });
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

// @route POST api/auth/reset
// @desc Reset Password
// @access Public
exports.resetPassword = (req, res) => {
  User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() },
  }).then((user) => {
    if (!user)
      return res
        .status(401)
        .json({ message: "Password reset token is invalid or has expired." });

    //Set the new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    // Save
    user.save((err) => {
      if (err) return res.status(500).json({ message: err.message });

      // send email
      const mailOptions = {
        to: user.email,
        from: process.env.FROM_EMAIL,
        subject: "Your password has been changed",
        text: `Hi ${user.username} \n 
                    This is a confirmation that the password for your account ${user.email} has just been changed.\n`,
      };

      sgMail.send(mailOptions, (error, result) => {
        if (error) return res.status(500).json({ message: error.message });

        res.status(200).json({ message: "Your password has been updated." });
      });
    });
  });
};
