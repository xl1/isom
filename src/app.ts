import { Renderer } from "./Renderer.js";
import { MapLoader } from "./MapLoader.js";
import { Renderable } from "./interfaces.js";

let renderer: Renderer;
const mapLoader = new MapLoader();
const objects = [...mapLoader.load()];
const renderables: Renderable[] = objects;

function update() {
    for (const r of renderables) {
        r.render(renderer);
    }
}

function init() {
    const canv = document.getElementById("main") as HTMLCanvasElement;
    const ctx = canv.getContext("2d")!;
    renderer = new Renderer(ctx);
    update();
}

init();
