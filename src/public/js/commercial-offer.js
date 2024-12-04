document.addEventListener('DOMContentLoaded', function () {
    const data = [
        {
            ID: 1,
            CAPITULO: '1. Trabajos preliminares',
            DESCRIPCION: 'Limpieza del area de trabajo',
            UNIDAD: 'dias',
        },

        {
            ID: 2,
            CAPITULO: '2. Excavación y movimiento de tierras',
            DESCRIPCION: 'Excavación en zanjas para cimentación',
            UNIDAD: 'm3',
        },
        {
            ID: 3,
            CAPITULO: '3. Cimentación',
            DESCRIPCION: 'Cimentación corrida de concreto fc=150',
            UNIDAD: 'm3',
        },

        {
            ID: 4,
            CAPITULO: '4. Estructura del reservorio',
            DESCRIPCION: 'Escalera de acceso a la cisterna',
            UNIDAD: 'und',
        },
        {
            ID: 5,
            CAPITULO: '5. Impermeabilización',
            DESCRIPCION:
                'Impermeabilización de cisterna con membrana asfáltica',
            UNIDAD: 'm2',
        },
    ]

    const tableBody = document.getElementById('data-table')

    data.forEach((item) => {
        
        const row = document.createElement('tr')
        row.className = 'border-b'

        row.innerHTML = `
            <td class="py-2">${item.ID}</td>
            <td class="py-2">${item.CAPITULO}</td>
            <td class="py-2">${item.DESCRIPCION}</td>
            <td class="py-2">${item.UNIDAD}</td>
            <td class="py-2">
                <button class="bg-blue-500 text-white px-2 py-1 rounded" onclick="viewItem(${item.ID})">Ver</button>
                <button class="bg-yellow-500 text-white px-2 py-1 rounded" onclick="editItem(${item.ID})">Editar</button>
                <button class="bg-red-500 text-white px-2 py-1 rounded" onclick="deleteItem(${item.ID})">Eliminar</button>
            </td>
        `

        tableBody.appendChild(row)
    })
})

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
function viewItem(ID) {
    alert('Estas viendo el elemento con el ID: ' + ID)
}

function editItem(ID) {
    alert('Estas editando el elemento con el ID: ' + ID)
}

function deleteItem(ID) {
    if (
        confirm(
            'Esta seguro de que quiere eliminar el elemento con el ID: ' +
                ID +
                '?'
        )
    ) {
        alert('Elemento con el ID: ' + ID + ' eliminado.')
    }
}

function borrarInformacionProyecto(index) {
    let informacionProyecto =
        JSON.parse(localStorage.getItem('informacionProyecto')) || []
    informacionProyecto.splice(index, 1)
    localStorage.setItem(
        'informacionProyecto',
        JSON.stringify(informacionProyecto)
    )
    mostrarInformacionProyecto()
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
            <button onclick="borrarInformacionProyecto(${index})">Eliminar</button>
        `
        dataContainer.appendChild(dataDiv)
    })
}

mostrarInformacionProyecto()
