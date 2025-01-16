document.addEventListener('DOMContentLoaded', () => {

    /********************* MODULO EQUIPOS **************************/

    const selectEquipos = document.getElementById('selectEquipos');
    const descripcionEquipo = document.getElementById('DESCRIPCIÓN EQUIPOS');
    const marcaEquipo = document.getElementById('MARCA EQUIPOS');
    const tipoEquipo = document.getElementById('TIPO EQUIPOS');
    const tarifaDiaEquipo = document.getElementById('TARIFA_DIA_EQUIPOS');

    async function obtenerEquipos() {
        try {
            const response = await fetch('http://localhost:5000/selectEquipoData');
            const equipos = await response.json();

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

    obtenerEquipos();

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

    async function obtenerMateriales() {
        try {
            const response = await fetch('http://localhost:5000/selectMaterialData');
            const materiales = await response.json();

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
            console.error('Error al obtener los materiales:', error);
        }
    }

    obtenerMateriales();

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

    if (window.location.pathname !== './general-apu.html') {
        const selectTransportes = document.getElementById('selectTransportes');
        const descripcionTransporte = document.getElementById('DESCRIPCION TRANSPORTE');
        const unidadTransporte = document.getElementById('UNIDAD TRANSPORTE');
        const distanciaTransporte = document.getElementById('DISTANCIA TRANSPORTE');
        const precioUnitarioTransporte = document.getElementById('PRECIO UNITARIO TRANSPORTE');
        const valorUnitarioTransporte = document.getElementById('VALOR UNITARIO TRANSPORTE');

        if (selectTransportes && descripcionTransporte && unidadTransporte && distanciaTransporte && precioUnitarioTransporte && valorUnitarioTransporte) {
            async function obtenerTransportes() {
                try {
                    const response = await fetch('http://localhost:5000/selectTransporteData');
                    const transportes = await response.json();

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

            obtenerTransportes();

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
                }
            });
        }
    }

    /********************* MODULO MANO DE OBRA **************************/

    const selectManoDeObra = document.getElementById('selectManoDeObra');

    const jornalManoDeObra = document.getElementById('JORNAL MANO DE OBRA');

    const cargoEmpleado = document.getElementById('TRABAJADOR MANO DE OBRA');


    async function obtenerManoObra() {
        try {

            const response_1 = await fetch('http://localhost:5000/selectGastoData');
            const response_2 = await fetch('http://localhost:5000/selectEmpleadoData');

            const gastos = await response_1.json();
            const empleados = await response_2.json();

            // gastos.forEach(gasto => {
            //     empleados.forEach(empleado => {
            //         if (gasto.id_empleados === empleado.id_empleados) {
            //             cargoEmpleado = empleado.cargo_empleados;
            //         }
            //     })
            // })

            gastos.forEach(gasto => {
                empleados.forEach(empleado => {

                    const option = document.createElement('option');

                    option.value = gasto.id_gastos;
                    option.textContent = empleado.cargo_empleados;

                    selectManoDeObra.appendChild(option);

                })
            });
        } catch (error) {
            console.error('Error al obtener la mano de obra:', error);
        }
    }

    obtenerManoObra();

    selectManoDeObra.addEventListener('change', async (event) => {

        const selectedOption = event.target.selectedOptions[0];

        console.log(selectedOption);

        if (selectedOption.textContent === 'Seleccione una mano de obra') {
            jornalManoDeObra.value = '';
        } else {

            try {

                console.log(selectedOption.value);

                const response = await fetch(`http://localhost:5000/totalGastos/${selectedOption.value}`);

                const data = await response.json();

                const response_1 = await fetch('http://localhost:5000/selectGastoData');
                const response_2 = await fetch('http://localhost:5000/selectEmpleadoData');

                const gastos = await response_1.json();
                const empleados = await response_2.json();

                gastos.forEach(gasto => {
                    empleados.forEach(empleado => {
                        if (gasto.id_empleados === empleado.id_empleados) {
                            cargoEmpleado.value = empleado.cargo_empleados;
                        }
                    })
                })

                jornalManoDeObra.value = data ?? '';


            } catch (error) {
                console.error('Error al obtener el jornal:', error);
            }
        }
    });

});
