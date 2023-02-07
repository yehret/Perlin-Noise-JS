const canvas  = document.querySelector('canvas');
const context = canvas.getContext('2d');
const width   = canvas.width;
const height  = canvas.height;
const imgData = context.getImageData(0, 0, width, height);
const data    = imgData.data;
const simplex = new Simplex({distrib: 2, scale: .004, aplitude: 1, octaves: 8});

let t         = 0;

const sea    = [65, 105, 255];
const ground = [238, 214, 175];
const forest = [34, 139, 34];
const rocks  = [139, 137, 137];
const snow   = [255, 250, 250];

let color = []

function dot(x, y, r, g, b) {
    const offs = (y * width + x) * 4;
    data[offs + 0] = r;
    data[offs + 1] = g;
    data[offs + 2] = b;
    data[offs + 3] = 255;
}

// for(let y = 0; y < height; y++) {
//     for(let x = 0; x < width; x++) {
//         const z = simplex.noise(x * 0.01, y * 0.01);    -- FREQUENCY TEST
//         dot(x, y, z * 255, z * 255, z * 255);
//     }
// }
// context.putImageData(imgData, 0, 0);

function draw() {
    for(let y = 0; y < height; y++) {
        for(let x = 0; x < width; x++) {
            const z = simplex.noise(x, y, t);
            if (z < 0.2) {color = sea}
            else if(z >= 0.2 && z < 0.4) {color = ground}
            else if(z >= 0.4 && z < 0.6) {color = forest}
            else if(z >= 0.6 && z < 0.8) {color = rocks}
            else if(z >= 0.8 && z < 1) {color = snow}
            dot(x, y, color[0], color[1], color[2]);
        }
    }
    t += .01;
    context.putImageData(imgData, 0, 0);
}

setInterval(draw);

