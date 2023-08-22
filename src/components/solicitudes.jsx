import { useEffect, useState } from 'react'

import '../app2.css'
import CircularProgress from '@mui/material/CircularProgress';
function Solicitud() {
   
    let [busqueda,setBusqueda] = useState([])
    let [dato,setDato] = useState(false)
useEffect(()=>{
    fetch("https://api-drawing.vercel.app/solicitudes",{
        method:"post",
        headers: {
            'Content-Type': 'application/json',
          },
        body:JSON.stringify({
            user:localStorage.getItem("userName") 
           
        })
    
    }).then(function(res){
       return res.json()
    }).then(function(res){
        setBusqueda(res)
        console.log(res)
        setDato(true)
    })
},[])
  





  let aceptar = async(e)=>{
    let usu =  await fetch("https://api-drawing.vercel.app/agregarSolicitud2",{
      method:"post",
      headers: {
          'Content-Type': 'application/json',
        },
      body:JSON.stringify({
          beneficiario:e.target.value,
          remitente: localStorage.getItem("userName"),
          amigo:true
      })
  
  })
  let usu2 =  await fetch("https://api-drawing.vercel.app/actualizar",{
    method:"post",
    headers: {
        'Content-Type': 'application/json',
      },
    body:JSON.stringify({
        beneficiario:e.target.value,
        remitente: localStorage.getItem("userName"),
        amigo:true
    })

})
fetch("https://api-drawing.vercel.app/solicitudes",{
  method:"post",
  headers: {
      'Content-Type': 'application/json',
    },
  body:JSON.stringify({
      user:localStorage.getItem("userName") 
     
  })

}).then(function(res){
 return res.json()
}).then(function(res){
  setBusqueda(res)
  setDato(true)
  console.log(res)
})
let nombre = await usu2.json()

 console.log(nombre)
  }
  return (
   <>

    

<div className='con' style={{marginTop:"50px"}}>
{(dato==false)?<CircularProgress />:(busqueda.length==0)?
  <div style={{  display: "flex",justifyContent: "center",alignItems: "center",height: "70vh"}}><div><img style={{width:"300px",height:"300px"}} src={"https://api-drawing.vercel.app/uploads/imagenes/1.gif"}></img><h1 style={{color:"white"}}>No tienes solicitudes</h1></div></div>: busqueda.map((dato)=>{
return<div class="cardp">
<header class="card-personal-header" style={{backgroundImage:"url('"+dato.avatar+"')"}}>
<button class="card-personal-add" onClick={aceptar} value={dato.username} >
    +
    </button>
<h1 class="card-personal-name">{dato.nombre}</h1>
<a href="/" class="card-personal-link">{dato.username}</a>
</header>

</div>
})}



</div>



   </>

       
  )
}

export default Solicitud