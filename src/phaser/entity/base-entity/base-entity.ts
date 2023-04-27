import Phaser from "phaser";
import {ColliderMember} from "../../types/types";

export abstract class BaseEntity {
    protected sprite!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    protected control: Object | null = null;

    constructor(protected scene: Phaser.Scene) {
    }

    preload() {}

    create() {}

    collide(collideWithThem: ColliderMember[]) {
        collideWithThem.forEach((collideWith) => {
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

    addSprite(...args: Parameters<Phaser.Physics.Arcade.Factory['sprite']>) {
        this.sprite = this.scene.physics.add.sprite(...args);
    }

    getControl() {
        return this.control;
    }
}