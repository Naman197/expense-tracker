const User = require('../schema/userSchema'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const multer=require('multer');
//const clodinarys = require('./cloudinary'); 
const { uploadUserProfileImage } = require('./cloudinary');
function createToken(user) {
    return jwt.sign({ Sub: user.id }, '1234', { expiresIn: '1h' });
}

async function register(req, res) {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields.' });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: 'User with this email already exists.' });
        }

        const user = new User({ username, email, password });
        await user.save();

        const token = createToken(user);
        res.json({ token, user: { username: user.username, email: user.email,profilePhoto:user.profilePhoto} });    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


async function login(req, res) {
    try {
        const { email, password } = req.body;
         console.log(req.body);
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password.' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Authentication failed. User not found.' });
        }

       
        const isPasswordValid = await user.validatePassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Authentication failed. Incorrect password.' });
        }

        const token = createToken(user);
        
        res.json({ token, user: { username: user.username, email: user.email,profilePhoto:user.profilePhoto} });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
async function updateProfilePicture(req, res) {
  try {
    const uploadedProfilePicture = req.file;
    const { Sub } = req.userId;
    console.log("here", req.file);
    const userId = Sub;

    if (!uploadedProfilePicture) {
      return res.status(400).json({ message: 'No profile picture uploaded.' });
    }
    try {
      const imageUrl = await uploadUserProfileImage(userId, uploadedProfilePicture);

      console.log('after', imageUrl);
      const user = await User.findByIdAndUpdate(
        userId,
        { profilePhoto: imageUrl },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      return res.status(200).json({ message: 'Profile picture updated successfully.', user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error uploading profile image.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}


module.exports = {
    register,
   login,
   updateProfilePicture,
  };