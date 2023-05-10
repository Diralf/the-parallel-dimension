import {SolidColliderMap} from "../types/types";
import {BaseEntity} from "../entity/base-entity/base-entity";

export class EntityComponent {
    protected owner!: BaseEntity;

    init(owner: BaseEntity) {
        this.owner = owner;
    }

    preload() {};
    create() {};
    collide(collideWithMap: SolidColliderMap) {};
    update(time: number, delta: number) {};


    static factory<T extends EntityComponent, C extends { new (...args: ConstructorParameters<C>): T }>(this: C, ...args: ConstructorParameters<C>) {
        return () => new this(...args);
    }
}