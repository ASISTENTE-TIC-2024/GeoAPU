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

        let rangeValue = document.getElementById(
            'rangeValue'
        )

        if (this.value === 'Si') {
            otraOpcionText.style.display = 'block'
            rangeValue.style.display = 'block'
        } else {
            otraOpcionText.style.display = 'none'
            rangeValue.style.display = 'none'
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
