import { Renderable, Movable, Tickable, Collidable } from "./interfaces.js";
import { Renderer } from "./Renderer.js";
import { Direction, Position } from "./models.js";
import { Collider } from "./Collider.js";

const iSpeed = 6; // 1 block 移動するのにかかる時間 (frame)

function next({ x, y, z }: Position, dir: Direction, d: number = 1): Position {
    switch (dir) {
        case Direction.up:    return { x, y: y - d, z };
        case Direction.down:  return { x, y: y + d, z };
        case Direction.left:  return { x: x - d, y, z };
        case Direction.right: return { x: x + d, y, z };
    }
}

export class Player implements Renderable, Movable, Tickable, Collidable {
    private direction: Direction = Direction.down;
    private moveCount = 0;
    private falling = false;

    constructor(private color1: number, private color2: number, public position: Position) {
    }

    tick(dt: number, collider: Collider) {
        // fall
        const { x, y, z } = this.position;
        if (!collider.detect(this, { x, y, z: z - 1 })) {
            this.position.z--;
            if (this.position.z < -50) this.position.z = 50;
        }

        // move
        if (this.moveCount > 0) {
            const pos = next(this.position, this.direction, this.moveCount / iSpeed);
            if (this.moveCount++ === iSpeed) {
                this.moveCount = 0;
                this.position = pos;
            }
        }
    }

    move(direction: Direction, collider: Collider): boolean {
        // moving
        if (this.moveCount > 0) return false;

        // collision
        this.direction = direction;
        if (collider.detect(this, next(this.position, direction))) return false;
        
        // OK
        this.moveCount = 1;
        return true;
    }

    render(r: Renderer): boolean {
        const { x, y, z } = next(this.position, this.direction, this.moveCount / iSpeed);
        const h = z + 3;
        switch (this.direction) {
            case Direction.left:
                r.polygon(this.color1, { x: x + 1, y, z: h }, { x: x + 1, y: y + 1, z: h }, { x, y: y + 0.5, z: h });
                r.polygon(this.color2, { x: x + 1, y, z }, { x: x + 1, y, z: h }, { x: x + 1, y: y + 1, z: h }, { x: x + 1, y: y + 1, z });
                r.polygon(this.color2, { x: x + 1, y: y + 1, z }, { x: x + 1, y: y + 1, z: h }, { x, y: y + 0.5, z: h }, { x, y: y + 0.5, z });
                break;
            case Direction.up:
                r.polygon(this.color1, { x, y: y + 1, z: h }, { x: x + 1, y: y + 1, z: h }, { x: x + 0.5, y, z: h });
                r.polygon(this.color2, { x, y: y + 1, z }, { x, y: y + 1, z: h }, { x: x + 1, y: y + 1, z: h }, { x: x + 1, y: y + 1, z });
                r.polygon(this.color2, { x: x + 1, y: y + 1, z }, { x: x + 1, y: y + 1, z: h }, { x: x + 0.5, y, z: h }, { x: x + 0.5, y, z });
                break;
            case Direction.right:
                r.polygon(this.color1, { x, y, z: h }, { x: x + 1, y: y + 0.5, z: h }, { x, y: y + 1, z: h });
                r.polygon(this.color2, { x, y: y + 1, z }, { x, y: y + 1, z: h }, { x: x + 1, y: y + 0.5, z: h }, { x: x + 1, y: y + 0.5, z });
                break;
            case Direction.down:
                r.polygon(this.color1, { x, y, z: h }, { x: x + 0.5, y: y + 1, z: h }, { x: x + 1, y, z: h });
                r.polygon(this.color2, { x: x + 1, y, z }, { x: x + 1, y, z: h }, { x: x + 0.5, y: y + 1, z: h }, { x: x + 0.5, y: y + 1, z });
                break;
        }
        return true;
    }
}
