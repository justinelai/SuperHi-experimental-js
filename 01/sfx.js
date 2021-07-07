const cursor = document.querySelector("div.cursor");
const canvas = document.querySelector("canvas.in");
let isDrawing = false;
const growCursor = () => cursor.classList.add("active");
const shrinkCursor = () => cursor.classList.remove("active");
const moveCursor = (x, y) => {
  cursor.style.left = x + "px";
  cursor.style.top = y + "px";
};

const setupCanvas = (canvas) => {
  const { innerWidth: width, devicePixelRatio: dpi } = window;
  const height = document.querySelector("body").offsetHeight
  canvas.width = width * dpi;
  canvas.height = height * dpi;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  const context = canvas.getContext("2d");
  context.scale(dpi, dpi);
  context.fillStyle = "#FFF";
  context.strokeStyle = "#333";
  context.lineWidth = 80;
  context.lineCap = "round";
  context.lineJoin = "round";
};

const startDraw = (canvas, x, y) => {
  const context = canvas.getContext("2d");
  context.moveTo(x, y);
  context.beginPath();
};

const moveDraw = (canvas, x, y) => {
  const context = canvas.getContext("2d");
  if (isDrawing) {
    context.lineTo(x, y);
    context.stroke();
  }
};

setupCanvas(canvas);
document.addEventListener("mousedown", (e) => {
  startDraw(canvas, e.pageX, e.pageY);
  isDrawing = true;
  growCursor();
});
document.addEventListener("mouseup", () => {
  isDrawing = false;
  shrinkCursor();
});
document.addEventListener("mousemove", (e) => {
  moveDraw(canvas, e.pageX, e.pageY);
  moveCursor(e.pageX, e.pageY);
});
