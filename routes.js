const express = require('express');
const router = express.Router();

const User = require('./Controllers/UserController');
const Bracelet = require('./Controllers/BraceletController');

router.get('/',(req,res)=>res.send('ok'));
// user routes
router.post('/user/create',User.create);
router.post('/user/find',User.find);
router.post('/user/find/post/:id', User.braceletsByUser);
// post routes
router.post('/bracelet/create/:id', Bracelet.create);
router.post('/bracelet/populate/:id',Bracelet.userByBracelet);

module.exports = router;
