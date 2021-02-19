const postComment = async (formDataJsonString) => {
  try {
    const result = await fetch('http://localhost:5000/comment', {
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

window.onload = function () {
  const form = document.getElementById('commentForm')

  const pristine = new Pristine(form)

  form.addEventListener('submit', function (e) {
    //slicing / from id
    const blogId = window.location.pathname.slice(1)
    e.preventDefault()
    const valid = pristine.validate()
    if (valid) {
      const formData = new FormData()
      for (let i = 0; i < form.length; i++) {
        formData.append(form[i].name, form[i].value)
      }
      formData.append('blogId', blogId)
      formData.delete('')

      const plainFormData = Object.fromEntries(formData.entries())
      const formDataJsonString = JSON.stringify(plainFormData)
      postComment(formDataJsonString)
    }
  })
}
