document.addEventListener('DOMContentLoaded', function () {
    const data = [
        {
            ID: 1,
            CAPITULO: 'Excavación',
            DESCRIPCION: 'Excavación, Conformación y Nivelación',
            UNIDAD: 'm3',
        },

        {
            ID: 2,
            CAPITULO: 'ddddd',
            DESCRIPCION: 'dddddd',
            UNIDAD: 'ddd',
        },
        {
            ID: 1,
            CAPITULO: 'Excavación',
            DESCRIPCION: 'Excavación, Conformación y Nivelación',
            UNIDAD: 'm3',
        },

        {
            ID: 2,
            CAPITULO: 'ddddd',
            DESCRIPCION: 'dddddd',
            UNIDAD: 'ddd',
        },
        {
            ID: 1,
            CAPITULO: 'Excavación',
            DESCRIPCION: 'Excavación, Conformación y Nivelación',
            UNIDAD: 'm3',
        },

        {
            ID: 2,
            CAPITULO: 'ddddd',
            DESCRIPCION: 'dddddd',
            UNIDAD: 'ddd',
        },
        {
            ID: 1,
            CAPITULO: 'Excavación',
            DESCRIPCION: 'Excavación, Conformación y Nivelación',
            UNIDAD: 'm3',
        },

        {
            ID: 2,
            CAPITULO: 'ddddd',
            DESCRIPCION: 'dddddd',
            UNIDAD: 'ddd',
        },
        {
            ID: 1,
            CAPITULO: 'Excavación',
            DESCRIPCION: 'Excavación, Conformación y Nivelación',
            UNIDAD: 'm3',
        },

        {
            ID: 2,
            CAPITULO: 'ddddd',
            DESCRIPCION: 'dddddd',
            UNIDAD: 'ddd',
        },
        {
            ID: 1,
            CAPITULO: 'Excavación',
            DESCRIPCION: 'Excavación, Conformación y Nivelación',
            UNIDAD: 'm3',
        },

        {
            ID: 2,
            CAPITULO: 'ddddd',
            DESCRIPCION: 'dddddd',
            UNIDAD: 'ddd',
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
