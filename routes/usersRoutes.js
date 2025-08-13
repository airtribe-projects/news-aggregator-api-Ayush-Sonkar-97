const express = require('express')
const router = express.Router()
const {registerUser, loginUser} = require('../controllers/usersController')

router.use(express.json())

router.post('/register', async (req,res) => {
    const user = req.body
    const dbUser = await registerUser(user)
    return res.send(dbUser)
});

router.post('/login', async(req, res) => {
    const {email, password} = req.body;
    const result = await loginUser(email, password);
    return res.send(result)
})

module.exports = router;