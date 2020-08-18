const contenedorCompu = document.getElementById("contenedor-computadoras")
const contenedorAudifonos = document.getElementById("contenedor-audifonos")
const contenedorCelulares = document.getElementById("contenedor-celulares")
const fragmento = document.createDocumentFragment()
const fragmento1 = document.createDocumentFragment()
const fragmento2 = document.createDocumentFragment()

db.collection("amazon").doc("electronicos").collection("nada1").doc("computo").collection("nada2").get().then((querySnapshot)=>{
    querySnapshot.forEach(doc=>{
        ver(doc,fragmento)
    })
    contenedorCompu.appendChild(fragmento)
})
db.collection("amazon").doc("electronicos").collection("nada1").doc("audifonos").collection("nada2").get().then((querySnapshot)=>{
    querySnapshot.forEach(doc=>{
        ver(doc,fragmento1)
    })
    contenedorAudifonos.appendChild(fragmento1)
})
db.collection("amazon").doc("electronicos").collection("nada1").doc("celulares").collection("nada2").get().then((querySnapshot)=>{
    querySnapshot.forEach(doc=>{
        ver(doc,fragmento2)
    })
    contenedorCelulares.appendChild(fragmento2)
})

function ver(doc,fragmentoContenedor){
    const {articulo, desc, imgSRC, amazonLink} = doc.data()
    const columna = document.createElement("div")
    columna.className = "col-lg-4 col-md-6 col-xs-12 my-3"
    columna.innerHTML = `
    <div class="card">
        <div class="card-header">${articulo}</div>
        <div class="card-body">
            <img src="${imgSRC}" class="img-thumbnail" style="width:200px"alt="${articulo}">
            <div class="accordion" id="accordion${doc.id}">
                <div class="card">
                    <div class="card-header" id="heading${doc.id}">
                        <h2 class="mb-0">
                            <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse"
                                data-target="#${doc.id}" aria-expanded="true" aria-controls="${doc.id}">
                                Descripción
                            </button>
                        </h2>
                    </div>
                    <div id="${doc.id}" class="collapse" aria-labelledby="heading${doc.id}" data-parent="#accordion${doc.id}">
                        <div class="card-body">
                            ${desc}
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        <div class="card-footer">
            <a href="${amazonLink}" class="btn btn-warning btn-lg btn-block" role="button" target="_blank">ir a comprar</a>
        </div>
    </div>
    `
    fragmentoContenedor.appendChild(columna)
}