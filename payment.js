window.addEventListener('DOMContentLoaded' , ()=>{
    const sumtable = document.getElementById('sum-content')
    const payable = document.getElementById('payable')
    sumtable.innerHTML = localStorage.getItem('SummaryTable');
    payable.innerText = localStorage.getItem('totalamount')
   })
 // Function to validate the form fields
 function validateForm() {
    const cardNum = document.getElementById("Cardnum").value;
    const exDate = document.getElementById("exdate").value;
    const cvv = document.getElementById("CVV").value;
    const cardName = document.getElementById("Cardname").value;

    const cardNumRegex = /^\d{16}$/;
    const exDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvRegex = /^\d{3}$/;

    let valid = true;

    // Validate card number
    if (!cardNumRegex.test(cardNum)) {
        valid = false;
        setErrorFor("Cardnum", "Invalid card number");
    } else {
        setSuccessFor("Cardnum");
    }

    // Validate expiry date
    if (!exDateRegex.test(exDate)) {
        valid = false;
        setErrorFor("exdate", "Invalid expiry date (Format: MM/YY)");
    } else {
        setSuccessFor("exdate");
    }

    // Validate CVV
    if (!cvvRegex.test(cvv)) {
        valid = false;
        setErrorFor("CVV", "Invalid CVV (must be 3 digits)");
    } else {
        setSuccessFor("CVV");
    }

    // Validate card name
    if (cardName.trim() === "") {
        valid = false;
        setErrorFor("Cardname", "Name on card cannot be empty");
    } else {
        setSuccessFor("Cardname");
    }

    return valid;
}

// Function to set error message for a field
function setErrorFor(inputId, message) {
    const inputContainer = document.querySelector(`#${inputId}`).closest(".input-cont");
    const errorElement = inputContainer.querySelector(".error");
    inputContainer.classList.add("error");
    errorElement.innerText = message;
}

// Function to clear error message for a field when it's valid
function setSuccessFor(inputId) {
    const inputContainer = document.querySelector(`#${inputId}`).closest(".input-cont");
    inputContainer.classList.remove("error");
    inputContainer.classList.add("success");

    // Clear the error message
    const errorElement = inputContainer.querySelector(".error");
    errorElement.innerText = "";
}

// Event listener to validate the form and enable/disable the Pay button
const form = document.getElementById("Form");
const pay = document.getElementById("nextbtn");
form.addEventListener("input", function () {
    if (validateForm()) {
        pay.disabled = false;
    } else {
        pay.disabled = true;
    }
});

const Pay = document.getElementById("nextbtn");

pay.addEventListener("click" , (r) => {
    r.preventDefault();
    window.location.href="./confirmation.html";
})