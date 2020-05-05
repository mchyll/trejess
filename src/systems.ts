import { Component, System, ComponentMapper } from "./engine/ecs";
import * as THREE from "three";

class TransformComponent extends Component {
    constructor(public pos: THREE.Vector3) {
        super(TransformComponent);
    }
}

class RenderableComponent extends Component {
    constructor(public object: THREE.Object3D) {
        super(RenderableComponent);
    }
}

class RenderSystem extends System {
    private readonly renderable: ComponentMapper<RenderableComponent>;
    private readonly transform: ComponentMapper<TransformComponent>;

    constructor(private readonly renderer: THREE.Renderer, private readonly scene: THREE.Scene, private readonly camera: THREE.Camera) {
        super(RenderableComponent, TransformComponent);
        this.renderable = ComponentMapper.for(RenderableComponent);
        this.transform = ComponentMapper.for(TransformComponent);
    }

    process(): void {
        for (const entity of this.entities) {
            const component = this.transform.get(entity);
            console.log("Rendering %s with pos (%f, %f)", entity.id, component?.pos.x, component?.pos.y);
            if (component) {
                entity.removeComponent(component);
            }
        }
        // Renderables are already added to the scene, so the system don't really need to process the entities
        this.renderer.render(this.scene, this.camera);
    }
}

export { TransformComponent, RenderSystem };