const add = document.getElementById('add')
const outer = document.querySelector('.outer')
const form = document.querySelector('.form')
const body = document.querySelector('body')
const addMember = document.querySelector('#add-member')
const username = document.querySelector('.username')



add.addEventListener('click', function (event) {
    if (form.style.display === 'block') {
        form.style.display = 'none';
    }
    else{
        form.style.display = 'block';
    }
})



addMember.addEventListener('click', function (event) {

    const Data ={
        username: username
    }
    fetch("http://localhost:3000/groupmembership/add", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(Data),
    })
        .then(response => response.json())
        .then(data => {
           
            if (data.error){
                console.log(data)
            }
                      
        })
        .catch(error => {
            console.error('Error:', error);
        });        
})

fetch("http://localhost:3000/groups/2/members")
        .then(response => response.json())
        .then(data => {
            if (data.error){
                
                outer.style.display = 'none'
                body.innerHTML = `<div class="text-xl text-center text-red-500 font-bold">${data.message}</div>`
            }
            for (let i=0; i<data.length; i++){
                let cont = document.createElement('div')
                cont.innerHTML = `<div class="flex justify-center items-center gap-10 w-1/2 mx-auto border-b">
                <img class="w-20 image" src="images/person.jpg" alt="">
                <div class="name">${data[i].username}</div>
                <div class="email">${data[i].email}</div>
                <img class= "w-6 cursor-pointer" src="images/delete.png">
            </div>`
                
            outer.insertBefore(cont, outer.firstChild.nextSibling)
            }   

        })
        .catch(error => {
            console.error('Error:', error);
        });