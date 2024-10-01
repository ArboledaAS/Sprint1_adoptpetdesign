import { urlUsuarios } from "./helpers/url.js";
import getData from "./helpers/getData.js";

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        document.querySelector(".contenedor").classList.add("show")

        location.href = "../pages/login.html"
    }, 5000);

})


// document.addEventListener('DOMContentLoaded',
//     async () => {
//         const users = await getData(urlUsuarios)
//         const div = document.getElementById("mostrar")

//         users.forEach(element => {
//             const container = document.createElement("div")
//             container.classList.add("container")
//             container.setAttribute("id",`${element.id}`)
//             const mostrar = document.createElement("h1")
//             mostrar.classList.add("user")
//             mostrar.textContent = element.name
//             const imagenes = document.createElement("img")
//             imagenes.setAttribute("src","https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQn5eN3Kx3caKDaeQ4LbZZPda-vJY-sMNaM3mamjYXPodWERbaQ")
//             container.appendChild(mostrar)
//             container.appendChild(imagenes)
//             div.appendChild(container)



//         });
//     }
// )





