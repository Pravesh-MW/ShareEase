//generate circle with random radius


const Circle = (circle, x, y, r)=>{

    circle.style.width = `${r}px`;
    circle.style.height = `${r}px`;
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    
    
    return circle;
}

const Intersected = (x, y, r, x1, y1, r2)=>{
    const distance = Math.sqrt((x - x1) ** 2 + (y - y1) ** 2);
    if(r+r1 >= distance){
        return true;
    }
    return false;
}

const circle1 = document.createElement('div');
circle1.classList.add('circle');
const circle2 = document.createElement('div');
circle2.classList.add('circle');

let x1=0, y1=0, r1=0;
// document.body.appendChild(circle1);
// document.body.appendChild(circle2);
var count  = 0;
document.addEventListener('click', (e)=>{
    let x = e.clientX;
    let y = e.clientY;
    const r = Math.ceil(Math.random()*100);
    x = x-r/2;
    y = y-r/2;
    console.log("x ",x ,",y ", y, ", r ", r );
    if(count%2 == 0){
        Circle(circle1, x, y, r);
        x1 = x;
        y1 = y;
        r1 = r;
        if(count >1 ){
            document.body.removeChild(circle2);
            document.body.removeChild(circle1);
        }
        document.body.appendChild(circle1);
        Circle(circle2, x, y, 0);
        count++;
    }else if(count%2 == 1){
        Circle(circle2, x, y, r);
        console.log("Intersected ",Intersected(x, y, r, x1, y1 ,r1));
        document.body.appendChild(circle2);
        count++;
    }
    // console.log(circle1);
    // console.log(circle2);
})