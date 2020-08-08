import { Position } from './models.js'
import { Collidable } from "./interfaces.js";

export class Collider {
    private objects: Collidable[] = [];
    
    add(obj: Collidable) {
        this.objects.push(obj);
    }

    setAll(objects: Collidable[]) {
        this.objects = objects;
    }

    detect(obj: Collidable, { x, y, z }: Position) {
        for (const o of this.objects) {
            if (o !== obj &&
                o.position.x === x &&
                o.position.y === y &&
                o.position.z > z &&
                o.position.z < z + 4) return o;
        }
    }
}
