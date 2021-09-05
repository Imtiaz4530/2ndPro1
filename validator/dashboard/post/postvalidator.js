const { body } = require('express-validator')
const cheerio = require('cheerio')

module.exports = [
    body('title').not().isEmpty().withMessage(`Title cannot be empty`)
                 .isLength({max:100}).withMessage(`Title cannot be more then 100 chars`)
                 .trim(),
    body('body').not().isEmpty().withMessage(`Body cannot be empty`)
                .custom(value => {
                    let node = cheerio.load(value)
                    let text = node.text()

                    if (text.length > 5000) {
                        throw new Error(`Post cannot be more then 5000 chars`)
                    }
                    return true
                })
]