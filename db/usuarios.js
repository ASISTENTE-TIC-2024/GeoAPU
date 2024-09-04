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
                <td>${user.nombre_usuario}</td>
                <td>${user.correo_usuario}</td>
                <td>${user.contraseña}</td>
                <td>${user.rol}</td>
                <td>
                    <button class="bg-yellow-500 text-white px-2 py-1 rounded" onclick="editUser(${user.id_usuario}, '${user.nombre_usuario}', '${user.correo_usuario}', '${user.contraseña}', '${user.rol}')">Editar</button>
                    <button class="bg-red-500 text-white px-2 py-1 rounded" onclick="deleteUser(${user.id_usuario}, '${user.nombre_usuario}')">Eliminar</button>
                </td>
            `
            dataTable.appendChild(row)
        })
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}

function editUser(id_usuario, nombre_usuario, correo_usuario, contraseña, rol) {
    document.getElementById('editUserId').value = id_usuario
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
        const nombre_usuario = document.getElementById('editUserName').value
        const correo_usuario = document.getElementById('editUserEmail').value
        const contraseña = document.getElementById('editUserPwd').value
        const rol = document.getElementById('editUserRol').value

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
    .getElementById('addForm')
    .addEventListener('submit', async function (event) {
        event.preventDefault()
        const nombre_usuario = document.getElementById('addUserName').value
        const correo_usuario = document.getElementById('addUserEmail').value
        const contraseña = document.getElementById('addUserPwd').value
        const rol = document.getElementById('addUserRol').value

        try {
            const response = await fetch('http://localhost:5000/addUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre_usuario: nombre_usuario,
                    correo_usuario: correo_usuario,
                    contraseña: contraseña,
                    rol: rol,
                }),
            })
            const data = await response.json()
            console.log('Usuario agregado:', data)
            closeModal()
            fetchData() // Actualizar la tabla después de agregar
        } catch (error) {
            console.error('Error al agregar al usuario:', error)
        }
    })

function openAddModal() {
    document.getElementById('addModal').classList.remove('hidden')
}

function deleteUser(id_usuario, nombre_usuario) {
    // Implementar la lógica para eliminar el usuario
    if (
        confirm(
            `¿Está seguro de que desea eliminar el usuario ${nombre_usuario}?`
        )
    ) {
        fetch(`http://localhost:5000/deleteUser/${id_usuario}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Usuario eliminado:', data)
                fetchData() // Actualizar la tabla después de eliminar
            })
            .catch((error) => console.error('Error deleting user:', error))
    }
}

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

document.addEventListener('DOMContentLoaded', fetchData)
