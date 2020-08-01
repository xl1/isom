import { Mapchip } from "./Mapchip.js";

const colors = [
    [0x33EE00, 0x996600],
    [0xEECC22, 0x996600],
    [0xBBBBBB, 0x888888],
];

export class MapLoader {
    *load(hMap: string, cMap: string): IterableIterator<Mapchip> {
        const hLines = hMap.split('\n');
        const cLines = cMap.split('\n');
        const width = Math.max(...hLines.map(e => e.length));
        const height = hLines.length;

        for (let x = 0; x < width; x++)
        for (let y = 0; y < height; y++) {
            const z = +hLines[y][x];
            const c = +cLines[y][x];
            if (!isNaN(z) && !isNaN(c)) {
                const [floorColor, wallColor] = colors[c] || colors[0];
                yield new Mapchip(floorColor, wallColor, { x, y, z });
            }
        }
    }
}
