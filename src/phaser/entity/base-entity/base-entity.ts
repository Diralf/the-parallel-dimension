import Phaser from "phaser";
import {KeyboardEntityControl} from "../../entity-control/keyboard-entity-control/keyboard-entity-control";
import {
    narrowWalkableEntityControl,
    WalkableEntityControl
} from "../../entity-control/types/WalkableEntityControl";
import {
    JumpableEntityControl,
    narrowJumpableEntityControl
} from "../../entity-control/types/JumpableEntityControl";

type ColliderMember = Parameters<Phaser.Physics.Arcade.Factory['collider']>[0];
type BaseEntityControl = WalkableEntityControl | JumpableEntityControl;
export class BaseEntity {
    protected sprite!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    protected control: BaseEntityControl | null = null;
    constructor(protected scene: Phaser.Scene) {
    }

    preload() {
        this.scene.load.atlas(
            'player',
            'assets/images/kenney_player.png',
            'assets/images/kenney_player_atlas.json',
        );
    }

    create(collideWithThem: ColliderMember[]) {
        this.sprite = this.scene.physics.add.sprite(50, 300, 'player');
        this.sprite.setBounce(0.1);
        this.sprite.setCollideWorldBounds(true);
        collideWithThem.forEach((collideWith) => {
            this.scene.physics.add.collider(this.sprite, collideWith);
        });

        this.sprite.anims.create({
            key: 'walk',
            frames: this.sprite.anims.generateFrameNames('player', {
                prefix: 'robo_player_',
                start: 2,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1
        });

        this.sprite.anims.create({
            key: 'idle',
            frames: [{ key: 'player', frame: 'robo_player_0' }],
            frameRate: 10,
        });

        this.sprite.anims.create({
            key: 'jump',
            frames: [{ key: 'player', frame: 'robo_player_1' }],
            frameRate: 10,
        });

        // this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.control = new KeyboardEntityControl(this.scene);
    }

    update(time: number, delta: number) {
        // Control the player with left or right keys
        if (narrowWalkableEntityControl(this.control)?.shallGoLeft()) {
            this.sprite.setVelocityX(-200);
            if (this.sprite.body.onFloor()) {
                this.sprite.play('walk', true);
            }
        } else if (narrowWalkableEntityControl(this.control)?.shallGoRight()) {
            this.sprite.setVelocityX(200);
            if (this.sprite.body.onFloor()) {
                this.sprite.play('walk', true);
            }
        } else {
            // If no keys are pressed, the player keeps still
            this.sprite.setVelocityX(0);
            // Only show the idle animation if the player is footed
            // If this is not included, the player would look idle while jumping
            if (this.sprite.body.onFloor()) {
                this.sprite.play('idle', true);
            }
        }

        if (
            narrowJumpableEntityControl(this.control)?.shallJump()
            && this.sprite.body.onFloor()
        ) {
            this.sprite.setVelocityY(-350);
            this.sprite.play('jump', true);
        }

        if (this.sprite.body.velocity.x > 0) {
            this.sprite.setFlipX(false);
        } else if (this.sprite.body.velocity.x < 0) {
            // otherwise, make them face the other side
            this.sprite.setFlipX(true);
        }
    }

    getColliderMember(): ColliderMember {
        return this.sprite;
    }
}