const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUsers = require('../middleware/fetchUser')

const JWT_SECRET = "ThisIsJWTSecretCode"; // eg- const secret = 'your-256-bit-secret';

// Route 1 : Create a User using:POST "/api/auth/creatuser" . No login required
router.post(
  "/createuser",
  [
    body("name").isLength({ min: 3 }).withMessage("Enter a valid name"),
    body("email")
      .isEmail()
      .withMessage("Enter Valid Email for eg- xyz@gmail.com"),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // console.log(req.body);
    // if there are errors , return Bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    /*
    const user = User(req.body);
    res.send(req.body);
    user.save(); 
    */
    // check wether the user with this email alrrwady exist
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }
      // create a new user
      const salt = await bcryptjs.genSalt(10);
      const securePassword = await bcryptjs.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        // password: req.body.password,
        password: securePassword,
      });
      //    .then(user => res.json(user))
      //    .catch(err => {
      //     console.log(err);
      //     res.json({error:"Please Enter a valid Email" , message: err.message});

      const data = {
        // this is also called payload
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      console.log(authtoken);
      //   res.json(user);
      res.json(authtoken);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured ");
    }
  }
);
// }
// );

// Route 2:  Authenticate  a User using:POST "/api/auth/login" . No login required

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email Does't Exist. Please Register "),
    body("password")
      .isString()
      .exists()
      .withMessage("Password can not be blank"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status("400").json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login using valid credentials" });
      }
      const passwordCompare = await bcryptjs.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to login using valid credentials" });
      }
      const payload = {
        // this is also called payload
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(payload, JWT_SECRET);
      res.json({ authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error ");
    }
  }
);

// Route 3: get  logged in user detail  using:POST "/api/auth/getuser" . login required

router.post("/getuser", fetchUsers ,  async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error!! ");
  }
});

module.exports = router;
