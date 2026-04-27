

if (localStorage.getItem('login')) 
    { window.location.href = 'dashboard.html'
}


const loginForm = document.getElementById('login-form')

loginForm.addEventListener('submit',(event) => { 
event.preventDefault() 
const userName = document.getElementById('username').value;
const userPassword = document.getElementById('password').value;



if (userName === '' || userPassword === '') {
document.getElementById('login-error').classList.remove('hidden')
return}

localStorage.setItem('login' , userName)

window.location.href = 'dashboard.html'

})









