const producto = document.getElementById('producto')
var articulos = []

const productos = new XMLHttpRequest();

productos.open('GET', '../json/productos.json', true);

productos.send();

productos.onreadystatechange = function () {

    if (this.readyState == 4 && this.status == 200) {
        articulos = JSON.parse(this.responseText);

        for (let item of articulos) {

            var select = document.createElement('option')
            select.setAttribute('value', item.nombre);
            select.innerHTML = item.nombre;
            producto.appendChild(select);
        }
    }
}

producto.addEventListener('change', (e) => {
    e.preventDefault()
    for (let item of articulos) {
        if (item.nombre == e.target.value) {
            localStorage.setItem('nom', item.nombre)
            localStorage.setItem('precio', item.precio)
            break
        }
    }
})

if (localStorage.getItem("cuentas") == null) { 
    var registro = []
}else{
    var registro = JSON.parse(localStorage.getItem("cuentas"))
}

div = document.getElementById('show');
div.style.display = 'none';

conten = document.getElementById('modal');

const unidades = document.getElementById('unidades')
const ide = document.getElementById('id')
ide.addEventListener('change', (e) => {
    localStorage.setItem('ide', e.target.value);
})
const documento = document.getElementById('documento')
const modo = document.getElementById('modo')
modo.addEventListener('change', (e) => {
    localStorage.setItem('mode', e.target.value);
})

const num = document.getElementById('num')

var domicilio = 0

function myFunction() {
    var checkBox = document.getElementById("myCheck");
    if (checkBox.checked == true) {
        domicilio = 15000;
    } else {
        domicilio = 0;
    }
}

var botonenviar=document.getElementById('btnenviar')
var botoneditar=document.getElementById('btneditar')

botoneditar.disabled = true;//no habilitado editar


const form = document.getElementById('form')
const mostrar = document.getElementById('mostrar')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    if (documento.value == "" || unidades.value == "" || num.value == "") {
        alert("Debe ingresar la informacion en todos los campos")
    } else{
        const product = localStorage.getItem('nom')
        const iden = localStorage.getItem('ide')
        const modo = localStorage.getItem('mode');
        const precio = localStorage.getItem('precio');
        const total = precio * unidades.value + domicilio;
        const factura = {
            numero: documento.value,
            documento: iden,
            Producto: product,
            cantidad: unidades.value,
            tarjeta: modo,
            Pago: num.value,
            Precio_total: total
        }

        registro.splice(0, 0, factura)
        localStorage.setItem('cuentas', JSON.stringify(registro));

        conten.innerHTML = `
        <p>Producto : ${factura.Producto}</p>
        <p>Unidades : ${factura.cantidad}</p>
        <p>Documento: ${factura.documento}</p>
        <p>Numero   : ${factura.numero}</p>
        <p>Modo Pago: ${factura.tarjeta}</p>
        <p># Tarjeta: ${factura.Pago}</p>
        <p>Total    : ${factura.Precio_total}</p>`
        conten.style.display = '';
        $('#exampleModal').modal('show')
        //limpia el formulario
        form.reset();
    }
});

function Mostrar(){

    tbody = document.querySelector('#mostrar tbody')
    var lastRow = mostrar.rows.length
    
    for (let i=0; i<lastRow;i++){
        mostrar.deleteRow(0)
    }

    for(let factura of registro){
        
        let fila = tbody.insertRow(0),

            Numero = fila.insertCell(0)
            Producto = fila.insertCell(1),
            Cantidad = fila.insertCell(2)
            tarjeta = fila.insertCell(3)
            Pago = fila.insertCell(4),
            Precio_total = fila.insertCell(5)
            boton1 = fila.insertCell(6);
            boton2 = fila.insertCell(7);

        Numero.innerHTML = factura.numero
        Producto.innerHTML = factura.Producto
        Cantidad.innerHTML = factura.cantidad
        tarjeta.innerHTML = factura.tarjeta
        Pago.innerHTML = factura.Pago
        Precio_total.innerHTML = factura.Precio_total
        boton1.innerHTML = `<button class= "btn btn-warning " name="btn" onclick="onEdit(this)" >Editar</button>`;
        boton2.innerHTML = `<button class= "btn btn-danger " name="btn" onclick="delRow(this)" > Eliminar</button>`;
        
    }
    div = document.getElementById('show');
    div.style.display = '';
}


function delRow(currElement) {
    var parentRowIndex = currElement.parentNode.parentNode.rowIndex;
    document.getElementById("mostrar").deleteRow(parentRowIndex);
    registro.splice(parentRowIndex - 1, 1);
    localStorage.setItem('cuentas', JSON.stringify(registro));
    
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
    document.getElementById('producto').value = selectedRow.cells[1].innerHTML;
    document.getElementById('unidades').value = selectedRow.cells[2].innerHTML;
    document.getElementById('documento').value = selectedRow.cells[0].innerHTML;
    document.getElementById('modo').value = selectedRow.cells[3].innerHTML;
    document.getElementById('num').value = selectedRow.cells[4].innerHTML;
}

/////// actualizar datos
function actualizarfila() {

    product = localStorage.getItem('nom')
    const modo = localStorage.getItem('mode');
    const iden = localStorage.getItem('ide')
    precio = localStorage.getItem('precio');
    numtar = document.getElementById('num').value
    cantidad = document.getElementById('unidades').value 
    numdoc = document.getElementById('documento').value
    total = total = precio * unidades.value + domicilio;
    

    if (numtar == "" || cantidad == "" || numdoc == "") {
        alert("Debe ingresar la informacion en todos los campos")
    } else {
        
        factura = {
            numero: numdoc,
            documento: iden,
            Producto: product,
            cantidad: cantidad,
            tarjeta: modo,
            Pago: numtar,
            Precio_total: total
        }

        selectedRow.cells[0].innerHTML = factura.numero;
        selectedRow.cells[1].innerHTML = factura.Producto;
        selectedRow.cells[2].innerHTML = factura.cantidad;
        selectedRow.cells[3].innerHTML = factura.tarjeta;
        selectedRow.cells[4].innerHTML = factura.Pago;
        selectedRow.cells[5].innerHTML = factura.Precio_total;

        registro.splice(parentRowIndex - 1, 1);
        registro.splice(parentRowIndex - 1, 0,factura);
        localStorage.setItem('cuentas', JSON.stringify(registro));
        

        botoneditar.disabled = true;
        botonenviar.disabled = false;
        alert("Fila editada exitosamente");
        form.reset();
    }
}