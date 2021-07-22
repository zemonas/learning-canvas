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
canvas.addEventListener('mousemove',(e)=>{
    mouse.x = e.x;
    mouse.y = e.y;
    for (let i = 0 ; i < 3 ; i++){
        particleArray.push(new Particle());
    }
   // drawCircle();
})

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
        if (particleArray[i].size <= 0.3){
            particleArray.splice(i,1);
            console.log(particleArray.length);
            i--;
        }
    }
}


function animate(){
    //ctx.clearRect(0, 0, canvas.width,canvas.height)
    ctx.fillStyle = 'rgba(0,0,0 ,0.02)';
    ctx.fillRect(0,0, canvas.width,canvas.height);
    handleParticle();
    drawCircle();
    hue +=0.5;
    requestAnimationFrame(animate);
}
animate();
console.log(ctx);