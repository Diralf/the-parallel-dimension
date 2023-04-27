export const CollisionType = {
    NO_ONE: 0,
    WORLD_SHAPE: 1 << 1,
    PLAYER: 1 << 2,
    ENEMY: 1 << 3,
    ALL: 0xFFFFFFFF,
}