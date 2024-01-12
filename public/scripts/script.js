// function toggleAccordion(itemId, button) {
//     const element = document.getElementById(itemId);
//     const container = document.querySelector('.acordion');
//     if (element.style.display === "none" || element.style.display === "") {
//         element.style.display = "block";
//         container.style.boxShadow = "0px 1px 1px rgba(0, 0, 0, 0.1)";
//         button.nextElementSibling.style.display = "inline-block";
//         button.style.display = "none";
//     }
//     else {
//         element.style.display = "none";
//         button.style.display = "none";
//         button.previousElementSibling.style.display = "inline-block";
//         container.style.boxShadow = "none";
//     }
// }
const submit = document.querySelector('.submit');
const user_name_error = document.getElementById('invalid_name');
const smallPassword = document.getElementById('small_password');
submit.addEventListener('click', function (event) {

    var pattern = /^[a-zA-Z0-9._]+$/;
    var userInput = document.getElementById('name').value;
    const password = document.getElementById('reg_password').value;
    const email = document.getElementById('reg_email');

    
   
    if (!userInput & !email & !password){
        return
    }
    
   
    for (var i = 0; i < userInput.length; i++) {
        if (!pattern.test(userInput[i])) {
            user_name_error.style.display = 'flex';
            event.preventDefault();
            return;
        }
        else {
            user_name_error.style.display = 'none';
        }
    }
    
    if (password.length >= 6) {
        smallPassword.style.display = 'none';
        
    }
    
    if (password.length < 6) {
        smallPassword.style.display = 'flex';
        event.preventDefault();
        return;
    }
    
    
    
});

const data = {
        name: "Beka",
        email: "asdef@123",
        password: 12345678,
    };

    // Make the POST request to the server
    fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            const message = data.message;
            console.log(message);
            return;
            
        })
        .catch(error => {
            console.error('Error:', error);
        });







