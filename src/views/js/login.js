document.getElementById('loginForm').addEventListener('submit', async function (event) {

    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {

        const url = `http://localhost:5000/login/`;

        console.log("DONDE SE HACE EL POST: " + url);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            window.location.href = '/pages/main.html';
        } else {
            const errorData = await response.json();
            document.getElementById('message').textContent = errorData.message || 'Login failed!';
        }
    } catch (error) {
        console.error('Error in login request:', error);
        document.getElementById('message').textContent = 'An error occurred. Please try again.';
    }
});