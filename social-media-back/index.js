const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook");
const bcrypt = require("bcrypt");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

//Cloudinary config. Set secure: true to receive https URLs
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});
//model imports
const User = require("./models/User");
const Post = require("./models/Post");

const app = express();

//User authentication check
let authorizedUser = null;

//Middleware
app.use(bodyParser.json({ limit: "6mb" }));
app.use(cors());
app.use(express.static("public"));

// use passport, session
app.use(
  session({
    secret: "Secret Zone Media",
    resave: false,
    saveUninitialized: false,
  })
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, {
      _id: user._id,
      username: user.username,
      profilePic: user.profilePicture,
    });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

//set up passport
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGODB_URL, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to MongoDB");
  }
});

app.get("/", (req, res) => {
  res.send("home page");
});

app.get("/isAuth", (req, res) => {
  res.json(authorizedUser);
});

/************ Google authentication ****************/
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/google/callback",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async function (accessToken, refreshToken, profile, cb) {
      User.findOne({ googleId: profile.id }, async (err, result) => {
        if (err) {
          return cb(err);
        }
        console.log(profile);
        if (!result) {
          const imgURL = profile.photos[0].value.replace("s96-c", "s300-c");
          const user = await User.create({
            email: profile.emails[0].value,
            username: profile.displayName,
            profilePicture: imgURL,
            googleId: profile.id,
          });
          return cb(null, user);
        } else {
          return cb(null, result);
        }
      });
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/failed" }),
  function (req, res) {
    // Successful authentication, redirect home.
    User.findById(req.session.passport.user._id, (error, data) => {
      if (error) {
        console.log(error);
      } else {
        authorizedUser = data;
      }
    });
    res.redirect("http://localhost:3000");
  }
);

app.get("/auth/failed", (req, res) => {
  res
    .json("OAuth authentication failed.")
    .redirect("http://localhost:3000/LogIn");
});

/************  Facebook Authentication ***************/
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:8080/auth/facebook/callback",
      profileFields: ["id", "emails", "name", "picture.type(large)"],
    },
    async function (accessToken, refreshToken, profile, cb) {
      User.findOne({ facebookId: profile.id }, async (err, result) => {
        if (err) {
          return cb(err);
        }
        if (!result) {
          const user = await User.create({
            email: profile.emails[0].value,
            username:
              profile.displayName === undefined
                ? `${profile.name.familyName} ${profile.name.givenName}`
                : profile.displayName,
            profilePicture: profile.photos ? profile.photos[0].value : "",
            facebookId: profile.id,
          });
          return cb(null, user);
        } else {
          return cb(null, result);
        }
      });
    }
  )
);

app.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/auth/failed" }),
  function (req, res) {
    // Successful authentication, redirect home.
    User.findById(req.session.passport.user._id, (error, data) => {
      if (error) {
        console.log(error);
      } else {
        authorizedUser = data;
      }
    });
    res.redirect("http://localhost:3000");
  }
);

/************  Normal authentication *****************/
// User register
app.post("/auth/register", async (req, res) => {
  try {
    //hash password
    const saltRounds = 10;
    const hashedPass = await bcrypt.hash(req.body.password, saltRounds);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save();
    const { password, updatedAt, ...other } = user._doc;
    res.json(other);
  } catch (error) {
    console.log(error);
    res.json(error);
    /* res.status(500).json(error); */
  }
});

//User Login
app.post("/auth/login", async (req, res) => {
  try {
    //Find the user by email
    const user = await User.findOne({ email: req.body.email });
    /* !user && res.status(404).json("User not find."); */
    if (!user) {
      res.status(404).json("User not find.");
    } else {
      //Validate the password with associated email
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      /* !validPassword && res.status(400).json("Wrong password"); */
      if (!validPassword) {
        res.status(400).json("Wrong password");
      } else {
        const { password, updatedAt, ...other } = user._doc;
        authorizedUser = other;
        res.status(200).json(other);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//User Log out
app.post("/auth/logout", (req, res) => {
  try {
    if (req.body.user === authorizedUser.userId) {
      authorizedUser = null;
      req.logout((error) => {
        if (error) {
          console.log(error);
        }
      });
      res.status(200).json("Logged out.");
    } else {
      res.status(401).json("Unauthorized action.");
    }
  } catch (error) {
    console.log(error);
  }
});

/*************** End Authentication Section ***********/

/****************** User CRUD Section  ****************/
//Update a user
app.put("/users/:id", async (req, res) => {
  console.log(req.body);
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      } catch (error) {
        return res.status(500).json(error);
      }
    }

    try {
      await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Password changed successful.");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("Not authenticated.");
  }
});

//Update user's profile picture
app.post("/users/updateAvatar", async (req, res) => {
  let imageURL;
  if (req.body.imageFile !== "") {
    const result = await cloudinary.uploader.upload(req.body.avatarFile);
    imageURL = result.secure_url;
    try {
      const user = await User.findByIdAndUpdate(
        req.body.userId,
        {
          profilePicture: imageURL,
        },
        { new: true }
      );
      const { password, updatedAt, ...other } = user._doc;
      authorizedUser = other;
      res.status(200).json(authorizedUser);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  } else {
    imageURL = "";
  }
});

//Delete a user
app.delete("/users/:id", async (req, res) => {
  console.log(req.body);
  if (req.body.userId === req.params.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted.");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("Not authenticated.");
  }
});

//Get a user
app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Follow a user
app.put("/users/:id/follow", async (req, res) => {
  if (req.params.id !== req.body.userId) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (!user.followers.includes(currentUser._id)) {
        await user.updateOne({
          $push: { followers: req.body.userId },
        });
        await currentUser.updateOne({
          $push: { followings: req.params.id },
        });
        res.status(200).json("Successfully Followed.");
      } else {
        res.status(403).json("You already followed this user.");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You cannot follow yourself.");
  }
});

/****************** End User CRUD Section  ************/

/****************** Post CRUD Section  ****************/
//Get a post
app.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Create a post
app.post("/posts/create", async (req, res) => {
  //Use cloudinary to convert image base64 url to online https url
  let imageURL;
  if (req.body.imageFile !== "") {
    const result = await cloudinary.uploader.upload(req.body.imageFile);
    imageURL = result.secure_url;
  } else {
    imageURL = "";
  }

  const newPost = new Post({
    userId: req.body.userId,
    postContent: req.body.postContent,
    imgURL: imageURL,
  });
  try {
    await newPost.save();
    res.status(200).json("Create post successfully.");
  } catch (error) {
    res.status(500).json(error);
  }
});

//Delete a post
app.post("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("Post deleted.");
    } else {
      res.status(403).json("Unauthorized to delete the post.");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//Like a post
app.put("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("Post liked.");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("Post disliked.");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//Post timeline
app.get("/posts/timeline/all", async (req, res) => {
  try {
    const response = await Post.find({});
    if (!response) {
      res.status(404).json("Not found.");
    } else {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/posts/timeline/all", async (req, res) => {
  try {
    const response = await Post.find({ userId: req.body.userId });
    if (!response) {
      res.status(404).json("Not found.");
    } else {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
/****************** End Post CRUD Section  ************/

app.listen(8080, () => {
  console.log("Server started on 8080");
});
