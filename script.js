const canvas = document.getElementById("cn-1");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const particleArray = [];
let hue =0;
window.addEventListener("resize", function () {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    
})
const mouse = {
    x:undefined,
    y:undefined,
}
canvas.addEventListener('click', (e)=>{
    mouse.x = e.x;
    mouse.y = e.y;
    for (let i= 0 ; i < 10 ; i++){
        particleArray.push(new Particle());
    }
    
    //drawCircle();
});
canvas.addEventListener('mousemove', (e)=>{
    mouse.x = e.x;
    mouse.y = e.y;
    for (let i = 0 ; i < 3 ; i++){
        particleArray.push(new Particle());
    }
   // drawCircle();
})
canvas.addEventListener('touchmove', (e)=>{
    e.preventDefault();
    var touch = e.touches[0]
    console.log();
    mouse.x = touch.pageX;
    mouse.y = touch.pageY;
    for (let i = 0 ; i < 3 ; i++){
        particleArray.push(new Particle());
    }
   // drawCircle();
},false)

function drawCircle(){
    ctx.lineWidth = 5;
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.arc(mouse.x,mouse.y,20,0,Math.PI*2)
    ctx.stroke();
}
class Particle{
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random()*15+1;
        this.speedX = Math.random()*3 -1.5;
        this.speedY = Math.random()*3 -1.5;
        this.color = 'hsl('+hue+',100% , 50%';
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.size >0.2) {
            this.size -= 0.1;
        }
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2)
        ctx.fill();
    }
}

//function init(){
//    for(let i = 0;i<100;i++){
//        particleArray.push(new Particle());
//    }
//}
//init()

function handleParticle(){
    for(let i = 0;i< particleArray.length;i++){
        particleArray[i].update();
        particleArray[i].draw();
        
        for (let j = i; j < particleArray.length; j++){
            const dx = particleArray[i].x - particleArray[j].x;  
            const dy = particleArray[i].y - particleArray[j].y;
            const dist = Math.sqrt(dx *dx + dy *dy )
            if (dist < 50){
                ctx.beginPath();
                ctx.lineWidth = particleArray[i].size /5;
                ctx.strokeStyle = particleArray[i].color;
                ctx.moveTo(particleArray[i].x , particleArray[i].y);
                ctx.lineTo(particleArray[j].x , particleArray[j].y);
                ctx.stroke();
            }
        }
        if (particleArray[i].size <= 0.3){
            particleArray.splice(i,1);
            i--;
        }
    }
}


function animate(){
    //ctx.clearRect(0, 0, canvas.width,canvas.height)
    ctx.fillStyle = 'rgba(0,0,0 ,0.02)';
    ctx.fillRect(0,0, canvas.width,canvas.height);
    handleParticle();
    //drawCircle();
    hue +=0.5;
    requestAnimationFrame(animate);
}
animate();

/*gui
gui = new dat.GUI( { autoPlace: false } )
gui.add( opt, 'total' ).name( 'Total Orbitals' ).listen();
gui.add( opt, 'speed' ).min( -300 ).max( 300 ).step( 1 ).name( 'Speed' );
gui.add( opt, 'scale' ).min( 0.5 ).max( 5 ).step( 0.001 ).name( 'Scale' );
gui.add( opt, 'jitterRadius' ).min( 0 ).max( 5 ).step( 0.001 ).name( 'Radius Jitter' );
gui.add( opt, 'jitterHue' ).min( 0 ).max( 90 ).step( 1 ).name( 'Hue Jitter' );
gui.add( opt, 'clearAlpha' ).min( 0 ).max( 100 ).step( 1 ).name( 'Clear Alpha' );
gui.add( opt, 'toggleOrbitals' ).name( 'Toggle Orbitals' )
gui.add( opt, 'orbitalAlpha' ).min( 0 ).max( 100 ).step( 1 ).name( 'Orbital Alpha' );
gui.add( opt, 'toggleLight' ).name( 'Toggle Light' );
gui.add( opt, 'lightAlpha' ).min( 0 ).max( 100 ).step( 1 ).name( 'Light Alpha' );

gui.add( opt, 'clear' ).name( 'Clear' );
customContainer = document.getElementById( 'gui' );
customContainer.appendChild(gui.domElement);
  
document.onselectstart = function(){
  return false;
};*/