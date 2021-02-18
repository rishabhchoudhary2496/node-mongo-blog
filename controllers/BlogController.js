class BlogController {
  static Blog
  static validateBlog

  static setData(Blog, validateBlog) {
    this.Blog = Blog
    this.validateBlog = validateBlog
  }

  // @desc    Get all the blogs
  // @route   GET /blog
  // @access  Public
  static getBlogList = async (req, res) => {
    const blogs = await this.Blog.find()
    res.render('Home', { title: 'Home', blogs: blogs })
  }

  // @desc    Create new blog
  // @route   POST /blog
  // @access  Private
  static createBlog = async (req, res) => {
    const { title, content, tags, authorId } = req.body
    const { error } = this.validateBlog({ title, content, authorId })
    if (error) return res.status(400).json({ error: error.details[0].message })
    let blog = await this.Blog.findOne({ title: title })
    if (blog)
      return res.status(400).json({
        message: 'Choose Another Title.Blog With This Title Already Exist',
      })

    blog = new this.Blog({
      title: title,
      content: content,
      tags: tags,
      authorId: authorId,
    })
    await blog.save()
    res.json({ blog })
  }

  // @desc    Get blog by id
  // @route   GET /blog/:id
  // @access  Public
  static getBlog = async (req, res) => {
    const { id } = req.params
    const blog = await this.Blog.findOne({ _id: id })
    if (!blog)
      return res.status(404).json({ message: 'No Blog Exist With This Id' })
    res.render('Blog', { title: 'Blog', blog: blog })
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
