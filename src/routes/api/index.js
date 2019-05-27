const {Router} = require("express");
const route = Router();

route.use('/user', require('./user'));
route.use('/users', require('./users'));
route.use('/profiles', require('./profiles'));
route.use('/articles', require('./articles'));
route.use('/tags', require('./tags'));

module.exports = route;
