import { urlMascotas, urlUsuarios } from "./helpers/url.js";
import getData from "./helpers/getData.js";
import patchData from "./helpers/patchData.js";

document.addEventListener('DOMContentLoaded',
  async () => {
    const categoriesSelect = document.getElementById("categoriesSelect")
    const div = document.getElementById("mostrar")
    let usuario = JSON.parse(localStorage.getItem("usuario")) || []
    // Obtener los datos de la API
    const mascotas = await getData(urlMascotas)




    function cardHtml(element) {

      let html = `
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
        <button id="${element.id}"  type="button" class="btn btn-primary btnFavoritos">Añadir a favoritos</button>
      </div>
    </div>
  </div>
</div>

            `

      return html
    }



    mascotas.forEach(element => {
      const divcard = document.createElement("div")
      divcard.classList.add("card")



      divcard.innerHTML = cardHtml(element)

      const botonfavorito = divcard.querySelector(".btnFavoritos")
      botonfavorito.addEventListener("click", (e) => {
        const idmascota = e.target.id
        const existe = (usuario.favorites).find((a) => a == idmascota)
        console.log(`este es el existe: `, existe);

        if (existe) {
          alert("Esta mascota ya esta en sus favoritos")
        } else {
          const listaFavoritos = usuario.favorites
          listaFavoritos.push(idmascota)

          const objeto = {
            id: usuario.id,
            name: usuario.name,
            email: usuario.email,
            password: usuario.password,
            phone: usuario.phone,
            favorites: listaFavoritos

          }
          localStorage.setItem("usuario", JSON.stringify(objeto));


          patchData(`${urlUsuarios}/${usuario.id}`, { favorites: listaFavoritos })

        }
      })

      // divcard.innerHTML = `
      // <div class="card" style="width: 18rem;">
      // <img src="${element.imagen}" class="card-img-top" alt="...">
      // <div class="card-body">
      //     <h5 class="card-title">${element.name}</h5>
      //     <p class="card-text">${element.descripcion}.</p>
      // </div>
      // <ul class="list-group list-group-flush">
      //     <li class="list-group-item">Raza: ${element.raza}</li>
      //     <li class="list-group-item">Sexo: ${element.sexo}</li>
      //     <li class="list-group-item">Años: ${element.edad}</li>
      // </ul>
      // </div>
      // `
      div.appendChild(divcard)
    })



    // Crear categorías para el select


    let opciones = []

    console.log(opciones)

    //alimentar opciones
    mascotas.forEach(element => {
      opciones.push(element.raza)
      // categoriesSelect.innerHTML = `<option value="${element.raza}">${element.raza}</option>`
      // opciones += `<option value="${element.raza}">${element.raza}</option>`
    })

    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

    const listaFiltrada = opciones.filter(onlyUnique)

    listaFiltrada.forEach(element => {
      const lista = document.createElement("option")
      lista.setAttribute("value", `${element}`)
      lista.textContent = element
      categoriesSelect.appendChild(lista)


    })



    categoriesSelect.addEventListener("click", (e) => {
      if (e.target.value == "Seleccionar raza") {
        //--------------------------------
        mascotas.forEach(element => {
          const divcard = document.createElement("div")
          divcard.classList.add("card")

          divcard.innerHTML = cardHtml(element)


          const botonfavorito = divcard.querySelector(".btnFavoritos")
          botonfavorito.addEventListener("click", (e) => {
            const idmascota = e.target.id
            const existe = (usuario.favorites).find((a) => a == idmascota)
            console.log(`este es el existe: `, existe);

            if (existe) {
              alert("Esta mascota ya esta en sus favoritos")
            } else {
              const listaFavoritos = usuario.favorites
              listaFavoritos.push(idmascota)

              const objeto = {
                id: usuario.id,
                name: usuario.name,
                email: usuario.email,
                password: usuario.password,
                phone: usuario.phone,
                favorites: listaFavoritos

              }
              localStorage.setItem("usuario", JSON.stringify(objeto));


              patchData(`${urlUsuarios}/${usuario.id}`, { favorites: listaFavoritos })

            }
          })

          // divcard.innerHTML = `
          // <div class="card" style="width: 18rem;">
          // <img src="${element.imagen}" class="card-img-top" alt="...">
          // <div class="card-body">
          //     <h5 class="card-title">${element.name}</h5>
          //     <p class="card-text">${element.descripcion}.</p>
          // </div>
          // <ul class="list-group list-group-flush">
          //     <li class="list-group-item">Raza: ${element.raza}</li>
          //     <li class="list-group-item">Sexo: ${element.sexo}</li>
          //     <li class="list-group-item">Años: ${element.edad}</li>
          // </ul>
          // </div>
          // `
          div.appendChild(divcard)
        })
        //--------------------------------
      } else {
        const newarray = mascotas.filter((item) => item.raza === e.target.value
        )
        console.log(`Este es el new: `, newarray)


        div.innerHTML = ``
        newarray.forEach(element => {
          const divcard = document.createElement("div")
          divcard.classList.add("card")

          divcard.innerHTML = cardHtml(element)
          const botonfavorito = divcard.querySelector(".btnFavoritos")
          botonfavorito.addEventListener("click", (e) => {
            const idmascota = e.target.id
            const existe = (usuario.favorites).find((a) => a == idmascota)
            console.log(`este es el existe: `, existe);

            if (existe) {
              alert("Esta mascota ya esta en sus favoritos")
            } else {
              const listaFavoritos = usuario.favorites
              listaFavoritos.push(idmascota)

              const objeto = {
                id: usuario.id,
                name: usuario.name,
                email: usuario.email,
                password: usuario.password,
                phone: usuario.phone,
                favorites: listaFavoritos

              }
              localStorage.setItem("usuario", JSON.stringify(objeto));


              patchData(`${urlUsuarios}/${usuario.id}`, { favorites: listaFavoritos })

            }
          })
          // divcard.innerHTML = `
          // <div class="card" style="width: 18rem;">
          // <img src="${element.imagen}" class="card-img-top" alt="...">
          // <div class="card-body">
          //     <h5 class="card-title">${element.name}</h5>
          //     <p class="card-text">${element.descripcion}.</p>
          // </div>
          // <ul class="list-group list-group-flush">
          //     <li class="list-group-item">Raza: ${element.raza}</li>
          //     <li class="list-group-item">Sexo: ${element.sexo}</li>
          //     <li class="list-group-item">Años: ${element.edad}</li>
          // </ul>
          // </div>
          // `
          div.appendChild(divcard)
        })
      }


    })




    // mascotas.forEach(element => {
    //     const divcard = document.createElement("div")
    //     divcard.innerHTML = `
    //     <div class="card" style="width: 18rem;">
    //     <img src="..." class="card-img-top" alt="...">
    //     <div class="card-body">
    //         <h5 class="card-title">${element.name}</h5>
    //         <p class="card-text">${element.descripcion}.</p>
    //     </div>
    //     <ul class="list-group list-group-flush">
    //         <li class="list-group-item">Raza: ${element.raza}</li>
    //         <li class="list-group-item">Sexo: ${element.sexo}</li>
    //         <li class="list-group-item">Años: ${element.edad}</li>
    //     </ul>
    //     </div>
    //     `
    //     div.appendChild(divcard)
    // })



  const cerrarSesion = document.querySelector(".cerrarSesion")
  cerrarSesion.addEventListener("click", ()=>{
    // localStorage.removeItem("usuario")
    localStorage.clear("usuario")
    window.location.href = "index.html"
  })

  })