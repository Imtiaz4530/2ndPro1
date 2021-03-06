const Profile = require('../../models/Profile')

exports.bookmarkGetController = async (req, res, next)=>{
    let { postId } = req.params
    if (!req.user) {
        return res.status(403).json({
            error : (`You are not an authenticated user.`)
        })
    }
    let bookmarks = null

    try {
        let profile = await Profile.findOne({user:req.user._id})
        if (profile.bookmarks.includes(postId)) {
            await Profile.findOneAndUpdate(
                {user:req.user._id}, {$pull : {'bookmarks': postId}})
                bookmarks: false
        }else{
            await Profile.findOneAndUpdate(
                {user:req.user._id}, {$push : {'bookmarks': postId}})
                bookmarks: true
        }
        res.status(200).json({
            bookmarks
        })
    } catch (e) {
        console.log(e);
        // return res.status(500).json({
        //     error: `Server Error`
        // })
    }
}