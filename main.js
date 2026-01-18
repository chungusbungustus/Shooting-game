const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const pressedKeys = new Set();
document.addEventListener("keydown", (e) => pressedKeys.add(e.key));
document.addEventListener("keyup", (e) => pressedKeys.delete(e.key));

const isKeyPressed = (key) => {
    return pressedKeys.has(key);
};

let plrX = 0;
let plrY = 0;
let plrXvel = 0;
let plrYvel = 0;

let screenX = 0;
let screenY = 0;

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX - canvas.width / 2;
    mouseY = e.clientY - canvas.height / 2;
});

function drawCircle(x, y, size, color) {
    ctx.beginPath();
    ctx.arc(
        x - screenX + canvas.width / 2,
        y - screenY + canvas.height / 2,
        size,
        0,
        2 * Math.PI,
    );
    ctx.fillStyle = color;
    ctx.fill();
}

function drawRect(x, y, width, height, color) {
    let rectX = x - screenX - width / 2 + canvas.width / 2;
    let rectY = y - screenY - height / 2 + canvas.height / 2;

    ctx.fillStyle = color;
    ctx.fillRect(rectX, rectY, width, height);
}

function drawBackground() {
    const squareSize = 64;
    const spacing = 5;

    const magicthingy = squareSize + spacing;

    for (x = -10; x < 11; x++) {
        for (y = -10; y < 11; y++) {
            drawRect(
                Math.round((plrX + x * squareSize) / magicthingy) * magicthingy,
                Math.round((plrY + y * squareSize) / magicthingy) * magicthingy,
                squareSize,
                squareSize,
                "#172a4fae",
            );
        }
    }
}

function playerLogic() {
    drawCircle(plrX, plrY, canvas.width * 0.05, "rgb(255, 0 ,0)");

    plrXvel += isKeyPressed("d") - isKeyPressed("a");
    plrYvel += isKeyPressed("s") - isKeyPressed("w");

    plrXvel *= 0.9;
    plrYvel *= 0.9;

    plrX += plrXvel;
    plrY += plrYvel;

    screenX = plrXvel * 1.5 + plrX + mouseX / 50;
    screenY = plrYvel * 1.5 + plrY + mouseY / 50;
}

function update() {
    requestAnimationFrame(() => {
        ctx.fillStyle = "#1D3461";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawBackground();
        playerLogic();

        update();
    });
}

update();

/* Ideas/Todo
Biger gun take bigger inventory space
You only have 5 inventory slots for guns 
Smaller gun take smaller inventory space
*/
