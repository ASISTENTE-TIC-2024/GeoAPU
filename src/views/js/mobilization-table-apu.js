
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

        parseFloat(document.getElementById('RENDIMIENTO_EQUIPOS').value) || 0

        let valor_unitario_equipos =
            parseFloat(document.getElementById('VALOR_UNITARIO_EQUIPOS').value) || 0

        // Obtener los datos existentes del localStorage
        let datosEquiposMov =
            JSON.parse(localStorage.getItem('datosEquiposMov')) || []

        datosEquiposMov.push({
            descripcion_equipos,
            marca_equipos,
            tipo_equipos,
            tarifa_dia_equipos,
            rendimiento_equipos,
            valor_unitario_equipos,
            porcentaje_incidencia: 0,
        })

        localStorage.setItem('datosEquiposMov', JSON.stringify(datosEquiposMov))

        actualizarValorUnitarioEquipos()
        actualizarTablaEquipos()

    })

function actualizarTablaEquipos() {

    let tbody = document.querySelector('#dataTableEquipos tbody')

    tbody.innerHTML = ''

    // Obtener los datos del localStorage
    let storedDatosEquiposMov =
        JSON.parse(localStorage.getItem('datosEquiposMov')) || []

    // Calcular el total de todos los valores
    let totalEquipos = storedDatosEquiposMov.reduce(
        (sum, item) => sum + item.rendimiento_equipos * item.tarifa_dia_equipos,
        0
    )

    storedDatosEquiposMov.forEach((item, index) => {

        let tr = document.createElement('tr')

        tr.className =
            index % 2 === 0
                ? 'even:bg-gray-50 border-b'
                : 'odd:bg-white even:bg-gray-50 border-b'
        tr.innerHTML = `
        <td>${item.descripcion_equipos}</td>
        <td>${item.marca_equipos}</td>
        <td>${item.tipo_equipos}</td>
        <td>${item.tarifa_dia_equipos}</td>
        <td>${isNaN(item.rendimiento_equipos) || !isFinite(item.rendimiento_equipos) ? 0 : item.rendimiento_equipos}</td>
        <td>$ ${isNaN(item.rendimiento_equipos * item.tarifa_dia_equipos) || !isFinite(item.rendimiento_equipos * item.tarifa_dia_equipos) ? 0 : (item.rendimiento_equipos * item.tarifa_dia_equipos).toFixed(2)}</td>
        <td>${(item.porcentaje_incidencia = ((item.rendimiento_equipos * item.tarifa_dia_equipos) / totalEquipos) * 100 || 0).toFixed(2)}%</td>
        <td><button class="active:scale-90 transition-transform" onclick="eliminarElementoEquipos(${storedDatosEquiposMov.indexOf(item)})"><i class="fa-solid fa-trash-can"></i></button></td>`

        tbody.appendChild(tr)
    })
}

function eliminarElementoEquipos(index) {
    // Obtener los datos existentes del localStorage
    let storedDatosEquiposMov = JSON.parse(localStorage.getItem('datosEquiposMov')) || []

    // Eliminar el elemento del array
    storedDatosEquiposMov.splice(index, 1)

    // Guardar el array actualizado en el localStorage
    localStorage.setItem('datosEquiposMov', JSON.stringify(storedDatosEquiposMov))

    // Actualizar la tabla
    actualizarTablaEquipos()
}

function actualizarValorUnitarioEquipos() {

    const storedDatosEquiposMov =
        JSON.parse(localStorage.getItem('datosEquiposMov')) || []

    console.log(storedDatosEquiposMov)

    storedDatosEquiposMov.forEach((item) => {
        item.valor_unitario_equipos = (1 / item.tarifa_dia_equipos).toFixed(4)
    })

    console.log(storedDatosEquiposMov)

    localStorage.setItem('datosEquiposMov', JSON.stringify(storedDatosEquiposMov))

    actualizarTablaEquipos()
}

actualizarTablaEquipos()

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

        let datosMaterialesMov =
            JSON.parse(localStorage.getItem('datosMaterialesMov')) || []

        datosMaterialesMov.push({
            descripcion_materiales,
            tipo_moneda_materiales,
            unidad_materiales,
            precio_unitario_materiales,
            cantidad_materiales,
            valor_unitario_materiales,
        })

        localStorage.setItem('datosMaterialesMov', JSON.stringify(datosMaterialesMov))

        actualizarValorUnitarioMateriales()
        actualizarTablaMateriales()
    })

function actualizarTablaMateriales() {

    let tbody = document.querySelector('#dataTableMateriales tbody')

    // Obtener los datos del localStorage
    let storedDatosMaterialesMov =
        JSON.parse(localStorage.getItem('datosMaterialesMov')) || []

    // Calcular el total de todos los valores
    let totalMaterialesMov = storedDatosMaterialesMov.reduce(
        (sum, item) => sum + parseFloat(item.valor_unitario_materiales), 0
    )

    tbody.innerHTML = ''

    storedDatosMaterialesMov.forEach((item, index) => {

        let tr = document.createElement('tr')

        tr.className =
            index % 2 === 0
                ? 'even:bg-gray-50 border-b'
                : 'odd:bg-white even:bg-gray-50 border-b'
        item.porcentaje_incidencia = (item.valor_unitario_materiales / totalMaterialesMov) * 100 || 0;
        tr.innerHTML = `<td> ${item.descripcion_materiales}</td>
                        <td>${item.tipo_moneda_materiales}</td>
                        <td>${item.unidad_materiales}</td>
                        <td>${item.precio_unitario_materiales}</td>
                        <td>${isNaN(item.cantidad_materiales) || !isFinite(item.cantidad_materiales) ? 0 : item.cantidad_materiales}</td>
                        <td>${isNaN(item.valor_unitario_materiales) || !isFinite(item.valor_unitario_materiales) ? 0 : item.tipo_moneda_materiales === 'USD' ? 'COP: ' + item.valor_unitario_materiales : item.valor_unitario_materiales}</td>
                        <td>${isNaN(item.porcentaje_incidencia) || !isFinite(item.porcentaje_incidencia) ? 0 : item.porcentaje_incidencia.toFixed(2)}%</td>
                        <td><button class="active:scale-90 transition-transform" onclick="eliminarElementoMateriales(${storedDatosMaterialesMov.indexOf(item)})"><i class="fa-solid fa-trash-can"></i></button></td>`

        tbody.appendChild(tr)

    })
}

function eliminarElementoMateriales(index) {

    // Obtener los datos existentes del localStorage
    let datosMaterialesMov = JSON.parse(localStorage.getItem('datosMaterialesMov')) || []

    // Eliminar el elemento del array
    datosMaterialesMov.splice(index, 1)

    // Guardar el array actualizado en el localStorage
    localStorage.setItem('datosMaterialesMov', JSON.stringify(datosMaterialesMov))

    // Actualizar la tabla
    actualizarTablaMateriales()
}

function actualizarCantidadMateriales() {

    const informacionRotulos =
        JSON.parse(localStorage.getItem('informacionRotulos')) || []

    let storedDatosMaterialesMov =
        JSON.parse(localStorage.getItem('datosMaterialesMov')) || []

    informacionRotulos.forEach((data) => {
        storedDatosMaterialesMov.forEach((item) => {
            item.cantidad_materiales = (3 / data.rendimiento).toFixed(4)
        })
    })

    localStorage.setItem('datosMaterialesMov', JSON.stringify(storedDatosMaterialesMov))

    actualizarTablaMateriales()
}

function actualizarValorUnitarioMateriales() {

    const storedDatosMaterialesMov =
        JSON.parse(localStorage.getItem('datosMaterialesMov')) || []

    console.log(storedDatosMaterialesMov);

    const trmValue = parseFloat(localStorage.getItem('trmValue')) || 0;

    console.log(trmValue);

    storedDatosMaterialesMov.forEach((item) => {

        if (item.tipo_moneda_materiales === 'USD' && !item.trm_applied) {

            item.valor_unitario_materiales = (item.valor_unitario_materiales * trmValue).toFixed(2);
            item.trm_applied = true; // Marcar que la TRM ya ha sido aplicada

        } else if (item.tipo_moneda_materiales !== 'USD') {

            item.valor_unitario_materiales = (item.precio_unitario_materiales * item.cantidad_materiales).toFixed(2);

        }
    });

    console.log(storedDatosMaterialesMov)

    localStorage.setItem('datosMaterialesMov', JSON.stringify(storedDatosMaterialesMov))

    actualizarTablaMateriales()

}

actualizarTablaMateriales();

/******************************* TRANSPORTE *******************************/

document
    .getElementById('dataFormTransporte')
    .addEventListener('submit', function (e) {

        e.preventDefault()

        let descripcion_transportes =
            document.getElementById('DESCRIPCION TRANSPORTE').value ||
            'SIN DESCRIPCIÓN'

        let unidad_transportes =
            document.getElementById('UNIDAD TRANSPORTE').value ||
            'SIN UNIDAD DE TRANSPORTE'

        let distancia_transportes =
            document.getElementById('DISTANCIA TRANSPORTE').value ||
            'SIN DISTANCIA DE TRANSPORTE'

        let precio_unitario_transportes =
            parseFloat(
                document.getElementById('PRECIO UNITARIO TRANSPORTE').value
            ) || 0

        let rendimiento_transportes =
            parseFloat(
                document.getElementById('RENDIMIENTO TRANSPORTE').value
            ).toFixed(4) || 0

        let valor_unitario_transportes =
            parseFloat(
                document.getElementById('VALOR UNITARIO TRANSPORTE').value
            ) || 0


        let datosTransportesMov =
            JSON.parse(localStorage.getItem('datosTransportesMov')) || []

        datosTransportesMov.push({
            descripcion_transportes,
            unidad_transportes,
            distancia_transportes,
            precio_unitario_transportes,
            rendimiento_transportes,
            valor_unitario_transportes,
        })

        localStorage.setItem('datosTransportesMov', JSON.stringify(datosTransportesMov))

        actualizarValorUnitarioTransportes()
        actualizarTablaTransportes()
    })

function actualizarTablaTransportes() {

    let tbody = document.querySelector('#dataTableTransporteMov tbody')

    // Obtener los datos del localStorage
    let storedDatosTransportesMov =
        JSON.parse(localStorage.getItem('datosTransportesMov')) || []

    // Calcular el total de todos los valores
    let totalTransportesMov = storedDatosTransportesMov.reduce(
        (sum, item) => sum + parseFloat(item.valor_unitario_transportes), 0
    )

    tbody.innerHTML = ''

    storedDatosTransportesMov.forEach((item, index) => {

        let tr = document.createElement('tr')

        tr.className =
            index % 2 === 0
                ? 'even:bg-gray-50 border-b'
                : 'odd:bg-white even:bg-gray-50 border-b'

        item.porcentaje_incidencia = (item.valor_unitario_transportes / totalTransportesMov) * 100 || 0;

        tr.innerHTML = `<td> ${item.descripcion_transportes}</td>
                        <td>${item.unidad_transportes}</td>
                        <td>${item.distancia_transportes}</td>
                        <td>${item.precio_unitario_transportes}</td>
                        <td>${isNaN(item.rendimiento_transportes) || !isFinite(item.rendimiento_transportes) ? 0 : item.rendimiento_transportes}</td>
                        <td>${isNaN(item.valor_unitario_transportes) || !isFinite(item.valor_unitario_transportes) ? 0 : item.valor_unitario_transportes}</td>
                        <td>${isNaN(item.porcentaje_incidencia) || !isFinite(item.porcentaje_incidencia) ? 0 : item.porcentaje_incidencia.toFixed(2)}%</td>
                        <td><button class="active:scale-90 transition-transform" onclick="eliminarElementoTransportes(${storedDatosTransportesMov.indexOf(item)})"><i class="fa-solid fa-trash-can"></i></button></td>`

        tbody.appendChild(tr)

    })

}

function eliminarElementoTransportes(index) {

    // Obtener los datos existentes del localStorage
    let datosTransportesMov = JSON.parse(localStorage.getItem('datosTransportesMov')) || []

    // Eliminar el elemento del array
    datosTransportesMov.splice(index, 1)

    // Guardar el array actualizado en el localStorage
    localStorage.setItem('datosTransportesMov', JSON.stringify(datosTransportesMov))

    // Actualizar la tabla
    actualizarTablaTransportes()
}

function actualizarValorUnitarioTransportes() {

    const storedDatosTransportesMov =
        JSON.parse(localStorage.getItem('datosTransportesMov')) || []

    const trmValue = parseFloat(localStorage.getItem('trmValue')) || 0;

    console.log(trmValue);

    storedDatosTransportesMov.forEach((item) => {

        item.valor_unitario_transportes = (item.precio_unitario_transportes * item.rendimiento_transportes).toFixed(2);

    });

    console.log(storedDatosTransportesMov)

    localStorage.setItem('datosTransportesMov', JSON.stringify(storedDatosTransportesMov))

    actualizarTablaTransportes()
}

actualizarTablaTransportes()

/******************************* MANO DE OBRA *******************************/

document
    .getElementById('dataFormManoDeObra')
    .addEventListener('submit', function (e) {

        e.preventDefault()

        let trabajador_mano_de_obra =
            document.getElementById('TRABAJADOR MANO DE OBRA').value || 'SIN TRABAJADOR'

        let jornal_mano_de_obra =
            parseFloat(document.getElementById('JORNAL MANO DE OBRA').value.replace(/[^0-9.-]+/g, "")) || 0

        let prestacion_mano_de_obra =
            document.getElementById('PRESTACION (%) MANO DE OBRA').value || 0

        let jornal_total_mano_de_obra =
            parseFloat(document.getElementById('JORNAL TOTAL MANO DE OBRA').value) || 0

        let rendimiento_mano_de_obra =
            parseFloat(document.getElementById('RENDIMIENTO MANO DE OBRA').value) || 0

        let valor_unitario_mano_de_obra = parseFloat(jornal_mano_de_obra * rendimiento_mano_de_obra * jornal_total_mano_de_obra) || 0

        console.log(valor_unitario_mano_de_obra);

        let datosManoDeObraMov = JSON.parse(localStorage.getItem('datosManoDeObraMov')) || []

        console.log(datosManoDeObraMov);

        datosManoDeObraMov.push({
            trabajador_mano_de_obra,
            jornal_mano_de_obra,
            prestacion_mano_de_obra,
            jornal_total_mano_de_obra,
            rendimiento_mano_de_obra,
            valor_unitario_mano_de_obra,
        })

        console.log(datosManoDeObraMov);

        localStorage.setItem('datosManoDeObraMov', JSON.stringify(datosManoDeObraMov))

        actualizarTablaManoDeObra()

    })

function actualizarTablaManoDeObra() {

    let tbody = document.querySelector('#dataTableManoDeObraMov tbody')

    let storedDatosManoDeObraMov =
        JSON.parse(localStorage.getItem('datosManoDeObraMov')) || []

    // Calcular el total de todos los valores
    let totalManoDeObraMov = storedDatosManoDeObraMov.reduce(
        (sum, item) => sum + parseFloat(item.valor_unitario_mano_de_obra), 0
    )

    tbody.innerHTML = ''

    storedDatosManoDeObraMov.forEach((item, index) => {
        let tr = document.createElement('tr')
        tr.className =
            index % 2 === 0
                ? 'even:bg-gray-50 border-b'
                : 'odd:bg-white even:bg-gray-50 border-b'

        item.porcentaje_incidencia = (item.valor_unitario_mano_de_obra / totalManoDeObraMov) * 100 || 0;

        tr.innerHTML = `
        
        <td> ${item.trabajador_mano_de_obra}</td>
        <td>$ ${item.jornal_mano_de_obra}</td>
        <td>${item.prestacion_mano_de_obra}</td>
        <td>${item.jornal_total_mano_de_obra}</td>

        <td>${item.rendimiento_mano_de_obra}</td>

        <td>$ ${item.valor_unitario_mano_de_obra}</td>
        <td>${isNaN(item.porcentaje_incidencia) || !isFinite(item.porcentaje_incidencia) ? 0 : item.porcentaje_incidencia.toFixed(2)}%</td>
        <td><button class="active:scale-90 transition-transform" onclick="eliminarElementoManoDeObra(${storedDatosManoDeObraMov.indexOf(item)})"><i class="fa-solid fa-trash-can"></i></button></td>`
        tbody.appendChild(tr)
    })
}

function eliminarElementoManoDeObra(index) {

    // Obtener los datos existentes del localStorage
    let storedDatosManoDeObraMov = JSON.parse(localStorage.getItem('datosManoDeObraMov')) || []

    storedDatosManoDeObraMov.splice(index, 1)

    // Guardar el array actualizado en el localStorage
    localStorage.setItem('datosManoDeObraMov', JSON.stringify(storedDatosManoDeObraMov))

    actualizarTablaManoDeObra()
}

actualizarTablaManoDeObra();

/******************************* TOTAL *******************************/

function calcularTotalGeneral() {

    let storedDatosEquipos = JSON.parse(localStorage.getItem('datosEquiposMov')) || []

    let totalEquiposMov = storedDatosEquipos.reduce(
        (sum, item) => sum + item.rendimiento_equipos * item.tarifa_dia_equipos,
        0
    )

    let storedDatosMaterialesMov = JSON.parse(localStorage.getItem('datosMaterialesMov')) || []

    // Sumar los valores
    let totalMaterialesMov = storedDatosMaterialesMov.reduce(
        (sum, item) => sum + parseFloat(item.valor_unitario_materiales), 0
    )

    let storedDatosTransportesMov = JSON.parse(localStorage.getItem('datosTransportesMov')) || []

    // Sumar los valores
    let totalTransporteMov = storedDatosTransportesMov.reduce(
        (sum, item) => sum + parseFloat(item.valor_unitario_transportes), 0
    )

    let storedDatosManoDeObraMov = JSON.parse(localStorage.getItem('datosManoDeObraMov')) || []

    // Sumar los valores
    let totalManoDeObraMov = storedDatosManoDeObraMov.reduce(
        (sum, item) => sum + parseFloat(item.valor_unitario_mano_de_obra), 0
    )

    // Sumar todos los totales
    let totalGeneralMov =
        totalManoDeObraMov + totalEquiposMov + totalMaterialesMov + totalTransporteMov


    let administracionMov = totalGeneralMov * 0.13
    let imprevistosMov = totalGeneralMov * 0.07
    let utilidadMov = totalGeneralMov * 0.05

    let totalGlobalMov = totalGeneralMov + administracionMov + imprevistosMov + utilidadMov

    let porcentajeManoDeObraMov = (totalManoDeObraMov / totalGeneralMov) * 100 || 0
    let porcentajeEquiposMov = (totalEquiposMov / totalGeneralMov) * 100 || 0
    let porcentajeMaterialesMov = (totalMaterialesMov / totalGeneralMov) * 100 || 0
    let porcentajeTransporteMov = (totalTransporteMov / totalGeneralMov) * 100 || 0

    // Mostrar los sub-totales en el DOM con dos decimales
    document.getElementById(
        'resultadoEquipos'
    ).textContent = `$ ${isNaN(totalEquiposMov.toFixed(2)) || !isFinite(totalEquiposMov) ? 0 : totalEquiposMov.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} `

    document.getElementById(
        'porcentajeEquipos'
    ).textContent = `${isNaN(porcentajeEquiposMov.toFixed(2)) || !isFinite(porcentajeEquiposMov) ? 0 : porcentajeEquiposMov.toFixed(2)}% `

    document.getElementById(
        'resultadoMateriales'
    ).textContent = `$ ${isNaN(totalMaterialesMov.toFixed(2)) || !isFinite(totalMaterialesMov) ? 0 : totalMaterialesMov.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} `

    document.getElementById(
        'porcentajeMateriales'
    ).textContent = `${isNaN(porcentajeMaterialesMov.toFixed(2)) || !isFinite(porcentajeMaterialesMov) ? 0 : porcentajeMaterialesMov.toFixed(2)}% `

    document.getElementById(
        'resultadoTransporte'
    ).textContent = `$ ${isNaN(totalTransporteMov.toFixed(2)) || !isFinite(totalTransporteMov) ? 0 : totalTransporteMov.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} `

    document.getElementById(
        'porcentajeTransporte'
    ).textContent = `${porcentajeTransporteMov.toFixed(2)}% `

    document.getElementById(
        'resultadoManoDeObra'
    ).textContent = `$ ${isNaN(totalManoDeObraMov.toFixed(2)) || !isFinite(totalManoDeObraMov) ? 0 : totalManoDeObraMov.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} `

    document.getElementById(
        'porcentajeManoDeObra'
    ).textContent = `${porcentajeManoDeObraMov.toFixed(2)}% `
    document.getElementById(
        'resultadoTotalGeneral'
    ).textContent = `$ ${isNaN(totalGeneralMov.toFixed(2)) || !isFinite(totalGeneralMov) ? 0 : totalGeneralMov.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} `

    document.getElementById(
        'administracion'
    ).textContent = `$ ${isNaN(administracionMov.toFixed(2)) || !isFinite(administracionMov) ? 0 : administracionMov.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} `

    document.getElementById(
        'imprevistos'
    ).textContent = `$ ${isNaN(imprevistosMov.toFixed(2)) || !isFinite(imprevistosMov) ? 0 : imprevistosMov.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} `

    document.getElementById('utilidad').textContent = `$ ${isNaN(utilidadMov.toFixed(2)) || !isFinite(utilidadMov) ? 0 : utilidadMov.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} `

    document.getElementById(
        'totalGlobal'
    ).textContent = `$ ${isNaN(totalGlobalMov.toFixed(2)) || !isFinite(totalGlobalMov) ? 0 : totalGlobalMov.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} `

    let totalesMovilizacion = []

    totalesMovilizacion[0] = {
        totalGlobalMov,
        totalGeneralMov,
    }

    return totalesMovilizacion;

}

function valoresOfertaComercial() {

    if (confirm('¿Estás seguro de que finalizaste la APU?')) {

        let totalesMovilizacion =
            JSON.parse(localStorage.getItem('totalesMovilizacion')) || []

        console.log(totalesMovilizacion);

        if (!Array.isArray(totalesMovilizacion)) {
            totalesMovilizacion = [];
        }

        console.log(calcularTotalGeneral());

        totalesMovilizacion = calcularTotalGeneral();

        localStorage.setItem('totalesMovilizacion', JSON.stringify(totalesMovilizacion))

        const informacionRotulos = JSON.parse(localStorage.getItem('informacionRotulos')) || [];
        const informacionTotales = JSON.parse(localStorage.getItem('totalesMovilizacion')) || {};

        console.log(informacionRotulos);
        console.log(informacionTotales);

        let ofertaComercial =
            JSON.parse(localStorage.getItem('ofertaComercial')) || []

        ofertaComercial.push({
            capitulo: informacionRotulos[0].capitulo,
            descripcion: informacionRotulos[0].descripcion_actividad,
            unidad: informacionRotulos[0].unidad,
            cantidad_instalar: informacionRotulos[0].cantidad_instalar,
            valor_sin_aiu: informacionTotales[0].totalGeneralMov,
            valor_aiu: informacionTotales[0].totalGlobalMov,
        })

        console.log(ofertaComercial);

        localStorage.setItem('ofertaComercial', JSON.stringify(ofertaComercial))

        window.location.href =
            '../pages/commercial-offer.html';
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
        totales: totalesMovilizacion,
    }

    localStorage.setItem('storedInformacionCompleta', JSON.stringify(storedInformacionCompleta))

    eliminarTodo();

    alert('Información guardada correctamente.')
}

function eliminarTodo() {
    localStorage.removeItem('datosEquiposMov');
    localStorage.removeItem('datosMaterialesMov');
    localStorage.removeItem('datosTransportesMov');
    localStorage.removeItem('datosManoDeObraMov');
    localStorage.removeItem('informacionRotulos');
    localStorage.removeItem('storedInformacionCompleta');
    localStorage.removeItem('totalesMovilizacion');

    actualizarTablaEquipos();
    actualizarTablaMateriales();
    actualizarTablaTransportes();
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
const filaContenedorEquipos = document.getElementById(
    'filaContenedorEquipos'
)

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
