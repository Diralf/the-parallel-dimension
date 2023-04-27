import Phaser from "phaser";

export type ColliderMember = Parameters<Phaser.Physics.Arcade.Factory['collider']>[0];
export type SolidColliderMap = Record<'solid', ColliderMember[]>;
export type EnemyColliderMap = Record<'enemy', ColliderMember[]>;