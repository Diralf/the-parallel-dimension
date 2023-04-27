import {EntityComponent} from "../entity-component";
import {narrowJumpableEntityControl} from "../../entity-control/types/JumpableEntityControl";
import {AnimationSettings} from "../../types/component-settings";

export class JumpEntityComponent extends EntityComponent {

    constructor(private settings: AnimationSettings) {
        super();
    }

    create(): void {
        this.owner.getSprite().anims.create({
            key: 'jump',
            frameRate: 10,
            ...this.settings.animation(this.owner.getSprite()),
        });
    }

    update(time: number, delta: number): void {
        const sprite = this.owner.getSprite();
        if (
            narrowJumpableEntityControl(this.owner.getControl())?.shallJump()
            && sprite.body.onFloor()
        ) {
            sprite.setVelocityY(-350);
            sprite.play('jump', true);
        }
    }
}