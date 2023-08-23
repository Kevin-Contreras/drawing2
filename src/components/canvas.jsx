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
        

         console.log(lienzo.parentNode.clientWidth)
            lienzo.width = 900;
            lienzo.height = 500;
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, lienzo.width, lienzo.height);
            lienzo.addEventListener("mousedown",mouseDown)
            lienzo.addEventListener("touchstart",mouseDown2)
      
      
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
   const dibujar2 = (cursoX,cursoY)=>{
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
const mouseDown2 =(event)=>{
    x=event.targetTouches[0].screenX;
    y=event.targetTouches[0].screenY;
    dibujar2(x,y)
    lienzo.addEventListener("touchmove",mouseMoving2)
    lienzo.addEventListener("touchend",mouseUp2)

}
const mouseUp=(event)=>{
lienzo.removeEventListener("mousemove",mouseMoving)
}
const mouseUp2=(event)=>{
    lienzo.removeEventListener("touchmove",mouseMoving2)
    }
const mouseMoving =(event)=>{
dibujar(event.offsetX,event.offsetY)
}
const mouseMoving2 =(event)=>{
    dibujar2(event.targetTouches[0].screenX,event.targetTouches[0].screenY)
    }
   
       const handleImageChange = async (e) => {
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
      };
return(
    <div>
        <main className='contenedor'>
        <canvas className="nuestroCanvas" ></canvas>
        </main>
        <div style={{display: "flex",justifyContent: "center"}}>
        <button class="button-47"  onClick={handleImageChange} role="button">Guardar</button>

        </div>

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