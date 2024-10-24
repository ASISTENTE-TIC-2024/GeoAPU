document.addEventListener('DOMContentLoaded', () => {
    const selectEquipos = document.getElementById('selectEquipos');
    const descripcionEquipo = document.getElementById('DESCRIPCIÓN EQUIPOS');
    const marcaEquipo = document.getElementById('MARCA EQUIPOS');
    const tipoEquipo = document.getElementById('TIPO EQUIPOS');
    const tarifaDiaEquipo = document.getElementById('TARIFA_DIA_EQUIPOS');
    const imagenEquipo = document.getElementById('IMAGEN_EQUIPOS'); // Asegúrate de tener un elemento img con este id

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
                option.dataset.imagen = equipo.imagen_equipos; // Asegúrate de que el objeto equipo tenga esta propiedad
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
        descripcionEquipo.value = selectedOption.textContent;
        marcaEquipo.value = selectedOption.dataset.marca;
        tipoEquipo.value = selectedOption.dataset.tipo;
        tarifaDiaEquipo.value = selectedOption.dataset.tarifa;
        imagenEquipo.src = selectedOption.dataset.imagen; // Actualiza la fuente de la imagen
    });
});