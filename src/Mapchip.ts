import { Position } from "./models.js";
import { Renderable } from "./interfaces.js";
import { Renderer } from "./Renderer.js";

export class Mapchip implements Renderable {
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
        r.quad(
            this.floorColor,
            { x,        y,        z },
            { x: x + 1, y,        z },
            { x: x + 1, y: y + 1, z },
            { x,        y: y + 1, z }
        );
        r.quad(
            this.wallColor,
            { x: x + 1, y,        z },
            { x: x + 1, y,        z: z - 1 },
            { x: x + 1, y: y + 1, z: z - 1 },
            { x: x + 1, y: y + 1, z }
        );
        r.quad(
            this.wallColor,
            { x: x + 1, y: y + 1, z },
            { x: x + 1, y: y + 1, z: z - 1 },
            { x,        y: y + 1, z: z - 1 },
            { x,        y: y + 1, z }
        );
        return true;
    }
}
