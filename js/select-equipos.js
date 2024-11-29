document.addEventListener('DOMContentLoaded', () => {

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
                selectEquipos.appendChild(option);
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
});