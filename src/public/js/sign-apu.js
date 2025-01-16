function guardarInformacionRotulos() {

    const capitulo = document.getElementById('capitulo').value || "No se ingreso una actividad";

    const descripcion_actividad = document.getElementById('descripcion-actividad').value || "No se ingreso una descripción de la actividad";
    const item_pago = document.getElementById('item-pago').value || "No se ingreso un item de pago";
    const unidad = document.getElementById('unidad').value || "No se ingreso una unidad de medida";
    const rendimiento = parseFloat(document.getElementById('rendimiento').value).toFixed(2) || "No se ingreso un rendimiento";
    const cantidad_instalar = document.getElementById('cantidad-instalar').value === "Si" ? document.getElementById('cantidad-instalar-otro').value : document.getElementById('cantidad-instalar').value || "No se ingreso un rendimiento";
    const cantidad_dias = document.getElementById('cantidad-dias').value === "Si" ? document.getElementById('cantidad-dias-otro').value : document.getElementById('cantidad-dias').value || "No se ingresaron dias de trabajo";
    const trm = document.getElementById('trm').value;
    const iva = document.getElementById('iva').value;
    const distancia_movilizacion = document.getElementById('distancia-movilizacion').value === "Si" ? document.getElementById('distancia-movilizacion-otro').value : document.getElementById('distancia-movilizacion').value || "No se ingreso un rendimiento";

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
            iva,
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
            iva,
            distancia_movilizacion
        });
    }

    // Guardar los datos actualizados en el Local Storage
    localStorage.setItem('informacionRotulos', JSON.stringify(informacionRotulos));

    alert('Datos guardados exitosamente!');

    console.log(capitulo);

    // Redirigir según el valor de capitulo
    if (capitulo == "Movilización") {
        window.location.href = '../../views/pages/mobilization-apu.html';
    } else {
        window.location.href = '../../views/pages/general-apu.html';
    }

}