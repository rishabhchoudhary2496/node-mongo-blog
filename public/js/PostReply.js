const postReply = async (formDataJsonString) => {
  try {
    const result = await fetch('http://localhost:5000/reply', {
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

const deleteReply = async (id) => {
  try {
    const result = await fetch(`http://localhost:5000/reply/${id}`, {
      method: 'DELETE',
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
      // window.location.reload()
    }
  } catch (error) {
    console.log(err)
    // window.location.reload()
  }
}

const replyTrashBtn = document.getElementById('replyTrashBtn')
if (replyTrashBtn) {
  replyTrashBtn.addEventListener('click', function () {
    deleteReply(replyTrashBtn.dataset.replyid)
  })
}

const buttons = Array.from(document.querySelectorAll('#replyBtn'))
buttons.forEach(function (button) {
  button.addEventListener('click', function () {
    const commentId = this.dataset.commentid
    console.log(commentId)
    const textArea = this.previousElementSibling
    if (!textArea.value) {
      alert('reply required')
    }
    const formData = new FormData()
    formData.append('replyText', textArea.value)
    formData.append('commentId', commentId)

    const plainFormData = Object.fromEntries(formData.entries())
    const formDataJsonString = JSON.stringify(plainFormData)
    postReply(formDataJsonString)
  })
})
