import {BaseEntity} from "../base-entity/base-entity";
import {KeyboardEntityControl} from "../../entity-control/keyboard-entity-control/keyboard-entity-control";
import {EntityComponentDecorator} from "../../entity-component/entity-component.decorator";
import {JumpEntityComponent} from "../../entity-component/jump-entity-component/jump-entity-component";
import {WalkEntityComponent} from "../../entity-component/walk-entity-component/walk-entity-component";
import {IdleEntityComponent} from "../../entity-component/idle-entity-component/idle-entity-component";
import {EnemyColliderMap, SolidColliderMap} from "../../types/types";
import Phaser from "phaser";

const Components = EntityComponentDecorator(
    IdleEntityComponent.factory({
        animation: () => ({ frames: [{ key: 'player', frame: 'walk0001' }] }),
    }),
    WalkEntityComponent.factory({
        animation: (sprite) => ({
            frames: sprite.anims.generateFrameNames('player', {
                prefix: 'dwalk',
                start: 0,
                end: 5,
            }),
        }),
    }),
    JumpEntityComponent.factory({
        animation: () => ({ frames: [{ key: 'player', frame: 'jump0001' }]}),
    })
);
export class PlayerEntity extends Components(BaseEntity) {
    preload() {
        super.preload();
        this.scene.load.atlas('player', 'assets/images/far_away.png', 'assets/images/far_away_atlas.json');
    }
    create() {
        this.sprite = this.scene.physics.add.sprite(50, 300, 'player');
        this.sprite.setBounce(0.1);
        this.sprite.setCollideWorldBounds(true);

        super.create();

        this.control = new KeyboardEntityControl(this.scene);
    }

    collide(collideWithMap: SolidColliderMap & EnemyColliderMap) {
        super.collide(collideWithMap);

        collideWithMap.enemy.forEach(enemy => {
            this.scene.physics.add.collider(
                this.getColliderMember(),
                enemy,
                this.playerHit as ArcadePhysicsCallback,
            );
        });
    }

    private playerHit = (player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody, spike: Phaser.Types.Physics.Arcade.GameObjectWithBody) => {
        player.setVelocity((spike.body.x - player.body.x) * 3, (player.body.y - spike.body.y) * 3);
        player.setAlpha(0);
        let tw = this.scene.tweens.add({
            targets: player,
            alpha: 1,
            duration: 100,
            ease: 'Linear',
            repeat: 5,
        });
    };
}