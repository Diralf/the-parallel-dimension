import {BaseEntity} from "../entity/base-entity/base-entity";
import {EntityComponent} from "./entity-component";
import {ColliderMember} from "../types/types";

type ComponentFactory = typeof EntityComponent | (() => EntityComponent);

const getComponentInstance = (factory: ComponentFactory) => {
    const ComponentClass = factory as typeof EntityComponent;
    const componentFactory = factory as () => EntityComponent;
    try {
        return new ComponentClass();
    } catch {
        return componentFactory();
    }
}

export const EntityComponentDecorator = (...componentFactories: ComponentFactory[]) => (
    BaseClass: typeof BaseEntity
) => {
    return class extends BaseClass {
        protected components: EntityComponent[];

        constructor(scene: Phaser.Scene) {
            super(scene);
            this.components = componentFactories.map((componentFactory) => {
                const component = getComponentInstance(componentFactory);
                component.init(this);
                return component;
            });
        }

        preload() {
            super.preload();
            this.components.forEach((component) => component.preload());
        }

        create() {
            super.create();
            this.components.forEach((component) => component.create());
        }

        collide(collideWithThem: ColliderMember[]) {
            super.collide(collideWithThem);
            this.components.forEach((component) => component.collide(collideWithThem));
        }

        update(time: number, delta: number) {
            super.update(time, delta);
            this.components.forEach((component) => component.update(time, delta));
        }
    }
}