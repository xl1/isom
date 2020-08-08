import { Renderer } from "./Renderer.js";
import { Direction, Position } from "./models.js";
import { Collider } from "./Collider.js";

export interface Renderable {
    render(r: Renderer): boolean
}

export interface Movable {
    move(direction: Direction, collider: Collider): boolean
}

export interface Tickable {
    tick(dt: number, collider: Collider): void
}

export interface Collidable {
    readonly position: Position;
}
