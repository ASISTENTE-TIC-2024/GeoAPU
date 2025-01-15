function cancelAPU() {

    if (confirm('¿Estás seguro de cancelar el APU?')) {

        let informacionRotulos = JSON.parse(localStorage.getItem('informacionRotulos')) || [];

        informacionRotulos.splice(0, 1);

        localStorage.setItem('informacionRotulos', JSON.stringify(informacionRotulos));

        window.location.href =
            '../../views/pages/commercial-offer.html';
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
    const actividad = document.getElementById("actividad")
    const rendimiento_diario = document.getElementById("rendimientoDiario")
    const cantidad_instalar = document.getElementById("cantidadAInstalar")
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
        actividad.innerHTML = `${data.descripcion_actividad}`;
        rendimiento_diario.value = isNaN(data.rendimiento) ? "No aplica" : `${data.rendimiento}`;

        rendimiento_equipos.value = `${(1 / data.rendimiento).toFixed(4)}`;
        cantidad_materiales.value = `${(3 / data.rendimiento).toFixed(4)}`;

        cantidad_instalar.innerHTML = `${data.cantidad_instalar}`;
        cantidad_dias.innerHTML = `${data.cantidad_dias}`;

    })

    fetchTRMValue()

}

displayDataAPU()

/*------------------ MODULO DE LA TABLA EQUIPOS ----------------------*/

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

    console.log(JSON.stringify(informacionRotulos))

}

function valorUnitarioEquipos() {

    // Obtener el valor del input
    const TARIFA_DIA_EQUIPOS = document.getElementById('TARIFA_DIA_EQUIPOS').value

    const RENDIMIENTO_EQUIPOS = document.getElementById("RENDIMIENTO_EQUIPOS").value

    const VALOR_UNITARIO_EQUIPOS = document.getElementById("VALOR_UNITARIO_EQUIPOS")

    const valor = RENDIMIENTO_EQUIPOS * TARIFA_DIA_EQUIPOS;

    VALOR_UNITARIO_EQUIPOS.value = `${valor.toFixed(2)}`;

}

/*------------------ MODULO DE LA TABLA MATERIALES ----------------------*/

function cantidadMaterialesLocalStorage() {

    // Obtener el valor del input
    const rendimientoDiario =
        document.getElementById('rendimientoDiario').value

    // Obtener el objeto informacionRotulos desde localStorage
    const informacionRotulos =
        JSON.parse(localStorage.getItem('informacionRotulos')) || []

    informacionRotulos.forEach((data, index) => {
        data.rendimiento = rendimientoDiario
    })

    const CANTIDAD_MATERIALES = document.getElementById("CANTIDAD_MATERIALES")

    CANTIDAD_MATERIALES.value = `${(3 / rendimientoDiario).toFixed(4)}`

    // Guardar el objeto actualizado de nuevo en localStorage
    localStorage.setItem(
        'informacionRotulos',
        JSON.stringify(informacionRotulos)
    )

}

cantidadMaterialesLocalStorage()

function valorUnitarioMateriales() {

    // Obtener el valor del input
    const PRECIO_UNITARIO_MATERIALES = document.getElementById('PRECIO_UNITARIO_MATERIALES').value

    const CANTIDAD_MATERIALES = document.getElementById("CANTIDAD_MATERIALES").value

    const VALOR_UNITARIO_MATERIALES = document.getElementById("VALOR_UNITARIO_MATERIALES")

    const valor = CANTIDAD_MATERIALES * PRECIO_UNITARIO_MATERIALES;

    VALOR_UNITARIO_MATERIALES.value = `${valor.toFixed(2)}`;

}

/*------------------ MODULO DE LA TABLA TRANSPORTES ----------------------*/

function valorUnitarioTransportes() {
    // Obtener el valor del input
    const PRECIO_UNITARIO_TRANSPORTES = document.getElementById('PRECIO UNITARIO TRANSPORTE').value;
    const RENDIMIENTO_TRANSPORTES = document.getElementById('RENDIMIENTO TRANSPORTE').value;
    const VALOR_UNITARIO_TRANSPORTES = document.getElementById('VALOR UNITARIO TRANSPORTE');

    const valor = RENDIMIENTO_TRANSPORTES * PRECIO_UNITARIO_TRANSPORTES;
    VALOR_UNITARIO_TRANSPORTES.value = `${valor.toFixed(2)}`;
}

/*------------------ MODULO DE LA TABLA MANO DE OBRA ----------------------*/

function valorUnitarioManoDeObra() {

    // Obtener el valor del input
    JORNAL_MANO_DE_OBRA = parseFloat(document.getElementById('JORNAL MANO DE OBRA').value.replace(/[\$,]/g, ''))

    console.log(JORNAL_MANO_DE_OBRA);

    JORNAL_TOTAL_MANO_DE_OBRA = document.getElementById('JORNAL TOTAL MANO DE OBRA').value;

    console.log(JORNAL_TOTAL_MANO_DE_OBRA);

    RENDIMIENTO_MANO_DE_OBRA = document.getElementById('RENDIMIENTO MANO DE OBRA').value;

    console.log(RENDIMIENTO_MANO_DE_OBRA);

    const VALOR_UNITARIO_MANO_DE_OBRA = document.getElementById('VALOR UNITARIO MANO DE OBRA');

    const valor = JORNAL_MANO_DE_OBRA * JORNAL_TOTAL_MANO_DE_OBRA * RENDIMIENTO_MANO_DE_OBRA;

    VALOR_UNITARIO_MANO_DE_OBRA.value = valor.toFixed(2);

}

