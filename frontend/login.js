

form = document.getElementById('form')

form.addEventListener('submit', (e) => {
  e.preventDefault()

  let formData = {
    "username": form.username.value,
    "password": form.password.value
  }

  console.log(formData)

  fetch('http://127.0.0.1:8000/api/users/token/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.access) {
        localStorage.setItem('token', data.access)
        window.location = 
          'file:///home/veekthorcodes/Desktop/devsearch/frontend/main.html'
        ;
      }
    })
})