import { useEffect, useState } from 'react'

import '../App.css'
import { Link } from 'react-router-dom'

function Nav() {
  let [usuario,setUsuario] = useState("")
  let [contador,setContador] = useState(0)
  let [nav,setNav] = useState("none")


  useEffect(()=>{
    setContador(1)
    setUsuario(localStorage.getItem("usuario"))
    console.log(usuario)
  })
  let click = (e)=>{
    console.log(nav)
    if(nav=="none"){
      setNav("block")
    }else{
      setNav("none")
    }
   
  }
  return (
   
<nav class="navbar navbar-expand-lg navbar-dark  " style={{backgroundColor: "black"}}  >
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous"/>

  <div class="container-fluid ">
  {(usuario==null)?"":<img style={{width:"55px",height:"55px",left:"80px", marginRight:"1%",borderRadius:"200px"}} src={usuario} alt="" />} 

    <Link to={"/"} className='ni'> <a  class="navbar-brand sa" href="#">DRAWING.IO</a></Link>
    <button class="navbar-toggler quitar "  onClick={click}type="button"  data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span  class="navbar-toggler-icon"></span>
    </button>
     <div className="collapse navbar-collapse " style={{display:nav}} id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0 ">

      <Link className='ni' to={"lienzos"}> <li class="nav-item"><a  class="nav-link sa2 active " onClick={click}  href="#">Lienzos</a></li></Link> 
                <Link className='ni' to={"/"}> <li class="nav-item"><a  class="nav-link sa2 active" onClick={click} >Dibujar</a ></li> </Link>
                {(usuario==null)?"":      <Link className='ni' to={"/misDibujos"}> <li class="nav-item" ><a onClick={click} class="nav-link sa2 active" >Mis dibujos</a></li> </Link>}
                {(usuario==null)?"":      <Link className='ni' to={"/buscar"}> <li class="nav-item"><a onClick={click}  class="nav-link sa2 active">Buscar Personas</a></li> </Link>}
                {(usuario==null)?"":      <Link className='ni' to={"/misSolicitudes"}> <li class="nav-item"><a onClick={click}class="nav-link sa2 active" >Mis solicitudes</a></li> </Link>}
                {(usuario==null)?"":      <Link className='ni' to={"/amigos"}> <li class="nav-item"><a onClick={click} class="nav-link sa2 active" >Amigos</a></li> </Link>}


                {(usuario!=null)?"":  <Link className='ni' to={"register"}> <li class="nav-item"><a class="nav-link sa2 active" onClick={click} >Registrarce</a></li></Link> }
                {(usuario!=null)?"": <Link className='ni' to={"login"}> <li class="nav-item"><a class="nav-link sa2 active" onClick={click} >Login</a></li></Link> }
              {(usuario==null)?"":<Link className='ni'><li class="nav-item" onClick={()=>{
localStorage.clear();
location.replace("/login")
              }}><a class="nav-link active"  style={{color:"red"}}> sign out</a></li> </Link> }
    
      </ul>
     
    </div>
  
  </div>
</nav>
       
  )
}

export default Nav
