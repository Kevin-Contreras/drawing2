import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css'
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';

function Login() {

  const [usuarioLogin, setUsuarioLogin] = useState("")
  const [contraseniaLogin, setContraseniaLogin] = useState("")
let enviar = async(e)=>{
  e.preventDefault()
  const formData = new FormData();
  formData.append('user',usuarioLogin)
  formData.append('pass',contraseniaLogin)
let login = await fetch("https://api-drawing.vercel.app/logins",{
  method:"POST",
  headers: {
    'Content-Type': 'application/json',
  },
body:  JSON.stringify({
  "pass":contraseniaLogin,
  "user":usuarioLogin
}),

})
let respuesta = await login.json()
console.log(respuesta)
if(respuesta.err==null){
  toast.success('Bienvenido.', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });
  localStorage.setItem("userName",respuesta[0].username)
  
  localStorage.setItem("usuario",respuesta[0].avatar)
  
  location.replace("/")
}else{
  toast.error('el usuario o la contraseña no existen.', {
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




  return (
   
<div class="container">

    <br />
    <br />
    <h1 style={{textAlign:"center",color:"white"}} >LOGIN</h1>
    <form method='post'  onSubmit={enviar}>
      <label for="email" style={{color:"white"}}>Usuario</label>
      <Input
  disabled={false}
  placeholder=""
  size="md"
  variant="plain"
  name='user'
  id='user'
  color="info" 
  onChange={(e)=>setUsuarioLogin(e.target.value)}
/>
   
      <label for="pass" style={{color:"white"}}>Contraseña</label>
      <Input
  disabled={false}
  placeholder=""
  size="md"
  type='password'
  variant="plain"
  name='pass'
  id='pss'
  color="info" 
  onChange={(e)=>setContraseniaLogin(e.target.value)}
/>
<Button type="submit" style={{left:"40%",top:"30px"}} color="neutral">INICIAR SESION</Button>   
 </form>
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
<div style={{display:"flex",justifyContent:"center"}}>
<img  src={"https://api-drawing.vercel.app/uploads/imagenes/5.gif"}></img>

</div>
       </div>
  )
}

export default Login