window.addEventListener("load", () => {
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
    let selectedColor = "black";
    let brushSize = 10;
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

        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';
        ctx.strokeStyle = selectedColor;

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

    document.getElementById("tiny").addEventListener("click", () => {
        brushSize = 2;
    });
    
    document.getElementById("small").addEventListener("click", () => {
        brushSize = 7;
    });
    
    document.getElementById("large").addEventListener("click", () => {
        brushSize = 15;
    });
    
    document.getElementById("big").addEventListener("click", () => {
        brushSize = 30;
    });

    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', finishedPosition);
    canvas.addEventListener('mousemove', draw);
    document.getElementById("undo").addEventListener("click", undo);
    document.getElementById("reset").addEventListener("click", reset);
   
    const chartCanvas = document.getElementById('chartCanvas').getContext('2d');
    const data = {
        labels: ['Red', 'Orange', 'Yellow', 'Green', 'Cyan', 'Blue', 'Purple', 'Pink'],
        datasets: [{
            label: 'Color',
            data: [50, 50, 50, 50, 50, 50, 50, 50],
            backgroundColor: [
                'rgb(255,61,75)',
                'rgb(251,181,65)',
                'rgb(246,217,70)',
                'rgb(71,248,68)',
                'rgb(79,224,237)',
                'rgb(54,162,235)',
                'rgb(153,102,255)',
                'rgb(255,102,204)'
            ],
            hoverOffset: 10
        }]
    };

    const myChart = new Chart(chartCanvas, {
        type: 'doughnut',
        data: data,
        options: {
            onClick: (e, activeElements) => {
                if (activeElements.length > 0) {
                    const datasetIndex = activeElements[0].datasetIndex;
                    const index = activeElements[0].index;
                    selectedColor = data.datasets[datasetIndex].backgroundColor[index];
                }
            }
        }
    });
});
