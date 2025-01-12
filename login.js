const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#username");
const USERNAME_KEY = "username";

function onLoginSubmit(event) {
    event.preventDefault();
    const username = loginInput.value.trim();

    if (username !== "") {
        localStorage.setItem(USERNAME_KEY, username);
        window.location.href = "main.html";  
    }
}

loginForm.addEventListener("submit", onLoginSubmit);
