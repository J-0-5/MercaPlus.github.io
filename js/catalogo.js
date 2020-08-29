const producto = document.getElementById('producto')
const PRO = document.getElementById('PRO')
var articulos = []

const productos = new XMLHttpRequest();

productos.open('GET', '../json/productos.json', true);

productos.send();

productos.onreadystatechange = function () {

    if (this.readyState == 4 && this.status == 200) {
        articulos = JSON.parse(this.responseText);
    }
}

//Variables localStorage
var nompro = ""
var precio = 0
//----------------------------------------------------------------------------------------//
var domicilio = 0
function myFunction() {
    var checkBox = document.getElementById("myCheck");
    if (checkBox.checked == true) {
        domicilio = 15000;
    } else {
        domicilio = 0;
    }
}
//----------------------------------------------------------------------------------------//
const unidades = document.getElementById('unidades')
//----------------------------------------------------------------------------------------//
const ide = document.getElementById('id')
ide.addEventListener('change', (e) => {
    localStorage.setItem('ide', e.target.value);
})
//----------------------------------------------------------------------------------------//
const documento = document.getElementById('documento')
//----------------------------------------------------------------------------------------//
const modo = document.getElementById('modo')
modo.addEventListener('change', (e) => {
    localStorage.setItem('mode', e.target.value);
})
//----------------------------------------------------------------------------------------//
const num = document.getElementById('num')
//----------------------------------------------------------------------------------------//
function comprar(producto){

    for (let item of articulos) {

        if (item.nombre == producto) {
            nompro = item.nombre
            precio = item.precio
            break
        }
    }
    PRO.innerHTML = nompro

    $('#exampleModal').modal('show')
}
//----------------------------------------------------------------------------------------//

if (localStorage.getItem("cuentas") == null) { 
    var registro = []
}else{
    var registro = JSON.parse(localStorage.getItem("cuentas"))
}


function agregar() {
    if (unidades.value == "" || documento.value == "" || num.value == "") {
        alert("Debe ingresar la informacion en todos los campos")
    }else{
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

        form.reset();
        $('#exampleModal').modal('hide')
        alert("Compra agregada a su cuenta");
    }
}