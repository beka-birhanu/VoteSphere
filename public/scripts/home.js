document.getElementById('createPollBtn').addEventListener('click', function () {
  window.location.href = './pole.html';
});

console.log(localStorage);
const user = localStorage.getItem('username');
let grp = localStorage.getItem('group');
const role = localStorage.getItem('role');
const token = localStorage.getItem('accessToken');
var myPollsContainer = document.getElementById('myPollsContainer');
const del = document.querySelector('button.delete');
const signOut = document.querySelector('.sign-out');
if (!token || !user || !role) {
  window.location.href = './signup.html';
}
if (role === 'Admin' && grp == 'null') {
  console.log('Hi');
  document.getElementById('new-admin').style.display = 'block';
}

if (role === 'Admin' && grp != 'null') {
  document.getElementById('membersButton').style.display = 'block';
  document.getElementById('createPollBtn').style.display = 'block';
}

if (grp !== 'null') {
  document.getElementById('nogrp').style.display = 'none';
  document.querySelector('.all-polls').style.display = 'block';
  document.querySelector('.no').style.display = 'block';

  fetch(`http://localhost:9000/polls?groupId=${grp}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const arr = Array.from(data);
      arr.sort((a, b) => (a.id >= b.id ? 1 : -1));
      arr.forEach((element) => {
        var mainContainer = document.createElement('div');
        mainContainer.className = `mb-5 item${element.id}`;

        var accordionItem = document.createElement('div');
        accordionItem.className = `border py-1 flex flex-col items-center pr-5 pl-10 w-full justify-between rounded shadow-sm acordion item${element.id}`;
        if (role == 'Admin') {
          accordionItem.innerHTML = `
        <div class="w-full flex justify-between items-center">
            <p class="w-full text-center">${element.question}</p>
            <div class="flex gap-3">
                <button class="text-left font-semibold" onclick="toggleAccordion('item${element.id}', this)">
                    <img class="w-7" src="../images/download.jpg" alt="">
                </button>
                <button class="w-12 h-12 object-contain rounded-full overflow-hidden delete flex ml-auto p-2"
                    onclick="deletePoll('${element.id}')">
                    <img src="../images/delete-but.png" alt="delete"
                        class="object-contain w-full h-full">
                </button>
            </div>
        </div>`;
        } else if (role == 'User') {
          accordionItem.innerHTML = `
        <div class="w-full flex justify-between items-center">
            <p class="w-full text-center">${element.question}</p>
            <div class="flex gap-3">
                <button class="text-left font-semibold" onclick="toggleAccordion('item${element.id}', this)">
                    <img class="w-7" src="../images/download.jpg" alt="">
                </button>
                <button class="w-12 h-12 object-contain rounded-full overflow-hidden delete flex ml-auto p-2"
                    
                </button>
            </div>
        </div>`;
        }

        var choices = document.createElement('div');
        choices.id = `item${element.id}`;
        choices.className = 'py-2 px-4 w-full hidden';

        let opts = [];

        Array.from(element.options).forEach(function (choice) {
          if (choice.optionText) {
            opts.push([choice.optionText, choice.id, choice.numberOfVotes]);
          }
        });
        opts.sort((a, b) => (a.id > b.id ? 1 : -1));
        let total = 0;
        opts.forEach(function (choice) {
          total += choice[2];
        });

        console.log(total);

        if (total > 0) {
          if (Array.from(element.options).length > 0) {
            document.querySelector('.no').style.display = 'none';

            opts.forEach(function (choice) {
              choices.innerHTML += `<div class="flex gap-1 align-center w-full pl-10 shadow-sm rounded-lg pb-5 mt-3">
                                        <div class="flex w-3/6">
                                            <input type="radio" name="item${
                                              element.id
                                            }" class="mr-2" onclick="vote('${
                                              choice[1]
                                            }','${element.id}')" id="choice${
                                              choice[1]
                                            }" onclick="vote('${
                                              element.id
                                            }', '${choice[1]}')">
                                            <label class="ml" for="">
                                                <p class="ml-8 inline-block">${
                                                  choice[0]
                                                } (${(
                                                  (choice[2] / total) *
                                                  100
                                                ).toFixed(2)}%)</p>
                                                <div id="progressBar${
                                                  choice[1]
                                                }" class="hidden progress-bar bg-blue-500 h-2 rounded-full mt-1 ml-6 w-full border"></div>
                                            </label>
                                        </div>
                                        <p class="hidden text-xs text-red-500" id="voted">You have already voted on this poll.</p>
                                    </div>`;
            });
          }
        } else {
          if (Array.from(element.options).length > 0) {
            document.querySelector('.no').style.display = 'none';

            opts.forEach(function (choice) {
              choices.innerHTML += `<div class="flex gap-1 align-center w-full pl-10 shadow-sm rounded-lg pb-5 mt-3">
                                        <div class="flex w-3/6">
                                            <input type="radio" name="item${element.id}" class="mr-2" onclick="vote('${choice[1]}','${element.id}')" id="choice${choice[1]}" onclick="vote('${element.id}', '${choice[1]}')">
                                            <label class="ml" for="">
                                                <p class="ml-8 inline-block">${choice[0]} (${0}%)</p>
                                                <div id="progressBar${choice[1]}" class="hidden progress-bar bg-blue-500 h-2 rounded-full mt-1 ml-6 w-full border"></div>
                                            </label>
                                        </div>
                                        <p class="hidden text-xs text-red-500" id="voted">You have already voted on this poll.</p>
                                    </div>`;
            });
          }
        }

        mainContainer.appendChild(accordionItem);
        mainContainer.appendChild(choices);
        myPollsContainer.appendChild(mainContainer);
      });
    });
}

function toggleSidebar() {
  var sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('hidden');
}

document.getElementById('sidebarToggle').addEventListener('click', function () {
  toggleSidebar();
});

document.getElementById('cancelToggle').addEventListener('click', function () {
  toggleSidebar();
});
if (del) {
  del.addEventListener('click', () => {
    deletePoll();
  });
}

function toggleAccordion(accordionId, button) {
  var accordion = document.getElementById(accordionId);
  accordion.classList.toggle('hidden');
  var isOpen = !accordion.classList.contains('hidden');
  button.setAttribute('flex', isOpen);
}

function deletePoll(pollIndex) {
  if (role == 'User') {
    document.getElementById('member-del').style.display = 'block';
  }
  const Data = { adminUsername: user };
  fetch(`http://localhost:9000/polls/${pollIndex}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify(Data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        console.log(data);

        window.location.reload();
      } else {
        console.log(data);
        console.log(Data);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      window.location.reload();
    });
}

const createGroup = document.querySelector('button.creategrp');

createGroup.addEventListener('click', () => {
  const groupName = document.getElementById('group-name');
  const Data = { adminUsername: user, groupName: groupName.value };
  fetch('http://localhost:9000/groups', {
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
        console.log(Data);
        console.log(data);
      } else {
        console.log(data.data);
        localStorage.setItem('group', data.data.groupId);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  location.reload();
});

function vote(optionId, pollId) {
  var radios = document.getElementsByName(`item${pollId}`);

  radios.forEach((radio) => {
    radio.disabled = true;
  });
  console.log(optionId);
  const Data = { username: user, optionId: optionId };
  fetch(`http://localhost:9000/polls/${pollId}/vote`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify(Data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        console.log(data);
        alert('User has already voted on this poll.');
      } else {
        window.location.href = './home.html';

        console.log(data);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

signOut.addEventListener('click', () => {
  const Data = { username: user, token: token };
  fetch(`http://localhost:9000/auth/signout`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify(Data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        console.log(data);
        console.log(Data);
      } else {
        localStorage.removeItem('username');
        localStorage.removeItem('group');
        localStorage.removeItem('role');
        localStorage.removeItem('accessToken');

        window.location.href = './login.html';
      }
    })
    .catch((error) => {
      localStorage.removeItem('username');
      localStorage.removeItem('group');
      localStorage.removeItem('role');
      localStorage.removeItem('accessToken');

      window.location.href = './login.html';
      console.error('Error:', error);
    });
});

document.getElementById('membersButton').addEventListener('click', function () {
  window.location.href = '../pages/member.html';
});
