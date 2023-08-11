       window.addEventListener('DOMContentLoaded' , ()=>{
        const sumtable = document.getElementById('sum-content')
        sumtable.innerHTML = localStorage.getItem('SummaryTable');
       })
       
       // Function to validate email format
       const MobileNum = document.getElementById("MobileNum");
       MobileNum.addEventListener("change", ()=>{

       })
       
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        // Function to validate the form fields and enable the button if valid
        function validateForm() {
            const fullName = document.getElementById("FullName").value.trim();
            const email = document.getElementById("Email").value.trim();
            const confirmEmail = document.getElementById("ConfirmEmail").value.trim();
            const mobileNum = document.getElementById("MobileNum").value.trim();
            const gender = document.getElementById("Gender").value.trim();

            const fullNameError = document.querySelector("#FullName + .error");
            const emailError = document.querySelector("#Email + .error");
            const confirmEmailError = document.querySelector("#ConfirmEmail + .error");
            const mobileNumError = document.querySelector("#MobileNum + .error");

            let isValidForm = true;

            // Validate Full Name (required field)
            if (fullName === "") {
                fullNameError.textContent = "Full Name is required";
                isValidForm = false;
            } else {
                fullNameError.textContent = "";
            }

            // Validate Email (required and correct format)
            if (email === "") {
                emailError.textContent = "Email is required";
                isValidForm = false;
            } else if (!isValidEmail(email)) {
                emailError.textContent = "Invalid email format";
                isValidForm = false;
            } else {
                emailError.textContent = "";
            }

            // Validate Confirm Email (required and must match Email field)
            if (confirmEmail === "") {
                confirmEmailError.textContent = "Please confirm your email";
                isValidForm = false;
            } else if (confirmEmail !== email) {
                confirmEmailError.textContent = "Emails do not match";
                isValidForm = false;
            } else {
                confirmEmailError.textContent = "";
            }

            // Validate Mobile Number (required and must be a number)
            if (mobileNum === "") {
                mobileNumError.textContent = "Mobile Number is required";
                isValidForm = false;
            } else if (isNaN(mobileNum)) {
                mobileNumError.textContent = "Mobile Number must be a number";
                isValidForm = false;
            } else {
                mobileNumError.textContent = "";
            }

            // Enable the "Continue with purchase" button if the form is valid
            const nextBtn = document.getElementById("nextbtn");
            nextBtn.disabled = !isValidForm;

            localStorage.setItem('name' , fullName);
            localStorage.setItem('mobile' , mobileNum);
            localStorage.setItem('email' , email);
            localStorage.setItem('gender' , gender);
        }

        // Add event listeners for input fields to trigger form validation on input changes
        const formInputs = document.querySelectorAll("#Form input, #Form select");
        formInputs.forEach((input) => {
            input.addEventListener("input", validateForm);
        });

        // Call validateForm initially to disable the button when the page loads
        // validateForm();

        const nextBtn = document.getElementById("nextbtn");

        nextBtn.addEventListener("click" , (r) => {
            r.preventDefault();
            let summaryTable = document.getElementById("sum-content");
            let rows = summaryTable.getElementsByTagName("tr");
            
            // let partialTable = document.createElement("table");
            let tbody = document.createElement("tbody");
            
            for (let i = 3; i < rows.length; i++) { // Start from the 4th row
              let newRow = document.createElement("tr");
              newRow.innerHTML = rows[i].innerHTML;
              tbody.appendChild(newRow);
            }
            
            // partialTable.appendChild(tbody);
            
            localStorage.setItem("newTable", tbody.innerHTML);
            window.location.href="./payments.html";
        })