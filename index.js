import {uid} from './auth.js'
import {db} from './confi.js'

const principal = document.getElementById("principal")
const nombre = document.getElementById("nombreArticulo")
const descripcion = document.getElementById("descripcion")
const imagen = document.getElementById("imagenSRC")
const enlace = document.getElementById("enlace")
const categoria = document.getElementById("categoria")
const subcategoria = document.getElementById("subcategoria")

const fragmento = document.createDocumentFragment()
const contenedor = document.getElementById("contenedor")

db.collection("amazon").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        categorias(doc)
    });
    categoria.appendChild(fragmento)
});
db.collection("amazon").get().then(querySnapshot=>{
    querySnapshot.forEach(doc=>{
        const collectionNme = doc.id
        // console.log("coleccion:",doc.id)
        db.collection("amazon").doc(doc.id).collection("nada1").get().then(querySnapshot=>{
            querySnapshot.forEach(doc=>{
                const subcollectionName = doc.id
                // console.log("coleccion:",collectionNme,"subcoleccion:",subcollectionName)
                db.collection("amazon").doc(collectionNme).collection("nada1").doc(subcollectionName).collection("nada2").get().then(querySnapshot=>{
                    querySnapshot.forEach(doc=>{
                        console.log("coleccion:",collectionNme,",subcoleccion:",subcollectionName,",elementos:",doc.id,"=>")
                        ver(doc,collectionNme,subcollectionName)
                    })
                })
            })
        })
    })
});
/* db.collection("amazon").doc(collectionNme).collection("nada1").doc(subcollectionName).collection("nada2")
.onSnapshot(function(snapshot) {
    snapshot.docChanges().forEach(function(change) {
        if (change.type === "added") {
            console.log("New city: ", change.doc.data());
        }
        if (change.type === "modified") {
            console.log("Modified city: ", change.doc.data());
        }
        if (change.type === "removed") {
            console.log("Removed city: ", change.doc.data());
        }
    });
}); */
// db.collectionGroup("landmarks").get()
function categorias(doc){
    const opcion = document.createElement("option")
    opcion.value = `${doc.id}`
    opcion.textContent = `${doc.id}`
    fragmento.appendChild(opcion)
}
function ver(doc,coleccion,subcoleccion){
    const {articulo, desc, imgSRC, amazonLink,fecha} = doc.data()
    const columna = document.createElement("div")
    columna.className = "col-lg-4 col-md-6 col-xs-12 my-3"
    // columna.name = `${doc.id}`
    columna.innerHTML = `
    <div class="card">
        <div class="card-header">${articulo} ${fecha.toDate().toLocaleDateString()}
            <div>
                <h5>${coleccion}</h5>
                <h5>${subcoleccion}</h5>
                <h5>${doc.id}</h5>
            </div>
        </div>
        <div class="card-body">
            <img src="${imgSRC}" class="img-thumbnail" alt="${articulo}">
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
            <a href="${amazonLink}" class="btn btn-warning btn-lg btn-block" role="button" target="_blank">Ir a comprar</a>
            <button class="btn btn-danger btn-lg btn-block">Eliminar</button>
        </div>
    </div>
    `
    contenedor.appendChild(columna)
}
categoria.addEventListener("click",(e)=>{
    subcategoria.innerHTML = ""
    db.collection("amazon").doc(e.target.value).collection("nada1").get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            // console.log("subcoleccion:", doc.id)
            const opcion = document.createElement("option")
            opcion.value = `${doc.id}`
            opcion.textContent = `${doc.id}`
            subcategoria.appendChild(opcion)
        })
    })
})
principal.addEventListener("submit",(e)=>{
    e.preventDefault()
    const articulo = nombre.value;
    const desc = descripcion.value;
    const imgSRC = imagen.value;
    const amazonLink = enlace.value;
    const cat = categoria.value;
    const amazonRef = db.collection("amazon").doc(cat).collection("nada1").doc(subcategoria.value).collection("nada2")
    amazonRef.doc().set({
        articulo,
        desc,
        imgSRC,
        amazonLink,
        fecha:new Date()
    })
    .then(()=>{
        console.log("se agrego correctamente en categoria:",cat,"subcategoria",subcategoria.value)
        principal.reset()
        subcategoria.innerHTML = ""
    })
    .catch((error)=>{
        console.log("el error fue:",error)
    });
})
contenedor.addEventListener("click", (e) => {
    if (e.target.textContent == "Eliminar") {
        const coleccion = e.target.parentElement.parentElement.children[0].children[0].children[0].textContent
        const subcoleccion = e.target.parentElement.parentElement.children[0].children[0].children[1].textContent
        const elementoId = e.target.parentElement.parentElement.children[0].children[0].children[2].textContent

        db.collection("amazon").doc(coleccion).collection("nada1").doc(subcoleccion).collection("nada2").doc(elementoId).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
        e.target.parentElement.parentElement.parentElement.remove()
    }
})