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
    
    const data = {
        name: "Beka",
        email: "asdef@123",
        password: 12345678,
    };

    // Make the POST request to the server
     
    
});

const data = {
    name: "Beka",
    email: "asdef@123",
    password: 12345678,
};

fetch('../scripts/data.json')
        .then(response => response.json())
        .then(data => { 
            console.log(data[1].message); 
        })
        .catch(error => {
            console.error('Error:', error);
        });  