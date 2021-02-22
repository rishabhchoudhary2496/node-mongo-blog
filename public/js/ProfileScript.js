window.onload = function () {
  const readBtn = document.getElementById('readBtn')
  let blogId
  readBtn.addEventListener('click', function () {
    blogId = this.dataset.blogid
    window.location.href = `/${blogId}`
  })
}