function cancelAPU() {
    if (confirm('¿Estás seguro de cancelar el APU?')) {
        window.location.href =
            '../pages/administrador-apu.html'
    }
}

function displayDataAPU() {
    const formData = JSON.parse(localStorage.getItem('formData')) || [];

    const fecha = document.getElementById("fecha")
    const proyecto = document.getElementById("proyecto")
    const departamento = document.getElementById("departamento")
    const municipio = document.getElementById("municipio")

    console.log(fecha);

    formData.forEach((data, index) => {
        fecha.innerHTML = `${data.datepickerActions}`;
        proyecto.innerHTML = `${data.nombreProyecto}`;
        departamento.innerHTML = `${data.departamento}`;
        municipio.innerHTML = `${data.municipio}`;
    })



}

displayDataAPU()