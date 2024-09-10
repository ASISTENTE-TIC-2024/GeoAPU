document.addEventListener('DOMContentLoaded', fetchData)

async function fetchData() {
    try {
        const response = await fetch('http://localhost:5000/selectData')
        const data = await response.json()

        console.log(data)
        // Aquí puedes actualizar tu tabla con los datos recibidos
        const dataTable = document.getElementById('data-table')
        dataTable.innerHTML = '' // Limpiar la tabla antes de agregar nuevos datos
        data.forEach((user) => {
            const row = document.createElement('tr')
            row.innerHTML = `
                <td>${user.id_usuario}</td>
                <td>
                    <img src="${user.foto
                }" alt="Foto de perfil" width="50" height="50">
                </td>
                <td>${user.nombre_usuario}</td>
                <td>${user.correo_usuario}</td>
                <td>${'•'.repeat(user.contraseña.length)}</td>
                <td>${user.rol}</td>
                <td>
                    <button class="bg-yellow-500 text-white px-2 py-1 rounded" onclick="editUser(${user.id_usuario
                }, '${user.foto}', '${user.nombre_usuario}', '${user.correo_usuario
                }', '${user.contraseña}', '${user.rol
                }')"><i class="fa-solid fa-user-pen" style="color: #ffffff;"></i></i> Editar</button>
                    <button class="bg-red-500 text-white px-2 py-1 rounded" onclick="openDeleteModal(${user.id_usuario
                }, '${user.nombre_usuario
                }')"><i class="fa-solid fa-user-minus" style="color: #ffffff;"></i> Eliminar</button>
                </td>
            `
            dataTable.appendChild(row)
        })
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}

/* ---------------------------------------------------------------- EDITAR USUARIO ----------------------------------------------------------------------------- */

function editUser(
    id_usuario,
    foto,
    nombre_usuario,
    correo_usuario,
    contraseña,
    rol
) {
    document.getElementById('editUserId').value = id_usuario
    document.getElementById('currentPhoto').src = foto
        ? `data:image/jpeg;base64,${foto}`
        : '' // Asumiendo que la foto está en base64
    document.getElementById('newPhotoPreview').src = '' // Limpiar la previsualización de la nueva imagen
    document.getElementById('editUserName').value = nombre_usuario
    document.getElementById('editUserEmail').value = correo_usuario
    document.getElementById('editUserPwd').value = contraseña
    document.getElementById('editUserRol').value = rol
    document.getElementById('editModal').classList.remove('hidden')
}

function closeModal() {
    document.getElementById('editModal').classList.add('hidden')
    document.getElementById('addModal').classList.add('hidden')
}

document
    .getElementById('editForm')
    .addEventListener('submit', async function (event) {
        event.preventDefault()
        const id_usuario = document.getElementById('editUserId').value
        const foto = document.getElementById('addUserPhoto').files[0];
        const nombre_usuario = document.getElementById('editUserName').value
        const correo_usuario = document.getElementById('editUserEmail').value
        const contraseña = document.getElementById('editUserPwd').value
        const rol = document.getElementById('editUserRol').value
        let foto_usuario = null

        if (foto.files && foto.files[0]) {
            const reader = new FileReader()
            reader.onload = function (e) {
                foto_usuario = e.target.result.split(',')[1] // Obtener solo la parte base64
            }
            reader.readAsDataURL(foto.files[0])
        }

        try {
            const response = await fetch(
                `http://localhost:5000/updateUser/${id_usuario}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nombre_usuario: nombre_usuario,
                        foto: foto,
                        correo_usuario: correo_usuario,
                        contraseña: contraseña,
                        rol: rol,
                    }),
                }
            )
            const data = await response.json()
            console.log('Usuario actualizado:', data)
            closeModal()
            fetchData() // Actualizar la tabla después de editar
        } catch (error) {
            console.error('Error al actualizar al usuario:', error)
        }
    })

document
    .getElementById('editUserPhoto')
    .addEventListener('change', function (event) {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = function (e) {
                document.getElementById('newPhotoPreview').src = e.target.result
            }
            reader.readAsDataURL(file)
        }
    })

/* ---------------------------------------------------------------- AGREGAR USUARIO ----------------------------------------------------------------------------- */

document
    .getElementById('addForm')
    .addEventListener('submit', async function (event) {
        event.preventDefault()
        const nombre_usuario = document.getElementById('addUserName').value.trim();
        const foto = document.getElementById('addUserPhoto');
        const correo_usuario = document.getElementById('addUserEmail').value.trim();
        const contraseña = document.getElementById('addUserPwd').value.trim();
        const rol = document.getElementById('addUserRol').value.trim();

        console.log(nombre_usuario, foto, correo_usuario, contraseña, rol);

        const formData = new FormData();
        formData.append('nombre_usuario', nombre_usuario);
        formData.append('correo_usuario', correo_usuario);
        formData.append('contraseña', contraseña);
        formData.append('rol', rol);

        if (foto) {
            formData.append('foto', foto.files[0]);
        } else {
            console.log('No se ha seleccionado ninguna foto');
        }

        if (!nombre_usuario || !correo_usuario || !contraseña || !rol) {
            alert('Por favor, complete todos los campos');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/addUser', {
                method: 'POST',
                body: formData,
            });


            const result = await response.json();

            console.log(result);

            // Verificar el tipo de contenido de la respuesta
            // const contentType = response.headers.get('content-type');

            // let data;

            // if (contentType && contentType.includes('application/json')) {
            //     data = await response.json();
            // } else {
            //     data = await response.text();
            // }

            console.log('Usuario agregado:', data);

            closeModal();
            fetchData();

        } catch (error) {
            console.error('Error al agregar al usuario:', error);
            alert(error.message);
        }
    })

function openAddModal() {
    document.getElementById('addModal').classList.remove('hidden')
}

document
    .getElementById('addUserPhoto')
    .addEventListener('change', function (event) {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = function (e) {
                document.getElementById('addPhotoPreview').src = e.target.result
            }
            reader.readAsDataURL(file)
        }
    })

/* ---------------------------------------------------------------- ELIMINAR USUARIO ----------------------------------------------------------------------------- */

let userIdToDelete = null

function openDeleteModal(id_usuario, nombre_usuario) {
    userIdToDelete = id_usuario
    document.getElementById(
        'deleteMessage'
    ).textContent = `¿Está seguro de que desea eliminar el usuario ${nombre_usuario}?`
    document.getElementById('deleteModal').classList.remove('hidden')
}

function closeDeleteModal() {
    userIdToDelete = null
    document.getElementById('deleteModal').classList.add('hidden')
}

async function confirmDelete() {
    if (userIdToDelete !== null) {
        try {
            const response = await fetch(
                `http://localhost:5000/deleteUser/${userIdToDelete}`,
                {
                    method: 'DELETE',
                }
            )
            const data = await response.json()
            console.log('Usuario eliminado:', data)
            closeDeleteModal()
            fetchData() // Actualizar la tabla después de eliminar
        } catch (error) {
            console.error('Error deleting user:', error)
        }
    }
}

/* ---------------------------------------------------------------- ORDENAR TABLA ----------------------------------------------------------------------------- */

function sortTable(column) {
    const table = document.querySelector('tbody')
    const rows = Array.from(table.getElementsByTagName('tr'))
    const isAscending = table.getAttribute('data-sort-order') === 'asc'
    table.setAttribute('data-sort-order', isAscending ? 'desc' : 'asc')

    rows.sort((a, b) => {
        const cellA = a
            .getElementsByTagName('td')
        [column].innerText.toLowerCase()
        const cellB = b
            .getElementsByTagName('td')
        [column].innerText.toLowerCase()

        if (cellA < cellB) return isAscending ? -1 : 1
        if (cellA > cellB) return isAscending ? 1 : -1
        return 0
    })

    rows.forEach((row) => table.appendChild(row))
}

// Función para alternar la visibilidad de la contraseña mientras se mantiene presionado el botón

document
    .getElementById('editUserPwdIcon')
    .addEventListener('mousedown', function () {
        const passwordInput = document.getElementById('editUserPwd')
        passwordInput.setAttribute('type', 'text')
    })

document
    .getElementById('editUserPwdIcon')
    .addEventListener('mouseup', function () {
        const passwordInput = document.getElementById('editUserPwd')
        passwordInput.setAttribute('type', 'password')
    })

document
    .getElementById('addUserPwdIcon')
    .addEventListener('mousedown', function () {
        const passwordInputAdd = document.getElementById('addUserPwd')
        passwordInputAdd.setAttribute('type', 'text')
    })

document
    .getElementById('addUserPwdIcon')
    .addEventListener('mouseup', function () {
        const passwordInputAdd = document.getElementById('addUserPwd')
        passwordInputAdd.setAttribute('type', 'password')
    })

document
    .getElementById('addUserPwdIcon')
    .addEventListener('mouseleave', function () {
        const passwordInputAdd = document.getElementById('addUserPwd')
        passwordInputAdd.setAttribute('type', 'password')
    })

// Llamar a la función fetchData cuando el DOM esté completamente cargado

document.addEventListener('DOMContentLoaded', fetchData)
