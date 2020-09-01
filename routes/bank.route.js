const router = require('express').Router();
const bankController = require('../controllers/bankController');

router.get('/show', bankController.show);
router.get('/show/:id', bankController.showOne);
router.post('/create', bankController.create);
router.patch('/update', bankController.update);
module.exports = router;
