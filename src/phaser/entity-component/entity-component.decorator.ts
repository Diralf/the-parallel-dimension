import {BaseEntity} from "../entity/base-entity/base-entity";
import {EntityComponent} from "./entity-component";
import {SolidColliderMap} from "../types/types";
import {CustomScene} from "../scenes/custom-scene";

export const EntityComponentDecorator = (...componentFactories: (() => EntityComponent)[]) => (
    BaseClass: typeof BaseEntity
) => {
    return class extends BaseClass {
        protected components: EntityComponent[];

        constructor(scene: Phaser.Scene & CustomScene) {
            super(scene);
            this.components = componentFactories.map((componentFactory) => {
                const component = componentFactory();
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

        collide(collideWithMap: SolidColliderMap) {
            super.collide(collideWithMap);
            this.components.forEach((component) => component.collide(collideWithMap));
        }

        update(time: number, delta: number) {
            super.update(time, delta);
            this.components.forEach((component) => component.update(time, delta));
        }
    }
}