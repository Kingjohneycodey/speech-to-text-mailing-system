// // voiceRecognition.js
// const recognition = new webkitSpeechRecognition();

// function startVoiceRecognition(callback) {
//   recognition.start();
  
//   recognition.onresult = function(event) {
//     const voiceText = event.results[0][0].transcript.trim();
//     callback(voiceText);
//   };
// }

// function stopVoiceRecognition() {
//   recognition.stop();
// }

// // app.js
// async function register() {
//     const username = document.getElementById('username').value;
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
  
//     // Perform server-side validation and send registration data to the server
//     try {
//       const response = await fetch('/api/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, email, password }),
//       });
  
//       const data = await response.json();
//       console.log(data); // Handle the response from the server
//     } catch (error) {
//       console.error('Error during registration:', error);
//     }
//   }
  
//   async function login() {
//     const username = document.getElementById('loginUsername').value;
//     const password = document.getElementById('loginPassword').value;
  
//     // Perform server-side validation and send login data to the server
//     try {
//       const response = await fetch('/api/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password }),
//       });
  
//       const data = await response.json();
//       console.log(data); // Handle the response from the server
//     } catch (error) {
//       console.error('Error during login:', error);
//     }
//   }
  
//   // Example usage of voice-to-text during registration
//   document.getElementById('loginForm').addEventListener('submit', function (event) {
//     event.preventDefault();
    
//     startVoiceRecognition((voiceText) => {
//       // Use voiceText in your registration logic
//       console.log('Voice Input:', voiceText);
  
//       // Stop voice recognition after capturing input
//       stopVoiceRecognition();
//     });
//   });
  

// JavaScript (app.js)
document.addEventListener('DOMContentLoaded', function () {
  // Fetch data when the DOM is loaded
  fetchDataAndPopulateSelect();
});

const token = localStorage.getItem("token")

async function fetchDataAndPopulateSelect() {
  const selectElement = document.getElementById('email');

  try {

    const response = await fetch(`${api_url}/user/all-users`, {
    method: 'GET',
    headers: {
      'Authorization': `${token}`,
      'Content-Type': 'application/json',
    }
});

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const data = await response.json();

    // Populate the select element with the fetched data
    data.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option._id; // Replace with your data structure
      optionElement.textContent = option.email; // Replace with your data structure
      selectElement.appendChild(optionElement);
    });
  } catch (error) {
    console.error('Error fetching and populating data:', error.message);
  }
}

const mailForm = document.getElementById('mailForm')

mailForm.addEventListener('submit', function (event) {
    event.preventDefault();
    sendMail()
});

async function sendMail() {
    const content = document.getElementById('content').value;
    const subject = document.getElementById('subject').value;
    const email = document.getElementById('email').value;

    try {
      const response = await fetch(`${api_url}/user/send-mail`, {
        method: 'POST',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, subject, email }),
      })

      if (!response.ok) {
        // Handle non-successful responses
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message}`);
    }

      const data = await response.json();
      alert("successful")
      location.href = "./inbox.html"
      console.log(data); // Handle the response from the server
    } catch (error) {
      console.error('Error during register:', error);
      alert("Registration failed. Please try again.");

    }
  }


  function exitWindow(){
    window.location.href = 'about:blank'
  }