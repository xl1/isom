import { Renderer } from "./Renderer.js";
import { MapLoader } from "./MapLoader.js";
import { Renderable, Collidable } from "./interfaces.js";
import { Player } from "./Player.js";
import { Collider } from "./Collider.js";

const canv = document.getElementById("main") as HTMLCanvasElement;
const ctx = canv.getContext("2d")!;
const heightMap = document.getElementById('heightMap') as HTMLTextAreaElement;
const colorMap = document.getElementById('colorMap') as HTMLTextAreaElement;

const renderer = new Renderer(ctx);
const mapLoader = new MapLoader();
const collider = new Collider();

const me = new Player(0xCC1111, 0x990000, { x: 2, y: 2, z: 10 });

document.querySelectorAll<HTMLButtonElement>('.dir').forEach(e => {
    const dir = +e.dataset.dir!;
    e.addEventListener('pointerdown', _ => me.move(dir, collider));
});

let objects: (Renderable & Collidable)[] = [];

function load() {
    objects = [...mapLoader.load(heightMap.value, colorMap.value)];
    collider.setAll(objects)
}

let t = Date.now();
function update() {
    const tt = Date.now();
    me.tick(tt - t, collider);
    t = tt;

    const renderables = objects.concat([me]).sort((a, b) =>
        a.position.x + a.position.y + a.position.z / 4 -
        b.position.x - b.position.y - b.position.z / 4
    );
    renderer.clear();
    for (const r of renderables) {
        r.render(renderer);
    }
    requestAnimationFrame(update);
}

heightMap.addEventListener('input', load, false);
colorMap.addEventListener('input', load, false);

load();
update();
