function saveFormData() {
    const datepickerActions = document.getElementById('datepicker-actions').value || "No se ingreso fecha";
    const nombreProyecto = document.getElementById('nombre-proyecto').value || "No se ingreso nombre de proyecto";
    const cliente = document.getElementById('cliente').value || "No se ingreso cliente";
    const contacto = document.getElementById('contacto').value || "No se ingreso contacto";
    const correo = document.getElementById('correo').value || "No se ingreso correo";
    const departamento = document.getElementById('departamento').value || "No se ingreso departamento";
    const municipio = document.getElementById('municipio').value;

    // Obtener los datos existentes del Local Storage
    let formData = JSON.parse(localStorage.getItem('formData')) || [];

    // Verificar si ya existe una entrada con el mismo nombre de proyecto
    const existingIndex = formData.findIndex(data => data.datepickerActions === datepickerActions || data.nombreProyecto === nombreProyecto || data.cliente === cliente || data.contacto === contacto || data.correo === correo || data.departamento === departamento || data.municipio === municipio);

    if (existingIndex !== -1) {
        // Actualizar la entrada existente
        formData[existingIndex] = {
            datepickerActions,
            nombreProyecto,
            cliente,
            contacto,
            correo,
            departamento,
            municipio: municipio || formData[existingIndex].municipio // No actualizar si municipio es false
        };
    } else {
        // Agregar los nuevos datos
        formData.push({
            datepickerActions,
            nombreProyecto,
            cliente,
            contacto,
            correo,
            departamento,
            municipio: municipio || "No se ingreso municipio"
        });
    }

    // Guardar los datos actualizados en el Local Storage
    localStorage.setItem('formData', JSON.stringify(formData));

    alert('Datos guardados en el Local Storage');

    window.location.href = 'administrador-apu.html';
}

function deleteFormData(index) {
    let formData = JSON.parse(localStorage.getItem('formData')) || [];
    formData.splice(index, 1);
    localStorage.setItem('formData', JSON.stringify(formData));
    displayFormData();
}


function displayFormData() {
    const formData = JSON.parse(localStorage.getItem('formData')) || [];
    const dataContainer = document.getElementById('dataContainer');

    // Limpiar el contenedor antes de agregar nuevos datos
    dataContainer.innerHTML = '';

    formData.forEach((data, index) => {
        const dataDiv = document.createElement('div');
        dataDiv.classList.add('data-item');
        dataDiv.innerHTML = `
            <p><strong>Fecha:</strong> ${data.datepickerActions}</p>
            <p><strong>Nombre del Proyecto:</strong> ${data.nombreProyecto}</p>
            <p><strong>Cliente:</strong> ${data.cliente}</p>
            <p><strong>Contacto:</strong> ${data.contacto}</p>
            <p><strong>Correo Electrónico:</strong> ${data.correo}</p>
            <p><strong>Departamento:</strong> ${data.departamento}</p>
            <p><strong>Municipio:</strong> ${data.municipio}</p>
            <button onclick="deleteFormData(${index})">Eliminar</button>
        `;
        dataContainer.appendChild(dataDiv);
    });
}

displayFormData()