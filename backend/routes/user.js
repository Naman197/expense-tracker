const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');
const multer=require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads'); 
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname); 
    },
  });
//const upload = multer({ storage: storage });
const upload = multer({ dest: "./upload" });
const fetchUser = require('../middlewares/fetchuser'); 
router.post('/create', auth.register);
router.post('/update', fetchUser,upload.single('profilePhoto'), auth.updateProfilePicture); 
router.post('/login', auth.login);

module.exports = router;
