const textarea = document.getElementById('descripcion-actividad')
textarea.addEventListener('input', function () {
    this.style.height = 'auto'
    this.style.height = this.scrollHeight + 'px'
})

document
    .getElementById('cantidad-instalar')
    .addEventListener('change', function () {
        let otraOpcionText = document.getElementById('cantidad-instalar-otro')
        if (this.value === 'Si') {
            otraOpcionText.style.display = 'block'
        } else {
            otraOpcionText.style.display = 'none'
        }
    })

document
    .getElementById('cantidad-dias')
    .addEventListener('change', function () {
        let otraOpcionText = document.getElementById('cantidad-dias-otro')
        if (this.value === 'Si') {
            otraOpcionText.style.display = 'block'
        } else {
            otraOpcionText.style.display = 'none'
        }
    })

document
    .getElementById('distancia-movilizacion')
    .addEventListener('change', function () {

        let otraOpcionText = document.getElementById(
            'distancia-movilizacion-otro'
        )

        let distancia_movilizacion_number = document.getElementById("distancia_movilizacion_number")

        let movValue = document.getElementById(
            'movValue'
        )

        if (this.value === 'Si') {
            otraOpcionText.style.display = 'block'
            distancia_movilizacion_number.style.display = 'block'
            percentage.style.display = 'block'
            movValue.style.display = 'block'
        } else {
            otraOpcionText.style.display = 'none'
            distancia_movilizacion_number.style.display = 'none'
            percentage.style.display = 'none'
            movValue.style.display = 'none'
        }
    })

function toggleMovilizacionContainer() {
    const capituloSelect = document.getElementById('capitulo');
    const movilizacionContainer = document.querySelector('.movilizacion-container');
    if (capituloSelect.value === 'Movilización') {
        movilizacionContainer.style.display = 'none';
    } else {
        movilizacionContainer.style.display = 'block';
    }
}
