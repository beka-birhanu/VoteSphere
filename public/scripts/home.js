
document.getElementById('createPollBtn').addEventListener('click', function() {
    window.location.href = './pole.html';
});



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

function toggleAccordion(accordionId, button) {
    var accordion = document.getElementById(accordionId);
    accordion.classList.toggle('hidden');
    var isOpen = !accordion.classList.contains('hidden');
    button.setAttribute('flex', isOpen);
}

function deletePoll(pollIndex) {
    var existingPolls = JSON.parse(localStorage.getItem('myPolls')) || [];
    existingPolls.splice(pollIndex, 1);
    localStorage.setItem('myPolls', JSON.stringify(existingPolls));
    loadMyPolls();
}

function loadMyPolls() {
    var myPollsContainer = document.getElementById('myPollsContainer');
    myPollsContainer.innerHTML = '';

    var existingPolls = JSON.parse(localStorage.getItem('myPolls')) || [];

    if (existingPolls.length === 0) {
        myPollsContainer.innerHTML = '<p class="text-center text-gray-500 mt-6">No Polls Yet</p>';
        return;
    }

    existingPolls.forEach(function (poll, pollIndex) {
        var mainContainer = document.createElement('div');
        mainContainer.className = 'mb-5';

        var accordionItem = document.createElement('div');
        accordionItem.className =
            'border py-1 flex flex-col items-center pr-5 pl-10 w-full justify-between rounded shadow-sm acordion';
        accordionItem.innerHTML = `
        <div class="w-full flex justify-between items-center">
            <p class="w-full text-center">${poll.question}</p>
            <div class="flex gap-3">
                <button class="text-left font-semibold" onclick="toggleAccordion('item${pollIndex}', this)">
                    <img class="w-7" src="../images/download.jpg" alt="">
                </button>
                <button class="w-12 h-12 object-contain rounded-full overflow-hidden flex ml-auto p-2"
                    onclick="deletePoll(${pollIndex})">
                    <img src="../images/delete-but.png" alt="delete"
                        class="object-contain w-full h-full">
                </button>
            </div>
        </div>`;

        var choices = document.createElement('div');
        choices.id = `item${pollIndex}`;
        choices.className = 'py-2 px-4 w-full hidden';

        if (poll.choices.length > 0) {
            poll.choices.forEach(function (choice, choiceIndex) {
                choices.innerHTML +=
                    `<div class="flex gap-1 align-center w-full pl-10 shadow-sm rounded-lg pb-5 mt-3">
                        <div class="flex w-3/6">
                            <input type="radio" name="item${pollIndex}" class="mr-2" id="choice${pollIndex}-${choiceIndex}" onclick="vote('${pollIndex}', '${choiceIndex}')">
                            <label class="ml" for="">
                                <p class="ml-8 inline-block">${choice}</p>
                                <div id="progressBar${pollIndex}-${choiceIndex}" class="progress-bar bg-blue-500 h-2 rounded-full mt-1 ml-6 w-full border"></div>
                            </label>
                        </div>
                    </div>`;
            });
        }

        mainContainer.appendChild(accordionItem);
        mainContainer.appendChild(choices);
        myPollsContainer.appendChild(mainContainer);
    });
}

function vote(pollIndex, choiceIndex) {
    var radios = document.getElementsByName(`item${pollIndex}`);

    radios.forEach(radio => {
        radio.disabled = true;
    });

    var progressBarId = `progressBar${pollIndex}-${choiceIndex}`;
    var progressBar = document.getElementById(progressBarId);

    var totalVotes = 10;
    var choiceVotes = 7;

    poll.choices[choiceIndex].count += (choiceVotes / totalVotes) * 100;

    poll.totalVotes += 1;

    updateProgressBar(progressBar, poll.choices[choiceIndex].count, poll.totalVotes);
}

function updateProgressBar(progressBar, choiceVotes, totalVotes) {
    if (totalVotes > 0) {
        var percentage = (choiceVotes / totalVotes) * 100;
        progressBar.style.width = percentage + '%';
    } else {
        progressBar.style.width = '0%';
    }
}
document.getElementById('membersButton').addEventListener('click', function() {
    window.location.href = '../pages/member.html';
});

loadMyPolls();



