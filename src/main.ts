import * as THREE from "three";
import { Game } from "./game";


const game = new Game();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
game.updateSize(window.innerWidth, window.innerHeight);

document.body.onresize = (ev: UIEvent) => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    game.updateSize(window.innerWidth, window.innerHeight);
}

document.onkeydown = (ev: KeyboardEvent) => game.getInputAdapter().keyDown(ev);
document.onkeyup = (ev: KeyboardEvent) => game.getInputAdapter().keyUp(ev);

document.body.appendChild(renderer.domElement);

const status = document.getElementById("status");

function render() {
    window.requestAnimationFrame(render);
    game.tick();
    if (status) {
        const pos = game.getCamera().position;
        const rot = game.getCamera().rotation;
        status.innerHTML = `X: ${pos.x.toFixed(2)}, Y: ${pos.y.toFixed(2)}, Z: ${pos.z.toFixed(2)}<br>` +
            `Y rot: ${rot.y.toFixed(2)}`;
    }
    renderer.render(game.getScene(), game.getCamera());
}

render();
