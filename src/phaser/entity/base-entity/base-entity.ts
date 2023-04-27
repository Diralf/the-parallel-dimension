import Phaser from "phaser";
import {SolidColliderMap, ColliderMember} from "../../types/types";
import {CustomScene} from "../../scenes/custom-scene";

export abstract class BaseEntity {
    protected sprite!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    protected control: Object | null = null;

    constructor(protected scene: Phaser.Scene & CustomScene) {
    }

    preload() {}

    create() {}

    collide(collideWithMap: SolidColliderMap) {
        collideWithMap.solid.forEach((collideWith) => {
            this.scene.physics.add.collider(this.sprite, collideWith);
        });
    }

    update(time: number, delta: number) {}

    getColliderMember(): ColliderMember {
        return this.getSprite();
    }

    getScene() {
        return this.scene;
    }

    getSprite() {
        if (!this.sprite) {
            throw Error('Sprite is not defined');
        }
        return this.sprite;
    }

    getControl() {
        return this.control;
    }
}