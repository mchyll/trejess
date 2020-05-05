import { Game } from "./game";


// Wait for debugger to attach
window.setTimeout(() => {
    const game = new Game();

    game.updateSize(window.innerWidth, window.innerHeight);

    document.body.onresize = (ev: UIEvent) => game.updateSize(window.innerWidth, window.innerHeight);
    document.onkeydown = (ev: KeyboardEvent) => game.input.keyDown(ev);
    document.onkeyup = (ev: KeyboardEvent) => game.input.keyUp(ev);

    document.body.appendChild(game.renderer.domElement);

    const status = document.getElementById("status");

    function render() {
        window.requestAnimationFrame(render);
        game.tick();
        if (status) {
            const pos = game.camera.position;
            const rot = game.camera.rotation;
            status.innerHTML = `X: ${pos.x.toFixed(2)}, Y: ${pos.y.toFixed(2)}, Z: ${pos.z.toFixed(2)}<br>` +
                `Y rot: ${rot.y.toFixed(2)}`;
        }
    }

    render();

}, 1000);
