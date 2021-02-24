const postComment = async (blogId, formDataJsonString) => {
  try {
    const result = await fetch(`http://localhost:5000/comment/${blogId}`, {
      method: 'POST',
      body: formDataJsonString,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })

    const data = await result.json()
    if (result.status == 200) {
      window.location.reload()
    } else {
      alert(data)
      window.location.reload()
    }
  } catch (error) {
    console.log(err)
    window.location.reload()
  }
}

const deleteComment = async (id) => {
  try {
    const result = await fetch(`http://localhost:5000/comment/${id}`, {
      method: 'DELETE',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })

    const data = await result.json()
    console.log(result)
    if (result.status == 200) {
      window.location.reload()
    } else {
      alert(data)
      window.location.reload()
    }
  } catch (error) {
    console.log(err)
    window.location.reload()
  }
}

const updateComment = async (id, formDataJsonString) => {
  try {
    const result = await fetch(`http://localhost:5000/comment/${id}`, {
      method: 'PUT',
      body: formDataJsonString,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })

    const data = await result.json()
    if (result.status == 200) {
      window.location.reload()
    } else {
      alert(data)
      window.location.reload()
    }
  } catch (error) {
    console.log(err)
    window.location.reload()
  }
}

const editIcon = document.querySelector('.editIcon')

editIcon.addEventListener('click', function () {
  console.log('edit')
  const updateCommentBox = document.getElementById('updateCommentBox')
  updateCommentBox.classList.toggle('hideElement')
  const comment = document.getElementById('commentText')
  let commentText = comment.innerText
  comment.classList.toggle('hideElement')
  const editTextArea = document.getElementById('editCommentArea')
  editTextArea.value = commentText
})

const updateCommentBtn = document.getElementById('updateCommentBtn')

updateCommentBtn.addEventListener('click', function () {
  const editTextAreaValue = document.getElementById('editCommentArea').value
  const id = updateCommentBtn.dataset.commentid
  if (!editTextAreaValue) alert('comment required')
  console.log('update comment', editTextAreaValue, id)
  const formData = new FormData()
  formData.append('commentText', editTextAreaValue)
  const plainFormData = Object.fromEntries(formData.entries())
  const formDataJsonString = JSON.stringify(plainFormData)
  updateComment(id, formDataJsonString)
})

const form = document.getElementById('comment-form')
const trashBtn = document.getElementById('trashBtn')
if (trashBtn) {
  trashBtn.addEventListener('click', function () {
    deleteComment(trashBtn.dataset.commentid)
  })
}

const pristine = new Pristine(form)

form.addEventListener('submit', function (e) {
  //slicing / from id
  e.preventDefault()
  const blogId = window.location.pathname.slice(1)
  console.log('blogId')
  const valid = pristine.validate()
  if (valid) {
    const formData = new FormData()
    for (let i = 0; i < form.length; i++) {
      formData.append(form[i].name, form[i].value)
    }
    formData.delete('')

    const plainFormData = Object.fromEntries(formData.entries())
    const formDataJsonString = JSON.stringify(plainFormData)
    postComment(blogId, formDataJsonString)
  }
})
