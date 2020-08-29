const user = document.getElementById('user') 
const password = document.getElementById('password')
const form = document.getElementById('form')

form.addEventListener('submit',(e) =>{
    e.preventDefault()
    
    const fjson = new XMLHttpRequest();

    fjson.open('GET','json/users.json',true);

    fjson.send();

    fjson.onreadystatechange = function(){

        if(this.readyState == 4 && this.status == 200){
            let users = JSON.parse(this.responseText);
        
            let sw=0
            for(let item of users){
                if(item.correo==user.value && item.contraseña==password.value){
                    alert("Bienvenido: "+item.tipo+" "+item.nombre+" "+item.apellido )
                    const datos = [item.correo, item.nombre, item.apellido]
                    localStorage.setItem('sesion',datos)
                    window.location.href = "html/inicio.html"
                    sw=1
                    break
                }
            }
            if(sw==0){
                alert("Datos erroneos")
            }
        }
    }
});

function invitado() {
    localStorage.setItem('sesion',"invitado")
    window.location.href = "html/inicio.html"
}

