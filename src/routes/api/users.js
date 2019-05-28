const {Router} = require('express');
const route = Router();
const {createUser} = require('../../controller/user');

route.post('/', async (req, res) => {
    console.log(req.body.user)
    const createdUser = await createUser(req.body.user);
    res.send(createdUser);
})

module.exports = route;
