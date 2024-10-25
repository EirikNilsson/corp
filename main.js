window.addEventListener("load", () => {
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");



    canvas.height = 500;
    canvas.width = 600;

    // ctx.strokeStyle = "red";
    // ctx.lineWidth = 5;
    // ctx.strokeRect(50, 50, 200, 200);
    // ctx.strokeStyle = "green";
    // ctx.lineWidth = 20;
    // ctx.strokeRect(200, 200, 200, 200);
    // ctx.beginPath();
    // ctx.moveTo(100, 100);
    // ctx.lineTo(200, 100);
    // ctx.lineTo(200, 150);
    // ctx.closePath();
    // ctx.stroke();

    let painting = false;
    
    function startposition(e){
        painting = true;
        draw(e);
    }
    function finishedposition(){
        painting = false;
        ctx.beginPath();
    }

    function draw(e){
        if(!painting) return;
        ctx.lineWidth = 10;
        ctx.lineCap = 'round';
        ctx.strokeStyle = "blue"

        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);


    }
    function reset(){
        ctx.clearRect(0, 0,canvas.width, canvas.height);


    }

    canvas.addEventListener('mousedown', startposition);
    canvas.addEventListener('mouseup', finishedposition);
    canvas.addEventListener('mousemove', draw);
    document.getElementById("reset").addEventListener("click", reset);
    



});

