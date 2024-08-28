let datosEquipos = []
let datosMateriales = []
let datosTransporte = []
let datosManoDeObra = []

/******************************* EQUIPOS *******************************/

document
    .getElementById('dataFormEquipos')
    .addEventListener('submit', function (e) {
        e.preventDefault()

        let descripcion_equipos =
            document.getElementById('DESCRIPCIÓN EQUIPOS').value ||
            'SIN DESCRIPCIÓN'
        let marca_equipos =
            document.getElementById('MARCA EQUIPOS').value || 'SIN MARCA'
        let tipo_equipos =
            document.getElementById('TIPO EQUIPOS').value || 'SIN TIPO'
        let tarifa_dia_equipos =
            parseFloat(document.getElementById('TARIFA DIA EQUIPOS').value) || 0
        let rendimiento_equipos =
            parseFloat(document.getElementById('RENDIMIENTO EQUIPOS').value) ||
            0
        let valor_unitario_equipos =
            parseFloat(
                document.getElementById('VALOR UNITARIO EQUIPOS').value
            ) || 0
        let incidencia_equipos =
            document.getElementById('INCIDENCIA EQUIPOS').value || 0

        datosEquipos.push({
            descripcion_equipos,
            marca_equipos,
            tipo_equipos,
            tarifa_dia_equipos,
            rendimiento_equipos,
            valor_unitario_equipos,
            incidencia_equipos,
        })
        actualizarTablaEquipos()
        this.reset()
    })

function actualizarTablaEquipos() {
    let tbody = document.querySelector('#dataTableEquipos tbody')
    tbody.innerHTML = ''
    datosEquipos.forEach((item) => {
        let tr = document.createElement('tr')
        tr.innerHTML = `<td>${item.descripcion_equipos}</td><td>${item.marca_equipos}</td><td>${item.tipo_equipos}</td><td>${item.tarifa_dia_equipos}</td><td>${item.rendimiento_equipos}</td><td>${item.valor_unitario_equipos}</td><td>${item.incidencia_equipos}</td>`
        tbody.appendChild(tr)
    })
}

document
    .getElementById('calcularEquipos')
    .addEventListener('click', function () {
        let total = datosEquipos.reduce(
            (sum, item) => sum + item.valor_unitario_equipos,
            0
        )
        document.getElementById(
            'resultadoEquipos'
        ).textContent = `Total: ${total}`
    })

/******************************* MATERIALES *******************************/

document
    .getElementById('dataFormMateriales')
    .addEventListener('submit', function (e) {
        e.preventDefault()

        let descripcion_materiales =
            document.getElementById('DESCRIPCION MATERIALES').value ||
            'SIN DESCRIPCIÓN'
        let tipo_moneda_materiales =
            document.getElementById('TIPO DE MONEDA MATERIALES').value ||
            'SIN TIPO DE MONEDA'
        let unidad_materiales =
            document.getElementById('UNIDAD MATERIALES').value ||
            'SIN UNIDAD DE MEDIDA'
        let precio_unitario_materiales =
            parseFloat(
                document.getElementById('PRECIO UNITARIO MATERIALES').value
            ) || 0
        let rendimiento_materiales =
            parseFloat(
                document.getElementById('RENDIMIENTO MATERIALES').value
            ) || 0
        let valor_unitario_materiales =
            parseFloat(
                document.getElementById('VALOR UNITARIO MATERIALES').value
            ) || 0
        let incidencia_materiales =
            parseFloat(
                document.getElementById('INCIDENCIA MATERIALES').value
            ) || 0

        datosMateriales.push({
            descripcion_materiales,
            tipo_moneda_materiales,
            unidad_materiales,
            precio_unitario_materiales,
            rendimiento_materiales,
            valor_unitario_materiales,
            incidencia_materiales,
        })

        actualizarTablaMateriales()
        this.reset()
    })

function actualizarTablaMateriales() {
    let tbody = document.querySelector('#dataTableMateriales tbody')
    tbody.innerHTML = ''
    datosMateriales.forEach((item) => {
        let tr = document.createElement('tr')
        tr.innerHTML = `<td>${item.descripcion_materiales}</td><td>${item.tipo_moneda_materiales}</td><td>${item.unidad_materiales}</td><td>${item.precio_unitario_materiales}</td><td>${item.rendimiento_materiales}</td><td>${item.valor_unitario_materiales}</td><td>${item.incidencia_materiales}</td>`
        tbody.appendChild(tr)
    })
}

document
    .getElementById('calcularMateriales')
    .addEventListener('click', function () {
        let total = datosMateriales.reduce(
            (sum, item) => sum + item.valor_unitario_materiales,
            0
        )
        document.getElementById(
            'resultadoMateriales'
        ).textContent = `Total: ${total}`
    })

/******************************* TRANSPORTE *******************************/

document
    .getElementById('dataFormTransporte')
    .addEventListener('submit', function (e) {
        e.preventDefault()

        let descripcion_transporte =
            document.getElementById('DESCRIPCION TRANSPORTE').value ||
            'SIN DESCRIPCIÓN'
        let unidad_transporte =
            document.getElementById('UNIDAD TRANSPORTE').value || 'SIN UNIDAD'
        let distancia_transporte =
            document.getElementById('DISTANCIA TRANSPORTE').value || 0
        let precio_unitario_transporte =
            parseFloat(
                document.getElementById('PRECIO UNITARIO TRANSPORTE').value
            ) || 0
        let rendimiento_transporte =
            parseFloat(
                document.getElementById('RENDIMIENTO TRANSPORTE').value
            ) || 0
        let valor_unitario_transporte =
            parseFloat(
                document.getElementById('VALOR UNITARIO TRANSPORTE').value
            ) || 0
        let incidencia_transporte =
            document.getElementById('INCIDENCIA TRANSPORTE').value || 0

        datosTransporte.push({
            descripcion_transporte,
            unidad_transporte,
            distancia_transporte,
            precio_unitario_transporte,
            rendimiento_transporte,
            valor_unitario_transporte,
            incidencia_transporte,
        })
        actualizarTablaTransporte()
        this.reset()
    })

function actualizarTablaTransporte() {
    let tbody = document.querySelector('#dataTableTransporte tbody')
    tbody.innerHTML = ''
    datosTransporte.forEach((item) => {
        let tr = document.createElement('tr')
        tr.innerHTML = `<td>${item.descripcion_transporte}</td><td>${item.unidad_transporte}</td><td>${item.distancia_transporte}</td><td>${item.precio_unitario_transporte}</td><td>${item.rendimiento_transporte}</td><td>${item.valor_unitario_transporte}</td><td>${item.incidencia_transporte}</td>`
        tbody.appendChild(tr)
    })
}

document
    .getElementById('calcularTransporte')
    .addEventListener('click', function () {
        let total = datosTransporte.reduce(
            (sum, item) => sum + item.valor_unitario_transporte,
            0
        )
        document.getElementById(
            'resultadoTransporte'
        ).textContent = `Total: ${total}`
    })

/******************************* MANO DE OBRA *******************************/

document
    .getElementById('dataFormManoDeObra')
    .addEventListener('submit', function (e) {
        e.preventDefault()

        let trabajador_mano_de_obra =
            document.getElementById('TRABAJADOR MANO DE OBRA').value ||
            'SIN TRABAJADOR'
        let jornal_mano_de_obra =
            parseFloat(document.getElementById('JORNAL MANO DE OBRA').value) ||
            0
        let prestacion_mano_de_obra =
            document.getElementById('PRESTACION (%) MANO DE OBRA').value || 0
        let jornal_total_mano_de_obra =
            parseFloat(
                document.getElementById('JORNAL TOTAL MANO DE OBRA').value
            ) || 0
        let rendimiento_mano_de_obra =
            parseFloat(
                document.getElementById('RENDIMIENTO MANO DE OBRA').value
            ) || 0
        let valor_unitario_mano_de_obra =
            parseFloat(
                document.getElementById('VALOR UNITARIO MANO DE OBRA').value
            ) || 0
        let incidencia_mano_de_obra =
            document.getElementById('INCIDENCIA MANO DE OBRA').value || 0

        datosManoDeObra.push({
            trabajador_mano_de_obra,
            jornal_mano_de_obra,
            prestacion_mano_de_obra,
            jornal_total_mano_de_obra,
            rendimiento_mano_de_obra,
            valor_unitario_mano_de_obra,
            incidencia_mano_de_obra,
        })
        actualizarTablaManoDeObra()
        this.reset()
    })

function actualizarTablaManoDeObra() {
    let tbody = document.querySelector('#dataTableManoDeObra tbody')
    tbody.innerHTML = ''
    datosManoDeObra.forEach((item) => {
        let tr = document.createElement('tr')
        tr.innerHTML = `<td>${item.trabajador_mano_de_obra}</td><td>${item.jornal_mano_de_obra}</td><td>${item.prestacion_mano_de_obra}</td><td>${item.jornal_total_mano_de_obra}</td><td>${item.rendimiento_mano_de_obra}</td><td>${item.valor_unitario_mano_de_obra}</td><td>${item.incidencia_mano_de_obra}</td>`
        tbody.appendChild(tr)
    })
}

document
    .getElementById('calcularManoDeObra')
    .addEventListener('click', function () {
        let total = datosManoDeObra.reduce(
            (sum, item) => sum + item.valor_unitario_mano_de_obra,
            0
        )
        document.getElementById(
            'resultadoManoDeObra'
        ).textContent = `Total: ${total}`
    })
