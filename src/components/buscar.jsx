import { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';

import '../app2.css'

import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Buscar() {
   
    let [busqueda,setBusqueda] = useState([])
    let [busqueda2,setBusqueda2] = useState([])

    let [dato,setDato] = useState([])
    let [dato2,setDato2] = useState(false)
    useEffect(()=>{
      setDato2(true)
    },[])

let solicitud =async (e)=>{
let usu =  await fetch("https://api-drawing.vercel.app/agregarSolicitud",{
    method:"post",
    headers: {
        'Content-Type': 'application/json',
      },
    
    body:JSON.stringify({
        beneficiario:e.target.value,
        remitente: localStorage.getItem("userName"),
        amigo:false
    })

})
let respuesta = await usu.json();
console.log(respuesta.resultado)
if(respuesta.resultado!="ya existe en la tabla"){

  toast.success('se ha enviado la solicitud', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });
}else{
  if(respuesta.amigo == 1){
    toast.error('Ya son amigos.', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }else{
    toast.error('Ya se ha enviado la solicitud de amistad o te han enviado a ti.', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }

}
console.log(respuesta)
}


  let envio = async()=>{

    if(dato !=""){
      setDato2(false)

        var buscarUsuario = await fetch("https://api-drawing.vercel.app/buscar",{
            method:"post",
            headers: {
                'Content-Type': 'application/json',
              },
            body:JSON.stringify({
                user:dato,
                el:localStorage.getItem("userName")
            })
         })
         let d =await buscarUsuario.json()
         
         if(buscarUsuario.status==200){
          setDato2(true)
          setBusqueda(d.result)
          setBusqueda2(d.amigos)
         }
   
         
        

        
    }else{
      setDato2(true)

        setBusqueda([])
    }
 
  }
  return (
   <>

    

<div class="wrapper">
  <div class="label">Buscar usuarios</div>
  <div class="searchBar">
    <input id="searchQueryInput" type="text" name="searchQueryInput" onChange={(e)=>setDato(e.target.value)} placeholder="Search" />
    <button id="searchQuerySubmit" onClick={envio} type="submit" name="searchQuerySubmit" >
      <svg className='svgs' viewBox="0 0 24 24"><path fill="#666666" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
      </svg>
    </button>
  </div>
</div>
<div className='con'>
{

(dato2==false)?<CircularProgress style={{color:"red"}} ></CircularProgress>:
(busqueda.length==0)? <div >
  <div  >
    
     <div style={{display:"flex",justifyContent:"center"}}>
     <img style={{width:"300px",height:"300px"}} src={"https://api-drawing.vercel.app/uploads/imagenes/4.gif"}></img>
      </div>
      <h1 className='letra' style={{color:"white"}}>Busca a un usuario y hazte amigo de el </h1>
      </div>
      </div> : busqueda.map((dato)=>{

return <div class="cardp">
<header class="card-personal-header" style={{backgroundImage:"url('"+dato.avatar+"')"}}>

 {(localStorage.getItem("userName")==dato.username)?"":<button class="card-personal-add" value={dato.username} onClick={solicitud}>+</button> }

<h1 class="card-personal-name">{dato.nombre}</h1>
<a href="/" class="card-personal-link">{dato.username}</a>

</header>

</div>
})
}

</div>


<ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
   </>

       
  )
}

export default Buscar
