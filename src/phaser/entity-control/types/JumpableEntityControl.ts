export interface JumpableEntityControl {
    shallJump(): boolean;
}

export const isJumpableEntityControl = (control: Object | null): control is JumpableEntityControl => {
    return control !== null && 'shallJump' in control;
}

export const narrowJumpableEntityControl = (control: Object | null): JumpableEntityControl | null => {
    return isJumpableEntityControl(control) ? control : null;
}