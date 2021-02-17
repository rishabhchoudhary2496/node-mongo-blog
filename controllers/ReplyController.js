class ReplyController {
  static Comment
  static User
  static validateReply

  static setData(Comment, User, validateReply) {
    this.Comment = Comment
    this.User = User
    this.validateReply = validateReply
  }

  static postReply = async (req, res) => {
    const { replyText, commentId } = req.body
    const { error } = this.validateComment({ replyText, commentId })
    if (error) return res.status(400).json({ error: error.details[0].message })

    let comment = await this.Comment.findOne({ _id: commentId })
    if (!comment) return res.status(200).json({ message: 'comment not found' })
    comment = comment.replies.push({
      replyText: replyText,
      commentId: commentId,
      userId: req.user._id,
    })
    await comment.save()
    res.status(200).json({ comment })
  }

  static updateReply = async (req, res) => {
    const { replyText, commentId } = req.body
    //update reply
  }

  static deleteReply = async (req, res) => {
    //delete reply
  }
}

module.exports = ReplyController
