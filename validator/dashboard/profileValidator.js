const { body } = require('express-validator')
const validator = require('validator')


module.exports = [
    body('name').not().isEmpty().withMessage(`Name cannot be empty.`).isLength({max : 30}).withMessage(`Name cannot be more then 30 chars.`).trim(),
    body('title').not().isEmpty().withMessage(`Title cannot be empty.`).isLength({max : 100}).withMessage(`Title cannot be more then 100 chars.`).trim(),
    body('bio').not().isEmpty().withMessage(`Bio cannot be empty.`).isLength({max : 500}).withMessage(`Bio cannot be more then 500 chars.`).trim(),
    body('website').custom(value => {
        if (value) {
            if (!validator.isURL(value)) {
                throw new Error(`Please provide a valid URL.`)
            }
        }
        return true
    }),
    body('facebook').custom(value => {
        if (value) {
            if (!validator.isURL(value)) {
                throw new Error(`Please provide a valid URL.`)
            }
        }
        return true
    }),
    body('twitter').custom(value => {
        if (value) {
            if (!validator.isURL(value)) {
                throw new Error(`Please provide a valid URL.`)
            }
        }
        return true
    }),
    body('github').custom(value => {
        if (value) {
            if (!validator.isURL(value)) {
                throw new Error(`Please provide a valid URL.`)
            }
        }
        return true
    })
]