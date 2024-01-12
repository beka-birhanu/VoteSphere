function addToMyPolls() {
    var question = document.querySelector('#question').value;
    var choice1 = document.querySelector('#choice1').value;
    var choice2 = document.querySelector('#choice2').value;

    if (!question.trim() || !choice1.trim() || !choice2.trim()) {
        alert('Question, Choice1, and Choice2 are required.');
        return;
    }

    var choices = [choice1, choice2];

    for (var i = 3; i <= 5; i++) {
        var choice = document.querySelector('#choice' + i).value;
        if (choice.trim() !== "") {
            choices.push(choice);
        }
    }

    var poll = {
        question: question,
        choices: choices
    };

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