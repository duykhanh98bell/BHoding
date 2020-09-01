const verify = require('./verifyToken');
const router = require('express').Router();
const walletController = require('../controllers/walletController');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './bills/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/pdf'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter,
});

router.get('/history', verify, walletController.show);
router.post(
  '/loadedpoint/:id',
  verify,
  upload.single('bill'),
  walletController.loadedPoint
); //nap tien
router.post('/withdraw/:id', verify, walletController.withdraw); // rut tien
router.get('/statusfalse', walletController.statusFalse); // admin kiem tra status
router.patch('/acceptloadedpoint/:id', walletController.acceptLoadedPoint); // admin accept
router.patch('/acceptwithdraw/:id', walletController.acceptWithdraw); // admin accept

router.get('/totalpoint', verify, walletController.totalPoint);
router.get('/totalinvested', walletController.totalInvested);
router.get('/countacc', walletController.countAcc);
router.get('/totalloaded', walletController.totalLoaded);
router.get('/totalwithdraw', walletController.totalWithdraw);

//Dashboard
router.get('/totalcomission', verify, walletController.totalComission);
router.get('/countusersunder', verify, walletController.countUsersUnder);
module.exports = router;
