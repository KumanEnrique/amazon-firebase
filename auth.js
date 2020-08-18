import {db,auth} from './confi.js'
export let uid;
const fila1 = document.getElementById("fila1")
const formularioIniciar = document.getElementById("fIniciarSesion")
const iCorreo = document.getElementById("iCorreo")
const iContraseña = document.getElementById("iContraseña")
const btnIniciar = document.getElementById("navSesion")
const btnCerrarSesion = document.getElementById("cerrarSesion")
//evento para ver si estas en sesión
auth.onAuthStateChanged((user)=>{
    if(user){
        console.log("sesion iniciada,objeto user: ", user)
        db.collection("amazon").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // console.log("subcoleción",doc.id);
            });
        }); 
        uid = user.uid
    }else {
        console.log("sesion cerrada")
    }
});
formularioIniciar.addEventListener("submit",(e)=>{
    e.preventDefault()
    const correo = iCorreo.value;
    const contraseña = iContraseña.value;
    auth.signInWithEmailAndPassword(correo,contraseña)
        .then(() => {
            console.log("se recordo la contraseña y el password, con exito")
            console.log(correo,contraseña);
            formularioIniciar.reset();
            $("#iniciarSesionModal").modal("hide")
        })
        .catch((e) => {
            const error = e.code;
            const message = e.message;
            console.warn("atrape el error", error, message)
        });
})
btnCerrarSesion.addEventListener("click",()=>{
    auth.signOut().then(()=>{
        console.log("salio de la  sesión de la aplicación")
    })
    .catch((e)=>{
        console.warn("hubo un error",e)
    })
})
/* 
formularioRegistrar.addEventListener("submit",(e)=>{
    e.preventDefault()
    const correo = correoR.value;
    const contraseña = contraseñaR.value;

    auth.createUserWithEmailAndPassword(correo, contraseña)
        .then(() => {
            console.log("exito!!!");
            formularioRegistrar.reset();
            modal1.style.display = "none";
        })
        .catch((e) => {
            const error = e.code;
            const message = e.message;
            console.warn("atrape el error", error, message)
        });
})*/
function loginGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
    .then(()=>{
        console.log("estas logueado con google")
    })
    .catch((error)=>{
        console.log(error)
    })
}