import Phaser from "phaser";

export interface AnimationSettings {
    animation: (sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) => Phaser.Types.Animations.Animation;
}