import {EntityComponent} from "../entity-component";

export class IdleEntityComponent extends EntityComponent {
    create() {
        this.owner.getSprite().anims.create({
            key: 'idle',
            frames: [{ key: 'player', frame: 'robo_player_0' }],
            frameRate: 10,
        });
    }

    update(time: number, delta: number) {
        const sprite = this.owner.getSprite();
        if (sprite.body.onFloor() && sprite.body.velocity.x === 0) {
            sprite.play('idle', true);
        }
    }

}