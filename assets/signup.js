const registrationForm = document.getElementById('registrationForm')

registrationForm.addEventListener('submit', function (event) {
    event.preventDefault();
    register()
});

async function register() {
    const fullname = document.getElementById('fullname').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;

    try {
      const response = await fetch(`${api_url}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: fullname, email, password }),
      })

      if (!response.ok) {
        // Handle non-successful responses
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message}`);
    }

      const data = await response.json();
      alert("successful")
      location.href = "./login.html"
      console.log(data); // Handle the response from the server
    } catch (error) {
      console.error('Error during register:', error);
      alert("Registration failed. Please try again.");

    }
  }