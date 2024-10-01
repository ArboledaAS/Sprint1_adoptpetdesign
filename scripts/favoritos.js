import getData from "./helpers/getData.js";
import { urlMascotas } from "./helpers/url.js";

document.addEventListener("DOMContentLoaded",
    async () => {
        let usuario = JSON.parse(localStorage.getItem("usuario")) || []
        const mascotas = await getData(urlMascotas)
        let lista = []

        // const resultado = animales.filter(animal => animal != 'oso');

        usuario.favorites.forEach(element => {
            lista.push(mascotas[element-1])
        }
        )


        const div = document.getElementById("mostrar")




        lista.forEach(element => {
            const container = document.createElement("div")
            container.innerHTML = `
             <div class="card" style="width: 18rem;">
             <img src="${element.imagen}" class="card-img-top" alt="...">
            <div class="card-body">
             <h5 class="card-title">${element.name}</h5>
                <p class="card-text">${element.descripcion}.</p>
             <button type="button" id="${element.id}" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal${element.id}">
                Ver mas informacion
            </button>
            </div>
            </div>

            <!-- Button trigger modal -->


<!-- Modal -->
<div class="modal fade" id="exampleModal${element.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">${element.name}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <img src="${element.imagen}" class="card-img-top" alt="...">
        <p class="card-text">${element.descripcion}.</p>
        <ul class="list-group list-group-flush">
                <li class="list-group-item">Raza: ${element.raza}</li>
                <li class="list-group-item">Sexo: ${element.sexo}</li>
                <li class="list-group-item">Años: ${element.edad}</li>
        </ul>
      </div>
      <div class="modal-footer">
        <button id="${element.id}"  type="button" class="btn btn-primary btnEliminar">Eliminar de favoritos</button>
      </div>
    </div>
  </div>
</div>

            `
            const botonEliminar = container.querySelector(".btnEliminar")
            botonEliminar.addEventListener("click", (e) => {
                const idmascota = e.target.id
                console.log(idmascota)
                
                const listaNueva = (usuario.favorites).filter(animal => animal != idmascota);

                console.log("esta es nueva:", listaNueva)
                

                // const objeto = {
                //     id: usuario.id,
                //     name: usuario.name,
                //     email: usuario.email,
                //     password: usuario.password,
                //     phone: usuario.phone,
                //     favorites: listaFavoritos

                // }
                // localStorage.setItem("usuario", JSON.stringify(objeto));


                // patchData(`${urlUsuarios}/${usuario.id}`, { favorites: listaFavoritos })


            })


            div.appendChild(container)

            

        })




    })