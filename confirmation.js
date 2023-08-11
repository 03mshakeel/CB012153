const fullName = document.getElementById('name')
const currentDate = document.getElementById('date')
const selecteddurations = document.getElementById('time')
const selecttime = document.getElementById('duration')
const mobile = document.getElementById('mobile')
const email = document.getElementById('email')
const gender = document.getElementById('gender')
const sumcontent = document.getElementById('sum-content')

window.addEventListener('load' , ()=>{
    fullName.innerText =localStorage.getItem("name");
    currentDate.innerText = localStorage.getItem('currentDate');
    selecteddurations.innerText = localStorage.getItem('selectedduration');
    selecttime.innerText = localStorage.getItem('selecttime');
    mobile.innerText = localStorage.getItem('mobile');
    email.innerText = localStorage.getItem('email');
    gender.innerText = localStorage.getItem('gender');
    sumcontent.innerHTML += localStorage.getItem('newTable')
})