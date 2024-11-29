document.addEventListener('DOMContentLoaded', () => {

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
});