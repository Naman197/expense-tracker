const Tip = require("../schema/tipSchema");
const Like = require("../schema/LikeSchema");
const User=require("../schema/userSchema");
const tipController = {
  addTip: async (req, res) => {
    try {
      const { tipText, likes, datePosted } = req.body;
      const { Sub } = req.userId;
      const userId = Sub;
      const user = await User.findById(userId);


      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const newTip = new Tip({
        userId,
        username:user.username,
        tipText,
        likes: likes || 0,
        datePosted: datePosted || new Date(),
      });

      await newTip.save();

      res.status(201).json({ message: 'Tip added successfully', tip: newTip });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getAllTips: async (req, res) => {
    try {
      const tips = await Tip.find();

      res.status(200).json({ tips });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  likeTip: async (req, res) => {
    try {
      const { tipId } = req.query;
      const userId = req.userId.Sub;
      console.log("tipid",req.query);
      const existingLike = await Like.findOne({ userId: userId, tipId: tipId });
      if (existingLike) {
        return res.status(400).json({ message: 'You have already liked this tip.' });
      }

      const newLike = new Like({ userId: userId, tipId: tipId });
      await newLike.save();

      await Tip.findByIdAndUpdate(tipId, { $inc: { likes: 1 } });

      res.status(200).json({ message: 'Tip liked successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  unlikeTip: async (req, res) => {
    try {
      const { tipId } = req.query;
      const userId = req.userId.Sub;
      console.log("userid",userId);
      console.log("tipid",tipId);
      const deletedLike = await Like.findOneAndDelete({ userId: userId, tipId: tipId });

      if (!deletedLike) {
        return res.status(404).json({ message: 'Like not found.' });
      }

      
      await Tip.findByIdAndUpdate(tipId, { $inc: { likes: -1 } });

      res.status(200).json({ message: 'Tip unliked successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  getLikedTipIds: async (req, res) => {
    try {
      const userId = req.userId.Sub;
      console.log("gettiplike user id  ",userId);

      const likedTipIds = await Like.find({ userId: userId }).distinct('tipId');

      console.log("getipslike",likedTipIds);

      res.status(200).json({ likedTipIds });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = tipController;
