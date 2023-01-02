let sharedconsts = {
    room: {
        tickRate: 20,
    },
    world: {
        accelGravity: 0.35*3*3,
        width: 800,
        height: 600,
    },
    player: {
        hitboxWidth: 32,
        hitboxHeight: 64,

        moveSpeedMax: 7*3,
        moveSpeedAccumulation: 0.875*3,
        moveSpeedFalloff: 1.4*3,

        jumpVelocity: -12.05*3,
    },
}
exports.sharedconsts = sharedconsts;