document.addEventListener('DOMContentLoaded', () => {

    /********************* MODULO EQUIPOS **************************/

    const selectEquipos = document.getElementById('selectEquipos');
    const descripcionEquipo = document.getElementById('DESCRIPCIÓN EQUIPOS');
    const marcaEquipo = document.getElementById('MARCA EQUIPOS');
    const tipoEquipo = document.getElementById('TIPO EQUIPOS');
    const tarifaDiaEquipo = document.getElementById('TARIFA_DIA_EQUIPOS');

    // Función para obtener los datos de la tabla equipos
    async function obtenerEquipos() {
        try {

            const response = await fetch('http://localhost:5000/selectEquipoData');
            const equipos = await response.json();

            // Llenar el select con los datos obtenidos
            equipos.forEach(equipo => {
                const option = document.createElement('option');
                option.value = equipo.id_equipos;
                option.textContent = equipo.descripcion_equipos;
                option.dataset.marca = equipo.marca_equipos;
                option.dataset.tipo = equipo.tipo_equipos;
                option.dataset.tarifa = equipo.tarifa_dia_equipos;
                selectEquipos.appendChild(option); // Corregido aquí
            });
        } catch (error) {
            console.error('Error al obtener los equipos:', error);
        }
    }

    // Llamar a la función para obtener los equipos al cargar la página
    obtenerEquipos();

    // Evento para actualizar los campos de texto y la imagen cuando se seleccione un equipo
    selectEquipos.addEventListener('change', (event) => {
        const selectedOption = event.target.selectedOptions[0];

        if (selectedOption.textContent === 'Seleccione un equipo') {
            descripcionEquipo.value = '';
            tipoEquipo.value = '';
            marcaEquipo.value = '';
            tarifaDiaEquipo.value = '';
        } else {
            descripcionEquipo.value = selectedOption.textContent ?? '';
            tipoEquipo.value = selectedOption.dataset.tipo ?? '';
            marcaEquipo.value = selectedOption.dataset.marca ?? '';
            tarifaDiaEquipo.value = selectedOption.dataset.tarifa ?? '';
        }
    });

    /********************* MODULO MATERIALES **************************/

    const selectMaterial = document.getElementById('selectMateriales');
    const descripcionMaterial = document.getElementById('DESCRIPCION MATERIALES');
    const monedaMaterial = document.getElementById('TIPO DE MONEDA MATERIALES');
    const unidadMaterial = document.getElementById('UNIDAD MATERIALES');
    const precioUnitarioMaterial = document.getElementById('PRECIO_UNITARIO_MATERIALES');

    // Función para obtener los datos de la tabla equipos
    async function obtenerMateriales() {
        try {

            const response = await fetch('http://localhost:5000/selectMaterialData');
            const materiales = await response.json();

            // Llenar el select con los datos obtenidos
            materiales.forEach(material => {
                const option = document.createElement('option');
                option.value = material.id_materiales;
                option.textContent = material.descripcion_materiales ?? '';
                option.dataset.moneda = material.tipo_moneda_materiales ?? '';
                option.dataset.unidad = material.unidad_medida_materiales ?? '';
                option.dataset.precio = material.valor_unitario_materiales ?? '';
                selectMaterial.appendChild(option);
            });

        } catch (error) {
            console.error('Error al obtener los equipos:', error);
        }
    }

    // Llamar a la función para obtener los equipos al cargar la página
    obtenerMateriales();

    // Evento para actualizar los campos de texto y la imagen cuando se seleccione un equipo
    selectMaterial.addEventListener('change', (event) => {

        const selectedOption = event.target.selectedOptions[0];

        if (selectedOption.textContent === 'Seleccione un material') {
            descripcionMaterial.value = '';
            monedaMaterial.value = '';
            unidadMaterial.value = '';
            precioUnitarioMaterial.value = '';
        } else {
            descripcionMaterial.value = selectedOption.textContent ?? '';
            monedaMaterial.value = selectedOption.dataset.moneda ?? '';
            unidadMaterial.value = selectedOption.dataset.unidad ?? '';
            precioUnitarioMaterial.value = selectedOption.dataset.precio ?? '';
        }
    });

    /********************* MODULO TRANSPORTE **************************/

    const selectTransportes = document.getElementById('selectTransportes');
    const descripcionTransporte = document.getElementById('DESCRIPCION TRANSPORTE');
    const unidadTransporte = document.getElementById('UNIDAD TRANSPORTE');
    const distanciaTransporte = document.getElementById('DISTANCIA TRANSPORTE');
    const precioUnitarioTransporte = document.getElementById('PRECIO UNITARIO TRANSPORTE');
    const valorUnitarioTransporte = document.getElementById('VALOR UNITARIO TRANSPORTE');

    // Función para obtener los datos de la tabla trasnportes
    async function obtenerTransportes() {
        try {

            const response = await fetch('http://localhost:5000/selectTransporteData');

            const transportes = await response.json();

            console.log(transportes);

            // Llenar el select con los datos obtenidos
            transportes.forEach(transporte => {
                const option = document.createElement('option');
                option.value = transporte.id_transportes;
                option.textContent = transporte.descripcion_transportes;
                option.dataset.unidad = transporte.unidad_transportes;
                option.dataset.distancia = transporte.distancia_transportes;
                option.dataset.precio = transporte.precio_unitario_transportes;
                selectTransportes.appendChild(option);
            });
        } catch (error) {
            console.error('Error al obtener los transportes:', error);
        }
    }

    // Llamar a la función para obtener los transporte al cargar la página
    obtenerTransportes();

    // Evento para actualizar los campos de texto y la imagen cuando se seleccione un transporte
    selectTransportes.addEventListener('change', (event) => {

        const selectedOption = event.target.selectedOptions[0];

        if (selectedOption.textContent === 'Seleccione un item de transporte') {

            descripcionTransporte.value = '';
            unidadTransporte.value = '';
            distanciaTransporte.value = '';
            precioUnitarioTransporte.value = '';
            valorUnitarioTransporte.value = '';

        } else {

            descripcionTransporte.value = selectedOption.textContent ?? '';
            unidadTransporte.value = selectedOption.dataset.unidad ?? '';
            distanciaTransporte.value = selectedOption.dataset.distancia ?? '';
            precioUnitarioTransporte.value = selectedOption.dataset.precio ?? '';
            valorUnitarioTransportes(); // Llamar a la función para calcular el valor unitario

        }
    });

});