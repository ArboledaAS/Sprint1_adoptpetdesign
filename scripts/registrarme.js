import { urlUsuarios } from "./helpers/url.js";
import getData from "./helpers/getData.js";
import postData from "./helpers/postData.js";

document.addEventListener('DOMContentLoaded',
    async () => {
        const dataUsuarios = await getData(urlUsuarios)
        const formulario = document.getElementById("formDatos");





        formulario.addEventListener("submit", async (e) => {
            e.preventDefault();

            const inputNombre = document.getElementById("nombre").value;
            const inputEmail = document.getElementById("email").value;
            const inputPassword = document.getElementById("password").value;
            const inputNumero = document.getElementById("numero").value;

            // const nuevoUsuario = { inputNombre, inputEmail, inputPassword, inputNumero };
            console.log(inputEmail)

            const verificarUser = dataUsuarios.find((gmail => gmail.email === inputEmail))
            if (verificarUser) {
               alert("Usuario ya existe")
            }else{
                const nuevoUsuario = { inputNombre, inputEmail, inputPassword, inputNumero, favorites:[] };
                console.log(nuevoUsuario)
                await postData(urlUsuarios, nuevoUsuario);
                alert("Usuario agregado con éxito")
                location.href = "../pages/login.html"
            }

            // const respuesta = await postData(urlUsuarios, nuevoUsuario);

        })
    })