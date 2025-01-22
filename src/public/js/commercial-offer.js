document.addEventListener('DOMContentLoaded', function () {

    const ofertaComercial = JSON.parse(localStorage.getItem('ofertaComercial')) || {};

    console.log('ofertaComercial', ofertaComercial);

    const tableBody = document.getElementById('data-table')

    ofertaComercial.forEach((item) => {

        const row = document.createElement('tr')
        row.className = 'border-b'

        const rowIndex = tableBody.getElementsByTagName('tr').length + 1;
        row.innerHTML = `
            <td class="py-2 border-b border-r text-center">${rowIndex}</td>
            <td class="py-2 border-b border-r text-center">${item.capitulo}</td>
            <td class="py-2 border-b border-r text-center">${item.descripcion}</td>
            <td class="py-2 border-b border-r text-center">${item.unidad}</td>
            <td class="py-2 border-b border-r text-center">${item.cantidad_instalar}</td>
            <td class="py-2 border-b border-r text-center">$ ${item.valor_sin_aiu.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            <td class="py-2 border-b border-r text-center">$ ${(item.cantidad_instalar * item.valor_sin_aiu).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} </td>
            <td class="py-2 border-b text-center">
                <button class="bg-gray-500 text-white px-2 py-1 rounded no-print" onclick="editItem(${rowIndex});"><i class="fa-regular fa-pen-to-square" style="color: #ffffff;"></i></button>
                <button class="bg-gray-500 text-white px-2 py-1 rounded no-print" onclick="deleteItem(${rowIndex});"><i class="fa-regular fa-trash-can" style="color: #ffffff;"></i></button>
            </td>
        `

        tableBody.appendChild(row)
    })
})

// const ofertaComercial = JSON.parse(localStorage.getItem('ofertaComercial')) || {};

// if (ofertaComercial.length > 0) {
//     ofertaComercial.pop(); // Eliminar el último elemento del array
//     localStorage.setItem('ofertaComercial', JSON.stringify(ofertaComercial));
// }

function deleteItem(rowIndex) {

    if (confirm('Esta seguro de que quiere eliminar el elemento que esta en el ID: ' + rowIndex + '?')) {

        const ofertaComercial = JSON.parse(localStorage.getItem('ofertaComercial')) || [];

        // Eliminar el elemento del array
        ofertaComercial.splice(rowIndex - 1, 1);

        // Actualizar el localStorage
        localStorage.setItem('ofertaComercial', JSON.stringify(ofertaComercial));

        // Recargar la página para reflejar los cambios
        location.reload();
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

function editItem(ID) {
    alert('Estas editando el elemento con el ID: ' + ID)
}

function cancelOffer() {
    localStorage.removeItem('informacionProyecto');
}

function mostrarInformacionProyecto() {

    const informacionProyecto =
        JSON.parse(localStorage.getItem('informacionProyecto')) || []
    const dataContainer = document.getElementById('dataContainer')

    // Limpiar el contenedor antes de agregar nuevos datos
    dataContainer.innerHTML = ''

    informacionProyecto.forEach((data, index) => {
        const dataDiv = document.createElement('div')
        dataDiv.classList.add('data-item')
        dataDiv.innerHTML = `
            <p><strong>Fecha:</strong> ${data.fecha}</p>
            <p><strong>Nombre del Proyecto:</strong> ${data.proyecto}</p>
            <p><strong>Cliente:</strong> ${data.cliente}</p>
            <p><strong>Contacto:</strong> ${data.contacto}</p>
            <p><strong>Correo Electrónico:</strong> ${data.correo}</p>
            <p><strong>Departamento:</strong> ${data.departamento}</p>
            <p><strong>Municipio:</strong> ${data.municipio}</p>
        `
        dataContainer.appendChild(dataDiv)
    })
}

mostrarInformacionProyecto();

document.addEventListener('DOMContentLoaded', (event) => {

    const ofertaComercial = JSON.parse(localStorage.getItem('ofertaComercial')) || [];

    console.log(ofertaComercial);

    if (ofertaComercial) {

        let total = 0;

        ofertaComercial.forEach(item => {
            total += item.valor_sin_aiu * item.cantidad_instalar;
        });

        document.getElementById('subTotalOferta').innerText = `$${total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;

        const iva = total * 0.19;

        document.getElementById('ivaOferta').innerText = `$${iva.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;

        const totalConIva = total + iva;

        document.getElementById('totalOferta').innerText = `$${totalConIva.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
    }

});

function printPage() {
    window.print();
}
