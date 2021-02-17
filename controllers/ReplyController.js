class ReplyController {
  static Blog
  static validateReply

  static setData(Blog, validateReply) {
    this.Blog = Blog
    this.validateReply = validateReply
  }

  static postReply = async (req, res) => {}

  static updateReply = async (req, res) => {}

  static deleteReply = async (req, res) => {}
}

module.exports = ReplyController
