const USER = require("../models/userinfo");
const { setUser, getUser } = require("../services/auth");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPassword = async function (pass) {
  try {
    const done = await bcrypt.hash(pass, saltRounds);
    return done;
  } catch (error) {
    console.error(error, "error handling message");
  }
};

const signInPageAuth = async (req, res) => {
  const { username, pass } = req.body;
  console.log(username, pass, req.body);

  const user = await USER.findOne({ username: username });
  console.log(user + "fsdf");

  //checking if admin or user
  const role = user.role;
  if (role === "user") {
    console.log("entered into user ");
    if (!user || user === null) {
      return res
        .status(401)
        .render("auth/signin", { messages: "Invalid Username or Password" });
    }

    let hashedpass = user.password;
    console.log(hashedpass + "hashed pass word");
    let noerror = false;
    const match = await bcrypt.compare(pass, hashedpass);
    console.log(match, pass, hashedpass);
    if (match) {
      noerror = true;
    }

    if (noerror) {
      const token = setUser(user);
      res.cookie("uid", token);
      res.status(200).redirect("/home");
    } else {
      res
        .status(401)
        .render("auth/signin", { messages: "Invalid Username or Password" });
    }
  } else {
    if (!user || user === null) {
      return res.status(401).render("auth/adminSignin", {
        messages: "Invalid Username or Password",
      });
    }
    hashedpass = user.password;
    let noerror = false;
    const match = await bcrypt.compare(pass, hashedpass);
    if (match) {
      noerror = true;
    }
    if (noerror) {
      const token = setUser(user);
      res.cookie("uid", token);
      res.status(200).redirect("/admin");
    } else {
      res.status(401).render("auth/adminSignin", {
        messages: "Invalid Username or Password",
      });
    }
  }
};

const signUpUserCreate = async (req, res) => {
  //for signup page checking
  const { username, email, password, r } = req.body;
  console.log(req.body);

  try {
    const hashedpass = await hashPassword(password);
    console.log(hashedpass);
    await USER.create({ username, password: hashedpass, email });
    res.redirect("/signin");
  } catch (error) {
    if (error.code === 11000) {
      res.render("auth/signup", { dupli: "This email Already" });
    }
  }
};
const handleAdminUserAdd = async (req, res) => {
  //for signup page checking
  const { username, email, password, r } = req.body;
  console.log(req.body);

  try {
    const hashedpass = await hashPassword(password);
    console.log(hashedpass);
    await USER.create({ username, password: hashedpass, email });
    res.redirect("/admin/add");
  } catch (error) {
    if (error.code === 11000) {
      res.render("layouts/userAdd", { dupli: "This email Already" });
    }
  }
};

module.exports = { signInPageAuth, signUpUserCreate, handleAdminUserAdd };
