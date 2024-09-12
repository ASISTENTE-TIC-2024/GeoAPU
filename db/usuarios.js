document.addEventListener('DOMContentLoaded', fetchData)

async function fetchData() {
    try {
        const response = await fetch('http://localhost:5000/selectData')
        const data = await response.json()

        console.log(JSON.stringify(data))

        // Aquí puedes actualizar tu tabla con los datos recibidos
        const dataTable = document.getElementById('data-table')

        dataTable.innerHTML = '' // Limpiar la tabla antes de agregar nuevos datos
        data.forEach((user) => {
            const row = document.createElement('tr')
            row.innerHTML = `
                <td>${user.id_usuario}</td>
                <td>
                    <img src="${user.foto_usuario}" alt="Foto de perfil" width="50" height="50">
                </td>
                <td>${user.nombre_usuario}</td>
                <td>${user.correo_usuario}</td>
                <td>${'•'.repeat(user.contrasena_usuario.length)}</td>
                <td>${user.rol_usuario}</td>
                <td>
                    <button class="bg-yellow-500 text-white px-2 py-1 rounded" onclick="editUser(${user.id_usuario
                }, '${user.foto_usuario}', '${user.nombre_usuario}', '${user.correo_usuario
                }', '${user.contrasena_usuario}', '${user.rol_usuario
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
    foto_usuario,
    nombre_usuario,
    correo_usuario,
    constrasena_usuario,
    rol_usuario
) {
    document.getElementById('editUserId').value = id_usuario
    document.getElementById('currentPhoto').src = foto_usuario
        ? `data:image/jpeg;base64,${foto_usuario}`
        : '' // Asumiendo que la foto está en base64
    document.getElementById('newPhotoPreview').src = '' // Limpiar la previsualización de la nueva imagen
    document.getElementById('editUserName').value = nombre_usuario
    document.getElementById('editUserEmail').value = correo_usuario
    document.getElementById('editUserPwd').value = constrasena_usuario
    document.getElementById('editUserRol').value = rol_usuario
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
        const foto_usuario = document.getElementById('addUserPhoto').files[0];
        const nombre_usuario = document.getElementById('editUserName').value
        const correo_usuario = document.getElementById('editUserEmail').value
        const constrasena_usuario = document.getElementById('editUserPwd').value
        const rol_usuario = document.getElementById('editUserRol').value

        if (foto_usuario.files && foto_usuario.files[0]) {
            const reader = new FileReader()
            reader.onload = function (e) {
                foto = e.target.result.split(',')[1] // Obtener solo la parte base64
            }
            reader.readAsDataURL(foto_usuario.files[0])
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
                        foto_usuario: foto_usuario,
                        correo_usuario: correo_usuario,
                        constrasena_usuario: constrasena_usuario,
                        rol_usuario: rol_usuario,
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

        const formData = new FormData(this);

        const nombre_usuario = document.getElementById('addUserName').value.trim();
        const foto_usuario = document.getElementById('addUserPhoto').value.trim();
        const correo_usuario = document.getElementById('addUserEmail').value.trim();
        const contrasena_usuario = document.getElementById('addUserPwd').value.trim();
        const rol_usuario = document.getElementById('addUserRol').value.trim();

        console.log(foto_usuario, nombre_usuario, correo_usuario, contrasena_usuario, rol_usuario);

        formData.append('foto_usuario', foto_usuario);
        formData.append('nombre_usuario', nombre_usuario);
        formData.append('correo_usuario', correo_usuario);
        formData.append('contrasena_usuario', contrasena_usuario);
        formData.append('rol_usuario', rol_usuario);

        console.log(foto_usuario, nombre_usuario, correo_usuario, contrasena_usuario, rol_usuario);

        if (!nombre_usuario || !correo_usuario || !contrasena_usuario || !rol_usuario) {
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
    .addEventListener('mouseleave', function () {
        const passwordInputAdd = document.getElementById('addUserPwd')
        passwordInputAdd.setAttribute('type', 'password')
    })

// Llamar a la función fetchData cuando el DOM esté completamente cargado

document.addEventListener('DOMContentLoaded', fetchData)
