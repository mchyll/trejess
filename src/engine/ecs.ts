/**
 * A type for any class and anything newable.
 */
type ClassType<T> = {
    new(...args: any[]): T;
}

class Engine {
    private nextEntityId: number;
    private entities: Entity[];
    private systems: System[];

    constructor() {
        this.nextEntityId = 0;
        this.entities = [];
        this.systems = [];
    }

    createEntity(): Entity {
        const entity = new Entity(this, this.nextEntityId++);
        this.entities[entity.id] = entity;
        return entity;
    }

    removeEntity(entity: Entity): void {
        const entityIdx = this.entities.indexOf(entity);
        if (entityIdx >= 0) {
            this.entities.splice(entityIdx, 1);
        }
        for (const system of entity.systemMemberships) {
            const systemEntityIdx = system.entities.indexOf(entity);
            if (systemEntityIdx >= 0) {
                system.entities.splice(systemEntityIdx, 1);
            }
        }
    }

    entityComponentAdded(entity: Entity): void {
        for (const system of this.systems) {
            // Check if the entity has all the components needed to be added to a system
            if (system.componentTypeIds.every(c => entity.components[c] !== null)) {
                console.log("Adding entity %s to system %s", entity.id, system.constructor.name);
                system.entities.push(entity);
                entity.systemMemberships.push(system);
            }
        }
    }

    entityComponentRemoved(entity: Entity): void {
        for (let systemIdx = entity.systemMemberships.length - 1; systemIdx >= 0; --systemIdx) {
            const system = entity.systemMemberships[systemIdx];
            if (system.componentTypeIds.some(c => entity.components[c] === null)) {
                console.log("Removing entity %s from system %s", entity.id, system.constructor.name);
                const entityIdx = system.entities.indexOf(entity);
                if (entityIdx >= 0) {
                    system.entities.splice(entityIdx, 1);
                }
                entity.systemMemberships.splice(systemIdx, 1);
            }
        }
    }

    addSystem(system: System): void {
        this.systems.push(system);
    }

    tick(): void {
        for (const system of this.systems) {
            system.process();
        }
    }
}

class Entity {
    readonly components: (Component | null)[];
    readonly systemMemberships: System[];

    constructor(private engine: Engine, readonly id: number) {
        this.components = [];
        this.systemMemberships = [];
    }

    addComponent(component: Component): Entity {
        this.components[component.typeId] = component;
        this.engine.entityComponentAdded(this);
        return this;
    }

    removeComponent(component: Component): Entity {
        this.components[component.typeId] = null;
        this.engine.entityComponentRemoved(this);
        return this;
    }
}

abstract class Component {
    private static nextComponentId: number = 0;
    private static componentIdMap: Map<string, number> = new Map();

    readonly typeId: number;

    constructor(componentType: ClassType<Component>) {
        this.typeId = Component.getTypeIdFor(componentType);
    }

    static getTypeIdFor<T extends Component>(componentType: ClassType<T>): number {
        if (Component.componentIdMap.has(componentType.name)) {
            return Component.componentIdMap.get(componentType.name)!;
        }
        else {
            const id = Component.nextComponentId++;
            Component.componentIdMap.set(componentType.name, id);
            return id;
        }
    }
}

class ComponentMapper<T extends Component> {
    private constructor(readonly typeId: number) {
    }

    get(entitiy: Entity): T | null {
        return <T>entitiy.components[this.typeId] ?? null;
    }

    static for<C extends Component>(componentType: ClassType<C>): ComponentMapper<C> {
        return new ComponentMapper<C>(Component.getTypeIdFor(componentType));
    }
}

abstract class System {
    readonly componentTypeIds: number[];
    readonly entities: Entity[];

    constructor(...componentTypes: ClassType<Component>[]) {
        this.componentTypeIds = componentTypes.map(c => Component.getTypeIdFor(c));
        this.entities = [];
    }

    abstract process(): void;
}

export { Engine, Entity, Component, ComponentMapper, System };
