const router = require('express').Router();
const InvestmentController = require('../controllers/investmentController');

router.post('/create', InvestmentController.postInvestment);
router.get('/show', InvestmentController.showInvestment);
router.get('/show/:id', InvestmentController.showOneInvestment);
router.patch('/update/:id', InvestmentController.updateInvestment);
router.delete('/delete/:id', InvestmentController.deleteInvestment);
router.patch('/onoff/:id', InvestmentController.onOff);

module.exports = router;
