import * as THREE from "three";
import { randomColor } from "./util/color";

const quartPi = Math.PI * 0.5;

class InputAdapter {
    w = false;
    a = false;
    s = false;
    d = false;
    space = false;
    ctrl = false;
    left = false;
    right = false;
    up = false;
    down = false;

    keyDown(event: KeyboardEvent) {
        this.setKey(event.code, true);
    }

    keyUp(event: KeyboardEvent) {
        console.log("KeyUp: %s", event.code);
        this.setKey(event.code, false);
    }

    private setKey(code: string, value: boolean) {
        switch (code) {
            case "KeyW":
                this.w = value;
                break;
            case "KeyA":
                this.a = value;
                break;
            case "KeyS":
                this.s = value;
                break;
            case "KeyD":
                this.d = value;
                break;
            case "Space":
                this.space = value;
                break;
            case "ControlLeft":
                this.ctrl = value;
                break;
            case "ArrowUp":
                this.up = value;
                break;
            case "ArrowDown":
                this.down = value;
                break;
            case "ArrowLeft":
                this.left = value;
                break;
            case "ArrowRight":
                this.right = value;
                break;
        }
    }
}

class Game {

    private readonly scene: THREE.Scene;
    private readonly camera: THREE.PerspectiveCamera;
    private actors: THREE.Object3D[];
    private light: THREE.Light;
    private input: InputAdapter;

    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        this.actors = [];
        this.input = new InputAdapter();

        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        // this.addActor(cube);

        this.light = new THREE.PointLight(0xFFFFFF, 1);
        this.light.position.set(-1, 2, 4);
        this.scene.add(this.light);

        for (let i = -10; i < 10; ++i) {
            this.addActor(new Wall(-2, 0, i).object);
            this.addActor(new Wall(2, 0, i).object);
        }
        const ax = new THREE.AxesHelper(0.1);
        ax.position.y = -0.5;
        ax.position.z = -5;
        this.addActor(ax);

        this.camera.position.z = 0;
    }

    updateSize(width: number, height: number) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }

    mouseMoved(x: number, y: number) {
        // this.light.position.x = x;
        // this.light.position.y = y;
    }

    tick() {
        this.handleInput();
        this.light.position.set(this.camera.position.x, this.camera.position.y, this.camera.position.z);
        // this.actors.forEach(obj => {
        //     obj.rotation.x += 0.01;
        //     obj.rotation.y += 0.01;
        // });
        // this.camera.position.x += 0.01;
        // this.camera.position.z -= 0.01;
        // if (Math.abs(this.camera.position.z) > 5) {
        //     this.camera.position.z = 5;
        // }
        // this.camera.rotateY(0.001);
        // this.camera.rotateY(0.002);
        // this.actors.forEach(a => {
        //     a.position.z += 0.01;
        //     if (a.position.z > 10) {
        //         a.position.z = -10;
        //     }
        // });
    }

    private handleInput() {
        const mPerTick = 0.05;
        const rotPerTick = 0.01;
        const yCos = Math.cos(this.camera.rotation.y + quartPi);
        const ySin = Math.sin(this.camera.rotation.y + quartPi);
        if (this.input.w) {
            this.camera.position.z -= mPerTick * ySin;
            this.camera.position.x += mPerTick * yCos;
        }
        if (this.input.s) {
            this.camera.position.z += mPerTick * ySin;
            this.camera.position.x -= mPerTick * yCos;
        }
        if (this.input.a) {
            this.camera.position.x -= mPerTick * ySin;
            this.camera.position.z += mPerTick * yCos;
        }
        if (this.input.d) {
            this.camera.position.x += mPerTick * ySin;
            this.camera.position.z -= mPerTick * yCos;
        }
        if (this.input.ctrl) {
            this.camera.position.y -= mPerTick;
        }
        if (this.input.space) {
            this.camera.position.y += mPerTick;
        }
        if (this.input.left) {
            this.camera.rotateY(rotPerTick);
        }
        if (this.input.right) {
            this.camera.rotateY(-rotPerTick);
        }
        if (this.input.up) {
            // this.camera.rotateX(rotPerTick);
        }
        if (this.input.down) {
            // this.camera.rotateX(-rotPerTick);
        }
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

    getInputAdapter() {
        return this.input;
    }
}

interface Renderable {
    readonly object: THREE.Object3D;
    x: number;
    y: number;
    z: number;
}

class Wall implements Renderable {
    readonly object: THREE.Object3D;
    x: number;
    y: number;
    z: number;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;

        const geometry = new THREE.PlaneGeometry(2, 1);
        const material = new THREE.MeshPhongMaterial({ color: randomColor(), side: THREE.DoubleSide });
        this.object = new THREE.Mesh(geometry, material);
        this.object.position.set(x, y, z);
    }
}

export { Game };
