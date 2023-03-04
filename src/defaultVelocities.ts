export const defaultVelocities = [ // in m/s
    30,
    50,
    70,
    90,
    120
].map((velocityKmH) => velocityKmH / 3.6)

export const defaultMaxVelocity = 130 / 3.6; // The app will not register speeds above this value

export const defaultMinVelocity = 20 / 3.6; // The app will not register speeds below this value