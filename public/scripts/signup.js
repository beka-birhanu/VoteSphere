const submit = document.querySelector('.submit');
const user_name_error = document.getElementById('invalid_name');
const smallPassword = document.getElementById('small_password');
const weak = document.getElementById('weak_password');
const weakM = document.getElementById('weak-message');
console.log(localStorage);
submit.addEventListener('click', function (event) {
  var pattern = /^[a-zA-Z0-9._]+$/;
  var userInput = document.getElementById('name').value;
  const password = document.getElementById('reg_password').value;
  const email = document.getElementById('reg-email').value;
  const user = document.getElementById('user');
  const admin = document.getElementById('admin');
  let role = '';

  if (user.checked) {
    role = 'User';
  } else if (admin.checked) {
    role = 'Admin';
  }

  if (!userInput & !email & !password) {
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

  const Data = {
    username: userInput,
    email: email,
    password: password,
    role: role,
  };

  fetch('http://localhost:9000/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(Data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        console.log(data);
        if (data.message == 'User with this username already exists') {
          document.querySelector('.user-taken').style.display = 'flex';
          document.querySelector('.user-taken-message').innerText =
            data.message;
          weak.style.display = 'none';
          document.querySelector('.email-taken').style.display = 'none';
          return;
        } else if (data.message == 'User with this email already exists') {
          document.querySelector('.email-taken').style.display = 'flex';
          document.querySelector('.email-taken-message').innerText =
            data.message;
          document.querySelector('.user-taken').style.display = 'none';
          weak.style.display = 'none';
        } else if (data.message[0] == 'Invalid email format') {
          document.querySelector('.email-taken').style.display = 'flex';
          document.querySelector('.email-taken-message').innerText =
            data.message[0];
          document.querySelector('.user-taken').style.display = 'none';
          weak.style.display = 'none';
        } else if (data.message == 'Password is not strong enough') {
          weak.style.display = 'flex';
          weakM.innerText = data.message;
          document.querySelector('.user-taken').style.display = 'none';
          document.querySelector('.email-taken').style.display = 'none';
        } else {
          weak.style.display = 'flex';
          weakM.innerText = data.message[0];
        }
      } else {
        localStorage.setItem('accessToken', data.refresh_token);
        localStorage.setItem('role', data.role);
        localStorage.setItem('username', data.username);
        localStorage.setItem('group', data.group);
        window.location.href = './home.html';
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});
