const express = require('express');
const router = express.Router();

const User = require('./Controllers/UserController');
const Bracelet = require('./Controllers/BraceletController');

router.get('/',(req,res)=>res.send(
    'Bracelet Server is Set : { Available entry point : \n ' +
    'POST : /user/create \n' +
    'POST : /user/find \n' +
    'POST : /user/find/bracelet/:id \n' +
    'POST : /bracelet/create/:id \n' +
    'POST : /bracelet/populate/:id \n' +
    ''
));
// user routes
router.post('/user/create',User.create);
router.post('/user/find',User.find);
router.post('/user/find/bracelet/:id', User.braceletsByUser);
router.get('/users', User.findAll)
// bracelet routes
router.get('/bracelets', Bracelet.findAll);
router.post('/bracelet/create',Bracelet.create);
router.post('/bracelet/create/:id', Bracelet.createWithUserID);
router.post('/bracelet/populate/:id',Bracelet.userByBracelet);


module.exports = router;
