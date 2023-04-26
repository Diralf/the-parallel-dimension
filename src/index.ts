import phaserGame from './phaser/PhaserGame';
import PlatformerExampleScene from "./phaser/scenes/PlatformerExampleScene";

window.onload = () => {
    const scene = phaserGame.scene.keys.PlatformerExampleScene as PlatformerExampleScene;
    console.log(scene);
    // scene.createEmitter()
};
