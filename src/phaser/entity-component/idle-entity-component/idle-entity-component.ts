import {EntityComponent} from "../entity-component";
import {AnimationSettings} from "../../types/component-settings";
export class IdleEntityComponent extends EntityComponent {

    constructor(private settings: AnimationSettings) {
        super();
    }
    create() {
        this.owner.getSprite().anims.create({
            key: 'idle',
            frameRate: 10,
            ...this.settings.animation(this.owner.getSprite()),
        });
    }

    update(time: number, delta: number) {
        const sprite = this.owner.getSprite();
        if (sprite.body.onFloor() && sprite.body.velocity.x === 0) {
            sprite.play('idle', true);
        }
    }

}