function guardarInformacionProyecto() {
    const fecha = document.getElementById('datepicker-actions').value;
    let fechaFormateada = new Date(fecha)
    const formato =
        ('0' + fechaFormateada.getDate()).slice(-2) +
        '/' +
        ('0' + (fechaFormateada.getMonth() + 1)).slice(-2) +
        '/' +
        fechaFormateada.getFullYear()
    fechaFormateada.value = formato
    const proyecto = document.getElementById('nombre-proyecto').value || "No se ingreso nombre de proyecto";
    const cliente = document.getElementById('cliente').value || "No se ingreso cliente";
    const contacto = document.getElementById('contacto').value || "No se ingreso contacto";
    const correo = document.getElementById('correo').value || "No se ingreso correo";
    const departamento = document.getElementById('departamento').value || "No se ingreso departamento";
    const municipio = document.getElementById('municipio').value;

    // Obtener los datos existentes del Local Storage
    let informacionProyecto = JSON.parse(localStorage.getItem('informacionProyecto')) || [];

    // Verificar si ya existe una entrada con el mismo nombre de proyecto
    const existingIndex = informacionProyecto.findIndex(data => data.fecha === fechaFormateada || data.proyecto === proyecto || data.cliente === cliente || data.contacto === contacto || data.correo === correo || data.departamento === departamento || data.municipio === municipio);

    if (existingIndex !== -1) {
        // Actualizar la entrada existente
        informacionProyecto[existingIndex] = {
            fecha,
            proyecto,
            cliente,
            contacto,
            correo,
            departamento,
            municipio: municipio || informacionProyecto[existingIndex].municipio // No actualizar si municipio es false
        };
    } else {
        // Agregar los nuevos datos
        informacionProyecto.push({
            fecha,
            proyecto,
            cliente,
            contacto,
            correo,
            departamento,
            municipio: municipio || "No se ingreso municipio"
        });
    }

    // Guardar los datos actualizados en el Local Storage
    localStorage.setItem('informacionProyecto', JSON.stringify(informacionProyecto));

    alert('Datos guardados exitosamente!');

    window.location.href = '../../views/pages/commercial-offer.html';
}



