const sendSignUpRequest = async (formDataJsonString) => {
  try {
    const result = await fetch('http://localhost:5000/user/signup', {
      method: 'POST',
      body: formDataJsonString,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })

    const data = await result.json()
    console.log(result.status)
    if (result.status == 200) {
      window.location.href = '/login'
    } else {
      alert(data.error)
      window.location.reload()
    }
  } catch (error) {
    console.log(err)
    window.location.reload()
  }
}

window.onload = function () {
  const form = document.getElementById('signUpForm')
  const password = document.getElementById('password')
  const confirmPassword = document.getElementById('confirmPassword')
  const pristine = new Pristine(form)

  pristine.addValidator(
    confirmPassword,
    function () {
      // here `this` refers to the respective input element
      if (this.value === password.value) {
        return true
      }
      return false
    },
    "Password doesn't match",
    false
  )

  form.addEventListener('submit', function (e) {
    e.preventDefault()
    // check if the form is valid
    const valid = pristine.validate() // returns true or false
    if (valid) {
      const formData = new FormData()
      for (let i = 0; i < form.length; i++) {
        formData.append(form[i].name, form[i].value)
      }
      formData.delete('')
      formData.delete('confirmPassword')

      const plainFormData = Object.fromEntries(formData.entries())
      const formDataJsonString = JSON.stringify(plainFormData)

      console.log(formDataJsonString)
      //sending ajax request
      sendSignUpRequest(formDataJsonString)
    }
  })
}
