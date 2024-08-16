window.onload = function () {
    const params = new URLSearchParams(window.location.search)

    document.getElementById(
        'datepicker-actions'
    ).innerText = `Fecha: ${params.get('datepicker-actions')}`

    document.getElementById(
        'nombre-proyecto'
    ).innerText = `Nombre del proyecto: ${params.get('nombre-proyecto')}`

    document.getElementById('cliente').innerText = `Cliente: ${params.get(
        'cliente'
    )}`

    document.getElementById(
        'contacto'
    ).innerText = `Nombre del contacto: ${params.get('contacto')}`

    document.getElementById(
        'correo'
    ).innerText = `Correo del contacto: ${params.get('correo')}`

    document.getElementById(
        'departamento'
    ).innerText = `Departamento: ${params.get('departamento')}`

    document.getElementById('municipio').innerText = `Municipio: ${params.get(
        'municipio'
    )}`
}
