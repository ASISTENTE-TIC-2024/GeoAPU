// TOOLTIPS

document.addEventListener("DOMContentLoaded", function () {
    tippy('[data-tippy-content]', {
        content: (reference) => reference.getAttribute('data-tippy-content'),
        placement: 'top',
    });
});


function cancelAPU() {

    if (confirm('¿Estás seguro de cancelar el APU?')) {

        let informacionRotulos = JSON.parse(localStorage.getItem('informacionRotulos')) || [];

        informacionRotulos.splice(0, 1);

        localStorage.setItem('informacionRotulos', JSON.stringify(informacionRotulos));

        window.location.href =
            './commercial-offer.html';

    }

}

/* FUNCION PARA TRAER EL VALOR DE LA TRM */

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

                        const trm = document.getElementById('trm');

                        trm.innerHTML = `$ ${trmValue}`;

                        // Almacenar el valor de TRM en local storage
                        localStorage.setItem('trmValue', trmValue);

                    } else {
                        console.log('No hay datos de TRM disponibles.'); s
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

/* FUNCION PARA TRAER LOS DATOS DEL APU Y MOSTRARLOS EN EL HTML */

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
        cantidad_instalar.value = isNaN(data.cantidad_instalar) ? "No aplica" : `${data.cantidad_instalar}`;

        rendimiento_equipos.value = `${(1 / data.rendimiento).toFixed(4)}`;
        cantidad_materiales.value = `${(3 / data.rendimiento).toFixed(4)}`;

        distancia_movilizacion.innerHTML = `${data.distancia_movilizacion}`;
        cantidad_dias.innerHTML = `${data.cantidad_dias}`;
    })

    if (informacionRotulos.length > 0) {
        const firstData = informacionRotulos[0];

        item_pago.innerHTML = `${firstData.item_pago}`;
        capitulo.innerHTML = `${firstData.capitulo}`;
        unidad.innerHTML = `${firstData.unidad}`;
        unidadDia.innerHTML = `${firstData.unidad}`;
        actividad.innerHTML = `${firstData.descripcion_actividad}`;

        rendimiento_diario.value = isNaN(firstData.rendimiento) ? "No aplica" : `${firstData.rendimiento}`;
        cantidad_instalar.innerHTML = isNaN(firstData.cantiad_instalar) ? "No aplica" : `${firstData.cantidad_instalar}`;

        rendimiento_equipos.value = `${(1 / firstData.rendimiento).toFixed(4)}`;
        cantidad_materiales.value = `${(3 / firstData.rendimiento).toFixed(4)}`;

        distancia_movilizacion.innerHTML = `${firstData.distancia_movilizacion}`;
        cantidad_dias.innerHTML = `${firstData.cantidad_dias}`;
    }

    fetchTRMValue()
}

displayDataAPU()

/* FUNCION PARA TRAER LOS DATOS DEL APU Y MOSTRARLOS EN EL HTML */

function rendimientoEquiposLocalStorage() {

    // Obtener el valor del input
    const rendimientoDiario =
        document.getElementById('rendimientoDiario').value

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
}

/* MODULO DE EQUIPOS */

/* MODULO DEL INPUT DE RENDIMIENTO DE EQUIPOS */

function valorUnitarioEquiposLocalStorage() {

    const TARIFA_DIA_EQUIPOS = document.getElementById('TARIFA_DIA_EQUIPOS').value
    const RENDIMIENTO_EQUIPOS = document.getElementById("RENDIMIENTO_EQUIPOS").value

    const VALOR_UNITARIO_EQUIPOS = document.getElementById("VALOR_UNITARIO_EQUIPOS")

    const valor = TARIFA_DIA_EQUIPOS * RENDIMIENTO_EQUIPOS;

    VALOR_UNITARIO_EQUIPOS.value = `${valor.toFixed(2)}`;

}

/* MODULO DE MATERIALES */

/* MODULO DEL INPUT DE CANTIDAD DE MATERIALES */

function cantidadMaterialesLocalStorage() {

    // Obtener el objeto informacionRotulos desde localStorage
    const informacionRotulos =
        JSON.parse(localStorage.getItem('informacionRotulos')) || []

    informacionRotulos.forEach((data, index) => {
        data.rendimiento = rendimientoDiario
    })

    const CANTIDAD_MATERIALES = document.getElementById("CANTIDAD_MATERIALES")

    CANTIDAD_MATERIALES.value = `${(3 / 1000).toFixed(4)}`
}

cantidadMaterialesLocalStorage()

/* MODULO DEL INPUT DE PRECIO UNITARIO MATERIALES */

function valorUnitarioMaterialesLocalStorage() {

    // Obtener el valor del input
    const PRECIO_UNITARIO_MATERIALES =
        document.getElementById('PRECIO_UNITARIO_MATERIALES').value

    const CANTIDAD_MATERIALES = document.getElementById("CANTIDAD_MATERIALES").value

    const VALOR_UNITARIO_MATERIALES = document.getElementById("VALOR_UNITARIO_MATERIALES")

    const valor = CANTIDAD_MATERIALES * PRECIO_UNITARIO_MATERIALES;

    VALOR_UNITARIO_MATERIALES.value = `${valor.toFixed(2)}`;

}

valorUnitarioMaterialesLocalStorage();

/* MODULO DE TRANSPORTE */

/* MODULO DEL INPUT DE PRECIO UNITARIO TRANSPORTE */

function precioUnitarioTransporte() {

    let ofertaComercialMov = JSON.parse(localStorage.getItem('ofertaComercialMov')) || []

    let informacionRotulos = JSON.parse(localStorage.getItem('informacionRotulos')) || [];

    const PRECIO_UNITARIO_TRANSPORTE = document.getElementById("PRECIO UNITARIO TRANSPORTE");

    const distancia_movilizacion = parseFloat(informacionRotulos[0].distancia_movilizacion.replace(' %', ''));

    const valor = ofertaComercialMov.length > 0 ? ofertaComercialMov[0].valor_sin_aiu * distancia_movilizacion / 100 : 0;

    PRECIO_UNITARIO_TRANSPORTE.value = `${valor.toFixed(2)}`;

}

precioUnitarioTransporte();

/* MODULO DEL INPUT DE RENDIMIENTO DE TRANSPORTE */

function valorUnitarioTransporteLocalStorage() {

    const PRECIO_UNITARIO_TRANSPORTE = document.getElementById('PRECIO UNITARIO TRANSPORTE').value

    console.log("precio unitario transporte", PRECIO_UNITARIO_TRANSPORTE);

    const RENDIMIENTO_TRANSPORTE = document.getElementById("RENDIMIENTO TRANSPORTE").value

    console.log("rendimiento transporte", RENDIMIENTO_TRANSPORTE);

    const VALOR_UNITARIO_TRANSPORTE = document.getElementById("VALOR UNITARIO TRANSPORTE")

    const valor = RENDIMIENTO_TRANSPORTE * PRECIO_UNITARIO_TRANSPORTE;

    console.log("valor unitario transporte", valor);

    VALOR_UNITARIO_TRANSPORTE.value = `${valor.toFixed(2)}`;
}

valorUnitarioTransporteLocalStorage();

/* MODULO DE MANO DE OBRA */

/* MODULO DE EL RENDIMIENTO DE LA MANO DE OBRA EN EL LS */

function rendimientoManoDeObraLocalStorage() {

    // Obtener el valor del input
    const rendimientoDiario =
        document.getElementById('rendimientoDiario').value

    // Obtener el objeto informacionRotulos desde localStorage
    const informacionRotulos =
        JSON.parse(localStorage.getItem('informacionRotulos')) || []

    informacionRotulos.forEach((data, index) => {
        data.rendimiento = rendimientoDiario
    })

    const RENDIMIENTO_MANO_DE_OBRA = document.getElementById("RENDIMIENTO MANO DE OBRA")

    RENDIMIENTO_MANO_DE_OBRA.value = `${(1 / rendimientoDiario).toFixed(4)}`

    localStorage.setItem(
        'informacionRotulos',
        JSON.stringify(informacionRotulos)
    )
}

rendimientoManoDeObraLocalStorage();

/* MODULO DEL INPUT DE PRECIO UNITARIO MANO DE OBRA */

function valorUnitarioManoDeObraLocalStorage() {

    const JORNAL_MANO_DE_OBRA = document.getElementById('JORNAL MANO DE OBRA').value
    const JORNAL_TOTAL_MANO_DE_OBRA = document.getElementById("JORNAL TOTAL MANO DE OBRA").value
    const RENDIMIENTO_MANO_DE_OBRA = document.getElementById("RENDIMIENTO MANO DE OBRA").value
    const VALOR_UNITARIO_MANO_DE_OBRA = document.getElementById("VALOR UNITARIO MANO DE OBRA")

    const valor = JORNAL_MANO_DE_OBRA * JORNAL_TOTAL_MANO_DE_OBRA * RENDIMIENTO_MANO_DE_OBRA;

    VALOR_UNITARIO_MANO_DE_OBRA.value = `${valor.toFixed(2)}`;
}

valorUnitarioManoDeObraLocalStorage();

/* MODULO DEL INPUT DE CANTIDAD A INSTALAR */

function cantidadInstalarLocalStorage() {

    // Obtener el valor del input
    const cantidadAInstalar =
        document.getElementById('cantidadAInstalar').value

    // Obtener el objeto informacionRotulos desde localStorage
    const informacionRotulos =
        JSON.parse(localStorage.getItem('informacionRotulos')) || []

    informacionRotulos.forEach((data, index) => {
        data.cantidad_instalar = cantidadAInstalar
    })

    // Guardar el objeto actualizado de nuevo en localStorage
    localStorage.setItem(
        'informacionRotulos',
        JSON.stringify(informacionRotulos)
    )
}

function rendimientoTransporteLocalStorage() {

    const RENDIMIENTO_TRANSPORTE = document.getElementById("RENDIMIENTO TRANSPORTE")

    const informacionRotulos = JSON.parse(localStorage.getItem('informacionRotulos')) || [];

    console.log("informacion rotulos", informacionRotulos);

    RENDIMIENTO_TRANSPORTE.value = 1 / informacionRotulos[0].cantidad_instalar;

}

rendimientoTransporteLocalStorage();

function actualizarRendimientoTransportes() {

    const informacionRotulos =
        JSON.parse(localStorage.getItem('informacionRotulos')) || []

    let storedDatosTransportes =
        JSON.parse(localStorage.getItem('datosTransportes')) || []

    informacionRotulos.forEach((data) => {
        storedDatosTransportes.forEach((item) => {
            item.rendimiento_transporte = (1 / data.cantidad_instalar).toFixed(4)
        })
    })

    localStorage.setItem('datosTransportes', JSON.stringify(storedDatosTransportes))

}

