document.addEventListener('DOMContentLoaded', fetchData);

async function fetchData() {
    try {

<<<<<<< HEAD
        const url = `${window.location.origin}/selectEquipoData/`;
=======
        const url = `${window.location.origin} /selectEquipoData/`;
>>>>>>> main-local

        const response = await fetch(url);

        const data = await response.json();
        // Aquí puedes actualizar tu tabla con los datos recibidos
        const dataTable = document.getElementById('data-table');

        dataTable.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos
        data.forEach((material) => {
            const row = document.createElement('tr');
            row.style.height = '50px'; // Ajusta la altura de la fila según sea necesario

            row.innerHTML = `

                <td class="py-2 border-b border-r text-center">${material.id_equipos}</td>
                
                <td class="py-2 border-b border-r text-center">
                    <img class="rounded-full h-10 w-10 cursor-pointer transition-transform duration-300 mx-auto" src="${material.foto_equipos}" alt="Foto de perfil" onclick="enlargeImage(this)">
                </td>

                <td class="py-2 border-b border-r text-center">${material.descripcion_equipos}</td>
                <td class="py-2 border-b border-r text-center">${material.marca_equipos}</td>
                <td class="py-2 border-b border-r text-center">${material.tipo_equipos}</td>
                <td class="py-2 border-b border-r text-center">${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(material.tarifa_dia_equipos)}</td>

                <td class="flex items-center justify-center h-full w-full mb-2" style="text-align: center; height: inherit;">

                    <button class="bg-gray-500 text-white px-3 py-2 rounded mr-2" onclick="editEquipo(${material.id_equipos}, '${material.foto_equipos}', '${encodeURIComponent(material.descripcion_equipos)}', '${encodeURIComponent(material.marca_equipos)}', '${encodeURIComponent(material.tipo_equipos)}', ${material.tarifa_dia_equipos})">
                        <i class="fa-solid fa-pencil" style="color:rgb(255, 255, 255);"></i>
                    </button>

                    <button class="bg-gray-500 text-white px-3 py-2 rounded" onclick="openDeleteModal(${material.id_equipos}, '${encodeURIComponent(material.descripcion_equipos)}')">
                        <i class="fa-solid fa-trash" style="color:rgb(255, 255, 255);"></i>
                    </button>

                </td>
            `;
            dataTable.appendChild(row);
        });
    } catch (error) {
        console.error('Error buscando los datos:', error);
    }
}

function enlargeImage(img) {
    const modal = document.createElement('div');
    modal.classList.add(
        'fixed',
        'inset-0',
        'flex',
        'items-center',
        'justify-center',
        'bg-black',
        'bg-opacity-75',
        'z-50',
    );
    modal.innerHTML = `

        <div class="relative">
            <img src="${img.src}" class="w-[40em] h-[40em]">
            <button class="absolute top-0 right-0 m-2 rounded-full h-10 w-10 text-gray-500 text-6xl" onclick="closeImageModal(this)">×</button>
        </div>

        `;

    document.body.appendChild(modal);
}
function closeImageModal(button) {
    const modal = button.closest('div.fixed');
    modal.remove();
}

/* ---------------------------------------------------------------- AGREGAR EQUIPOS ----------------------------------------------------------------------------- */

document
    .getElementById('addEquipoForm')
    .addEventListener('submit', async function (event) {

        event.preventDefault();

        const formData = new FormData(this);

        const foto_equipo = document
            .getElementById('addEquipoPhoto')
            .value.trim();
        const descripcion_equipo = document
            .getElementById('addEquipoDescripcion')
            .value.trim();
        const marca_equipo = document
            .getElementById('addEquipoMarca')
            .value.trim();
        const tipo_equipo = document
            .getElementById('addEquipoTipo')
            .value.trim();
        const tarifa_dia_equipo = document
            .getElementById('addEquipoTarifa')
            .value.trim();

        console.log(
            foto_equipo,
            descripcion_equipo,
            marca_equipo,
            tipo_equipo,
            tarifa_dia_equipo,
        );

        formData.append('descripcion_equipo', descripcion_equipo);
        formData.append('marca_equipo', marca_equipo);
        formData.append('tipo_equipo', tipo_equipo);
        formData.append('tarifa_dia_equipo', tarifa_dia_equipo);

        if (foto_equipo) {
            formData.append('foto_equipo', foto_equipo); // Append the file object directly
        }

        try {

<<<<<<< HEAD
            const url = `${window.location.origin}/addEquipo/`;
=======
            const url = `${window.location.origin} /addEquipo/`;
>>>>>>> main-local

            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            console.log('equipo agregado:', JSON.stringify(data));

            closeModal();
            fetchData();
        } catch (error) {
            console.error('Error al agregar al equipo:', error);
        }

        this.reset();

    });

function openAddModal() {
    document.getElementById('addModal').classList.remove('hidden');
}

document
    .getElementById('addEquipoPhoto')
    .addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById('addPhotoPreview').src =
                    e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

/* ---------------------------------------------------------------- ELIMINAR EQUIPOS ----------------------------------------------------------------------------- */

let equipoIdToDelete = null;

function openDeleteModal(id_equipos, descripcion_equipos) {
    equipoIdToDelete = id_equipos;
    document.getElementById(
        'deleteMessage',
    ).textContent = `¿Está seguro de que desea eliminar al equipo ${decodeURIComponent(
        descripcion_equipos,
    )} de la base de datos?`;
    document.getElementById('deleteModal').classList.remove('hidden');
}

function closeDeleteModal() {
    document.getElementById('deleteModal').classList.add('hidden');
}

async function confirmDelete() {
    if (equipoIdToDelete === null) {
        console.error(
            'No se especifico un ID para proceder con la eliminación.',
        );
        return;
    }

    try {

<<<<<<< HEAD
        const url = `${window.location.origin}/deleteEquipo/${equipoIdToDelete}/`;
=======
        const url = `${window.location.origin} /deleteEquipo/${equipoIdToDelete}/`;
>>>>>>> main-local

        const response = await fetch(
            url,
            {
                method: 'DELETE',
            },
        );

        if (!response.ok) {
            const errorMessage =
                response.status === 404
                    ? `equipo with ID ${equipoIdToDelete} not found.`
                    : `HTTP error! status: ${response.status}`;
            throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log('equipo eliminado:', JSON.stringify(data));

        closeDeleteModal();
        fetchData();
    } catch (error) {
        console.error('Error eliminando al material: ', error);
    }
}

/* ---------------------------------------------------------------- EDITAR EQUIPOS ----------------------------------------------------------------------------- */

document
    .getElementById('editEquipoForm')
    .addEventListener('submit', async function (event) {
        event.preventDefault();

        const formData = new FormData(this);

        const id_equipos = document.getElementById('editEquipoId').value.trim();
        const foto_equipos = document
            .getElementById('editEquipoPhoto')
            .value.trim();
        const descripcion_equipos = document
            .getElementById('editEquipoDescripcion')
            .value.trim();
        const marca_equipos = document
            .getElementById('editEquipoMarca')
            .value.trim();
        const tipo_equipos = document
            .getElementById('editEquipoTipo')
            .value.trim();
        const tarifa_dia_equipos = document
            .getElementById('editEquipoTarifa')
            .value.trim();

        formData.append('id_equipos', id_equipos);
        formData.append('descripcion_equipos', descripcion_equipos);
        formData.append('marca_equipos', marca_equipos);
        formData.append('tipo_equipos', tipo_equipos);
        formData.append('tarifa_dia_equipos', tarifa_dia_equipos);

        if (foto_equipos) {
            formData.append('foto_equipos', foto_equipos); // Append the file object directly
        }

        try {

<<<<<<< HEAD
            const url = `${window.location.origin}/updateEquipo/${id_equipos}/`;
=======
            const url = `${window.location.origin} /updateEquipo/${id_equipos}/`;
>>>>>>> main-local

            const response = await fetch(
                url,
                {
                    method: 'PUT',
                    body: formData,
                },
            );

            const data = await response.json();

            console.log('Equipo actualizado:', data);

            closeModal();
            fetchData();
        } catch (error) {
            console.error('Error al actualizar equipo:', error);
        }
    });

async function editEquipo(
    id_equipos,
    foto_equipos,
    descripcion_equipos,
    marca_equipos,
    tipo_equipos,
    tarifa_dia_equipos,
) {
    document.getElementById('editEquipoId').value = id_equipos;

    document.getElementById('editEquipoPhoto').value = '';
    document.getElementById('newPhotoPreview').src = '';
    document.getElementById('currentPhoto').src = foto_equipos;

    document.getElementById('editEquipoDescripcion').value =
        decodeURIComponent(descripcion_equipos);
    document.getElementById('editEquipoMarca').value =
        decodeURIComponent(marca_equipos);
    document.getElementById('editEquipoTipo').value =
        decodeURIComponent(tipo_equipos);
    document.getElementById('editEquipoTarifa').value = tarifa_dia_equipos;

    document.getElementById('editModal').classList.remove('hidden');
}

document
    .getElementById('editEquipoPhoto')
    .addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById('newPhotoPreview').src =
                    e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

// Función para mostrar el modal de confirmación y actualizar la página
function showConfirmationModal() {
    const modal = document.getElementById('confirmationModal');
    modal.classList.remove('hidden');

    // Actualizar la página cuando se cierra el modal
    document
        .getElementById('refreshPageButton')
        .addEventListener('click', function () {
            location.reload();
        });
}

/* ---------------------------------------------------------------- ORDENAR TABLA ----------------------------------------------------------------------------- */

function sortTable(column) {
    const table = document.querySelector('tbody');
    const rows = Array.from(table.getElementsByTagName('tr'));
    const isAscending = table.getAttribute('data-sort-order') === 'asc';
    table.setAttribute('data-sort-order', isAscending ? 'desc' : 'asc');

    rows.sort((a, b) => {
        const cellA = a
            .getElementsByTagName('td')
        [column].innerText.toLowerCase();
        const cellB = b
            .getElementsByTagName('td')
        [column].innerText.toLowerCase();

        if (cellA < cellB) return isAscending ? -1 : 1;
        if (cellA > cellB) return isAscending ? 1 : -1;
        return 0;
    });

    rows.forEach((row) => table.appendChild(row));
}

function closeModal() {
    document.getElementById('editModal').classList.add('hidden');
    document.getElementById('addModal').classList.add('hidden');
}

function searchTable() {

    let input, filter, table, tr, td, i, j, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("listingTable");
    tr = table.getElementsByTagName("tr");

    for (i = 1; i < tr.length; i++) {
        tr[i].style.display = "none";
        td = tr[i].getElementsByTagName("td");
        for (j = 0; j < td.length; j++) {
            if (td[j]) {
                txtValue = td[j].textContent || td[j].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                    break;
                }
            }
        }
    }

}

// Llamar a la función fetchData cuando el DOM esté completamente cargado

document.addEventListener('DOMContentLoaded', fetchData);
