const {body} = require('express-validator')
const User = require('../../models/User')

//Middlewire
const singupValidator = [
    body('username').isLength({min:5 , max : 15})
    .withMessage(`Username must be between 5-15 character.`)
    .custom(async username => {
        let user =await User.findOne({username})
        if (user) {
            return Promise.reject(`Username already exist.`)
        }
    }),


    body('email')
    .isEmail().withMessage(`Please provide a valid Email.`)
    .custom(async email => {
        let user =await User.findOne({email})
        if (user) {
            return Promise.reject(`Username already exist.`)
        }
    })
    .normalizeEmail()
    .trim(),


    body('password')
        .isLength({min : 7}).withMessage(`Password should be more then 7 character`),


    body('repassword')
        .isLength({min : 7}).withMessage(`Password doesn't match.`)
        .custom((repassword , {req}) => {
            if (repassword !== req.body.password) {
                throw new Error(`Password doesn't match.`)
            }
            return true
        })
]

module.exports = singupValidator 