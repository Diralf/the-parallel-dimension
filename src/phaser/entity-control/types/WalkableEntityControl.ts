export interface WalkableEntityControl {
    shallGoLeft(): boolean;
    shallGoRight(): boolean;
}

export const isWalkableEntityControl = (control: Object | null): control is WalkableEntityControl => {
    return control !== null
        && 'shallGoLeft' in control
        && 'shallGoRight' in control;
}

export const narrowWalkableEntityControl = (control: Object | null): WalkableEntityControl | null => {
    return isWalkableEntityControl(control) ? control : null;
}