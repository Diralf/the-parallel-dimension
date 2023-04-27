import {BaseEntity} from "../base-entity/base-entity";
import {KeyboardEntityControl} from "../../entity-control/keyboard-entity-control/keyboard-entity-control";
import {EntityComponentDecorator} from "../../entity-component/entity-component.decorator";
import {JumpEntityComponent} from "../../entity-component/jump-entity-component/jump-entity-component";
import {WalkEntityComponent} from "../../entity-component/walk-entity-component/walk-entity-component";
import {IdleEntityComponent} from "../../entity-component/idle-entity-component/idle-entity-component";

const Components = EntityComponentDecorator(
    IdleEntityComponent,
    WalkEntityComponent,
    () => new JumpEntityComponent({
        animation: { frames: [{ key: 'player', frame: 'robo_player_1' }]}
    }),
);
export class PlayerEntity extends Components(BaseEntity) {
    create() {
        super.create();

        this.control = new KeyboardEntityControl(this.scene);
    }
}