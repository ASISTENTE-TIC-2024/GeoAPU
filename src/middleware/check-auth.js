function checkAuth() {

    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = '../login.html';
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
            // Almacenar los datos del usuario en el almacenamiento local
            localStorage.setItem('user', JSON.stringify(data.user));
            // Actualizar el DOM con la foto del usuario
            navUserPhoto(data.user);
            mobileNavUserPhoto(data.user);
        })
        .catch(error => {
            console.error('Error verificando el Token: ', error);
            alert('Necesitas iniciar sesión');
            window.location.href = '../login.html';
        });
}

function logout() {

    const confirmation = confirm('¿Estás seguro de que deseas cerrar la sesión?');

    if (confirmation) {
        // Eliminar el token JWT del almacenamiento local
        localStorage.removeItem('token');
        // Redirigir al usuario a la página de inicio de sesión
        window.location.href = '../login.html';
    }
}

function navUserPhoto(user) {
    const userPhotoElement = document.getElementById('userPhoto');
    if (userPhotoElement) {
        userPhotoElement.src = user.photoPath;
    }
}

function mobileNavUserPhoto(user) {

    const userPhotoElement = document.getElementById('mobileUserPhoto');
    if (userPhotoElement) {
        userPhotoElement.src = user.photoPath;
    }

    const userNameElement = document.getElementById('mobileUserName');
    if (userNameElement) {
        userNameElement.textContent = user.name;
    }
}

document.addEventListener('DOMContentLoaded', checkAuth);