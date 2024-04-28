document.getElementById("login-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
        const response = await fetch("http://127.0.0.1:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const { token } = await response.json();
            localStorage.setItem("token", token);
            window.location.href = "profile.html";
        } else {
            alert("Login failed. Please check your credentials.");
        }
    } catch (error) {
        alert("An error occurred. Please try again.");
    }
});

document.getElementById("signup-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const username = document.getElementById("signup-username").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    try {
        const response = await fetch("http://127.0.0.1:3000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }),
        });

        if (response.ok) {
            alert("Signup successful. Please log in.");
            
        } else {
            alert("Signup failed. Please try again.");
        }
    } catch (error) {
        alert("An error occurred. Please try again.");
    }
});
