class BlogController {
  static Blog
  static Comment
  static validateBlog

  static setData(Blog, Comment, validateBlog) {
    this.Blog = Blog
    this.Comment = Comment
    this.validateBlog = validateBlog
  }

  // @desc    Get all the blogs
  // @route   GET /blog
  // @access  Public
  static getBlogList = async (req, res) => {
    const blogs = await this.Blog.find().populate('authorId')

    res.render('Home', { title: 'Home', blogs: blogs })
  }

  static writeBlog = async (req, res) => {
    res.render('CreateBlog', {
      title: 'Create Blog',
    })
  }

  // @desc    Create new blog
  // @route   POST /blog
  // @access  Private
  static createBlog = async (req, res) => {
    console.log(req.body)
    let { title, content, tags } = req.body
    const { error } = this.validateBlog({ title, content })
    if (error) return res.status(400).json({ error: error.details[0].message })
    let blog = await this.Blog.findOne({ title: title })
    if (blog)
      return res.status(400).json({
        message: 'Choose Another Title.Blog With This Title Already Exist',
      })

    tags = JSON.parse(tags)

    blog = new this.Blog({
      title: title,
      content: content,
      tags: tags,
      authorId: req.user._id,
    })
    await blog.save()
    res.json({ blog })
  }

  // @desc    Get blog by id
  // @route   GET /blog/:id
  // @access  Public
  static getBlog = async (req, res) => {
    const { id } = req.params
    const blog = await this.Blog.findOne({ _id: id }).populate('authorId')
    console.log('blog', blog)
    if (!blog)
      return res.status(404).json({ message: 'No Blog Exist With This Id' })

    const comments = await this.Comment.find({ blogId: id }).populate(
      'userId',
      '-password'
    )

    console.log(comments)
    res.render('Blog', {
      title: 'Blog',
      data: { blog: blog, comments: comments },
      layout: './layouts/NavLess',
    })
  }

  // @desc    Update blog
  // @route   PUT /blog/:id
  // @access  Private
  static updateBlog = async (req, res) => {
    const { id } = req.params
    const { title, content, tags } = req.body
    const blog = await this.Blog.findOneAndUpdate(
      { _id: id },
      {
        title: title,
        content: content,
        tags: tags,
      },
      { new: true }
    )

    if (!blog)
      return res.status(404).json({ message: 'No Blog Exist With This Id' })

    res.status(200).json({ blog })
  }

  // @desc    Delete blog
  // @route   DELETE /blog/:id
  // @access  Private
  static deleteBlog = async (req, res) => {
    const { id } = req.params
    const blog = await this.Blog.findOneAndDelete({ _id: id })

    if (!blog)
      return res.status(404).json({ message: 'No Blog Exist With This Id' })

    res.status(200).json({ blog })
  }
}

module.exports = BlogController
