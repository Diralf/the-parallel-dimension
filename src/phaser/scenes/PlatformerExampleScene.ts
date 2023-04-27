import Phaser from "phaser";
import {PlayerEntity} from "../entity/player-entity/player-entity";

export default class PlatformerExampleScene extends Phaser.Scene {
    private player: PlayerEntity;
    private spikes!: Phaser.Physics.Arcade.Group;

    constructor() {
        super('PlatformerExampleScene');

        this.player = new PlayerEntity(this);
    }
    preload() {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('spike', 'assets/images/spike.png');
        // At last image must be loaded with its JSON
        this.player.preload();
        this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet.png');
        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/level1.json');
    }

    create() {
        const backgroundImage = this.add.image(0, 0,'background').setOrigin(0, 0);
        backgroundImage.setScale(2, 0.8);

        const map = this.make.tilemap({ key: 'map' });

        const tileset = map.addTilesetImage('kenney_simple_platformer', 'tiles');

        const platforms = map.createLayer('Platforms', tileset, 0, 200);

        platforms.setCollisionByExclusion([-1], true);

        this.player.create([platforms]);

        this.spikes = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('Spikes').objects.forEach((spike) => {
            const spikeSprite = this.spikes.create(spike.x, (spike?.y ?? 0) + 200 - (spike?.height ?? 0), 'spike').setOrigin(0);
            spikeSprite.body.setSize(spike.width, (spike?.height ?? 0) - 20).setOffset(0, 20);
        });

        this.physics.add.collider(this.player.getColliderMember(), this.spikes, this.playerHit as ArcadePhysicsCallback, undefined, this);
    }


    update(time: number, delta: number) {
        super.update(time, delta);

        this.player.update(time, delta);
    }

    private playerHit(player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody, spike: Phaser.Types.Physics.Arcade.GameObjectWithBody) {
        player.setVelocity(0, 0);
        player.setX(50);
        player.setY(300);
        player.play('idle', true);
        player.setAlpha(0);
        let tw = this.tweens.add({
            targets: player,
            alpha: 1,
            duration: 100,
            ease: 'Linear',
            repeat: 5,
        });
    }
}