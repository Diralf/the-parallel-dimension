import Phaser from "phaser";
import {WalkableEntityControl} from "../types/WalkableEntityControl";
import {JumpableEntityControl} from "../types/JumpableEntityControl";

export class KeyboardEntityControl implements WalkableEntityControl, JumpableEntityControl {
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private keys: Record<'up' | 'left' | 'right', Phaser.Input.Keyboard.Key>;

    constructor(scene: Phaser.Scene) {
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.keys = {
            up: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            left: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
        };
    }

    shallGoLeft(): boolean {
        return this.cursors.left.isDown || this.keys.left.isDown;
    }

    shallGoRight(): boolean {
        return this.cursors.right.isDown || this.keys.right.isDown;
    }

    shallJump(): boolean {
        return this.cursors.space.isDown || this.cursors.up.isDown || this.keys.up.isDown;
    }
}