function guardarInformacionRotulos() {

    const capitulo = document.getElementById('capitulo').value || "No se ingreso una actividad";
    const descripcion_actividad = document.getElementById('descripcion-actividad').value || "No se ingreso una descripción de la actividad";
    const item_pago = 1;
    const unidad = document.getElementById('unidad').value || "No se ingreso una unidad de medida";
    const rendimiento = parseFloat(document.getElementById('rendimiento').value).toFixed(2) || "No se ingreso un rendimiento";
    const cantidad_instalar = document.getElementById('cantidad-instalar').value === "Si" ? document.getElementById('cantidad-instalar-otro').value : document.getElementById('cantidad-instalar').value || "No se ingreso una cantidad a instalar";
    const cantidad_dias = document.getElementById('cantidad-dias').value === "Si" ? document.getElementById('cantidad-dias-otro').value : document.getElementById('cantidad-dias').value || "No se ingresaron dias de trabajo";
    const trm = 'Si';
    const distancia_movilizacion = document.getElementById('distancia-movilizacion').value === "Si" ? document.getElementById('distancia-movilizacion-otro').value : document.getElementById('distancia-movilizacion').value || "No se ingreso una distancia de movilización";

    // Obtener los datos existentes del Local Storage
    let informacionRotulos = JSON.parse(localStorage.getItem('informacionRotulos')) || [];

    // Verificar si ya existe una entrada con el mismo nombre de proyecto
    const existingIndex = informacionRotulos.findIndex(data => data.capitulo === capitulo || data.descripcion_actividad === descripcion_actividad || data.item_pago === item_pago || data.unidad === unidad || data.rendimiento === rendimiento || data.cantidad_instalar === cantidad_instalar || data.cantidad_dias === cantidad_dias || data.trm === trm || data.iva === iva || data.distancia_movilizacion === distancia_movilizacion);

    if (existingIndex !== -1) {
        // Actualizar la entrada existente
        informacionRotulos[existingIndex] = {
            capitulo,
            descripcion_actividad,
            item_pago,
            unidad,
            rendimiento,
            cantidad_instalar,
            cantidad_dias,
            trm,
            distancia_movilizacion
        };
    } else {
        // Agregar los nuevos datos
        informacionRotulos.push({
            capitulo,
            descripcion_actividad,
            item_pago,
            unidad,
            rendimiento,
            cantidad_instalar,
            cantidad_dias,
            trm,
            distancia_movilizacion
        });
    }

    // Guardar los datos actualizados en el Local Storage
    localStorage.setItem('informacionRotulos', JSON.stringify(informacionRotulos));

    alert('Datos guardados exitosamente!');

    console.log(capitulo);

    // Redirigir según el valor de capitulo
    if (capitulo == "Movilización") {
        window.location.href = '../pages/mobilization-apu.html';
    } else {
        window.location.href = '../pages/general-apu.html';
    }

}

function updateMovilizacionValue(value) {

    let ofertaComercialMov = JSON.parse(localStorage.getItem('ofertaComercialMov')) || [];

    console.log(ofertaComercialMov);

    let valorSinAiu = ofertaComercialMov[0].valor_sin_aiu;

    console.log(valorSinAiu);

    console.log(value);

    value = value.replace(' %', '');

    let movilizacionValue = (valorSinAiu * value) / 100;

    console.log(movilizacionValue);

    document.getElementById('movValue').innerText = "Esta destinando para esta APU: " + movilizacionValue.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) + " de movilizacion de un total " + valorSinAiu.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });

    console.log(document.getElementById('movValue').innerText);

    document.getElementById('movValue').classList.remove('hidden');
}

function formatCurrency(input) {
    let value = input.value.replace(/\D/g, '');
    input.value = value + ' %';
    input.setSelectionRange(value.length, value.length);
}

