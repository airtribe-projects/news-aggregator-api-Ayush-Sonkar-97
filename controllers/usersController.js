// require('dotenv').config()
const usersModels = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const rounds = parseInt(process.env.ROUNDS) || 5
// const rounds = 5

const registerUser = async(user) => {
    user.password = await bcrypt.hash(user.password, rounds)
    return await usersModels.create(user)
}

const loginUser = async(email, password) => {
    // Select the login method
    const body = {
        email: email
    }
    // check if the user exist
    const dbUser = await usersModels.findOne(body)
    if(!dbUser)
        throw new Error('User not found')

    // check if the password is same
    const isSame = await bcrypt.compare(password, dbUser.password)
    console.log(isSame)
    if(!isSame) throw new Error("Password is invalid")

    const token = jwt.sign({ username: dbUser.email, role: dbUser.role }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN })
    console.log(token)
    
    // finally sending the response as a user's id
    return {status:'ok', user: {id:dbUser.id}};
}

module.exports = {registerUser, loginUser}