import {SolidColliderMap, ColliderMember} from "../types/types";
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
}