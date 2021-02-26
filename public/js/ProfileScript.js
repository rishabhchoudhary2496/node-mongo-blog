window.onload = function () {
  const readBtns = Array.from(document.querySelectorAll('#readBtn'))
  let blogId
  if (readBtns.length > 0) {
    readBtns.forEach(function (readBtn) {
      readBtn.addEventListener('click', function () {
        blogId = this.dataset.blogid
        window.location.href = `/${blogId}`
      })
    })
  }
}
