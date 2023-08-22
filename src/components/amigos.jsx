import { useEffect, useState } from 'react'

import '../app2.css'
import CircularProgress from '@mui/material/CircularProgress';

import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Amigos() {
   
    let [busqueda,setBusqueda] = useState([])
    let [dato,setDato] = useState([])
    let [ dato2, setDato2] = useState(false)

useEffect(()=>{
    fetch("https://api-drawing.vercel.app/amigos",{
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
        setDato2(true)

        console.log(res)
    })
},[])
  let solicitud2=(e)=>{
    fetch("https://api-drawing.vercel.app/eliminarAmigo",{
        method:"post",
        headers: {
            'Content-Type': 'application/json',
          },
        body:JSON.stringify({
            beneficiario:localStorage.getItem("userName") ,
            remitente:e.target.value
           
        })
    
    }).then(function(res){
       return res.json()
    }).then(function(res){
        fetch("https://api-drawing.vercel.app/amigos",{
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
    })
        toast.success('Se ha eliminado.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
            console.log(res)
            setDato2(true)

            setBusqueda([])

    }).catch((err)=>{
        toast.err('No se pudo eliminar ', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
    })
 
  }





  return (
   <>

    

<div className='con' style={{marginTop:"50px"}}>


{(dato2==false)?<CircularProgress />:(busqueda.length==0)? <div style={{  display: "flex",justifyContent: "center",alignItems: "center",height: "70vh"}}><div><img style={{width:"300px",height:"300px",float:"right"}} src={"https://api-drawing.vercel.app/uploads/imagenes/3.gif"}></img><h1 style={{color:"white"}}>No tienes amigos, has algunos :3</h1></div></div> :busqueda.map((dato)=>{
    return<div class="cardp">
    <header class="card-personal-header" style={{backgroundImage:"url('"+dato.avatar+"')"}}>
  <button class="card-personal-d" value={dato.username} onClick={solicitud2}>X</button>

    <h1 class="card-personal-name">{dato.nombre}</h1>
    <a style={{textDecoration:"none"}}  class="card-personal-link">{dato.username}</a>
    </header>
    
    </div>})}




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

export default Amigos