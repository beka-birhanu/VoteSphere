const token = localStorage.getItem('accessToken');

function addToMyPolls() {
  var question = document.querySelector('#question').value;
  var choice1 = document.querySelector('#choice1').value;
  var choice2 = document.querySelector('#choice2').value;

  if (!question.trim() || !choice1.trim() || !choice2.trim()) {
    alert('Question, Choice1, and Choice2 are required.');
    return;
  }

  let option1 = choice1;
  let option2 = choice2;
  let option3 = '';
  let option4 = '';
  let option5 = '';

  let choices = [];
  for (var i = 3; i <= 5; i++) {
    var choice = document.querySelector('#choice' + i).value;
    choices.push(choice);
  }

  if (choices.length > 0) {
    option3 = choices[0];
    choices.shift();
  }
  if (choices.length > 0) {
    option4 = choices[0];
    choices.shift();
  }
  if (choices.length > 0) {
    option5 = choices[0];
    choices.shift();
  }

  var poll = {
    question: question,
    option1,
    option2,
    option3,
    option4,
    option5,
  };

  let Data = {
    adminUsername: localStorage.getItem('username'),
    poll: poll,
  };

  fetch('http://localhost:9000/polls', {
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
        console.log(error);
        alert('Hi');
      } else {
        Array.from(data.options).forEach((element) => {
          console.log(element);
        });

        window.location.href = './home.html';
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('error');
    });

  var existingPolls = JSON.parse(localStorage.getItem('myPolls')) || [];

  existingPolls.push(poll);

  localStorage.setItem('myPolls', JSON.stringify(existingPolls));

  document.querySelector('#question').value = '';
  for (var i = 1; i <= 5; i++) {
    document.querySelector('#choice' + i).value = '';
  }

  alert('Poll added to My Polls!');
  window.location.href = './home.html';
}

document.getElementById('pollForm').addEventListener('submit', function (e) {
  e.preventDefault();
});
