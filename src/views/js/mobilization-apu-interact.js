// Ejecutar la segunda parte solo si estamos en mobilization-apu.html
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('mobilization-apu.html')) {
        movViewSecondPart();
    }
});

function handleMovView() {
    const ofertaComercialMov = JSON.parse(localStorage.getItem('ofertaComercialMov')) || [];
    if (ofertaComercialMov.length === 0) {
        alert('No se ha creado una APU de movilización.');
        return;
    }
    movViewFirstPart();
}

function movViewFirstPart() {

    localStorage.setItem('origin', 'commercial-offer');

    console.log('Ejecutando la primera parte porque proviene del primer HTML. origin:', localStorage.getItem('origin'));

    const storedInformacionCompletaMov = JSON.parse(localStorage.getItem('storedInformacionCompletaMov')) || [];

    console.log('storedInformacionCompletaMov:', storedInformacionCompletaMov);

    window.location.href = './mobilization-apu.html';
}

function movViewSecondPart() {

    const origin = localStorage.getItem('origin');

    if (origin === 'commercial-offer') {

        console.log('Ejecutando la segunda parte porque proviene del primer HTML.');

        let storedInformacionCompletaMov = localStorage.getItem('storedInformacionCompletaMov');

        console.log('storedInformacionCompletaMov:', storedInformacionCompletaMov);

        let parsedObj = {};
        try {
            parsedObj = JSON.parse(storedInformacionCompletaMov);
        } catch (e) {
            parsedObj = {};
        }

        const infoProy = parsedObj.informacionProyecto && parsedObj.informacionProyecto[0] ? parsedObj.informacionProyecto[0] : {};
        let fechaValue = infoProy.fecha;
        let proyectoValue = infoProy.proyecto;
        let departamentoValue = infoProy.departamento;
        let municipioValue = infoProy.municipio;

        const fecha = document.getElementById("fecha");
        const proyecto = document.getElementById("proyecto");
        const departamento = document.getElementById("departamento");
        const municipio = document.getElementById("municipio");

        if (fecha) fecha.innerHTML = `${fechaValue}`;
        if (proyecto) proyecto.innerHTML = `${proyectoValue}`;
        if (departamento) departamento.innerHTML = `${departamentoValue}`;
        if (municipio) municipio.innerHTML = `${municipioValue}`;

        const info = parsedObj.informacionRotulos && parsedObj.informacionRotulos[0] ? parsedObj.informacionRotulos[0] : {};

        let itemPagoValue = info.item_pago;
        let actividadValue = info.descripcion_actividad;
        let rendimientoDiarioValue = info.rendimiento;
        let cantidadInstalarValue = info.cantidad_instalar;
        let cantidadDiasValue = info.cantidad_dias;
        let trmValue = parsedObj.trmValue;

        const item_pago = document.getElementById("itemPago")
        const actividad = document.getElementById("actividad")
        const rendimiento_diario = document.getElementById("rendimientoDiario")
        const cantidad_instalar = document.getElementById("cantidadAInstalar")
        const cantidad_dias = document.getElementById("cantidadDias")
        const trm = document.getElementById('trm');


        item_pago.innerHTML = `${itemPagoValue}`;
        actividad.innerHTML = `${actividadValue}`;
        rendimiento_diario.value = rendimientoDiarioValue;
        cantidad_instalar.innerHTML = `${cantidadInstalarValue}`;
        cantidad_dias.innerHTML = `${cantidadDiasValue}`;
        trm.innerHTML = `$ ${trmValue}`;

        rendimiento_diario.readOnly = true;

        document.querySelectorAll('input').forEach(input => {
            if (input.id !== 'rendimientoDiario') {
                input.style.display = 'none';
            }
        });

        document.querySelectorAll('select').forEach(select => {
            select.style.display = 'none';
        });

        document.querySelectorAll('button').forEach(button => {
            button.style.display = 'none';
        });

        document.querySelectorAll('th').forEach(th => {
            if (th.textContent.trim().toUpperCase() === 'ACCIÓN') {
                th.style.display = 'none';
            }
        });

        // DATOS DE EQUIPOS

        const datosEquipos = Array.isArray(parsedObj.datosEquipos) ? parsedObj.datosEquipos : [];

        const totalEquiposMov = datosEquipos.reduce((sum, eq) => {
            const val = parseFloat(eq.rendimiento_equipos) * parseFloat(eq.tarifa_dia_equipos);
            return sum + (isNaN(val) ? 0 : val);
        }, 0);

        let tbodyEquipos = document.querySelector('#dataTableEquipos tbody')

        tbodyEquipos.innerHTML = ''

        let resultadoEquipos = document.getElementById('resultadoEquipos');

        if (resultadoEquipos) {
            resultadoEquipos.textContent = ''; // Limpiar el texto existente
            resultadoEquipos.textContent = `$ ${totalEquiposMov.toFixed(2)}`;
        }

        datosEquipos.forEach((equipo, index) => {

            let tr = document.createElement('tr');

            tr.className = index % 2 === 0
                ? 'even:bg-gray-50 border-b'
                : 'odd:bg-white even:bg-gray-50 border-b';

            const rendimiento = parseFloat(equipo.rendimiento_equipos);
            const tarifa = parseFloat(equipo.tarifa_dia_equipos);

            const subtotal = (!isNaN(rendimiento) && !isNaN(tarifa)) ? rendimiento * tarifa : 0;
            const porcentaje = totalEquiposMov ? ((subtotal / totalEquiposMov) * 100) : 0;

            tr.innerHTML = `
                <td>${equipo.descripcion_equipos}</td>
                <td>${equipo.marca_equipos}</td>
                <td>${equipo.tipo_equipos}</td>
                <td>${equipo.tarifa_dia_equipos}</td>
                <td>${isNaN(rendimiento) ? 0 : rendimiento}</td>
                <td>$ ${subtotal.toFixed(2)}</td>
                <td>${porcentaje.toFixed(2)}%</td>
            `;

            tbodyEquipos.appendChild(tr);
        });


        // DATOS DE MATERIALES

        const datosMateriales = Array.isArray(parsedObj.datosMateriales) ? parsedObj.datosMateriales : [];

        const totalMaterialesMov = datosMateriales.reduce((sum, mat) => {
            const val = parseFloat(mat.valor_unitario_materiales);
            return sum + (isNaN(val) ? 0 : val);
        }, 0);

        let tbodyMateriales = document.querySelector('#dataTableMateriales tbody');

        if (tbodyMateriales) {
            tbodyMateriales.innerHTML = '';
            datosMateriales.forEach((material, index) => {
                let tr = document.createElement('tr');
                tr.className = index % 2 === 0
                    ? 'even:bg-gray-50 border-b'
                    : 'odd:bg-white even:bg-gray-50 border-b';

                const cantidad = parseFloat(material.cantidad_materiales);
                const precioUnitario = parseFloat(material.precio_unitario_materiales);
                const valorUnitario = parseFloat(material.valor_unitario_materiales);
                const porcentaje = totalMaterialesMov ? ((valorUnitario / totalMaterialesMov) * 100) : 0;

                tr.innerHTML = `
                <td>${material.descripcion_materiales}</td>
                <td>${material.tipo_moneda_materiales}</td>
                <td>${material.unidad_materiales}</td>
                <td>${isNaN(precioUnitario) ? 0 : precioUnitario}</td>
                <td>${isNaN(cantidad) ? 0 : cantidad}</td>
                <td>$ ${isNaN(valorUnitario) ? '0.00' : valorUnitario.toFixed(2)}</td>
                <td>${porcentaje.toFixed(2)}%</td>
            `;

                tbodyMateriales.appendChild(tr);
            });
        }

        let resultadoMateriales = document.getElementById('resultadoMateriales');
        if (resultadoMateriales) {
            resultadoMateriales.textContent = '';
            resultadoMateriales.textContent = `$ ${totalMaterialesMov.toFixed(2)}`;
        }

        // DATOS DE TRANSPORTE

        const datosTransportes = Array.isArray(parsedObj.datosTransportes) ? parsedObj.datosTransportes : [];

        const totalTransportesMov = datosTransportes.reduce((sum, trans) => {
            const val = parseFloat(trans.valor_unitario_transportes);
            return sum + (isNaN(val) ? 0 : val);
        }, 0);

        let tbodyTransportes = document.querySelector('#dataTableTransporteMov tbody');

        if (tbodyTransportes) {
            tbodyTransportes.innerHTML = '';
            datosTransportes.forEach((transporte, index) => {
                let tr = document.createElement('tr');
                tr.className = index % 2 === 0
                    ? 'even:bg-gray-50 border-b'
                    : 'odd:bg-white even:bg-gray-50 border-b';

                const distancia = parseFloat(transporte.distancia_transportes);
                const precioUnitario = parseFloat(transporte.precio_unitario_transportes);
                const rendimiento = parseFloat(transporte.rendimiento_transportes);
                const valorUnitario = parseFloat(transporte.valor_unitario_transportes);
                const porcentaje = totalTransportesMov ? ((valorUnitario / totalTransportesMov) * 100) : 0;

                tr.innerHTML = `
                <td>${transporte.descripcion_transportes}</td>
                <td>${transporte.unidad_transportes}</td>
                <td>${isNaN(distancia) ? 0 : distancia}</td>
                <td>${isNaN(precioUnitario) ? 0 : precioUnitario}</td>
                <td>${isNaN(rendimiento) ? 0 : rendimiento}</td>
                <td>$ ${isNaN(valorUnitario) ? '0.00' : valorUnitario.toFixed(2)}</td>
                <td>${porcentaje.toFixed(2)}%</td>
            `;

                tbodyTransportes.appendChild(tr);
            });
        }

        let resultadoTransportes = document.getElementById('resultadoTransporte');
        if (resultadoTransportes) {
            resultadoTransportes.textContent = '';
            resultadoTransportes.textContent = `$ ${totalTransportesMov.toFixed(2)}`;
        }

        // DATOS DE MANO DE OBRA

        const datosManoDeObra = Array.isArray(parsedObj.datosManoDeObra) ? parsedObj.datosManoDeObra : [];

        const totalManoDeObraMov = datosManoDeObra.reduce((sum, mano) => {
            const val = parseFloat(mano.valor_unitario_mano_de_obra);
            return sum + (isNaN(val) ? 0 : val);
        }, 0);

        let tbodyManoDeObra = document.querySelector('#dataTableManoDeObraMov tbody');

        if (tbodyManoDeObra) {
            tbodyManoDeObra.innerHTML = '';
            datosManoDeObra.forEach((mano, index) => {
                let tr = document.createElement('tr');
                tr.className = index % 2 === 0
                    ? 'even:bg-gray-50 border-b'
                    : 'odd:bg-white even:bg-gray-50 border-b';

                const jornal = parseFloat(mano.jornal_mano_de_obra);
                const prestacion = parseFloat(mano.prestacion_mano_de_obra);
                const jornalTotal = parseFloat(mano.jornal_total_mano_de_obra);
                const rendimiento = parseFloat(mano.rendimiento_mano_de_obra);
                const valorUnitario = parseFloat(mano.valor_unitario_mano_de_obra);
                const porcentaje = totalManoDeObraMov ? ((valorUnitario / totalManoDeObraMov) * 100) : 0;

                tr.innerHTML = `
            <td>${mano.trabajador_mano_de_obra}</td>
            <td>${isNaN(jornal) ? 0 : jornal}</td>
            <td>${isNaN(prestacion) ? 0 : prestacion}</td>
            <td>${isNaN(jornalTotal) ? 0 : jornalTotal}</td>
            <td>${isNaN(rendimiento) ? 0 : rendimiento}</td>
            <td>$ ${isNaN(valorUnitario) ? '0.00' : valorUnitario.toFixed(2)}</td>
            <td>${porcentaje.toFixed(2)}%</td>
            `;

                tbodyManoDeObra.appendChild(tr);
            });
        }

        let resultadoManoDeObra = document.getElementById('resultadoManoDeObra');
        if (resultadoManoDeObra) {
            resultadoManoDeObra.textContent = '';
            resultadoManoDeObra.textContent = `$ ${totalManoDeObraMov.toFixed(2)}`;
        }

        // TOTALES

        const totalMov = totalEquiposMov + totalMaterialesMov + totalTransportesMov + totalManoDeObraMov;
        const total = document.getElementById('resultadoTotalGeneral');

        if (total) {
            total.textContent = '';
            total.textContent = `$ ${totalMov.toFixed(2)}`;
        }

        const administracionMov = totalMov * 0.13;
        const imprevistosMov = totalMov * 0.07;
        const utilidadMov = totalMov * 0.05;

        const administracion = document.getElementById('administracion');
        const imprevistos = document.getElementById('imprevistos');
        const utilidad = document.getElementById('utilidad');

        if (administracion) administracion.textContent = `$ ${administracionMov.toFixed(2)}`;
        if (imprevistos) imprevistos.textContent = `$ ${imprevistosMov.toFixed(2)}`;
        if (utilidad) utilidad.textContent = `$ ${utilidadMov.toFixed(2)}`;

        const totalGeneralMov = totalMov + administracionMov + imprevistosMov + utilidadMov;
        const totalGeneral = document.getElementById('totalGlobal');

        if (totalGeneral) {
            totalGeneral.textContent = '';
            totalGeneral.textContent = `$ ${totalGeneralMov.toFixed(2)}`;
        }

        const porcentajeEquiposV = totalMov ? ((totalEquiposMov / totalMov) * 100) : 0;
        const porcentajeMaterialesV = totalMov ? ((totalMaterialesMov / totalMov) * 100) : 0;
        const porcentajeTransporteV = totalMov ? ((totalTransportesMov / totalMov) * 100) : 0;
        const porcentajeManoDeObraV = totalMov ? ((totalManoDeObraMov / totalMov) * 100) : 0;

        const porcentajeEquipos = document.getElementById('porcentajeEquipos');
        porcentajeEquipos.innerHTML = `${porcentajeEquiposV.toFixed(2)}%`;

        const porcentajeMateriales = document.getElementById('porcentajeMateriales');
        porcentajeMateriales.innerHTML = `${porcentajeMaterialesV.toFixed(2)}%`;

        const porcentajeTransporte = document.getElementById('porcentajeTransporte');
        porcentajeTransporte.innerHTML = `${porcentajeTransporteV.toFixed(2)}%`;

        const porcentajeManoDeObra = document.getElementById('porcentajeManoDeObra');
        porcentajeManoDeObra.innerHTML = `${porcentajeManoDeObraV.toFixed(2)}%`;

        // Crear el botón para regresar a commercial-offer.html
        const backButton = document.getElementById('volverBoton');
        backButton.style.display = 'block';
        backButton.style.marginTop = '20px';
        backButton.style.padding = '10px 20px';
        backButton.style.backgroundColor = '#007bff';
        backButton.style.color = '#fff';
        backButton.style.border = 'none';
        backButton.style.borderRadius = '4px';
        backButton.style.cursor = 'pointer';

        // Evento para redirigir al hacer clic
        backButton.addEventListener('click', () => {
            window.location.href = './commercial-offer.html';
        });

        // Insertar el botón al final del body
        document.body.appendChild(backButton);

    } else {
        console.log('No se ejecuta la segunda parte porque no proviene del primer HTML.');
    }
}



function deleteMovItem() {

    if (confirm('¿Esta seguro de que quiere eliminar la APU de movilización?')) {

        const ofertaComercialMov = JSON.parse(localStorage.getItem('ofertaComercialMov')) || [];

        // Eliminar el elemento del array
        ofertaComercialMov.splice(0, 1);

        // Actualizar el localStorage
        localStorage.setItem('ofertaComercialMov', JSON.stringify(ofertaComercialMov));

        // Recargar la página para reflejar los cambios
        location.reload();
    }

}