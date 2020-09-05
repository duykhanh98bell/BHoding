const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

// express app.
const app = express();
const port = 3000;

app.use('/eleccontracts', express.static('elecContracts'));

const InvestmentRoute = require('./routes/investment.route');
const BankRoute = require('./routes/bank.route');
const AuthRoute = require('./routes/auth.route');
const InvestmentListRoute = require('./routes/investmentList.route');
const UserBankRoute = require('./routes/userBank.route');
const WalletRoute = require('./routes/wallet.route');
// connect to mongodb.
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// middleware & static files.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

//router
app.use('/investment', InvestmentRoute);
app.use('/bank', BankRoute);
app.use('/users', AuthRoute);
app.use('/investmentlist', InvestmentListRoute);
app.use('/userBank', UserBankRoute);
app.use('/wallet', WalletRoute);

app.listen(port, () => console.log(`Listening at: ${port}...`));
