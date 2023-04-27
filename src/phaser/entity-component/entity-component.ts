import {ColliderMember} from "../types/types";
import {BaseEntity} from "../entity/base-entity/base-entity";

export class EntityComponent {
    protected owner!: BaseEntity;

    init(owner: BaseEntity) {
        this.owner = owner;
    }

    preload() {};
    create() {};
    collide(collideWithThem: ColliderMember[]) {};
    update(time: number, delta: number) {};
}