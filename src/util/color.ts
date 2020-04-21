let h = Math.random();
function randomColor() {
    h += 0.618033988749895;
    h %= 1;
    return HSVtoRGB(h, 0.6, 0.95);
}

function HSVtoRGB(h: number, s: number, v: number) {
    let r = 0, g = 0, b = 0, i = 0, f = 0, p = 0, q = 0, t = 0;
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return Math.round(r * 255) << 16 | Math.round(g * 255) << 8 | Math.round(b * 255);
}

export { randomColor, HSVtoRGB };
