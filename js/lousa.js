const color = document.querySelector('input');
const screen = document.querySelector('canvas');
const undoButton = document.querySelector('#undo');
const redoButton = document.querySelector('#redo');
const clearButton = document.querySelector('#clear');

let defaultColor = 'black';
let canDraw = false;
let mouseX = 0;
let mouseY = 0;
let lastX = 0;
let lastY = 0;
let drawing = [];
let redoStack = [];
let ctx = screen.getContext('2d');

color.onchange = () => defaultColor = color.value;

screen.addEventListener('mousedown', mouseDownEvent);
screen.addEventListener('mousemove', mouseMoveEvent);
screen.addEventListener('mouseup', mouseUpEvent);

undoButton.addEventListener('click', undo);
redoButton.addEventListener('click', redo);
clearButton.addEventListener('click', clearBoard);

function mouseDownEvent(e) {
    canDraw = true;
    mouseX = e.pageX - screen.offsetLeft;
    mouseY = e.pageY - screen.offsetTop;
    ctx.beginPath();
    ctx.strokeStyle = defaultColor;
    ctx.lineWidth = 5;
    ctx.lineJoin = 'round';
    ctx.moveTo(mouseX, mouseY);
    drawing.push([]);
    redoStack = [];
}

function mouseMoveEvent(e) {
    if (canDraw) {
        const x = e.pageX - screen.offsetLeft;
        const y = e.pageY - screen.offsetTop;
        ctx.lineTo(x, y);
        ctx.stroke();
        drawing[drawing.length - 1].push({ x, y });
    }
}

function mouseUpEvent() {
    canDraw = false;
}

function undo() {
    if (drawing.length > 0) {
        redoStack.push(drawing.pop());
        clearBoard();
        redraw();
    }
}

function redo() {
    if (redoStack.length > 0) {
        drawing.push(redoStack.pop());
        redraw();
    }
}

function clearBoard() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function redraw() {
    clearBoard();
    drawing.forEach(path => {
        ctx.beginPath();
        ctx.strokeStyle = defaultColor;
        ctx.lineWidth = 5;
        ctx.lineJoin = 'round';
        ctx.moveTo(path[0].x, path[0].y);
        path.forEach(point => ctx.lineTo(point.x, point.y));
        ctx.stroke();
    });
}
