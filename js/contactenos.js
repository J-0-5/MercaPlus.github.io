const clientes = []

const nombre1 = document.getElementById("nombre1"),
    apellido1 = document.getElementById("apellido1"),
    dir = document.getElementById("direccion"),
    cedula = document.getElementById("nodoc"),
    tel = document.getElementById("telefono");

div = document.getElementById('show');
div.style.display = 'none';

const form = document.getElementById("form"),

    mostrar = document.getElementById("mostrar");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const nuevocliente = {
        cliente: nombre1.value + " " + apellido1.value,
        identificacion: cedula.value,
        direccion: dir.value,
        telefono: tel.value
    }

    div = document.getElementById('show');
    div.style.display = '';

    clientes.splice(0, 0, nuevocliente)
    localStorage.setItem('newC', JSON.stringify(clientes));

    tbody = document.querySelector('#mostrar tbody')
        let fila = tbody.insertRow(0),
            cliente = fila.insertCell(0),
            identificacion = fila.insertCell(1),
            direccion = fila.insertCell(2),
            telefono = fila.insertCell(3),
            eliminar = fila.insertCell(4);

            cliente.innerHTML = nuevocliente.cliente
            identificacion.innerHTML = nuevocliente.identificacion
            direccion.innerHTML = nuevocliente.direccion
            telefono.innerHTML = nuevocliente.telefono
            eliminar.innerHTML = '<button id="btn" name="btn" onclick="delRow(this)" > Delete</button>';

});

function delRow(currElement) {
    var parentRowIndex = currElement.parentNode.parentNode.rowIndex;
    document.getElementById("mostrar").deleteRow(parentRowIndex);
    clientes.splice(parentRowIndex - 1, 1);
    localStorage.setItem('newC', JSON.stringify(clientes));
}