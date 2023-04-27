import {BaseEntity} from "../base-entity/base-entity";
import {JumpableEntityControl, narrowJumpableEntityControl} from "../../entity-control/types/JumpableEntityControl";

export const JumpableEntityDecorator = (
    BaseClass: typeof BaseEntity
) => {
    return class extends BaseClass {
        protected control: JumpableEntityControl | null = null;
        update(time: number, delta: number) {
            super.update(time, delta);

            if (
                narrowJumpableEntityControl(this.control)?.shallJump()
                && this.sprite.body.onFloor()
            ) {
                this.sprite.setVelocityY(-350);
                this.sprite.play('jump', true);
            }
        }
    }
}