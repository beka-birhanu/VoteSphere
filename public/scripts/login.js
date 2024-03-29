const submit = document.querySelector('.submit');
const invalidUser = document.getElementById('invalid-name');
const invalidPass = document.getElementById('invalid-password');
const userError = document.getElementById('user-error');
const passwordError = document.getElementById('pass-error');

submit.addEventListener('click', function (event) {
  const password = document.getElementById('password-login').value;
  const user = document.getElementById('user-login').value;

  if (!user | !password) {
    passwordError.style.display = 'flex';
    invalidPass.innerText = 'please enter both credentials';
    event.preventDefault();
    return;
  }

  const Data = {
    username: user.trim(),
    password: password,
  };
  console.log(Data);

  fetch('http://localhost:9000/auth/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(Data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.error) {
        console.log(data);
        if (data.message == 'Invalid username') {
          userError.style.display = 'flex';
          invalidUser.innerText = data.message;
          console.log(userError, userError.style.display);
        } else if (data.message == 'Invalid password') {
          passwordError.style.display = 'flex';
          invalidPass.innerText = data.message;
          userError.style.display = 'none';
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
