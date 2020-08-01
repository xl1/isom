import { Mapchip } from "./Mapchip.js";

const width = 5, length = 5, hMap = `
_555_
44444
33333
22222
_111_
`.trim();

export class MapLoader {
    *load(): IterableIterator<Mapchip> {
        for (let x = 0; x < width; x++)
        for (let y = 0; y < length; y++) {
            const z = +hMap[x + y * (width + 1)];
            if (!isNaN(z)) {
                yield new Mapchip(0x33EE00, 0x668800, { x, y, z });
            }
        }
    }
}
