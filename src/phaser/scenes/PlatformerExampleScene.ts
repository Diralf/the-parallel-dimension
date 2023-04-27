import Phaser from "phaser";
import {PlayerEntity} from "../entity/player-entity/player-entity";
import {SpikeEntity} from "../entity/spike-entity/spike-entity";
import {CustomScene} from "./custom-scene";

export default class PlatformerExampleScene extends Phaser.Scene implements CustomScene {
    private player: PlayerEntity;
    private spikes: SpikeEntity;
    map!: Phaser.Tilemaps.Tilemap;

    constructor() {
        super('PlatformerExampleScene');

        this.player = new PlayerEntity(this);
        this.spikes = new SpikeEntity(this);
    }
    preload() {
        this.load.image('background', 'assets/images/background.png');
        this.spikes.preload();
        this.player.preload();
        this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet.png');
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/level1.json');
    }

    create() {
        const backgroundImage = this.add.image(0, 0,'background').setOrigin(0, 0);
        backgroundImage.setScale(2, 0.8);

        this.map = this.make.tilemap({ key: 'map' });
        const tileset = this.map.addTilesetImage('kenney_simple_platformer', 'tiles');
        const platforms = this.map.createLayer('Platforms', tileset, 0, 200);
        platforms.setCollisionByExclusion([-1], true);

        this.player.create();
        this.spikes.create();

        this.player.collide({
            solid: [platforms],
            enemy: [this.spikes.getColliderMember()]
        });
    }

    update(time: number, delta: number) {
        super.update(time, delta);

        this.player.update(time, delta);
    }
}