const router = require('express').Router();
const investmentListController = require('../controllers/investmentListController');
const verify = require('./verifyToken');
const multer = require('multer');
const { route } = require('./investment.route');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './ElecContracts/');
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

router.post(
  '/trading',
  verify,
  upload.single('elecContract'),
  investmentListController.trading
);
router.get('/investmentAll', investmentListController.all);
router.get('/investmentfalse', investmentListController.false);
router.patch(
  '/acceptinvestment/:id',
  investmentListController.acceptInvestment
);
router.get('/statistical', verify, investmentListController.statistical);
module.exports = router;
