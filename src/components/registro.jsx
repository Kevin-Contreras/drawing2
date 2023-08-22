import { useState } from 'react'
import Button from '@mui/joy/Button';

import '../App.css'
import { redirect } from 'react-router-dom'

function Registro() {
  const [usuario, setUsuario] = useState("")
  const [nombre, setNombre] = useState("")
  const [contrasenia, setContrasenia] = useState("")
  const [avatar, setAvatar] = useState("")

 
function lista(e){
  console.log(e.target.value)
  if(e.target.name == "usuario"){
    setUsuario(document.querySelector("#usuario").value)
  }else if(e.target.name=="nombre"){
    setNombre(document.querySelector("#nombre").value)
  }else if(e.target.name=="avatar"){
    setAvatar(e.target.files[0])
    const reader = new FileReader();

    reader.onload = (e) => {
      const base64 = e.target.result;
      setAvatar(base64);
    };
    reader.readAsDataURL(e.target.files[0]);
  }else{
    setContrasenia(document.querySelector("#password").value)
  }
  
  
}


const formulario = async (event)=>{
  event.preventDefault()

  const registro = await fetch("https://api-drawing.vercel.app/registro",{
    method:"POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body:JSON.stringify( {
    avatar:avatar,
    nombre:nombre,
    pass:contrasenia,
    user:usuario
    }),
 
  })

  let datos = await registro.json();
  console.log(datos[0].avatar)
  localStorage.setItem("userName",datos[0].username)

  localStorage.setItem("usuario",datos[0].avatar)

  location.replace("/")
}
  return (
   
<div class="container">
    <br />
    <br />
    <h1 style={{textAlign:"center",color:"white"}} >Registro</h1>

    <div class="cardo">
    <form  onSubmit={formulario}   method="post">

      <label for="email">Usuario</label>
      <input id="usuario"  name="usuario" onChange={lista} type="text" value={usuario}  />
      <label for="pass">Nombre</label>
      <input id="nombre" name="nombre" type="text" onChange={lista} value={nombre}/>
      <label for="pass">Contraseña</label>
      <input id="password" name="password" type="password" onChange={lista} value={contrasenia} />
      <label for="pass">Avatar</label>
      <input id="avatars"  type="file" name="avatar" onChange={lista} accept="image/*"   />

      <Button type="submit" style={{left:"40%",top:"30px"}} color="neutral">REGISTRARSE</Button>   
      </form>
    </div>
    <div style={{display:"flex",justifyContent:"center"}}>
<img  src={"https://api-drawing.vercel.app/uploads/imagenes/5.gif"}></img>

</div>
       </div>
  )
}

export default Registro
