document.addEventListener('DOMContentLoaded', fetchData);

async function fetchData() {
    try {

        const url = `http://localhost:5000/selectEmpleadoData/`;

        const response = await fetch(url);
        const data = await response.json();

        // Aquí puedes actualizar tu tabla con los datos recibidos
        const dataTable = document.getElementById('data-table');
        dataTable.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos
        data.forEach((empleado) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${empleado.id_empleados}</td>
                <td>${empleado.cargo_empleados}</td>
                <td>${empleado.salario_base_empleados}</td>
                <td class="flex align-center justify-center h-full w-full mb-2s">
                    <button class="bg-gray-200 text-white px-2 py-1 rounded h-[4em] w-1/2 m-1" onclick="editEmpleado(${empleado.id_empleados}, '${encodeURIComponent(empleado.cargo_empleados)}', '${encodeURIComponent(empleado.salario_base_empleados)}')">
                        <i class="fa-solid fa-pencil" style="color:rgb(51, 47, 47);"></i>
                    </button>
                    <button class="bg-gray-200 text-white px-2 py-1 rounded h-[4em] w-1/2 m-1" onclick="openDeleteModal(${empleado.id_empleados}, '${encodeURIComponent(empleado.cargo_empleados)}')">
                        <i class="fa-solid fa-trash" style="color:rgb(51, 47, 47);">
                    </button>
                </td>
            `;
            dataTable.appendChild(row);
        });

        // Integrar la paginación
        currentPage = 1;
        displayTablePage(currentPage);

    } catch (error) {
        console.error('Error buscando los datos:', error);
    }
}

let currentPage = 1;
const rowsPerPage = 5;

function displayTablePage(page) {

    const table = document.getElementById("data-table");
    const rows = table.querySelectorAll("tr");
    const totalRows = rows.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);


    if (page < 1) {
        page = 1;
    }

    if (page > totalPages) {
        page = totalPages;
    }

    for (let i = 0; i < totalRows; i++) {
        rows[i].style.display = "none";
    }

    if (rows.length > 0) {
        for (let i = (page - 1) * rowsPerPage; i < (page * rowsPerPage) && i < totalRows; i++) {
            rows[i].style.display = '';
        }
    }

    document.getElementById("page").innerText = page;
    document.getElementById("totalPages").innerText = totalPages;
    document.getElementById("btn_prev").style.visibility = page === 1 ? "hidden" : "visible";
    document.getElementById("btn_next").style.visibility = page === totalPages ? "hidden" : "visible";

}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayTablePage(currentPage);
    }
}

function nextPage() {
    const table = document.getElementById("data-table");
    const rows = table.querySelectorAll("tr");
    const totalRows = rows.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    if (currentPage < totalPages) {
        currentPage++;
        displayTablePage(currentPage);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    displayTablePage(currentPage);
});

/* ---------------------------------------------------------------- AGREGAR EMPLEADO ----------------------------------------------------------------------------- */

document
    .getElementById('addEmpleadoForm')
    .addEventListener('submit', async function (event) {

        event.preventDefault();

        const formData = new FormData(this);

        const cargo_empleados = document
            .getElementById('addEmpleadoCargo')
            .value.trim();

        const salario_base_empleados = document
            .getElementById('addEmpleadoSalario')
            .value.trim();

        console.log(
            'cargo_empleado:', cargo_empleados, 'salario_base_empleado:', salario_base_empleados,
        );

        formData.append('cargo_empleados', cargo_empleados);
        formData.append('salario_base_empleados', salario_base_empleados);

        try {

            const url = `http://localhost:5000/addEmpleado/`;

            const response = await fetch(
                url,
                {
                    method: 'POST',
                    body: formData,
                },
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            console.log('empleado agregado:', JSON.stringify(data));

            closeModal();
            fetchData();

        } catch (error) {
            console.error('Error al agregar al empleado:', error);
        }
    });

function openAddModal() {
    document.getElementById('addModalEmpleados').classList.remove('hidden');
}

/* ---------------------------------------------------------------- ELIMINAR EMPLEADO ----------------------------------------------------------------------------- */

let empleadoIdToDelete = null;

function openDeleteModal(id_empleados, cargo_empleados) {

    empleadoIdToDelete = id_empleados;

    document.getElementById(
        'deleteMessage',
    ).textContent = `¿Está seguro de que desea eliminar al cargo ${decodeURIComponent(
        cargo_empleados,
    )} de la base de datos?`;

    document.getElementById('deleteModalEmpleados').classList.remove('hidden');
}

function closeDeleteModal() {
    document.getElementById('deleteModalEmpleados').classList.add('hidden');
}

async function confirmDeleteEmpleados() {

    if (empleadoIdToDelete === null) {

        console.error(
            'No se especifico un ID para proceder con la eliminación.',
        );

        return;
    }

    try {

        const url = `http://localhost:5000/deleteEmpleado/${empleadoIdToDelete}`;

        const response = await fetch(
            url,
            {
                method: 'DELETE',
            },
        );

        if (!response.ok) {
            const errorMessage =
                response.status === 404
                    ? `Transporte with ID ${empleadoIdToDelete} not found.`
                    : `HTTP error! status: ${response.status}`;
            throw new Error(errorMessage);
        }

        const data = await response.json();

        console.log('Empleado eliminado:', JSON.stringify(data));

        closeDeleteModal();
        fetchData();

    } catch (error) {
        console.error('Error eliminando al transporte: ', error);
    }
}

/* ---------------------------------------------------------------- EDITAR EMPLEADOS ----------------------------------------------------------------------------- */


document.getElementById('editEmpleadoForm').addEventListener('submit', async function (event) {

    event.preventDefault();

    const id_empleados = document.querySelector('#editEmpleadoId').value.trim();
    const cargo_empleados = document.querySelector('#editEmpleadoCargo').value.trim();
    const salario_base_empleados = document.querySelector('#editEmpleadoSalario').value.trim();

    const updatedEmpleado = {
        cargo_empleados,
        salario_base_empleados,
    };

    console.log(id_empleados, updatedEmpleado);

    try {

        const url = `http://localhost:5000/updateEmpleado/${id_empleados}`;

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(updatedEmpleado),
        });

        console.log(response);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        console.log('Empleado actualizado:', data);

        closeModal();
        fetchData();

    } catch (error) {
        console.error('Error al actualizar el empleado:', error);
    }
});

async function editEmpleado(
    id_empleados,
    cargo_empleados,
    salario_base_empleados,
) {

    console.log(id_empleados, cargo_empleados, salario_base_empleados);

    document.getElementById('editEmpleadoId').value = id_empleados;

    document.getElementById('editEmpleadoCargo').value =
        decodeURIComponent(cargo_empleados);

    document.getElementById('editEmpleadoSalario').value =
        decodeURIComponent(salario_base_empleados);

    document.getElementById('editModalEmpleados').classList.remove('hidden');
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


/* ---------------------------------------------------------------- ORDENAR TABLA EMPLEADOS ----------------------------------------------------------------------------- */

function sortTable(column) {
    const table = document.getElementById('data-table');
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

function searchTable() {

    let input, filter, table, tr, td, i, j, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.querySelector("table");
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

/* -------------------------------------------------------- MODULO DE GASTOS ------------------------------------------------------------------- */
async function fetchDataGastos() {
    try {

        const url = `http://localhost:5000/selectGastoData/`;

        const response = await fetch(url);
        const data = await response.json();

        // Aquí puedes actualizar tu tabla con los datos recibidos
        const dataTable = document.getElementById('data-table-gastos');
        dataTable.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos
        data.forEach((gasto) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${gasto.id_gastos}</td>
                <td>${gasto.id_empleados}</td>
                <td>${gasto.lugar_diario}</td>
                <td>${gasto.hotel_diario}</td>
                <td>${gasto.desayuno_diario}</td>
                <td>${gasto.almuerzo_diario}</td>
                <td>${gasto.cena_diario}</td>
                <td>${gasto.lavanderia_diario}</td>
                <td>${gasto.hidratacion_diario}</td>
                <td>${gasto.hielo_diario}</td>
                <td>${gasto.refrigerio_diario}</td>
                <td>${gasto.salario_diario}</td>
                <td>${gasto.carga_prestacional_diario}</td>
                <td>${gasto.eepp_diario}</td>
                <td class="flex align-center justify-center h-full w-full mb-2s">
                    <button class="bg-gray-200 text-white px-2 py-1 rounded h-[4em] w-1/2 m-1" onclick="editGasto(${gasto.id_gastos}, '${encodeURIComponent(gasto.id_empleados)}', '${encodeURIComponent(gasto.lugar_diario)}', '${encodeURIComponent(gasto.hotel_diario)}', '${encodeURIComponent(gasto.desayuno_diario)}', '${encodeURIComponent(gasto.almuerzo_diario)}', '${encodeURIComponent(gasto.cena_diario)}', '${encodeURIComponent(gasto.lavanderia_diario)}', '${encodeURIComponent(gasto.hidratacion_diario)}', '${encodeURIComponent(gasto.hielo_diario)}', '${encodeURIComponent(gasto.refrigerio_diario)}', '${encodeURIComponent(gasto.salario_diario)}', '${encodeURIComponent(gasto.carga_prestacional_diario)}', '${encodeURIComponent(gasto.eepp_diario)}')">
                        <i class="fa-solid fa-pencil" style="color:rgb(51, 47, 47);"></i>
                        
                    </button>
                    <button class="bg-gray-200 text-white px-2 py-1 rounded h-[4em] w-1/2 m-1" onclick="openDeleteModalGastos(${gasto.id_gastos}, '${encodeURIComponent(gasto.id_empleados)}')">
                        <i class="fa-solid fa-trash" style="color:rgb(51, 47, 47);">
                    </button>
                </td>
            `;
            dataTable.appendChild(row);
        });

        // Integrar la paginación
        currentPageGastos = 1;
        displayTablePageGastos(currentPageGastos);

    } catch (error) {
        console.error('Error buscando los datos:', error);
    }
}

let currentPageGastos = 1;
const rowsPerPageGastos = 5;

function displayTablePageGastos(page) {

    const table = document.getElementById("data-table-gastos");
    const rows = table.querySelectorAll("tr");
    const totalRows = rows.length;
    const totalPages = Math.ceil(totalRows / rowsPerPageGastos);

    if (page < 1) {
        page = 1;
    }

    if (page > totalPages) {
        page = totalPages;
    }

    for (let i = 0; i < totalRows; i++) {
        rows[i].style.display = "none";
    }

    if (rows.length > 0) {
        for (let i = (page - 1) * rowsPerPageGastos; i < (page * rowsPerPageGastos) && i < totalRows; i++) {
            rows[i].style.display = '';
        }
    }

    document.getElementById("pageGastos").innerText = page;
    document.getElementById("totalPagesGastos").innerText = totalPages;
    document.getElementById("btn_prev_gastos").style.visibility = page === 1 ? "hidden" : "visible";
    document.getElementById("btn_next_gastos").style.visibility = page === totalPages ? "hidden" : "visible";
}

function prevPageGastos() {
    if (currentPageGastos > 1) {
        currentPageGastos--;
        displayTablePageGastos(currentPageGastos);
    }
}

function nextPageGastos() {
    const table = document.getElementById("data-table-gastos");
    const rows = table.querySelectorAll("tr");
    const totalRows = rows.length;
    const totalPages = Math.ceil(totalRows / rowsPerPageGastos);

    if (currentPageGastos < totalPages) {
        currentPageGastos++;
        displayTablePageGastos(currentPageGastos);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    displayTablePageGastos(currentPageGastos);
});

/* ---------------------------------------------------------------- AGREGAR GASTO ----------------------------------------------------------------------------- */

document
    .getElementById('addGastoForm')
    .addEventListener('submit', async function (event) {

        event.preventDefault();

        const formData = new FormData(this);

        const id_empleadosElement = document.getElementById('addGastoCargo');

        if (!id_empleadosElement) {
            console.error('Element with ID "addGastoCargo" not found.');
            return;
        }
        const id_empleados = id_empleadosElement.value.trim();

        const lugar_diario = document.getElementById('addGastoLugar').value.trim();
        const hotel_diario = parseFloat(document.getElementById('addGastoHotel').value.replace(/[^0-9.-]+/g, ''));
        const desayuno_diario = parseFloat(document.getElementById('addGastoDesayuno').value.replace(/[^0-9.-]+/g, ''));
        const almuerzo_diario = parseFloat(document.getElementById('addGastoAlmuerzo').value.replace(/[^0-9.-]+/g, ''));
        const cena_diario = parseFloat(document.getElementById('addGastoCena').value.replace(/[^0-9.-]+/g, ''));
        const lavanderia_diario = parseFloat(document.getElementById('addGastoLavanderia').value.replace(/[^0-9.-]+/g, ''));
        const hidratacion_diario = parseFloat(document.getElementById('addGastoHidratacion').value.replace(/[^0-9.-]+/g, ''));
        const hielo_diario = parseFloat(document.getElementById('addGastoHielo').value.replace(/[^0-9.-]+/g, ''));
        const refrigerio_diario = parseFloat(document.getElementById('addGastoRefrigerio').value.replace(/[^0-9.-]+/g, ''));
        const salario_diario = parseFloat(document.getElementById('addGastoSalario').value.replace(/[^0-9.-]+/g, ''));
        const carga_prestacional_diario = parseFloat(document.getElementById('addGastoCarga').value.replace(/[^0-9.-]+/g, ''));
        const eepp_diario = parseFloat(document.getElementById('addGastoEPP').value.replace(/[^0-9.-]+/g, ''));

        // Validate that id_empleados is not null or empty
        if (!id_empleados) {
            alert('El campo "id_empleados" no puede estar vacío.');
            return;
        }

        formData.append('id_empleados', id_empleados);

        formData.append('lugar_diario', lugar_diario);
        formData.append('hotel_diario', hotel_diario);
        formData.append('desayuno_diario', desayuno_diario);
        formData.append('almuerzo_diario', almuerzo_diario);
        formData.append('cena_diario', cena_diario);
        formData.append('lavanderia_diario', lavanderia_diario);
        formData.append('hidratacion_diario', hidratacion_diario);
        formData.append('hielo_diario', hielo_diario);
        formData.append('refrigerio_diario', refrigerio_diario);
        formData.append('salario_diario', salario_diario);
        formData.append('carga_prestacional_diario', carga_prestacional_diario);
        formData.append('eepp_diario', eepp_diario);

        try {

            const url = `http://localhost:5000/addGasto/`;

            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            console.log('gasto agregado:', JSON.stringify(data));

            closeModal();
            fetchDataGastos();

        } catch (error) {
            console.error('Error al agregar al gasto:', error);
        }

    });

function openAddModalGastos() {
    document.getElementById('addModalGastos').classList.remove('hidden');
}

/* ---------------------------------------------------------------- ELIMINAR GASTO ----------------------------------------------------------------------------- */

let gastoIdToDelete = null;

function openDeleteModalGastos(id_gastos, id_empleados) {

    gastoIdToDelete = id_gastos;

    document.getElementById(
        'deleteMessageGastos',
    ).textContent = `¿Está seguro de que desea eliminar el gasto del empleado ${decodeURIComponent(
        id_empleados,
    )} de la base de datos?`;

    document.getElementById('deleteModalGastos').classList.remove('hidden');
}

function closeDeleteModalGastos() {
    document.getElementById('deleteModalGastos').classList.add('hidden');
}

async function confirmDeleteGastos() {

    if (gastoIdToDelete === null) {

        console.error(
            'No se especifico un ID para proceder con la eliminación.',
        );

        return;
    }

    try {

        const url = `http://localhost:5000/deleteGasto/${gastoIdToDelete}`;

        const response = await fetch(
            url,
            {
                method: 'DELETE',
            },
        );

        if (!response.ok) {
            const errorMessage =
                response.status === 404
                    ? `Gasto with ID ${gastoIdToDelete} not found.`
                    : `HTTP error! status: ${response.status}`;
            throw new Error(errorMessage);
        }

        const data = await response.json();

        console.log('Gasto eliminado:', JSON.stringify(data));

        closeDeleteModalGastos();
        fetchDataGastos();

    } catch (error) {
        console.error('Error eliminando el gasto: ', error);
    }
}

/* ---------------------------------------------------------------- EDITAR GASTOS ----------------------------------------------------------------------------- */

document.getElementById('editGastoForm').addEventListener('submit', async function (event) {

    event.preventDefault();

    const id_gastos = document.querySelector('#editGastoId').value.trim();
    const id_empleados = document.querySelector('#editGastoCargo').value.trim();
    const lugar_diario = document.querySelector('#editGastoLugar').value.trim();
    const hotel_diario = document.querySelector('#editGastoHotel').value.trim();
    const desayuno_diario = document.querySelector('#editGastoDesayuno').value.trim();
    const almuerzo_diario = document.querySelector('#editGastoAlmuerzo').value.trim();
    const cena_diario = document.querySelector('#editGastoCena').value.trim();
    const lavanderia_diario = document.querySelector('#editGastoLavanderia').value.trim();
    const hidratacion_diario = document.querySelector('#editGastoHidratacion').value.trim();
    const hielo_diario = document.querySelector('#editGastoHielo').value.trim();
    const refrigerio_diario = document.querySelector('#editGastoRefrigerio').value.trim();
    const salario_diario = document.querySelector('#editGastoSalario').value.trim();
    const carga_prestacional_diario = document.querySelector('#editGastoCarga').value.trim();
    const eepp_diario = document.querySelector('#editGastoEepp').value.trim();

    const updatedGasto = {
        id_empleados,
        lugar_diario,
        hotel_diario,
        desayuno_diario,
        almuerzo_diario,
        cena_diario,
        lavanderia_diario,
        hidratacion_diario,
        hielo_diario,
        refrigerio_diario,
        salario_diario,
        carga_prestacional_diario,
        eepp_diario,
    };

    console.log(id_gastos, updatedGasto);

    try {

        const url = `http://localhost:5000/updateGasto/${id_gastos}`;

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(updatedGasto),
        });

        console.log(response);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        console.log('Gasto actualizado:', data);

        closeModal();
        fetchDataGastos();

    } catch (error) {
        console.error('Error al actualizar el gasto:', error);
    }
});

async function editGasto(
    id_gastos,
    id_empleados,
    lugar_diario,
    hotel_diario,
    desayuno_diario,
    almuerzo_diario,
    cena_diario,
    lavanderia_diario,
    hidratacion_diario,
    hielo_diario,
    refrigerio_diario,
    salario_diario,
    carga_prestacional_diario,
    eepp_diario,
) {

    console.log(id_gastos, id_empleados, lugar_diario, hotel_diario, desayuno_diario, almuerzo_diario, cena_diario, lavanderia_diario, hidratacion_diario, hielo_diario, refrigerio_diario, salario_diario, carga_prestacional_diario, eepp_diario);

    document.getElementById('editGastoId').value = id_gastos;

    document.getElementById('editGastoCargo').value =
        decodeURIComponent(id_empleados);

    document.getElementById('editGastoLugar').value =
        decodeURIComponent(lugar_diario);

    document.getElementById('editGastoHotel').value =
        decodeURIComponent(hotel_diario);

    document.getElementById('editGastoDesayuno').value =
        decodeURIComponent(desayuno_diario);

    document.getElementById('editGastoAlmuerzo').value =
        decodeURIComponent(almuerzo_diario);

    document.getElementById('editGastoCena').value =
        decodeURIComponent(cena_diario);

    document.getElementById('editGastoLavanderia').value =
        decodeURIComponent(lavanderia_diario);

    document.getElementById('editGastoHidratacion').value =
        decodeURIComponent(hidratacion_diario);

    document.getElementById('editGastoHielo').value =
        decodeURIComponent(hielo_diario);

    document.getElementById('editGastoRefrigerio').value =
        decodeURIComponent(refrigerio_diario);

    document.getElementById('editGastoSalario').value =
        decodeURIComponent(salario_diario);

    document.getElementById('editGastoCarga').value =
        decodeURIComponent(carga_prestacional_diario);

    document.getElementById('editGastoEepp').value =
        decodeURIComponent(eepp_diario);

    document.getElementById('editModalGastos').classList.remove('hidden');
}

// Función para mostrar el modal de confirmación y actualizar la página
function showConfirmationModalGastos() {

    const modal = document.getElementById('confirmationModalGastos');
    modal.classList.remove('hidden');

    // Actualizar la página cuando se cierra el modal
    document
        .getElementById('refreshPageButtonGastos')
        .addEventListener('click', function () {
            location.reload();
        });
}

/* ---------------------------------------------------------------- ORDENAR TABLA GASTOS ----------------------------------------------------------------------------- */

function sortTableGastos(column) {
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

function searchTableGastos() {

    let input, filter, table, tr, td, i, j, txtValue;
    input = document.getElementById("searchInputGastos");
    filter = input.value.toUpperCase();
    table = document.querySelector("table");
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

/* --------------------------------------------------------------------------------------------------------------------------------------------- */

function closeModal() {
    document.getElementById('editModalEmpleados').classList.add('hidden');
    document.getElementById('addModalEmpleados').classList.add('hidden');

    document.getElementById('editModalGastos').classList.add('hidden');
    document.getElementById('addModalGastos').classList.add('hidden');
}

function formatCurrency(input) {
    let value = input.value.replace(/\D/g, '');
    value = (value / 100).toFixed(2);
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    input.value = '$ ' + value;
}

// Llamar a la función fetchData cuando el DOM esté completamente cargado

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
    fetchDataGastos();
});
