import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css'
function Lineas() {
    useEffect(()=>{
        localStorage.getItem("userName")
  
        localStorage.getItem("usuario")
    })
    const [image, setImage] = useState(null);

    let ctx ;
    let lienzo ;
    let x;
    let y;
    useEffect(()=>{
       lienzo=  document.querySelector('.nuestroCanvas');
         ctx = lienzo.getContext('2d');
         lienzo.addEventListener("mousedown",mouseDown)
         ctx.fillStyle = 'white';

         ctx.fillRect(0, 0, lienzo.width, lienzo.height);

       
    },[])

   const dibujar = (cursoX,cursoY)=>{
ctx.beginPath()
ctx.moveTo(x,y)
ctx.linewith=100;
ctx.strokeStyle="#000";

ctx.lineTo(cursoX,cursoY);
ctx.stroke()
x=cursoX
y=cursoY
   }

const mouseDown =(event)=>{
    x=event.offsetX;
    y=event.offsetY

    dibujar(x,y)
    lienzo.addEventListener("mousemove",mouseMoving)
    lienzo.addEventListener("mouseup",mouseUp)

}
const mouseUp=(event)=>{
lienzo.removeEventListener("mousemove",mouseMoving)
}
const mouseMoving =(event)=>{
dibujar(event.offsetX,event.offsetY)
}
   
       const handleImageChange = async (e) => {
       console.log(localStorage.getItem("userName"),"perra")
      let subir  =   await fetch("https://api-drawing.vercel.app/save", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body:  JSON.stringify({
                imagen:lienzo.toDataURL('image/png'),
                user:(localStorage.getItem("userName")==null)?"predeterminado":localStorage.getItem("userName")}),
           
          })
if(subir.ok==true){
    toast.success('Se ha guardado el dibujo', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
}else{
    toast.error('No se pudo guardar el dibujo', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
}
          console.log(subir)
      };
return(
    <div>
        <main className='contenedor'>
        <canvas className="nuestroCanvas" width="900px" height="500px"></canvas>
        </main>
        <button class="button-47"  onClick={handleImageChange} role="button">Guardar</button>

        <ToastContainer
position="top-right"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>


    </div>
)
}
export default Lineas 