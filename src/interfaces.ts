import { Renderer } from "./Renderer.js";
import { Direction } from "./models.js";

export interface Renderable {
    render(r: Renderer): boolean
}

export interface Movable {
    move(direction: Direction): boolean
}
