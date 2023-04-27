import {EntityComponent} from "../entity-component";
import Phaser from "phaser";

interface Settings {
    atlas: Parameters<Phaser.Loader.LoaderPlugin['atlas']>;
    sprite: Parameters<Phaser.Physics.Arcade.Factory['sprite']>;
}
export class SpriteEntityComponent extends EntityComponent {

    constructor(private settings: Settings) {
        super();
    }

    preload() {
        this.owner.getScene().load.atlas(...this.settings.atlas);
    }

    create() {
        this.owner.addSprite(...this.settings.sprite);
    }
}