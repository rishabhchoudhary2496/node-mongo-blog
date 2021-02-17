class CommentController {
  static Blog
  static validateComment
  static mongoose

  static setData = (Blog, validateComment, mongoose) => {
    this.Blog = Blog
    this.validateComment = validateComment
    this.mongoose = mongoose
  }

  // @desc    post new comment
  // @route   POST /comment
  // @access  Private
  static postComment = async (req, res) => {
    const { commentText, userId, blogId } = req.body
    const { error } = this.validateComment({ commentText, userId })
    if (error) return res.status(400).json({ error: error.details[0].message })

    if (!blogId) return res.status(400).json({ message: 'Blog Id required' })
    const blog = await this.Blog.findOne({ _id: req.body.blogId })
    blog.comments.push({
      commentText: commentText,
      userId: userId,
    })
    await blog.save()
    res.json({ comment: blog.comments })
  }

  // @desc    update comment
  // @route   PUT /comment
  // @access  Private
  static updateComment = async (req, res) => {
    let { commentText, blogId } = req.body
    let { id } = req.params

    const blog = this.blog.find({ _id: blogId })
    if (!blog) return res.status(404).json({ message: "Blog Doesn't exist" })

    let comment = await this.Blog.findOneAndUpdate(
      {
        'comments._id': id,
      },
      {
        $set: {
          'comments.$.commentText': commentText,
        },
      },
      { new: true }
    )
    res.status(200).json(comment)
  }

  // @desc    delete comment
  // @route   DELETE /comment
  // @access  Private
  static deleteComment = async (req, res) => {
    const { id } = req.params
    let comment = await this.Blog.findOneAndUpdate(
      { 'comments._id': id },
      { $pull: { comments: { _id: id } } },
      { new: true }
    )
    if (!comment) {
      return res.status(404).json({ message: 'comment was not found' })
    }
    res.status(200).json({ comment })
  }
}

module.exports = CommentController
