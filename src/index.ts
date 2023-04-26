import phaserGame from './phaser/PhaserGame';
import HelloWorldScene from './phaser/scenes/HelloWorldScene';

window.onload = () => {
    const scene = phaserGame.scene.keys.helloworld as HelloWorldScene;
    // scene.createEmitter()
};
