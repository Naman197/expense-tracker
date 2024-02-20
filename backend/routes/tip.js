const express = require('express');
const router = express.Router();
const fetchUser = require('../middlewares/fetchuser'); 
const Tip=require("../schema/tipSchema");
const tipcontroller=require("../controllers/tip");
router.post('/create',fetchUser,tipcontroller.addTip);
router.get('/all',tipcontroller.getAllTips);
router.post('/likes', fetchUser,tipcontroller.likeTip);
router.delete('/likes',fetchUser, tipcontroller.unlikeTip);
router.get('/liketipid',fetchUser,tipcontroller.getLikedTipIds);


module.exports = router;
