import {EntityComponentDecorator} from "../../entity-component/entity-component.decorator";
import {BaseEntity} from "../base-entity/base-entity";

const Components = EntityComponentDecorator();
export class SpikeEntity extends Components(BaseEntity) {
    private group!: Phaser.Physics.Arcade.Group;

    preload() {
        super.preload();
        this.scene.load.image('spike', 'assets/images/spike.png');
    }

    create() {
        super.create();

        this.group = this.scene.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        this.scene.map.getObjectLayer('Spikes').objects.forEach((spike) => {
            const spikeSprite = this.group.create(spike.x, (spike?.y ?? 0) + 200 - (spike?.height ?? 0), 'spike').setOrigin(0);
            spikeSprite.body.setSize(spike.width, (spike?.height ?? 0) - 20).setOffset(0, 20);
        });
    }

    getColliderMember() {
        return this.group;
    }
}