const { Comment } = require('../../../model/Comment');
const comment = require('../../comment');
module.exports = async (req, res) => {
    // res.send('OK');
    const pid = req.params.id;
    // console.log(pid);
    Comment.find({ post: pid }).populate('author').then(result => {
        // console.log(result);
        res.send(result);
    }).catch(err => {
        // console.log('出错了');
        res.send('出错了');
    })
}