const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    login();
});

async function login() {
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;

    try {
        const response = await fetch(`${api_url}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            // Handle non-successful responses
            const errorData = await response.json();
            throw new Error(`Error: ${errorData.message}`);
        }

        const data = await response.json();
        alert("Login successful");
        localStorage.setItem("token", data.user.token)
        location.href = "./inbox.html"
        console.log(data);
    } catch (error) {
        // Handle network errors, failed fetch, or unexpected errors
        console.error('Error during login:', error.message);

        // Display a user-friendly error message
        alert("Login failed. Please try again.");

        // You can also update the UI to inform the user about the error
        // For example, show an error message on the login form
        // const errorElement = document.getElementById('loginError');
        // errorElement.textContent = 'Login failed. Please try again.';
    }
}
