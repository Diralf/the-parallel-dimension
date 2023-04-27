import {EntityComponent} from "../entity-component";
import {narrowJumpableEntityControl} from "../../entity-control/types/JumpableEntityControl";
import Phaser from "phaser";

interface Settings {
    animation: Phaser.Types.Animations.Animation;
}

export class JumpEntityComponent extends EntityComponent {
    private animation: Phaser.Types.Animations.Animation;

    constructor(settings: Settings) {
        super();
        this.animation = settings.animation;
    }

    create(): void {
        this.owner.getSprite().anims.create({
            key: 'jump',
            frameRate: 10,
            ...this.animation,
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