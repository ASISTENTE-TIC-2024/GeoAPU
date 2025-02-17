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
            parseFloat(document.getElementById('VALOR_UNITARIO_EQUIPOS')) || 0

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
            porcentaje_incidencia: 0,
        })

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
        (sum, item) => sum + parseFloat(item.rendimiento_equipos * item.tarifa_dia_equipos), 0
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
            <td>${isNaN(item.rendimiento_equipos) || !isFinite(item.rendimiento_equipos) ? 0 : item.rendimiento_equipos}</td>
            <td>$ ${isNaN(item.rendimiento_equipos * item.tarifa_dia_equipos) || !isFinite(item.rendimiento_equipos * item.tarifa_dia_equipos) ? 0 : (item.rendimiento_equipos * item.tarifa_dia_equipos).toFixed(2)}</td>
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

    storedDatosEquipos.forEach((item) => {
        item.valor_unitario_equipos = (1 / item.tarifa_dia_equipos).toFixed(4)
    })

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

        localStorage.setItem('datosMateriales', JSON.stringify(datosMateriales))

        actualizarValorUnitarioMateriales()
        actualizarTablaMateriales()
    })

function actualizarTablaMateriales() {

    let tbody = document.querySelector('#dataTableMateriales tbody')

    // Obtener los datos del localStorage
    let storedDatosMateriales =
        JSON.parse(localStorage.getItem('datosMateriales')) || []

    // Calcular el total de todos los valores
    let totalMateriales = storedDatosMateriales.reduce(
        (sum, item) => sum + parseFloat(item.valor_unitario_materiales), 0
    )

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


    const trmValue = parseFloat(localStorage.getItem('trmValue')) || 0;

    storedDatosMateriales.forEach((item) => {

        if (item.tipo_moneda_materiales === 'USD' && !item.trm_applied) {
            item.precio_unitario_materiales = (item.precio_unitario_materiales * trmValue).toFixed(2);
            item.valor_unitario_materiales = (item.precio_unitario_materiales * item.cantidad_materiales).toFixed(2);
            item.trm_applied = true; // Marcar que la TRM ya ha sido aplicada

        } else if (item.tipo_moneda_materiales !== 'USD') {
            item.valor_unitario_materiales = (item.precio_unitario_materiales * item.cantidad_materiales).toFixed(2);
        }
    });


    localStorage.setItem('datosMateriales', JSON.stringify(storedDatosMateriales))

    actualizarTablaMateriales()

}

actualizarValorUnitarioMateriales();
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

        let datosTransportes =
            JSON.parse(localStorage.getItem('datosTransportes')) || []

        datosTransportes.push({
            descripcion_transporte,
            unidad_transporte,
            distancia_transporte,
            precio_unitario_transporte,
            rendimiento_transporte,
            valor_unitario_transporte,
        })

        localStorage.setItem('datosTransportes', JSON.stringify(datosTransportes))

        actualizarTablaTransporte()

    })

function actualizarTablaTransporte() {

    let tbody = document.querySelector('#dataTableTransporte tbody')

    // Obtener los datos del localStorage
    let storedDatosTransportes =
        JSON.parse(localStorage.getItem('datosTransportes')) || []

    // Calcular el total de todos los valores
    let totalTransportes = storedDatosTransportes.reduce(
        (sum, item) => sum + parseFloat(item.valor_unitario_transporte), 0
    )

    tbody.innerHTML = ''

    storedDatosTransportes.forEach((item, index) => {
        let tr = document.createElement('tr')
        tr.className =
            index % 2 === 0
                ? 'even:bg-gray-50 border-b'
                : 'odd:bg-white even:bg-gray-50 border-b'

        item.porcentaje_incidencia = (item.valor_unitario_transporte / totalTransportes) * 100 || 0;

        tr.innerHTML = `
        <td> ${item.descripcion_transporte}</td>
        <td>${item.unidad_transporte}</td>
        <td>${item.distancia_transporte}</td>
        <td>$ ${item.precio_unitario_transporte}</td>
        <td>${item.rendimiento_transporte}</td>
        <td>$ ${item.valor_unitario_transporte}</td>
        <td>${isNaN(item.porcentaje_incidencia) || !isFinite(item.porcentaje_incidencia) ? 0 : item.porcentaje_incidencia.toFixed(2)}%</td>

        <td><button class="active:scale-90 transition-transform" onclick="eliminarElementoTransporte(${storedDatosTransportes.indexOf(
            item
        )})"><i class="fa-solid fa-trash-can"></i></button></td>`
        tbody.appendChild(tr)
    })
}

function eliminarElementoTransporte(index) {
    // Obtener los datos existentes del localStorage
    let storedDatosTransportes = JSON.parse(localStorage.getItem('datosTransportes')) || []

    // Eliminar el elemento del array
    storedDatosTransportes.splice(index, 1)

    // Guardar el array actualizado en el localStorage
    localStorage.setItem('datosTransportes', JSON.stringify(storedDatosTransportes))

    // Actualizar la tabla
    actualizarTablaTransporte()
}

actualizarTablaTransporte();

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


        let datosManoDeObra =
            JSON.parse(localStorage.getItem('datosManoDeObra')) || []

        datosManoDeObra.push({
            trabajador_mano_de_obra,
            jornal_mano_de_obra,
            prestacion_mano_de_obra,
            jornal_total_mano_de_obra,
            rendimiento_mano_de_obra,
            valor_unitario_mano_de_obra,
        })

        localStorage.setItem('datosManoDeObra', JSON.stringify(datosManoDeObra))

        actualizarTablaManoDeObra()
    })

function actualizarTablaManoDeObra() {

    let datosManoDeObra =
        JSON.parse(localStorage.getItem('datosManoDeObra')) || []

    // Calcular el total de todos los valores
    let totalManoDeObra = datosManoDeObra.reduce(
        (sum, item) => sum + parseFloat(item.valor_unitario_mano_de_obra), 0
    )

    let tbody = document.querySelector('#dataTableManoDeObra tbody')
    tbody.innerHTML = ''
    datosManoDeObra.forEach((item, index) => {

        item.porcentaje_incidencia = (item.valor_unitario_mano_de_obra / totalManoDeObra) * 100 || 0;

        let tr = document.createElement('tr')
        tr.className =
            index % 2 === 0
                ? 'even:bg-gray-50 border-b'
                : 'odd:bg-white even:bg-gray-50 border-b'
        tr.innerHTML = `
                            <td> ${item.trabajador_mano_de_obra}</td>
                            <td>$ ${isNaN(item.jornal_mano_de_obra) || !isFinite(item.jornal_mano_de_obra) ? 0 : item.jornal_mano_de_obra.toLocaleString()}</td>
                            <td>${item.prestacion_mano_de_obra}</td>
                            <td>${isNaN(item.jornal_total_mano_de_obra) || !isFinite(item.jornal_total_mano_de_obra) ? 0 : item.jornal_total_mano_de_obra.toLocaleString()}</td>
                            <td>${isNaN(item.rendimiento_mano_de_obra) || !isFinite(item.rendimiento_mano_de_obra) ? 0 : item.rendimiento_mano_de_obra.toLocaleString()}</td>
                            <td>$ ${isNaN(item.valor_unitario_mano_de_obra) || !isFinite(item.valor_unitario_mano_de_obra) ? 0 : item.valor_unitario_mano_de_obra.toLocaleString()}</td>
                            <td>${isNaN(item.porcentaje_incidencia) || !isFinite(item.porcentaje_incidencia) ? 0 : item.porcentaje_incidencia.toFixed(2)}%</td>
                            <td><button class="active:scale-90 transition-transform" onclick="eliminarElementoManoDeObra(${datosManoDeObra.indexOf(
            item
        )})"><i class="fa-solid fa-trash-can"></i></button></td>`
        tbody.appendChild(tr)
    })

}

function actualizarRendimientoManoDeObra() {

    const informacionRotulos =
        JSON.parse(localStorage.getItem('informacionRotulos')) || []

    let datosManoDeObra =
        JSON.parse(localStorage.getItem('datosManoDeObra')) || []

    informacionRotulos.forEach((data) => {
        datosManoDeObra.forEach((item) => {
            item.rendimiento_mano_de_obra = (1 / data.rendimiento).toFixed(4)
        })
    })

    localStorage.setItem('datosManoDeObra', JSON.stringify(datosManoDeObra))

    actualizarTablaManoDeObra()
}

function actualizarValorUnitarioManoDeObra() {

    const storedDatosManoDeObra =
        JSON.parse(localStorage.getItem('datosManoDeObra')) || []

    storedDatosManoDeObra.forEach((item) => {
        item.valor_unitario_mano_de_obra = (item.jornal_mano_de_obra * item.jornal_total_mano_de_obra * item.rendimiento_mano_de_obra).toFixed(4)
    })

    localStorage.setItem('datosManoDeObra', JSON.stringify(storedDatosManoDeObra))

    actualizarTablaManoDeObra()
}

actualizarValorUnitarioManoDeObra();

function eliminarElementoManoDeObra(index) {

    let datosManoDeObra = JSON.parse(localStorage.getItem('datosManoDeObra')) || []

    datosManoDeObra.splice(index, 1)

    localStorage.setItem('datosManoDeObra', JSON.stringify(datosManoDeObra))

    actualizarTablaManoDeObra()
}

actualizarTablaManoDeObra();


/******************************* TOTAL *******************************/

function calcularTotalGeneral() {

    // Sumar los valores
    let storedDatosEquipos =
        JSON.parse(localStorage.getItem('datosEquipos')) || []

    let totalEquipos = storedDatosEquipos.reduce(
        (sum, item) => sum + parseFloat(item.rendimiento_equipos * item.tarifa_dia_equipos), 0
    )

    let storedDatosMateriales =
        JSON.parse(localStorage.getItem('datosMateriales')) || []

    // Sumar los valores
    let totalMateriales = storedDatosMateriales.reduce(
        (sum, item) => sum + parseFloat(item.valor_unitario_materiales), 0
    )

    let storedDatosTransportes =
        JSON.parse(localStorage.getItem('datosTransportes')) || []

    // Sumar los valores
    let totalTransporte = storedDatosTransportes.reduce(
        (sum, item) => sum + item.valor_unitario_transporte,
        0
    )

    let storedDatosManoDeObra =
        JSON.parse(localStorage.getItem('datosManoDeObra')) || []

    // Sumar los valores
    let totalManoDeObra = storedDatosManoDeObra.reduce(
        (sum, item) => sum + parseFloat(item.valor_unitario_mano_de_obra),
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
    ).textContent = `$ ${isNaN(totalEquipos.toFixed(2)) || !isFinite(totalEquipos) ? 0 : totalEquipos.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} `

    document.getElementById(
        'porcentajeEquipos'
    ).textContent = `${isNaN(porcentajeEquipos.toFixed(2)) || !isFinite(porcentajeEquipos) ? 0 : porcentajeEquipos.toFixed(2)}% `

    document.getElementById(
        'resultadoMateriales'
    ).textContent = `$ ${isNaN(totalMateriales.toFixed(2)) || !isFinite(totalMateriales) ? 0 : totalMateriales.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} `

    document.getElementById(
        'porcentajeMateriales'
    ).textContent = `${isNaN(porcentajeMateriales.toFixed(2)) || !isFinite(porcentajeMateriales) ? 0 : porcentajeMateriales.toFixed(2)}% `

    document.getElementById(
        'resultadoTransporte'
    ).textContent = `$ ${isNaN(totalTransporte.toFixed(2)) || !isFinite(totalTransporte) ? 0 : totalTransporte.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} `

    document.getElementById(
        'porcentajeTransporte'
    ).textContent = `${porcentajeTransporte.toFixed(2)}% `

    document.getElementById(
        'resultadoManoDeObra'
    ).textContent = `$ ${isNaN(totalManoDeObra) || !isFinite(totalManoDeObra) ? 0 : totalManoDeObra.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} `

    document.getElementById(
        'porcentajeManoDeObra'
    ).textContent = `${porcentajeManoDeObra.toFixed(2)}% `

    document.getElementById(
        'resultadoTotalGeneral'
    ).textContent = `$ ${isNaN(totalGeneral.toFixed(2)) || !isFinite(totalGeneral) ? 0 : totalGeneral.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} `

    document.getElementById(
        'administracion'
    ).textContent = `$ ${isNaN(administracion.toFixed(2)) || !isFinite(administracion) ? 0 : administracion.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} `

    document.getElementById(
        'imprevistos'
    ).textContent = `$ ${isNaN(imprevistos.toFixed(2)) || !isFinite(imprevistos) ? 0 : imprevistos.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} `

    document.getElementById('utilidad').textContent = `$ ${isNaN(utilidad.toFixed(2)) || !isFinite(utilidad) ? 0 : utilidad.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} `

    document.getElementById(
        'totalGlobal'
    ).textContent = `$ ${isNaN(totalGlobal.toFixed(2)) || !isFinite(totalGlobal) ? 0 : totalGlobal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} `


    let totales = []

    totales[0] = {
        totalGlobal,
        totalGeneral,
    }

    console.log(totales);

    return totales;

}

function valoresOfertaComercial() {

    if (confirm('¿Estás seguro de que finalizaste la APU?')) {

        let totales =
            JSON.parse(localStorage.getItem('totales')) || []

        console.log(totales);

        if (!Array.isArray(totales)) {
            totales = [];
        }

        console.log(calcularTotalGeneral());

        totales = calcularTotalGeneral();

        localStorage.setItem('totales', JSON.stringify(totales))

        const informacionRotulos = JSON.parse(localStorage.getItem('informacionRotulos')) || [];
        const informacionTotales = JSON.parse(localStorage.getItem('totales')) || {};

        console.log(informacionRotulos);
        console.log(informacionTotales);

        let ofertaComercial =
            JSON.parse(localStorage.getItem('ofertaComercial')) || []

        ofertaComercial.push({
            capitulo: informacionRotulos[0].capitulo,
            descripcion: informacionRotulos[0].descripcion_actividad,
            unidad: informacionRotulos[0].unidad,
            cantidad_instalar: informacionRotulos[0].cantidad_instalar,
            valor_sin_aiu: informacionTotales[0].totalGeneral,
            valor_aiu: informacionTotales[0].totalGlobal,
        })

        console.log(ofertaComercial);

        localStorage.setItem('ofertaComercial', JSON.stringify(ofertaComercial))

        guardarInformacionProyecto();

        window.location.href =
            '../pages/commercial-offer.html';
    } else {
        console.log('No se guardó la información.');
    }

}


function guardarInformacionProyecto() {

    let storedDatosEquipos = JSON.parse(localStorage.getItem('datosEquiposMov')) || []
    let storedDatosMateriales = JSON.parse(localStorage.getItem('datosMaterialesMov')) || []
    let storedDatosTransportes = JSON.parse(localStorage.getItem('datosTransportesMov')) || []
    let storedDatosManoDeObra = JSON.parse(localStorage.getItem('datosManoDeObraMov')) || []
    let storedInformacionRotulos = JSON.parse(localStorage.getItem('informacionRotulos')) || []
    let storedInformacionProyecto = JSON.parse(localStorage.getItem('informacionProyecto')) || {}
    let totalesMovilizacion = JSON.parse(localStorage.getItem('totalesMovilizacion')) || []

    let storedInformacionCompleta = {
        datosEquipos: storedDatosEquipos,
        datosMateriales: storedDatosMateriales,
        datosTransportes: storedDatosTransportes,
        datosManoDeObra: storedDatosManoDeObra,
        informacionRotulos: storedInformacionRotulos,
        informacionProyecto: storedInformacionProyecto,
        totalesMovilizacion: totalesMovilizacion,
    }

    localStorage.setItem('storedInformacionCompleta', JSON.stringify(storedInformacionCompleta))

    eliminarTodo();

    alert('Información guardada correctamente.')
}

function eliminarTodo() {
    localStorage.removeItem('datosEquipos');
    localStorage.removeItem('datosMateriales');
    localStorage.removeItem('datosTransportes');
    localStorage.removeItem('datosManoDeObra');
    localStorage.removeItem('informacionRotulos');
    localStorage.removeItem('storedInformacionCompleta');
    localStorage.removeItem('totalesMovilizacion');

    actualizarTablaEquipos();
    actualizarTablaMateriales();
    actualizarTablaTransporte();
    actualizarTablaManoDeObra();
    calcularTotalGeneral();
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
