document.addEventListener('DOMContentLoaded', function () {

    const ofertaComercial = JSON.parse(localStorage.getItem('ofertaComercial')) || [];

    console.log('ofertaComercial', ofertaComercial);

    const tableBody = document.getElementById('data-table')

    ofertaComercial.forEach((item) => {

        const row = document.createElement('tr')
        row.className = 'border-b'
        const rowIndex = tableBody.getElementsByTagName('tr').length + 1;
        const cantidadInstalar = item.cantidad_instalar === "No se ingreso una cantidad a instalar" ? 1 : item.cantidad_instalar;
        row.innerHTML = `
                <td class="py-2 border-b border-r text-center">${rowIndex}</td>
                <td class="py-2 border-b border-r text-center">${item.capitulo}</td>
                <td class="py-2 border-b border-r text-center">${item.descripcion}</td>
                <td class="py-2 border-b border-r text-center">${item.unidad}</td>
                <td class="py-2 border-b border-r text-center">${cantidadInstalar}</td>
                <td class="py-2 border-b border-r text-center">$ ${item.valor_sin_aiu.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td class="py-2 border-b border-r text-center">$ ${(cantidadInstalar * item.valor_sin_aiu).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} </td>
                <td class="py-2 border-b text-center">
                    <button class="bg-blue-500 text-white px-3 py-2 rounded no-print" onclick="viewAPU(${rowIndex});"><i class="fa-regular fa-eye" style="color: #ffffff;"></i></button>
                    <button class="bg-yellow-500 text-white px-3 py-2 rounded no-print" onclick="editItem(${rowIndex});"><i class="fa-regular fa-pen-to-square" style="color: #ffffff;"></i></button>
                    <button class="bg-red-500 text-white px-3 py-2 rounded no-print" onclick="deleteItem(${rowIndex});"><i class="fa-regular fa-trash-can" style="color: #ffffff;"></i></button>
                </td>
            `;

        tableBody.appendChild(row)
    })
})


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
    if (confirm('¿Está seguro de que quiere cancelar la oferta? Se perderán todos los datos guardados.')) {
        localStorage.removeItem('informacionProyecto');
        localStorage.removeItem('ofertaComercial');
        localStorage.removeItem('ofertaComercialMov');
        location.href = './main.html';
    }
}

function mostrarInformacionProyecto() {

    const informacionProyecto =
        JSON.parse(localStorage.getItem('informacionProyecto')) || []

    const dataContainer = document.getElementById('dataContainer')

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
    const ofertaComercialMov = JSON.parse(localStorage.getItem('ofertaComercialMov')) || [];

    const movValue = document.getElementById('movValue');

    movValue.innerText = ofertaComercialMov.length > 0 ? `$${ofertaComercialMov[0].valor_sin_aiu.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '$0.00';

    console.log(ofertaComercial);
    console.log(ofertaComercialMov);

    if (ofertaComercial) {

        let total = 0;

        ofertaComercial.forEach((item, index) => {

            console.log(item.cantidad_instalar);
            const cantidad = item.cantidad_instalar == "No se ingreso una cantidad a instalar" ? 1 : (item.cantidad_instalar || 1);
            total += item.valor_sin_aiu * cantidad;

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
