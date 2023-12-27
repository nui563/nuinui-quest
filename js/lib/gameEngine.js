class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    value = () => new Vector2(this.x, this.y);
    plus = other => new Vector2(this.x + other.x, this.y + other.y);
    times = factor => new Vector2(this.x * factor, this.y * factor);
    mult = other => new Vector2(this.x * other.x, this.y * other.y);
    dot = other => this.x * other.x + this.y * other.y;
    equals = other => this.x === other.x && this.y === other.y;
    floor = () => new Vector2(Math.floor(this.x), Math.floor(this.y));
    round = () => new Vector2(Math.round(this.x), Math.round(this.y));
    lerp = (other, amt) => new Vector2((1 - amt) * this.x + amt * other.x, (1 - amt) * this.y + amt * other.y);
    distance = other => Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2);
    inBox = box => !(this.x < box.pos.x || box.pos.x + box.size.x < this.x || this.y < box.pos.y || box.pos.y + box.size.y < this.y);
}

class CollisionBox {}
CollisionBox.center = a => new Vector2(a.pos.x + a.size.x / 2, a.pos.y + a.size.y / 2);
CollisionBox.intersects = (a, b) => {
    return CollisionBox.intersectsInAxis(a, b, "x") && CollisionBox.intersectsInAxis(a, b, "y") ? {
        pos: new Vector2(Math.max(a.pos.x, b.pos.x), Math.max(a.pos.y, b.pos.y)),
        size: new Vector2(
            Math.round((Math.min(a.pos.x + a.size.x, b.pos.x + b.size.x) - Math.max(a.pos.x, b.pos.x)) * 100) / 100,
            Math.round((Math.min(a.pos.y + a.size.y, b.pos.y + b.size.y) - Math.max(a.pos.y, b.pos.y)) * 100) / 100
        )
    } : false;
}
CollisionBox.intersectsInAxis = (a, b, axis) => !(a.pos[axis] + a.size[axis] <= b.pos[axis] || a.pos[axis] >= b.pos[axis] + b.size[axis]);

CollisionBox.intersectingCollisionBoxes = (a, b) => {
    const arr = b.filter(c => CollisionBox.intersects(a, c));
    return arr.map(c => ({other:c, collision:CollisionBox.intersects(a, c)}));
}

CollisionBox.includedIn = (a, b) => CollisionBox.includedInAxis(a, b, "x") && CollisionBox.includedInAxis(a, b, "y");
CollisionBox.includedInAxis = (a, b, axis) => !(a.pos[axis] + a.size[axis] > b.pos[axis] + b.size[axis] || a.pos[axis] < b.pos[axis]);
CollisionBox.includingCollisionBoxes = (a, b) => b.filter(c => CollisionBox.includedIn(a, c));
CollisionBox.collidesWith = (a, b) => CollisionBox.collidesWithInAxis(a, b, "x") && CollisionBox.collidesWithInAxis(a, b, "y");
CollisionBox.collidesWithInAxis = (a, b, axis) => !(a.pos[axis] + a.size[axis] < b.pos[axis] || a.pos[axis] > b.pos[axis] + b.size[axis]);
CollisionBox.collidingCollisionBoxes = (a, b) => b.filter(c => CollisionBox.collidesWith(a, c));

const shortAngleDist = (a0, a1) => {
    const max = Math.PI * 2;
    const da = (a1 - a0) % max;
    return 2 * da % max - da;
}

const angleLerp = (a0, a1, t) => a0 + shortAngleDist(a0, a1) * t;

export { Vector2, CollisionBox, angleLerp };
