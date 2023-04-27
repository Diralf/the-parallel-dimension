import {BaseEntity} from "../base-entity/base-entity";
import {KeyboardEntityControl} from "../../entity-control/keyboard-entity-control/keyboard-entity-control";
import {EntityComponentDecorator} from "../../entity-component/entity-component.decorator";
import {JumpEntityComponent} from "../../entity-component/jump-entity-component/jump-entity-component";
import {WalkEntityComponent} from "../../entity-component/walk-entity-component/walk-entity-component";
import {IdleEntityComponent} from "../../entity-component/idle-entity-component/idle-entity-component";
import {SpriteEntityComponent} from "../../entity-component/sprite-entity-component/sprite-entity-component";

const Components = EntityComponentDecorator(
    () => new SpriteEntityComponent({
        atlas: ['player', 'assets/images/kenney_player.png', 'assets/images/kenney_player_atlas.json'],
        sprite: [50, 300, 'player'],
    }),
    () => new IdleEntityComponent({
        animation: () => ({ frames: [{ key: 'player', frame: 'robo_player_0' }] }),
    }),
    () => new WalkEntityComponent({
        animation: (sprite) => ({
            frames: sprite.anims.generateFrameNames('player', {
                prefix: 'robo_player_',
                start: 2,
                end: 3,
            }),
        }),
    }),
    () => new JumpEntityComponent({
        animation: () => ({ frames: [{ key: 'player', frame: 'robo_player_1' }]}),
    }),
);
export class PlayerEntity extends Components(BaseEntity) {
    create() {
        super.create();
        this.sprite.setBounce(0.1);
        this.sprite.setCollideWorldBounds(true);

        this.control = new KeyboardEntityControl(this.scene);
    }
}