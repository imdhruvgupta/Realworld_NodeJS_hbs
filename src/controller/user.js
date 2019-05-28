const {Users} = require('../models');
const {createToken} = require('../utils/jwt');

async function createUser(userOpts) {
    if(!userOpts.username) {
        throw new Error("Did not supply username");
    }
    if(!userOpts.email) {
        throw new Error("Did not supply email");
    }
    if(!userOpts.password) {
        throw new Error("Did not supply password");
    }
    
    const user = await Users.create({
        ...userOpts
    })
    
    if(!user) {
        throw new Error("Error creating user");
    }

    const token = await createToken(user.get());

    return {
        user, token
    };
}

module.exports = {
    createUser
}