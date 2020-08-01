import { Renderer } from "./Renderer.js";
import { MapLoader } from "./MapLoader.js";
import { Renderable } from "./interfaces.js";

const canv = document.getElementById("main") as HTMLCanvasElement;
const ctx = canv.getContext("2d")!;
const heightMap = document.getElementById('heightMap') as HTMLTextAreaElement;
const colorMap = document.getElementById('colorMap') as HTMLTextAreaElement;

const renderer = new Renderer(ctx);
const mapLoader = new MapLoader();
let renderables: Renderable[] = [];

function load() {
    renderables = [...mapLoader.load(heightMap.value, colorMap.value)];
}

function update() {
    renderer.clear();
    for (const r of renderables) {
        r.render(renderer);
    }
}

heightMap.addEventListener('input', () => { load(); update(); }, false);
colorMap.addEventListener('input', () => { load(); update(); }, false);

load();
update();
