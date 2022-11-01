import { Component, System, ComponentMapper, Entity } from "./engine/ecs";
import * as THREE from "three";

class Object3DComponent extends Component {
    constructor(public object: THREE.Object3D) {
        super(Object3DComponent);
    }
}

class RenderSystem extends System {
    private readonly renderable: ComponentMapper<Object3DComponent>;
    private readonly entityObject3DMap: Map<Entity, THREE.Object3D>;
    private tick: number;

    constructor(private readonly renderer: THREE.Renderer, private readonly scene: THREE.Scene, private readonly camera: THREE.Camera) {
        super(Object3DComponent);
        this.renderable = ComponentMapper.for(Object3DComponent);
        this.entityObject3DMap = new Map;
        this.tick = 0;
    }

    process(): void {
        if (++this.tick > 60) this.tick = 0;

        for (const entity of this.entities) {
            const component = this.renderable.get(entity);
            if (!this.tick) {
                console.log("Rendering entity %s (%s) with pos (%f, %f)",
                    entity.id, component?.object.constructor.name, component?.object.position.x, component?.object.position.y);
            }
        }
        // Renderables are already added to the scene, so the system don't really need to process the entities
        this.renderer.render(this.scene, this.camera);
    }

    entityAdded(entity: Entity) {
        const obj = this.renderable.get(entity)?.object;
        if (obj) {
            this.entityObject3DMap.set(entity, obj);
            this.scene.add(obj);
        }
    }

    entityRemoved(entity: Entity) {
        const obj = this.entityObject3DMap.get(entity);
        console.log("Removing %s", obj?.constructor.name);
        if (obj) {
            this.entityObject3DMap.delete(entity);
            this.scene.remove(obj);
        }
    }
}

export { Object3DComponent, RenderSystem };