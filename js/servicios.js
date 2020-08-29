

div = document.getElementById('show');
div.style.display = 'none';
if (localStorage.getItem("vacantes") == null) { 
    var registro = []
}else{
    var registro = JSON.parse(localStorage.getItem("vacantes"))
}

const nombre = document.getElementById('nombre')
const apllido = document.getElementById('apellido')
const documento = document.getElementById('documento')
const ciudad = document.getElementById('ciudad')
const correo = document.getElementById('correo')
const celular = document.getElementById('cel')
var botonenviar=document.getElementById('btnenviar')
var botoneditar=document.getElementById('btneditar')
botoneditar.disabled = true;//no habilitado editar

const form = document.getElementById('form')
const mostrar = document.getElementById('mostrar')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const nuevoempleado = {
        nombree: nombre.value, 
        iden: documento.value, 
        ciudadd: ciudad.value,
        corr: correo.value,
        cel: celular.value
    
    }


    div = document.getElementById('show');
    div.style.display = '';

    registro.splice(0, 0, nuevoempleado)
    localStorage.setItem('vacantes', JSON.stringify(registro));

    form.reset(); 


    tbody = document.querySelector('#mostrar tbody')
    let fila = tbody.insertRow(0),

        Nombre = fila.insertCell(0)
        Documento  = fila.insertCell(1),
        Ciudad = fila.insertCell(2)
        Email = fila.insertCell(3)
        Celular = fila.insertCell(4),
        boton1 = fila.insertCell(5);
        boton2 = fila.insertCell(6);

    Nombre.innerHTML = nuevoempleado.nombree
    Documento.innerHTML = nuevoempleado.iden
    Ciudad.innerHTML = nuevoempleado.ciudadd
    Email.innerHTML = nuevoempleado.corr
    Celular.innerHTML = nuevoempleado.cel
    boton1.innerHTML = `<button class= "btn btn-warning " name="btn" onclick="onEdit(this)" >Editar</button>`;
    boton2.innerHTML = `<button class= "btn btn-danger " name="btn" onclick="delRow(this)" > Eliminar</button>`;
    

});



function delRow(currElement) {
    var parentRowIndex = currElement.parentNode.parentNode.rowIndex;
    document.getElementById("mostrar").deleteRow(parentRowIndex);
    registro.splice(parentRowIndex - 1, 1);
    localStorage.setItem('vacantes', JSON.stringify(registro));
    
    if(parentRowIndex == 1){
        div.style.display = 'none';
    }
}

var parentRowIndex

function onEdit(currElement) {
    ///cambio de botones
    botoneditar.disabled = false;
    botonenviar.disabled = true;
    parentRowIndex = currElement.parentNode.parentNode.rowIndex;
    selectedRow = currElement.parentElement.parentElement;
    document.getElementById('nombre').value = selectedRow.cells[0].innerHTML;
    document.getElementById('documento').value = selectedRow.cells[1].innerHTML;
    document.getElementById('ciudad').value = selectedRow.cells[2].innerHTML;
    document.getElementById('correo').value = selectedRow.cells[3].innerHTML;
    document.getElementById('cel').value = selectedRow.cells[4].innerHTML;

}

/////// actualizar datos
function actualizarfila() {

    name = document.getElementById('nombre').value
    docm = document.getElementById('documento').value 
    city = document.getElementById('documento').value
    email = document.getElementById('correo').value
    cel = document.getElementById('cel').value; 
    

    if (docm == "" || email == "" || name == "") {
        alert("debe ingresar la informacion en todos los campos")
    } else {
        
        nuevoempleado = {
            nombre: name, 
            idem:  docm,
            ciudadd: city,
            corr: email,
            cel: cel

        }


        selectedRow.cells[0].innerHTML = nuevoempleado.nombree;
        selectedRow.cells[1].innerHTML = nuevoempleado.idem;
        selectedRow.cells[2].innerHTML = nuevoempleado.ciudadd;
        selectedRow.cells[3].innerHTML = nuevoempleado.corr;
        selectedRow.cells[4].innerHTML = nuevoempleado.cel;


        registro.splice(parentRowIndex - 1, 1);
        registro.splice(parentRowIndex - 1, 0, nuevoempleado);
        localStorage.setItem('vacantes', JSON.stringify(registro));
        

        botoneditar.disabled = true;
        botonenviar.disabled = false;
        alert("Fila editada exitosamente");
        form.reset();
    }
}