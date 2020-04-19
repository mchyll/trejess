import * as THREE from "three";

class Game {

    private readonly scene: THREE.Scene;
    private readonly camera: THREE.PerspectiveCamera;
    private actors: THREE.Object3D[];
    private light: THREE.Light;

    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        this.actors = [];

        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        this.addActor(cube);

        const color = 0xFFFFFF;
        const intensity = 1;
        this.light = new THREE.DirectionalLight(color, intensity);
        this.light.position.set(-1, 2, 4);
        this.addActor(this.light);

        this.camera.position.z = 5;
    }

    updateSize(width: number, height: number) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }

    mouseMoved(x: number, y: number) {
        this.light.position.x = x;
        this.light.position.y = y;
    }

    tick() {
        this.actors.forEach(obj => {
            obj.rotation.x += 0.01;
            obj.rotation.y += 0.01;
        });
    }

    addActor(obj: THREE.Object3D) {
        this.actors.push(obj);
        this.scene.add(obj);
    }

    getScene() {
        return this.scene;
    }

    getCamera() {
        return this.camera;
    }
}

export { Game };
