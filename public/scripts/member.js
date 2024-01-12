const add = document.querySelector('.add-but');
const outer = document.querySelector('.outer');
const form = document.querySelector('.form');
const body = document.querySelector('body');
const addMember = document.querySelector('#add');
const grp = localStorage.getItem('group');
const token = localStorage.getItem('accessToken');
const del = document.querySelector('.delete');

fetch(`http://localhost:9000/groups/${grp}/members`, {})
  .then((response) => response.json())
  .then((data) => {
    Array.from(data).forEach((element) => {
      const li = document.createElement('li');
      li.innerHTML = `<img class= "w-6 h-5" src = "../images/member.jpg">
        <div>${element.username}</div>
        <div>${element.email}</div>
        <button class="delete" onclick="deleteMember('${element.username}')">
        <img class= "w-5 h-5" src = "../images/delete.png"></button>`;
      li.classList = 'flex justify-between border-b border-gray-500 mb-2';

      let cont = document.getElementById('mem-cont');
      cont.style.display = 'block';
      console.log(cont);
      cont.append(li);
    });
  });

function deleteMember(username) {
  const Data = { username: username };
  console.log(Data);
  fetch(`http://localhost:9000/groupmemberships/${username}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        console.log(data);
        console.log(Data);
      } else {
        console.log(data);
        console.log(Data);
      }
    })
    .catch((error) => {
      console.log('Error:', error);
    });
  reloadPageWithDelay(1000);
}
add.addEventListener('click', function (event) {
  const username = document.querySelector('.username');

  const Data = {
    username: username.value,
  };
  fetch('http://localhost:9000/groupmemberships', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify(Data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        if (data.message == 'Invalid username') {
          document.querySelector('.member-error').textContent =
            'Username not found';
        } else {
          document.querySelector('.member-error').textContent = data.message;
        }
      }
    })
    .catch((error) => {
      console.log('Error:', error);
    });
  reloadPageWithDelay(1000);
});

addMember.addEventListener('click', function (event) {
  if (form.style.display === 'block') {
    form.style.display = 'none';
  } else {
    form.style.display = 'block';
  }
});
function reloadPageWithDelay(delay) {
  setTimeout(function () {
    // Reload the current page after the specified delay
    location.reload();
  }, delay);
}
