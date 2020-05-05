let lol = [1, 2, 3, 4, 5, 6];

for (let l of lol) {
    console.log("\nIdx: %s, elem: %s, array: %s", lol.indexOf(l), l, lol.join(","));
    if (l === 3) {
        const pos = lol.indexOf(l);
        console.log("Removing from idx %s", pos);
        lol.splice(pos, 1);
    }
}

console.log("\n\n-----------\n")

lol = [1, 2, 3, 4, 5, 6];
for (let i = 0; i < lol.length; i++) {
    const l = lol[i];
    console.log("\nIdx: %s, elem: %s, array: %s", i, l, lol.join(","));
    if (l === 3) {
        const pos = lol.indexOf(l);
        console.log("Removing from idx %s", pos);
        lol.splice(pos, 1);
    }
}

console.log("\n\n-----------\n")

lol = [1, 2, 3, 4, 5, 6];
for (let i = lol.length - 1; i >= 0; --i) {
    const l = lol[i];
    console.log("\nIdx: %s, elem: %s, array: %s", i, l, lol.join(","));
    if (l === 3) {
        console.log("Removing from idx %s", i);
        lol.splice(i, 1);
    }
}
