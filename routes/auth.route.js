const router = require('express').Router();
const authController = require('../controllers/authController');

router.get('/show', authController.show);
router.get('/show/:id', authController.showOne);
router.post('/register', authController.register);
router.post('/register/:id', authController.create);
router.patch('/update/:id', authController.update);
router.post('/login', authController.login);
module.exports = router;
