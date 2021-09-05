const {body} = require('express-validator')
const User = require('../../models/User')

const loginValidator = [
    body('email').not().isEmpty().withMessage(`Email cannot be empty.`),
    body('password').not().isEmpty().withMessage(`Password cannot be empty.`)
]

module.exports = loginValidator