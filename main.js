flag=""
objects=[]
function preload() {
    img=loadImage("https://i.postimg.cc/wjyZcbpH/a.png")
}
function setup() {
    canvas=createCanvas(380, 380)
    canvas.center()
    v1=createCapture(VIDEO)
    v1.size(380,380)
    v1.hide()
}
function model_loaded() {
    console.log("Model is loaded")
    flag=true
    objd.detect(v1, got_results)                     
}
function got_results(error, results) {
    if (error) {
        console.error(error)
    }
    else{
        console.log(results)
        objects=results
    }
}
function draw() {
    image(v1, 0,0, 380, 380)
    if (flag!="") {
        objd.detect(v1, got_results)      
        r=random(255)
        g=random(255)
        b=random(255)
       for (let index = 0; index < objects.length; index++) {
        console.log(objects[index].label)
        console.log(objects[index].width)
        console.log(objects[index].height)
        console.log(objects[index].x)
        console.log(objects[index].y)
        document.getElementById("no_objects").innerHTML="Number of Objects Detected "+objects.length;
        fill(r,g,b)
        percent=floor([objects[index].confidence*100])
        text(objects[index].label+" "+percent+"%", objects[index].x-40, objects[index].y+160)
        noFill()
        stroke(r,g,b)
        rect(objects[index].x-40, objects[index].y+160, objects[index].width , objects[index].height)
       } 
    }
}
function start() {
    objd=ml5.objectDetector("cocossd", model_loaded)
    document.getElementById("status").innerHTML="status: Detecting Objects"
}
