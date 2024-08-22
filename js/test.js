let datos = []

document.getElementById('dataForm').addEventListener('submit', function (e) {
    e.preventDefault()
    let nombre = document.getElementById('nombre').value
    let valor = parseFloat(document.getElementById('valor').value)

    datos.push({ nombre, valor })
    actualizarTabla()
    this.reset()
})

function actualizarTabla() {
    let tbody = document.querySelector('#dataTable tbody')
    tbody.innerHTML = ''
    datos.forEach((item) => {
        let tr = document.createElement('tr')
        tr.innerHTML = `<td>${item.nombre}</td><td>${item.valor}</td>`
        tbody.appendChild(tr)
    })
}

document.getElementById('calcular').addEventListener('click', function () {
    let total = datos.reduce((sum, item) => sum + item.valor, 0)
    document.getElementById('resultado').textContent = `Total: ${total}`
})
