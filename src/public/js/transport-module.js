document.addEventListener('DOMContentLoaded', fetchData);

async function fetchData() {
    try {
        const response = await fetch(
            'http://localhost:5000/selectTransporteData',
        );

        const data = await response.json();
        // Aquí puedes actualizar tu tabla con los datos recibidos
        const dataTable = document.getElementById('data-table');

        dataTable.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos
        data.forEach((transporte) => {
            const row = document.createElement('tr');
            row.innerHTML = `

                <td>${transporte.id_transportes}</td>
                <td>${transporte.descripcion_transportes}</td>
                <td>${transporte.unidad_transportes}</td>
                <td>${transporte.distancia_transportes}</td>
                <td>${transporte.precio_unitario_transportes}</td>

                <td class="flex align-center justify-center h-full w-full mb-2s">
                    <button class="bg-yellow-500 text-white px-2 py-1 rounded h-[4em] m-1 flex justify-center items-center" onclick="editTransporte(${
                        transporte.id_transportes
                    }, '${encodeURIComponent(
                transporte.descripcion_transportes,
            )}', '${encodeURIComponent(
                transporte.unidad_transportes,
            )}', ${encodeURIComponent(
                transporte.distancia_transportes,
            )}, ${encodeURIComponent(transporte.precio_unitario_transportes)})">
                    
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                            <g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                <path stroke-dasharray="20" stroke-dashoffset="20" d="M3 21h18">
                                    <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="20;0" />
                                </path>
                                <path stroke-dasharray="48" stroke-dashoffset="48" d="M7 17v-4l10 -10l4 4l-10 10h-4">
                                    <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.2s" dur="0.6s" values="48;0" />
                                </path>
                                <path stroke-dasharray="8" stroke-dashoffset="8" d="M14 6l4 4">
                                    <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.2s" values="8;0" />
                                </path>
                            </g>
                        </svg>

                    </button>

                    <button class="bg-red-500 text-white px-2 py-1 rounded h-[4em] m-1 flex justify-center items-center" onclick="openDeleteModal(${
                        transporte.id_transportes
                    }, '${encodeURIComponent(
                transporte.descripcion_transportes,
            )}')">
                    
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                        <g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                            <path stroke-dasharray="64" stroke-dashoffset="64" d="M13 3l6 6v12h-14v-18h8">
                                <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="64;0" />
                            </path>
                            <path stroke-dasharray="14" stroke-dashoffset="14" stroke-width="1" d="M12.5 3v5.5h6.5">
                                <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" values="14;0" />
                            </path>
                            <path stroke-dasharray="10" stroke-dashoffset="10" d="M9 11l6 6">
                                <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.9s" dur="0.2s" values="10;0" />
                            </path>
                            <path stroke-dasharray="10" stroke-dashoffset="10" d="M15 11l-6 6">
                                <animate fill="freeze" attributeName="stroke-dashoffset" begin="1.1s" dur="0.2s" values="10;0" />
                            </path>
                        </g>
                    </svg>
                    
                    </button>
                </td>
            `;
            dataTable.appendChild(row);
        });
    } catch (error) {
        console.error('Error buscando los datos:', error);
    }
}

/* ---------------------------------------------------------------- AGREGAR TRANSPORTE ----------------------------------------------------------------------------- */

document
    .getElementById('addTransporteForm')
    .addEventListener('submit', async function (event) {
        event.preventDefault();

        const formData = new FormData(this);

        const descripcion_transporte = document
            .getElementById('addTransporteDescripcion')
            .value.trim();

        const unidad_transporte = document
            .getElementById('addTransporteUnidad')
            .value.trim();

        const distancia_transporte = document
            .getElementById('addTransporteDistancia')
            .value.trim();

        const precio_unitario_transporte = document
            .getElementById('addTransportePrecio')
            .value.trim();

        console.log(
            descripcion_transporte,
            unidad_transporte,
            distancia_transporte,
            precio_unitario_transporte,
        );

        formData.append('descripcion_transporte', descripcion_transporte);

        formData.append('unidad_transporte', unidad_transporte);

        formData.append('distancia_transporte', distancia_transporte);

        formData.append(
            'precio_unitario_transporte',
            precio_unitario_transporte,
        );

        try {
            const response = await fetch(
                `http://localhost:5000/addTransporte`,
                {
                    method: 'POST',
                    body: formData,
                },
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            console.log('transporte agregado:', JSON.stringify(data));

            closeModal();
            fetchData();
        } catch (error) {
            console.error('Error al agregar al transporte:', error);
        }
    });

function openAddModal() {
    document.getElementById('addModal').classList.remove('hidden');
}

/* ---------------------------------------------------------------- ELIMINAR TRANSPORTE ----------------------------------------------------------------------------- */

let transporteIdToDelete = null;

function openDeleteModal(id_transportes, descripcion_transportes) {
    transporteIdToDelete = id_transportes;

    document.getElementById(
        'deleteMessage',
    ).textContent = `¿Está seguro de que desea eliminar el elemento ${decodeURIComponent(
        descripcion_transportes,
    )} de la base de datos?`;
    document.getElementById('deleteModal').classList.remove('hidden');
}

function closeDeleteModal() {
    document.getElementById('deleteModal').classList.add('hidden');
}

async function confirmDelete() {
    if (transporteIdToDelete === null) {
        console.error(
            'No se especifico un ID para proceder con la eliminación.',
        );
        return;
    }

    try {
        const response = await fetch(
            `http://localhost:5000/deleteTransporte/${transporteIdToDelete}`,
            {
                method: 'DELETE',
            },
        );

        if (!response.ok) {
            const errorMessage =
                response.status === 404
                    ? `Transporte with ID ${transporteIdToDelete} not found.`
                    : `HTTP error! status: ${response.status}`;
            throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log('Transporte eliminado:', JSON.stringify(data));

        closeDeleteModal();
        fetchData();
    } catch (error) {
        console.error('Error eliminando al transporte: ', error);
    }
}

/* ---------------------------------------------------------------- EDITAR transporte ----------------------------------------------------------------------------- */

document
    .getElementById('editTransporteForm')
    .addEventListener('submit', async function (event) {
        event.preventDefault();

        const formData = new FormData(this);

        const id_transportes = document
            .getElementById('editTransporteId')
            .value.trim();

        const descripcion_transportes = document
            .getElementById('editTransporteDescripcion')
            .value.trim();
        const unidad_transportes = document
            .getElementById('editTransporteUnidad')
            .value.trim();
        const distancia_transportes = document
            .getElementById('editTransporteDistancia')
            .value.trim();
        const precio_unitario_transportes = document
            .getElementById('editTransportePrecio')
            .value.trim();

        formData.append('id_transportes', id_transportes);
        formData.append('descripcion_transportes', descripcion_transportes);
        formData.append('unidad_transportes', unidad_transportes);
        formData.append('distancia_transportes', distancia_transportes);
        formData.append(
            'precio_unitario_transportes',
            precio_unitario_transportes,
        );

        try {
            const response = await fetch(
                `http://localhost:5000/updateTransporte/${id_transportes}`,
                {
                    method: 'PUT',
                    body: formData,
                },
            );

            const data = await response.json();

            console.log('Actualizado:', data);

            closeModal();
            fetchData();
        } catch (error) {
            console.error('Error al actualizar:', error);
        }
    });

async function editTransporte(
    id_transportes,
    descripcion_transportes,
    unidad_transportes,
    distancia_transportes,
    precio_unitario_transportes,
) {
    document.getElementById('editTransporteId').value = id_transportes;

    document.getElementById('editTransporteDescripcion').value =
        decodeURIComponent(descripcion_transportes);
    document.getElementById('editTransporteUnidad').value =
        decodeURIComponent(unidad_transportes);
    document.getElementById('editTransporteDistancia').value =
        decodeURIComponent(distancia_transportes);
    document.getElementById('editTransportePrecio').value = decodeURIComponent(
        precio_unitario_transportes,
    );

    document.getElementById('editModal').classList.remove('hidden');
}

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

// Llamar a la función fetchData cuando el DOM esté completamente cargado

document.addEventListener('DOMContentLoaded', fetchData);
