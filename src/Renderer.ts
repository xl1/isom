import { Position } from "./models.js";

const chipSize = 32;
const cos30 = Math.sqrt(3 / 4) * chipSize;
const sin30 = 0.5 * chipSize;
const zFactor = 0.25 * chipSize;

export class Renderer {
    private localOrigin: [number, number];

    constructor(private ctx: CanvasRenderingContext2D) {
        const { width, height } = ctx.canvas;
        this.localOrigin = [width / 2, height / 4];
    }

    clear() {
        const { width, height } = this.ctx.canvas;
        this.ctx.clearRect(0, 0, width, height);
    }

    polygon(color: number, p: Position, ...points: Position[]) {
        this.ctx.fillStyle = this.toColor(color);
        this.ctx.beginPath();
        this.ctx.moveTo(...this.toLocal(p));
        points.forEach(q => this.ctx.lineTo(...this.toLocal(q)));
        this.ctx.fill();
    }

    private toColor(col: number) {
        return `rgb(${col >>> 16}, ${col >>> 8 & 0xFF}, ${col & 0xFF})`; 
    }

    private toLocal(pos: Position): [number, number] {
        return [
            this.localOrigin[0] + (pos.x - pos.y) * cos30,
            this.localOrigin[1] + (pos.x + pos.y) * sin30 - pos.z * zFactor,
        ];
    }
}
