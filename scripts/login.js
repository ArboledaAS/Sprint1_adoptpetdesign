import { urlUsuarios } from "./helpers/url.js";
import getData from "./helpers/getData.js";


document.addEventListener('DOMContentLoaded',
    async () => {
        // Obtener los datos de la API
        const users = await getData(urlUsuarios)
        const formulario = document.getElementById("datos");


        // let email = document.getElementById("email").value;
        // let password = document.getElementById("password").value;


        formulario.addEventListener("submit", (e) => {
            e.preventDefault();

            
            const inputEmail = document.getElementById("email").value;
            const inputPassword = document.getElementById("password").value;

            let emailUser = users.find((gmail) => gmail.email === inputEmail)
            let passUser = users.find((pass) => pass.password === inputPassword)

            if(emailUser && passUser){
                
                const objeto = users.find((e)=> e.email === inputEmail && e.password === inputPassword) 
                localStorage.setItem("usuario", JSON.stringify(objeto));
                location.href = "./principal.html"

            }else{
                alert("Correo o contraseña incorrectas")
            }

        })



        // if(emailUser && passUser){
        //    location.href
        // }else{
        //     console.log("no existe")
        // }




    }
)