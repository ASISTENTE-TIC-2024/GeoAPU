function handleSubmit(event) {
    event.preventDefault()
    const form = document.getElementById('formulario-informacion')
    const data = new FormData(form)
    const queryString = new URLSearchParams(data).toString()
    window.location.href = `administrador-apu.html?${queryString}`
}
