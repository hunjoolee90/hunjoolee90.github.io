const greeting = document.querySelector("#greeting");
const USERNAME_KEY = "username";

function paintGreetings() {
    const username = localStorage.getItem(USERNAME_KEY);
    if (username) {
        greeting.innerText = `Hello, ${username}!`;
    } 
}

paintGreetings(); 
