const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

// express app.
const app = express();
const port = process.env.PORT;

// import routes

app.use('/eleccontracts', express.static('elecContracts'));

const userRoute = require('./routes/userRoute');
const InvestmentRoute = require('./routes/investment.route');
const BankRoute = require('./routes/bank.route');
const InvestmentListRoute = require('./routes/investmentList.route');
const UserBankRoute = require('./routes/userBank.route');
const WalletRoute = require('./routes/wallet.route');
// connect to mongodb.
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

app.listen(port, () => console.log(`Listening at: ${port}...`));

// middleware & static files.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// api route.
app.use('/users', userRoute);

app.use('/investment', InvestmentRoute);
app.use('/bank', BankRoute);
app.use('/investmentlist', InvestmentListRoute);
app.use('/userBank', UserBankRoute);
app.use('/wallet', WalletRoute);
// api route.
//app.use('/api/introduces', require('./api/routes/introduceRoute'));

// 404 pages.
app.use((req, res) => {
  res.status(404).send('404');
});

// error handling middleware.
app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

// Tu dong tra co tuc (dividends)
const User = require('./models/userModel');
const Wallet = require('./models/historyModel');
// async function dividends() {
//   try {
//     const users = await User.find();
//     for (var i = 0; i < users.length; i++) {
//       const user = users[i];
//       await User.updateOne(
//         { _id: user['_id'] },
//         {
//           $set: {
//             dividends: user['dividends'] + user['invested'] * 100,
//             point: user['point'] + user['invested'] * 100,
//           },
//         }
//       );
//       const WalletDividends = Wallet({
//         user_id: user['_id'],
//         rc_wd_cms_dv: 3,
//         point: user['invested'] * 100,
//         bill: null,
//         status: true,
//       });
//       await WalletDividends.save();
//       console.log('ok');
//     }
//   } catch (err) {
//     console.log({ message: err });
//   }
// }
//7.776.000
//2592000
// setTimeout(dividends, 2 * 1000);
// setInterval(dividends, 10 * 1000);
// setInterval(dividends, 2592000 * 1000);
