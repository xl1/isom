import { Position } from "./models.js";
import { Renderable, Collidable } from "./interfaces.js";
import { Renderer } from "./Renderer.js";

export class Mapchip implements Renderable, Collidable {
    constructor(private floorColor: number, private wallColor: number, public position: Position) {
    }

    render(r: Renderer): boolean {
        /*
         　_
         ／ ＼← ここ
        |＼_／|
        |　|　|← ここ
         ＼|／
         ↑ここ の 3 箇所の四角形を描く
        */
        const { x, y, z } = this.position;
        r.polygon(
            this.floorColor,
            { x,        y,        z },
            { x: x + 1, y,        z },
            { x: x + 1, y: y + 1, z },
            { x,        y: y + 1, z }
        );
        r.polygon(
            this.wallColor,
            { x: x + 1, y,        z },
            { x: x + 1, y,        z: z - 4 },
            { x: x + 1, y: y + 1, z: z - 4 },
            { x: x + 1, y: y + 1, z }
        );
        r.polygon(
            this.wallColor,
            { x: x + 1, y: y + 1, z },
            { x: x + 1, y: y + 1, z: z - 4 },
            { x,        y: y + 1, z: z - 4 },
            { x,        y: y + 1, z }
        );
        return true;
    }
}
