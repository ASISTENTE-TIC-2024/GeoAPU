function cancelAPU() {

    if (confirm('¿Estás seguro de cancelar el APU?')) {

        let informacionRotulos = JSON.parse(localStorage.getItem('informacionRotulos')) || [];

        informacionRotulos.splice(0, 1);

        localStorage.setItem('informacionRotulos', JSON.stringify(informacionRotulos));

        window.location.href =
            './commercial-offer.html';

    }

}

function fetchTRMValue() {

    const informacionRotulos = JSON.parse(localStorage.getItem('informacionRotulos')) || [];

    informacionRotulos.forEach((data, index) => {

        const trmStoredValue = data.trm;

        if (trmStoredValue === 'Si') {

            const hoy = new Date();
            const año = hoy.getFullYear();
            const mes = String(hoy.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
            const dia = String(hoy.getDate()).padStart(2, '0');
            const fechaFormateada = `${año}-${mes}-${dia}`;

            const apiUrl = `https://www.datos.gov.co/resource/ceyp-9c7c.json?$where='${fechaFormateada}' between vigenciadesde and vigenciahasta`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {

                    if (data.length > 0) {

                        const trmValue = data[0].valor;

                        console.log('TRM value:', trmValue);

                        const trm = document.getElementById('trm');

                        trm.innerHTML = `$ ${trmValue}`;

                        // Almacenar el valor de TRM en local storage
                        localStorage.setItem('trmValue', trmValue);

                    } else {
                        console.log('No TRM data available for the given date.');
                    }
                })
                .catch(error => {
                    console.error('Error al mostrar el valor del TRM:', error);
                });
        } else {

            const trm = document.getElementById('trm');
            trm.innerHTML = 'No aplica';

        }

    })
}

function displayDataAPU() {

    const informacionProyecto = JSON.parse(localStorage.getItem('informacionProyecto')) || [];
    const informacionRotulos = JSON.parse(localStorage.getItem('informacionRotulos')) || [];


    const fecha = document.getElementById("fecha")
    const proyecto = document.getElementById("proyecto")
    const departamento = document.getElementById("departamento")
    const municipio = document.getElementById("municipio")

    const item_pago = document.getElementById("itemPago")
    const capitulo = document.getElementById("capitulo")
    const unidad = document.getElementById("unidad")
    const unidadDia = document.getElementById("unidadDia")
    const actividad = document.getElementById("actividad")
    const rendimiento_diario = document.getElementById("rendimientoDiario")
    const cantidad_instalar = document.getElementById("cantidadAInstalar")
    const distancia_movilizacion = document.getElementById("distanciaMovilizacion")
    const cantidad_dias = document.getElementById("cantidadDias")

    const rendimiento_equipos = document.getElementById("RENDIMIENTO_EQUIPOS")
    const cantidad_materiales = document.getElementById("CANTIDAD_MATERIALES")

    informacionProyecto.forEach((data, index) => {
        fecha.innerHTML = `${data.fecha}`;
        proyecto.innerHTML = `${data.proyecto}`;
        departamento.innerHTML = `${data.departamento}`;
        municipio.innerHTML = `${data.municipio}`;
    })

    informacionRotulos.forEach((data, index) => {
        item_pago.innerHTML = `${data.item_pago}`;
        capitulo.innerHTML = `${data.capitulo}`;
        unidad.innerHTML = `${data.unidad}`;
        unidadDia.innerHTML = `${data.unidad}`;
        actividad.innerHTML = `${data.descripcion_actividad}`;
        rendimiento_diario.value = isNaN(data.rendimiento) ? "No aplica" : `${data.rendimiento}`;

        rendimiento_equipos.value = `${(1 / data.rendimiento).toFixed(4)}`;
        cantidad_materiales.value = `${(3 / data.rendimiento).toFixed(4)}`;

        cantidad_instalar.innerHTML = `${data.cantidad_instalar}`;
        distancia_movilizacion.innerHTML = `${data.distancia_movilizacion}`;
        cantidad_dias.innerHTML = `${data.cantidad_dias}`;
    })

    if (informacionRotulos.length > 0) {
        const firstData = informacionRotulos[0];

        console.log("PRIMER DATO AGREGADO: ", firstData);

        item_pago.innerHTML = `${firstData.item_pago}`;
        capitulo.innerHTML = `${firstData.capitulo}`;
        unidad.innerHTML = `${firstData.unidad}`;
        unidadDia.innerHTML = `${firstData.unidad}`;
        actividad.innerHTML = `${firstData.descripcion_actividad}`;
        rendimiento_diario.value = isNaN(firstData.rendimiento) ? "No aplica" : `${firstData.rendimiento}`;

        rendimiento_equipos.value = `${(1 / firstData.rendimiento).toFixed(4)}`;
        cantidad_materiales.value = `${(3 / firstData.rendimiento).toFixed(4)}`;

        cantidad_instalar.innerHTML = `${firstData.cantidad_instalar}`;
        distancia_movilizacion.innerHTML = `${firstData.distancia_movilizacion}%`;
        cantidad_dias.innerHTML = `${firstData.cantidad_dias}`;
    }

    fetchTRMValue()


}

displayDataAPU()

function rendimientoEquiposLocalStorage() {

    // Obtener el valor del input
    const rendimientoDiario =
        document.getElementById('rendimientoDiario').value

    console.log(rendimientoDiario)

    // Obtener el objeto informacionRotulos desde localStorage
    const informacionRotulos =
        JSON.parse(localStorage.getItem('informacionRotulos')) || []

    informacionRotulos.forEach((data, index) => {
        data.rendimiento = rendimientoDiario
    })

    const RENDIMIENTO_EQUIPOS = document.getElementById("RENDIMIENTO_EQUIPOS")

    RENDIMIENTO_EQUIPOS.value = `${(1 / rendimientoDiario).toFixed(4)}`

    // Guardar el objeto actualizado de nuevo en localStorage
    localStorage.setItem(
        'informacionRotulos',
        JSON.stringify(informacionRotulos)
    )

    console.log(JSON.stringify(informacionRotulos))
}

function valorUnitarioEquiposLocalStorage() {

    // Obtener el valor del input
    const TARIFA_DIA_EQUIPOS = document.getElementById('TARIFA_DIA_EQUIPOS').value
    const RENDIMIENTO_EQUIPOS = document.getElementById("RENDIMIENTO_EQUIPOS").value

    const VALOR_UNITARIO_EQUIPOS = document.getElementById("VALOR_UNITARIO_EQUIPOS")

    console.log(TARIFA_DIA_EQUIPOS, RENDIMIENTO_EQUIPOS);

    const valor = TARIFA_DIA_EQUIPOS * RENDIMIENTO_EQUIPOS;

    console.log(valor);

    VALOR_UNITARIO_EQUIPOS.value = `${valor.toFixed(2)}`;

}

function cantidadMaterialesLocalStorage() {

    // Obtener el objeto informacionRotulos desde localStorage
    const informacionRotulos =
        JSON.parse(localStorage.getItem('informacionRotulos')) || []

    informacionRotulos.forEach((data, index) => {
        data.rendimiento = rendimientoDiario
    })

    const CANTIDAD_MATERIALES = document.getElementById("CANTIDAD_MATERIALES")

    CANTIDAD_MATERIALES.value = `${(3 / 1000).toFixed(4)}`

    console.log(JSON.stringify(informacionRotulos))
}

cantidadMaterialesLocalStorage()

function valorUnitarioMaterialesLocalStorage() {

    const informacionRotulos = JSON.parse(localStorage.getItem('informacionRotulos')) || [];

    if (informacionRotulos.trm === 'Si') {
        const trmValue = localStorage.getItem('trmValue');
        const valor = CANTIDAD_MATERIALES * PRECIO_UNITARIO_MATERIALES * trmValue;
    }

    console.log(informacionRotulos);

    // Obtener el valor del input
    const PRECIO_UNITARIO_MATERIALES =
        document.getElementById('PRECIO_UNITARIO_MATERIALES').value

    const CANTIDAD_MATERIALES = document.getElementById("CANTIDAD_MATERIALES").value

    const VALOR_UNITARIO_MATERIALES = document.getElementById("VALOR_UNITARIO_MATERIALES")

    const valor = CANTIDAD_MATERIALES * PRECIO_UNITARIO_MATERIALES;

    VALOR_UNITARIO_MATERIALES.value = `${valor.toFixed(2)}`;

}

valorUnitarioMaterialesLocalStorage()

function precioUnitarioTransporte() {

    let ofertaComercial =
        JSON.parse(localStorage.getItem('ofertaComercial')) || []

    let informacionRotulos = JSON.parse(localStorage.getItem('informacionRotulos')) || [];

    console.log(informacionRotulos[0].distancia_movilizacion);

    console.log(ofertaComercial);

    const PRECIO_UNITARIO_TRANSPORTE = document.getElementById("PRECIO UNITARIO TRANSPORTE");

    console.log(PRECIO_UNITARIO_TRANSPORTE);

    const valor = ofertaComercial.length > 0 ? ofertaComercial[0].valor_sin_aiu * informacionRotulos[0].distancia_movilizacion / 100 : 0;

    console.log(valor);

    PRECIO_UNITARIO_TRANSPORTE.value = `${valor.toFixed(2)}`;

}

precioUnitarioTransporte()
