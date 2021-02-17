class CommentController {
  static Comment
  static Blog
  static User
  static validateComment
  static validateCommentText

  static setData = (
    Comment,
    Blog,
    User,
    validateComment,
    validateCommentText
  ) => {
    this.Comment = Comment
    this.Blog = Blog
    this.User = User
    this.validateComment = validateComment
    this.validateCommentText = validateCommentText
  }

  // @desc    get blog comment
  // @route   GET /comment
  // @access  Public
  static getBlogComments = async (req, res) => {
    const { blogId } = req.params
    const comments = await this.Comment.find({ blogId: blogId })
    res.json({ comments })
  }

  // @desc    post new comment
  // @route   POST /comment
  // @access  Private
  static postComment = async (req, res) => {
    const { commentText, userId, blogId } = req.body
    const { error } = this.validateComment({ commentText, userId, blogId })
    if (error) return res.status(400).json({ error: error.details[0].message })

    const user = await this.User.findOne({ _id: userId })
    if (!user)
      return res.status(400).json({ message: 'user not have a account' })

    const blog = await this.Blog.findOne({ _id: blogId })
    if (!blog) return res.status(404).json({ message: "Blog doesn't exist" })

    const comment = new this.Comment({
      commentText: commentText,
      userId: userId,
      blogId: blogId,
    })

    await comment.save()
    res.json({ comment })
  }

  // @desc    update comment
  // @route   PUT /comment
  // @access  Private
  static updateComment = async (req, res) => {
    let { commentText } = req.body
    const { id } = req.params

    const { error } = this.validateCommentText({ commentText })
    if (error) return res.status(400).json({ error: error.details[0].message })

    const comment = await this.Comment.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          commentText: commentText,
        },
      },
      { new: true }
    )
    if (!comment)
      return res.status(200).json({ message: 'Comment with this id not found' })
    res.status(200).json(comment)
  }

  // @desc    delete comment
  // @route   DELETE /comment
  // @access  Private
  static deleteComment = async (req, res) => {
    const { id } = req.params
    const comment = await this.Comment.findOneAndDelete({ _id: id })
    if (!comment)
      return res.status(200).json({ message: 'Comment with this id not found' })
    res.status(200).json({ comment })
  }
}

module.exports = CommentController
