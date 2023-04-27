import {EntityComponent} from "../entity-component";
import {narrowWalkableEntityControl} from "../../entity-control/types/WalkableEntityControl";

export class WalkEntityComponent extends EntityComponent {

    create() {
        this.owner.getSprite().anims.create({
            key: 'walk',
            frames: this.owner.getSprite().anims.generateFrameNames('player', {
                prefix: 'robo_player_',
                start: 2,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1
        });
    }

    update(time: number, delta: number) {
        const sprite = this.owner.getSprite();
        const control = this.owner.getControl();
        if (narrowWalkableEntityControl(control)?.shallGoLeft()) {
            sprite.setVelocityX(-200);
            if (sprite.body.onFloor()) {
                sprite.play('walk', true);
            }
        } else if (narrowWalkableEntityControl(control)?.shallGoRight()) {
            sprite.setVelocityX(200);
            if (sprite.body.onFloor()) {
                sprite.play('walk', true);
            }
        } else {
            sprite.setVelocityX(0);
        }

        if (sprite.body.velocity.x > 0) {
            sprite.setFlipX(false);
        } else if (sprite.body.velocity.x < 0) {
            sprite.setFlipX(true);
        }
    }
}