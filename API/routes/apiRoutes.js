const router = require('express').Router()
const {isUnAuthenticated} = require('../../custom middlewire/authMiddleWire')
const {isAuthenticated}  = require('../../custom middlewire/authMiddleWire')

const {commentPostController,replyPostController} = require('../controllers/commentC')
const {likeGetController,dislikeGetController} = require('../controllers/likeDislikeController')
const {bookmarkGetController} = require('../controllers/bookmarkController')

router.post('/comments/:postId',isAuthenticated,commentPostController)
router.post('/comments/replies/:commentId',isAuthenticated,replyPostController)

router.get('/likes/:postId',isAuthenticated,likeGetController)
router.get('/dislikes/:postId',isAuthenticated,dislikeGetController)

router.get('/bookmarks/:postId',isAuthenticated,bookmarkGetController)



module.exports = router