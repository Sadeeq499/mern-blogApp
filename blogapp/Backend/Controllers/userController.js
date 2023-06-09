import User from "../Models/UserModel.js";
import { fileRemover } from "../helpers/fileRemover.js";
import { uploadPicture } from "../middleware/pictureUpload.js";

export const registerController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      // return res.status(400).json({ message: "User already exists" });
      throw new Error("User have Already Registered ");
    }
    // create a new account for user
    user = await User.create({
      name,
      email,
      password,
    });

    return res.status(201).json({
      message: "User registered successfully",
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      avatar: user.avatar,
      isAdmin: user.isAdmin,
      token: await user.generateToken(),
    });
  } catch (error) {
    next(error);
  }
};

// user login controller
export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }
    return res.status(200).json({
      message: "User logged in successfully",
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      avatar: user.avatar,
      isAdmin: user.isAdmin,
      token: await user.generateToken(),
    });
  } catch (error) {
    next(error);
  }
};

// user profile controller
export const userProfileController = async (req, res, next) => {
  try {
    // in this case we have only sent the auth token from frontend now it's gonna verify through id
    let user = await User.findById(req.user._id);
    // console.log("user profile co", user);
    if (!user) {
      throw new Error("User not found");
    }
    return res.status(200).json({
      message: "User profile fetched successfully",
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    });
  } catch (error) {
    next(error);
  }
};

// user update profile controller
export const updateProfileController = async (req, res, next) => {
  try {
    let user = await User.findById(req.user._id);

    if (!user) {
      throw new Error("User not found");
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password && req.body.password.length < 6) {
      throw new Error("password must be atleast 6 characters long");
    } else {
      user.password = req.body.password || user.password;
    }

    const updatedUserProfile = await user.save();

    res.json({
      _id: updatedUserProfile._id,
      name: updatedUserProfile.name,
      email: updatedUserProfile.email,
      password: updatedUserProfile.password,
      avatar: updatedUserProfile.avatar,
      token: await updatedUserProfile.generateToken(),
    });
  } catch (err) {
    next(err);
  }
};

// updateProfilePicture

export const updateProfilePicture = async (req, res, next) => {
  try {
    // Handle File Upload
    const upload = uploadPicture.single("profilePicture");
    upload(req, res, async function (err) {
      // Check for Errors and Process Uploaded File
      if (err) {
        new Error("An unknown Error occurred while uploading ");
      } else {
        // Update User's Profile Picture
        if (req.file) {
          // Remove Previous Profile Picture (if applicable)
          let filename;
          let updateUser = await User.findByIdAndUpdate(req.user._id);
          filename = updateUser.avatar;
          if (filename) {
            fileRemover(filename);
          }
          // Update User's Avatar and Send Response
          updateUser.avatar = req.file.filename;
          await updateUser.save();
          res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            password: updateUser.password,
            avatar: updateUser.avatar,
            token: await updateUser.generateToken(),
          });
        } else {
          // Handle Case When No File was Uploaded
          let filename;
          let updateUser = await User.findById(req.user._id);
          filename = updateUser.avatar;
          updateUser.avatar = "";
          await updateUser.save();
          fileRemover(filename);
          res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            password: updateUser.password,
            avatar: updateUser.avatar,
            token: await updateUser.generateToken(),
          });
        }
      }
    });
    // Error Handling
  } catch (err) {
    next(err);
  }
};
