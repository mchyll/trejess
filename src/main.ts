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

renderer.domElement.onmousemove = (ev: MouseEvent) => {
    game.mouseMoved(ev.x, ev.y);
};

document.body.appendChild(renderer.domElement);

function render() {
    window.requestAnimationFrame(render);
    game.tick();
    renderer.render(game.getScene(), game.getCamera());
}

render();
