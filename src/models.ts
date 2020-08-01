export type Position = {
    x: number;
    y: number;
    z: number;
}

export enum Direction {
    /** ↖ X-- */ left = 1,
    /** ↗ Y-- */ up,
    /** ↘ X++ */ right,
    /** ↙ Y++ */ down,
}
