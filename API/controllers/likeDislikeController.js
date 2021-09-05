const Post = require('../../models/Post')

exports.likeGetController = async (req, res, next)=>{
    let { postId } = req.params
    if (!req.user) {
        return res.status(403).json({
            error : (`You are not an authenticated user.`)
        })
    }

    let user = req.user._id
    let liked = null

    try {
        let post = await Post.findById({_id:postId})
        if (post.dislikes.includes(user)) {
            await Post.findOneAndUpdate({_id:postId},{$pull : {'dislikes':user}})
        }
        if (post.likes.includes(user)) {
            await Post.findOneAndUpdate({_id:postId},{$pull : {'likes':user}})
            liked = false
        }else{
            await Post.findOneAndUpdate({_id:postId},{$push : {'likes':user}})
            liked = true
        }
        let updatedPost = await Post.findById({_id:postId})
        res.status(200).json({
            liked,
            totalLikes: updatedPost.likes.length, 
            totalDisLikes: updatedPost.dislikes.length, 
        })
    } catch (e) {
        console.log(e);
        // return res.status(500).json({
        //     error: `Server Error`
        // })
    }
}
exports.dislikeGetController = async (req, res, next)=>{
    let { postId } = req.params
    if (!req.user) {
        return res.status(403).json({
            error : (`You are not an authenticated user.`)
        })
    }
    let user = req.user._id
    let disliked = null

    try {
        let post = await Post.findById({_id:postId})
        if (post.likes.includes(user)) {
            await Post.findOneAndUpdate({_id:postId},{$pull : {'likes':user}})     
        }
        if (post.dislikes.includes(user)) {
            await Post.findOneAndUpdate({_id:postId},{$pull : {'dislikes':user}})
            disliked = false
        }
        else{
            await Post.findOneAndUpdate({_id:postId},{$push : {'dislikes':user}})
            disliked = true
        }
        let updatedPost = await Post.findById({_id:postId})
        res.status(200).json({
            disliked,
            totalLikes:updatedPost.likes.length, 
            totalDisLikes:updatedPost.dislikes.length, 
        })
    } catch (e) {
        console.log(e);
        // return res.status(500).json({
        //     error: `Server Error`
        // })
    }
}