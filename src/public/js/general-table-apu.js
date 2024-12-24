let datosMateriales = []
let datosTransporte = []
let datosManoDeObra = []

/******************************* EQUIPOS *******************************/

document
    .getElementById('dataFormEquipos')
    .addEventListener('submit', function (e) {
        e.preventDefault()

        let descripcion_equipos =
            document.getElementById('DESCRIPCIÓN EQUIPOS').value || 'SIN DESCRIPCIÓN'

        let marca_equipos =
            document.getElementById('MARCA EQUIPOS').value || 'SIN MARCA'

        let tipo_equipos =
            document.getElementById('TIPO EQUIPOS').value || 'SIN TIPO'

        let tarifa_dia_equipos =
            parseFloat(document.getElementById('TARIFA_DIA_EQUIPOS').value) || 0

        let rendimiento_equipos =
            parseFloat(document.getElementById('RENDIMIENTO_EQUIPOS').value).toFixed(4) || 0

        let valor_unitario_equipos =
            parseFloat(document.getElementById('VALOR_UNITARIO_EQUIPOS').value) || 0

        // Obtener los datos existentes del localStorage
        let datosEquipos =
            JSON.parse(localStorage.getItem('datosEquipos')) || []

        datosEquipos.push({
            descripcion_equipos,
            marca_equipos,
            tipo_equipos,
            tarifa_dia_equipos,
            rendimiento_equipos,
            valor_unitario_equipos,
        })

        console.log("Que es lo que se va a hacer push " + JSON.stringify(datosEquipos));

        localStorage.setItem('datosEquipos', JSON.stringify(datosEquipos))

        actualizarValorUnitarioEquipos()
        actualizarTablaEquipos()
    })

function actualizarTablaEquipos() {

    let tbody = document.querySelector('#dataTableEquipos tbody')

    // Obtener los datos del localStorage
    let storedDatosEquipos =
        JSON.parse(localStorage.getItem('datosEquipos')) || []

    let totalEquipos = storedDatosEquipos.reduce(
        (sum, item) => sum + parseFloat(item.valor_unitario_equipos), 0
    )

    tbody.innerHTML = ''

    storedDatosEquipos.forEach((item, index) => {

        let tr = document.createElement('tr')

        tr.className =
            index % 2 === 0
                ? 'even:bg-gray-50 border-b'
                : 'odd:bg-white even:bg-gray-50 border-b'
        tr.innerHTML =
            `<td>${item.descripcion_equipos}</td>
            <td>${item.marca_equipos}</td>
            <td>${item.tipo_equipos}</td>
            <td>${item.tarifa_dia_equipos}</td>
            <td>${isNaN(item.rendimiento_equipos) ? 0 : item.rendimiento_equipos}</td>
            <td>${isNaN(item.valor_unitario_equipos) || !isFinite(item.valor_unitario_equipos) ? 0 : item.valor_unitario_equipos}</td>
            <td>${(item.porcentaje_incidencia = ((item.rendimiento_equipos * item.tarifa_dia_equipos) / totalEquipos) * 100 || 0).toFixed(2)}%</td>
            <td><button class="active:scale-90 transition-transform" onclick="eliminarElementoEquipos(${storedDatosEquipos.indexOf(item)})"><i class="fa-solid fa-trash-can"></i></button></td>`

        tbody.appendChild(tr)
    })
}

function eliminarElementoEquipos(index) {
    // Obtener los datos existentes del localStorage
    let datosEquipos = JSON.parse(localStorage.getItem('datosEquipos')) || []

    // Eliminar el elemento del array
    datosEquipos.splice(index, 1)

    // Guardar el array actualizado en el localStorage
    localStorage.setItem('datosEquipos', JSON.stringify(datosEquipos))

    // Actualizar la tabla
    actualizarTablaEquipos()
}

function actualizarRendimientoEquipos() {

    const informacionRotulos =
        JSON.parse(localStorage.getItem('informacionRotulos')) || []

    console.log(informacionRotulos)

    let storedDatosEquipos =
        JSON.parse(localStorage.getItem('datosEquipos')) || []

    informacionRotulos.forEach((data) => {
        storedDatosEquipos.forEach((item) => {
            item.rendimiento_equipos = (1 / data.rendimiento).toFixed(4)
        })
    })

    localStorage.setItem('datosEquipos', JSON.stringify(storedDatosEquipos))

    actualizarTablaEquipos()
}

function actualizarValorUnitarioEquipos() {

    const storedDatosEquipos =
        JSON.parse(localStorage.getItem('datosEquipos')) || []

    console.log(storedDatosEquipos)

    storedDatosEquipos.forEach((item) => {
        item.valor_unitario_equipos = (1 / item.tarifa_dia_equipos).toFixed(4)
    })

    console.log(storedDatosEquipos)

    localStorage.setItem('datosEquipos', JSON.stringify(storedDatosEquipos))

    actualizarTablaEquipos()
}

actualizarTablaEquipos();

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
                document.getElementById('PRECIO_UNITARIO_MATERIALES').value
            ) || 0

        let cantidad_materiales =
            parseFloat(
                document.getElementById('CANTIDAD_MATERIALES').value
            ).toFixed(4) || 0

        let valor_unitario_materiales =
            parseFloat(
                document.getElementById('VALOR_UNITARIO_MATERIALES').value
            ) || 0

        let datosMateriales =
            JSON.parse(localStorage.getItem('datosMateriales')) || []

        datosMateriales.push({
            descripcion_materiales,
            tipo_moneda_materiales,
            unidad_materiales,
            precio_unitario_materiales,
            cantidad_materiales,
            valor_unitario_materiales,
        })

        console.log("Que es lo que se va a hacer push " + datosMateriales);

        localStorage.setItem('datosMateriales', JSON.stringify(datosMateriales))

        actualizarValorUnitarioMateriales()
        actualizarTablaMateriales()
    })

function actualizarTablaMateriales() {

    let tbody = document.querySelector('#dataTableMateriales tbody')

    // Obtener los datos del localStorage
    let storedDatosMateriales =
        JSON.parse(localStorage.getItem('datosMateriales')) || []

    console.log("POR ESTO: " + JSON.stringify(storedDatosMateriales));

    // Calcular el total de todos los valores
    let totalMateriales = storedDatosMateriales.reduce(
        (sum, item) => sum + parseFloat(item.valor_unitario_materiales), 0
    )

    console.log(totalMateriales);


    tbody.innerHTML = ''

    storedDatosMateriales.forEach((item, index) => {
        let tr = document.createElement('tr')
        tr.className =
            index % 2 === 0
                ? 'even:bg-gray-50 border-b'
                : 'odd:bg-white even:bg-gray-50 border-b'
        item.porcentaje_incidencia = (item.valor_unitario_materiales / totalMateriales) * 100 || 0;
        tr.innerHTML = `<td> ${item.descripcion_materiales}</td>
                        <td>${item.tipo_moneda_materiales}</td>
                        <td>${item.unidad_materiales}</td>
                        <td>${item.precio_unitario_materiales}</td>
                        <td>${isNaN(item.cantidad_materiales) || !isFinite(item.cantidad_materiales) ? 0 : item.cantidad_materiales}</td>
                        <td>${isNaN(item.valor_unitario_materiales) || !isFinite(item.valor_unitario_materiales) ? 0 : item.tipo_moneda_materiales === 'USD' ? 'COP: ' + item.valor_unitario_materiales : item.valor_unitario_materiales}</td>
                        <td>${item.porcentaje_incidencia.toFixed(2)}%</td>
                        <td><button class="active:scale-90 transition-transform" onclick="eliminarElementoMateriales(${storedDatosMateriales.indexOf(item)})"><i class="fa-solid fa-trash-can"></i></button></td>`

        tbody.appendChild(tr)
    })
}

function eliminarElementoMateriales(index) {

    // Obtener los datos existentes del localStorage
    let datosMateriales = JSON.parse(localStorage.getItem('datosMateriales')) || []

    // Eliminar el elemento del array
    datosMateriales.splice(index, 1)

    // Guardar el array actualizado en el localStorage
    localStorage.setItem('datosMateriales', JSON.stringify(datosMateriales))

    // Actualizar la tabla
    actualizarTablaMateriales()
}

function actualizarCantidadMateriales() {

    const informacionRotulos =
        JSON.parse(localStorage.getItem('informacionRotulos')) || []

    let storedDatosMateriales =
        JSON.parse(localStorage.getItem('datosMateriales')) || []

    informacionRotulos.forEach((data) => {
        storedDatosMateriales.forEach((item) => {
            item.cantidad_materiales = (3 / data.rendimiento).toFixed(4)
        })
    })

    localStorage.setItem('datosMateriales', JSON.stringify(storedDatosMateriales))

    actualizarTablaMateriales()
}

function actualizarValorUnitarioMateriales() {

    const storedDatosMateriales =
        JSON.parse(localStorage.getItem('datosMateriales')) || []

    console.log(
        storedDatosMateriales
    );

    const trmValue = parseFloat(localStorage.getItem('trmValue')) || 0;

    console.log(trmValue);

    storedDatosMateriales.forEach((item) => {
        if (item.tipo_moneda_materiales === 'USD' && !item.trm_applied) {
            item.valor_unitario_materiales = (item.valor_unitario_materiales * trmValue).toFixed(2);
            item.trm_applied = true; // Marcar que la TRM ya ha sido aplicada
        } else if (item.tipo_moneda_materiales !== 'USD') {
            item.valor_unitario_materiales = (item.precio_unitario_materiales * item.cantidad_materiales).toFixed(2);
        }
    });

    console.log(storedDatosMateriales)

    localStorage.setItem('datosMateriales', JSON.stringify(storedDatosMateriales))

    actualizarTablaMateriales()

}

actualizarTablaMateriales();

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

        datosTransporte.push({
            descripcion_transporte,
            unidad_transporte,
            distancia_transporte,
            precio_unitario_transporte,
            rendimiento_transporte,
            valor_unitario_transporte,
        })

        actualizarTablaTransporte()

    })

function actualizarTablaTransporte() {

    let tbody = document.querySelector('#dataTableTransporte tbody')

    tbody.innerHTML = ''

    datosTransporte.forEach((item, index) => {
        let tr = document.createElement('tr')
        tr.className =
            index % 2 === 0
                ? 'even:bg-gray-50 border-b'
                : 'odd:bg-white even:bg-gray-50 border-b'
        tr.innerHTML = `
        <td> ${item.descripcion_transporte}</td>
        <td>${item.unidad_transporte}</td>
        <td>${item.distancia_transporte}</td>
        <td>$ ${item.precio_unitario_transporte}</td>
        <td>${item.rendimiento_transporte}</td>
        <td>$ ${item.valor_unitario_transporte}</td>
        <td> % </td>
        <td><button class="active:scale-90 transition-transform" onclick="eliminarElementoTransporte(${datosTransporte.indexOf(
            item
        )})"><i class="fa-solid fa-trash-can"></i></button></td>`
        tbody.appendChild(tr)
    })
}

function eliminarElementoTransporte(index) {
    datosTransporte.splice(index, 1)
    actualizarTablaTransporte()
}

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

        datosManoDeObra.push({
            trabajador_mano_de_obra,
            jornal_mano_de_obra,
            prestacion_mano_de_obra,
            jornal_total_mano_de_obra,
            rendimiento_mano_de_obra,
            valor_unitario_mano_de_obra,
        })
        actualizarTablaManoDeObra()
    })

function actualizarTablaManoDeObra() {
    let tbody = document.querySelector('#dataTableManoDeObra tbody')
    tbody.innerHTML = ''
    datosManoDeObra.forEach((item, index) => {
        let tr = document.createElement('tr')
        tr.className =
            index % 2 === 0
                ? 'even:bg-gray-50 border-b'
                : 'odd:bg-white even:bg-gray-50 border-b'
        tr.innerHTML = `< td > ${item.trabajador_mano_de_obra}</td ><td>$ ${item.jornal_mano_de_obra
            }</td><td>${item.prestacion_mano_de_obra}</td><td>$ ${item.jornal_total_mano_de_obra
            }</td><td>${item.rendimiento_mano_de_obra}</td><td>$ ${item.valor_unitario_mano_de_obra
            }</td><td> % </td><td><button class="active:scale-90 transition-transform" onclick="eliminarElementoManoDeObra(${datosManoDeObra.indexOf(
                item
            )})"><i class="fa-solid fa-trash-can"></i></button></td>`
        tbody.appendChild(tr)
    })
}

function eliminarElementoManoDeObra(index) {
    datosManoDeObra.splice(index, 1)
    actualizarTablaManoDeObra()
}

/******************************* TOTAL *******************************/

function calcularTotalGeneral() {

    // Sumar los valores
    let storedDatosEquipos =
        JSON.parse(localStorage.getItem('datosEquipos')) || []

    let totalEquipos = storedDatosEquipos.reduce(
        (sum, item) => sum + parseFloat(item.valor_unitario_equipos), 0
    )

    let storedDatosMateriales =
        JSON.parse(localStorage.getItem('datosMateriales')) || []

    // Sumar los valores
    let totalMateriales = storedDatosMateriales.reduce(
        (sum, item) => sum + parseFloat(item.valor_unitario_materiales), 0
    )

    // Sumar los valores
    let totalTransporte = datosTransporte.reduce(
        (sum, item) => sum + item.valor_unitario_transporte,
        0
    )
    // Sumar los valores
    let totalManoDeObra = datosManoDeObra.reduce(
        (sum, item) => sum + item.valor_unitario_mano_de_obra,
        0
    )

    // Sumar todos los totales
    let totalGeneral =
        totalManoDeObra + totalEquipos + totalMateriales + totalTransporte

    let administracion = totalGeneral * 0.13
    let imprevistos = totalGeneral * 0.07
    let utilidad = totalGeneral * 0.05

    let totalGlobal = totalGeneral + administracion + imprevistos + utilidad

    let porcentajeManoDeObra = (totalManoDeObra / totalGeneral) * 100 || 0
    let porcentajeEquipos = (totalEquipos / totalGeneral) * 100 || 0
    let porcentajeMateriales = (totalMateriales / totalGeneral) * 100 || 0
    let porcentajeTransporte = (totalTransporte / totalGeneral) * 100 || 0

    // Mostrar los sub-totales en el DOM con dos decimales
    document.getElementById(
        'resultadoEquipos'
    ).textContent = `$ ${isNaN(totalEquipos.toFixed(2)) || !isFinite(totalEquipos) ? 0 : totalEquipos.toFixed(2)} `
    document.getElementById(
        'porcentajeEquipos'
    ).textContent = `${isNaN(porcentajeEquipos.toFixed(2)) || !isFinite(porcentajeEquipos) ? 0 : porcentajeEquipos.toFixed(2)}% `

    document.getElementById(
        'resultadoMateriales'
    ).textContent = `$ ${isNaN(totalMateriales.toFixed(2)) || !isFinite(totalMateriales) ? 0 : totalMateriales.toFixed(2)} `
    document.getElementById(
        'porcentajeMateriales'
    ).textContent = `${isNaN(porcentajeMateriales.toFixed(2)) || !isFinite(porcentajeMateriales) ? 0 : porcentajeMateriales.toFixed(2)}% `

    document.getElementById(
        'resultadoTransporte'
    ).textContent = `$ ${totalTransporte.toFixed(2)} `
    document.getElementById(
        'porcentajeTransporte'
    ).textContent = `${porcentajeTransporte.toFixed(2)}% `

    document.getElementById(
        'resultadoManoDeObra'
    ).textContent = `$ ${totalManoDeObra.toFixed(2)} `
    document.getElementById(
        'porcentajeManoDeObra'
    ).textContent = `${porcentajeManoDeObra.toFixed(2)}% `

    // Mostrar el resultado en un elemento del DOM con dos decimales
    document.getElementById(
        'resultadoTotalGeneral'
    ).textContent = `$ ${totalGeneral.toFixed(2)} `
    document.getElementById(
        'administracion'
    ).textContent = `$ ${administracion.toFixed(2)} `
    document.getElementById(
        'imprevistos'
    ).textContent = `$ ${imprevistos.toFixed(2)} `
    document.getElementById('utilidad').textContent = `$ ${utilidad.toFixed(
        2
    )} `
    document.getElementById(
        'totalGlobal'
    ).textContent = `$ ${totalGlobal.toFixed(2)} `
}

// Configurar el MutationObserver para observar cambios en el contenedor de filas
const observer = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            calcularTotalGeneral()
        }
    }
})

// Seleccionar el contenedor donde se agregan las filas
const filaContenedorEquipos = document.getElementById('filaContenedorEquipos')

const filaContenedorMateriales = document.getElementById(
    'filaContenedorMateriales'
)
const filaContenedorTransporte = document.getElementById(
    'filaContenedorTransporte'
)
const filaContenedorManoDeObra = document.getElementById(
    'filaContenedorManoDeObra'
)

// Configurar el observer para observar cambios en los hijos del contenedor
observer.observe(filaContenedorEquipos, { childList: true })
observer.observe(filaContenedorMateriales, { childList: true })
observer.observe(filaContenedorTransporte, { childList: true })
observer.observe(filaContenedorManoDeObra, { childList: true })

// Llamar a calcularTotalGeneral inicialmente para calcular el total al cargar la página
calcularTotalGeneral()
