const express = require('express');
const router = express.Router();

const User = require('./Controllers/UserController');
const Bracelet = require('./Controllers/BraceletController');
const History = require('./Controllers/HistoryController');
const Tools = require('./Controllers/ToolsController');

router.get('/', (req, res) => res.send(
    'Bracelet Server is Set : { Available entry point : \n ' +
    'POST : /user/create \n' +
    'POST : /user/find \n' +
    'POST : /user/find/bracelet/:id \n' +
    'POST : /bracelet/create/:id \n' +
    'POST : /bracelet/populate/:id \n' +
    ''
));
// user routes
router.post('/user/create', User.create);
router.get('/user/find/:id', User.find);
router.get('/user/find/bracelet/:id', User.braceletsByUser);
router.get('/users', User.findAll);

// Login operation
router.post('/account/login', User.login);

// bracelet routes
router.get('/bracelets', Bracelet.findAll);
router.get('/bracelet/:id', Bracelet.findByID);

router.post('/bracelet/create', Bracelet.create);
router.post('/bracelet/create/:id', Bracelet.createWithUserID);
router.post('/bracelet/populate/:id', Bracelet.userByBracelet);

// affect Bracelet ID to User with it's id , if bracelet is not assigned to anyone
router.get('/bracelet/affect/:braceletid/to/:userid', Bracelet.affectBraceletToUser);
router.get('/bracelet/unpair/:braceletid', Bracelet.unpairdBraceletWithID);

// History & Position manager

router.post('/history/create/:id', History.create);
router.get('/history/find/:id', History.historyByBracelet);
router.get('/histories', History.findAll);


// email test

router.get('/test/email', Tools.sendEmail);

module.exports = router;
