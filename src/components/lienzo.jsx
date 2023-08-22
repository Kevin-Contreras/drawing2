import { useEffect, useState } from 'react'

import '../App.css'
import { json } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';

function Lienzos() {
    let [data,setData] = useState([])
    let [dato,setDato] = useState(false)

    let contador = 0
useEffect(()=>{
setDato(false)
    fetch("https://api-drawing.vercel.app/liensos").then(function(res){
        return res.json()
     }).then(function(res){
        setData(res)
        setDato(true)
         console.log(res)
     })


},[])
  return (
   
<div class="gallery2">
{(dato==false)?<CircularProgress style={{margin:"auto",color:"red"}} />:
    data.map(function(fila){
      
     return <>
     {(fila.username=="predeterminado")? 

<div class="image-container">
        <img src={fila.imagen} alt="Imagen de fondo" class="background-image"/>
      
        </div>


      :
      <div class="image-container">
      <img src={fila.imagen} alt="Imagen de fondo" class="background-image"/>
      <div class="image-overlay">
         
          <div class="image-inside">
              <img src={fila.avatar} alt="Icono" class="icon"/>
          </div>
          <h3>{fila.username}</h3>
      </div>
      </div>

              
    } 
     
     </>

     
    }
       
    )}
  
    </div>
  )
}

export default Lienzos