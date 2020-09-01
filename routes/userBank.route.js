const userBankController = require('../controllers/userBankController');
const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/show', verify, userBankController.show);
router.post('/create', verify, userBankController.create);
router.patch('/upmoneyacc/:id', verify, userBankController.upmoneyAccNum);
router.patch('/upmoneycard/:id', verify, userBankController.upmoneyCardNum);

module.exports = router;
