window.addEventListener("load", () => {
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");

    const strokes = [];
    let painting = false;

    function resizeCanvas() {
        const savedData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        canvas.width = window.innerWidth * 0.8;
        canvas.height = window.innerHeight * 0.8;
        ctx.putImageData(savedData, 0, 0);
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    function startPosition(e) {
        painting = true;
        strokes.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        draw(e);
    }

    function finishedPosition() {
        painting = false;
        ctx.beginPath();
    }

    function draw(e) {
        if (!painting) return;

        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (canvas.width / rect.width);
        const y = (e.clientY - rect.top) * (canvas.height / rect.height);

        ctx.lineWidth = 10;
        ctx.lineCap = 'round';
        ctx.strokeStyle = "blue";

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }

    function undo() {
        if (strokes.length > 0) {
            ctx.putImageData(strokes.pop(), 0, 0);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    function reset() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        strokes.length = 0;
    }

    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', finishedPosition);
    canvas.addEventListener('mousemove', draw);
    document.getElementById("undo").addEventListener("click", undo);
    document.getElementById("reset").addEventListener("click", reset);
});
