const submit = document.querySelector('.submit') as HTMLButtonElement;
const user_name_error = document.getElementById('invalid_name') as HTMLElement;
const smallPassword = document.getElementById('small_password') as HTMLElement;

submit.addEventListener('click', function (event: Event) {
    var pattern = /^[a-zA-Z0-9._]+$/;
    var userInput = (document.getElementById('name') as HTMLInputElement).value;
    const password = (document.getElementById('reg_password') as HTMLInputElement).value;
    const email = document.getElementById('reg_email') as HTMLElement;

    if (!userInput && !email && !password) {
        return;
    }

    for (var i = 0; i < userInput.length; i++) {
        if (!pattern.test(userInput[i])) {
            user_name_error.style.display = 'flex';
            event.preventDefault();
            return;
        } else {
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
