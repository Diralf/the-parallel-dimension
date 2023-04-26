import Phaser from 'phaser'
import PlatformerExampleScene from "./scenes/PlatformerExampleScene";


const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: 'phaser-container',
    backgroundColor: '#282c34',
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 640,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: true,
        },
    },
    scene: [PlatformerExampleScene],
}

export default new Phaser.Game(config)
