const router = require('express').Router();
const userController = require('../controllers/userController');
const verify = require('./verifyToken');
const Speakeasy = require("speakeasy");

router.post("/totp-secret", (request, response, next) => {
    var secret = Speakeasy.generateSecret({ length: 20 });
    response.send({ "secret": secret.base32 });
});

router.post("/totp-generate", (request, response, next) => {
    response.send({
        "token": Speakeasy.totp({
            secret: request.body.secret,
            encoding: "base32"
        }),
        "remaining": (30 - Math.floor((new Date()).getTime() / 1000.0 % 30))
    });
});

router.post("/totp-validate", (request, response, next) => {
    response.send({
        "valid": Speakeasy.totp.verify({
            secret: request.body.secret,
            encoding: "base32",
            token: request.body.token,
            window: 0
        })
    });
});

router.get('/show', userController.show);
router.get('/show/:id', userController.showOne);
router.get('/me', verify, userController.yourProfile);
router.get('/active/:activeToken', userController.activeToken);
router.post('/token', userController.token);
router.post('/register', userController.register);
router.post('/register/:id', userController.create);
router.patch('/update/:id', userController.update);
router.post('/login', userController.login);
router.delete('/logout', userController.logout);

module.exports = router;
