import Phaser from "phaser";
import {ColliderMember} from "../../types/types";

export abstract class BaseEntity {
    protected sprite!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    protected control: Object | null = null;

    constructor(protected scene: Phaser.Scene) {
    }

    preload() {
        this.scene.load.atlas(
            'player',
            'assets/images/kenney_player.png',
            'assets/images/kenney_player_atlas.json',
        );
    }

    create() {
        this.sprite = this.scene.physics.add.sprite(50, 300, 'player');
        this.sprite.setBounce(0.1);
        this.sprite.setCollideWorldBounds(true);
    }

    collide(collideWithThem: ColliderMember[]) {
        collideWithThem.forEach((collideWith) => {
            this.scene.physics.add.collider(this.sprite, collideWith);
        });
    }

    update(time: number, delta: number) {

    }

    getColliderMember(): ColliderMember {
        return this.getSprite();
    }

    getSprite() {
        return this.sprite;
    }

    getControl() {
        return this.control;
    }
}