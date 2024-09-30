function checkAuth() {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('Acceso denegado, por favor inicia sesión.');
        window.location.href = './login.html';
        return;
    }

    // Opcional: Verificar la validez del token con el servidor
    fetch('http://localhost:5000/verify-token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('El token no es válido');
            }
            return response.json();
        })
        .then(data => {
            console.log('El token es valido:', data);
        })
        .catch(error => {
            console.error('Error verificando el Token: ', error);
            alert('Acceso denegado, por favor inicia sesión.');
            window.location.href = './login.html';
        });
}

checkAuth();