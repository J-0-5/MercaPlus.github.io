function salir() {
    localStorage.removeItem('sesion');
    window.location.href = "../index.html"
}

function iniciar() {
    localStorage.removeItem('sesion');
    window.location.href = "../index.html"
}


const user = localStorage.getItem('sesion')

if (user == "invitado") {
    alert("Aun no has iniciado sesion. \nEstas navegando como invitado.")
    accion.innerHTML = `<button onclick="iniciar()" type="button" class="btn btn-warning float-right">
                        Iniciar sesion</button>`
}
else{
    accion.innerHTML = `<button onclick="salir()" type="button" class="btn btn-warning float-right">
                        Cerrar sesion</button>`
}