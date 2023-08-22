import { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';

import '../App.css'
import { json } from 'react-router-dom'

function MisDibujos() {
  let [ dato2, setDato2] = useState(false)
    useEffect(()=>{
        console.log(localStorage.getItem("usuario"))
        if(localStorage.getItem("usuario")!=null  ){
            fetch("https://api-drawing.vercel.app/misDibujos",{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json',
                  },
                body:JSON.stringify({ user: localStorage.getItem("userName")})
                   
                
            }).then(function(res){
                return res.json()
             }).then(function(res){
              setDato2(true)

                setData(res)
             })
          

        }else{
            location.replace("/login")
        }
    },[])
    let [data,setData] = useState([])

    let contador = 0

  return (
   
<div >
<div class="gallery2">

    
    {(dato2!=true)?<CircularProgress style={{margin:"auto",color:"red"}}/>:(data.length==0)? <div style={{  display: "flex",justifyContent: "center",alignItems: "center",height: "70vh"}}><div><img style={{width:"300px",height:"300px",float:"right"}} src={"https://api-drawing.vercel.app/uploads/imagenes/2.gif"}></img><h1 style={{color:"white"}}>No tienes dibujos, realiza algunos :3</h1></div></div> :data.map(function(fila){
     return <div class="image-container">
      
   <img src={fila.imagen} alt="Imagen de fondo" class="background-image"/>

   </div>

   
   
     
     
    }
       
    )}
    </div>
</div>
  )
}

export default MisDibujos