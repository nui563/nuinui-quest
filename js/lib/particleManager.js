class ParticleManager {
    pool = [];

    update = (cx, assets, zIndex) => {
        this.pool = this.pool.filter(particle => particle.life < particle.lifespan);
        this.pool.filter(particle => particle.zIndex === zIndex).forEach(particle => particle.update(cx, assets));
    }

    mini_explosion = pos => {
        this.pool.push(new Particle({
            type: `explosion`,
            pos: pos,
            size: new Vector2(18, 18),
            xOffset: p => p.size.x * Math.floor(p.life * 8 / p.lifespan),
            vel: new Vector2(0, 0),
            lifespan: 32,
            zIndex: 1
        }));
    }

    explosion = pos => {
        for (let i = 0; i < 16; i++) {
            this.pool.push(new Particle({
                type: `explosion`,
                pos: pos.plus(new Vector2(Math.round(Math.random() * 48 - 24), Math.round(Math.random() * 48 - 24))),
                size: new Vector2(18, 18),
                xOffset: p => p.size.x * Math.floor(p.life * 8 / p.lifespan),
                vel: new Vector2(0, 0),
                lifespan: 32,
                zIndex: 1,
                delay: i
            }));
        }
    }

    jump = actor => {
        this.pool.push(new Particle({
            type: `jump`,
            pos: actor.pos.plus(new Vector2(actor.size.x / 2, actor.size.y - 12)),
            size: new Vector2(16, 32),
            xOffset: p => p.size.x * Math.floor(p.life * 4 / p.lifespan),
            vel: new Vector2(0, 0),
            lifespan: 16,
            zIndex: 0
        }));
    }

    land = (actor, zIndex) => {
        this.pool.push(new Particle({
            type: `land`,
            pos: actor.pos.plus(new Vector2(actor.size.x / 2, actor.size.y - 3)),
            size: new Vector2(40, 16),
            xOffset: p => p.size.x * Math.floor(p.life * 6 / p.lifespan),
            vel: new Vector2(0, 0),
            lifespan: 24,
            zIndex: zIndex
        }));
    }

    run = actor => {
        const scale = [actor.dir ? 1 : -1, 1];
        this.pool.push(new Particle({
            type: `run`,
            pos: actor.pos.plus(new Vector2(actor.dir ? -8 : actor.size.x + 8, actor.size.y - 7)),
            size: new Vector2(24, 16),
            xOffset: p => p.size.x * Math.floor(p.life * 4 / p.lifespan),
            scale: p => scale,
            vel: new Vector2(0, 0),
            lifespan: 16,
            zIndex: 0
        }));
    }

    step = actor => {
        const scale = [actor.dir ? 1 : -1, 1];
        this.pool.push(new Particle({
            type: `step`,
            pos: actor.pos.plus(new Vector2(actor.dir ? -8 : actor.size.x + 8, actor.size.y - 3)),
            size: new Vector2(12, 12),
            xOffset: p => p.size.x * Math.floor(p.life * 4 / p.lifespan),
            scale: p => scale,
            vel: new Vector2(0, 0),
            lifespan: 16,
            zIndex: 0
        }));
    }
    
    water_trail = actor => {
        this.pool.push(new Particle({
            type: `water_trail`,
            pos: actor.pos.plus(new Vector2(actor.size.x / 2, actor.size.y - 16)),
            size: new Vector2(16, 32),
            xOffset: p => p.size.x * Math.floor(p.life * 8 / p.lifespan),
            vel: new Vector2(4, 0),
            lifespan: 24,
            zIndex: 1
        }));
    }

    smoke_white = (pos, vel, zIndex) => {
        this.pool.push(new Particle({
            type: `smoke_white`,
            pos: new Vector2(Math.round(pos.x) + Math.round(Math.random() * 10 - 5), Math.round(pos.y) + Math.round(Math.random() * 10 - 5)),
            size: new Vector2(8, 8),
            xOffset: p => p.size.x * Math.floor(p.life * 4 / p.lifespan),
            vel: vel,
            lifespan: 12 + Math.floor(Math.random() * 8),
            zIndex: zIndex
        }));
    }

    smoke_black = (pos, vel, zIndex) => {
        this.pool.push(new Particle({
            type: `smoke_black`,
            pos: new Vector2(Math.round(pos.x) + Math.round(Math.random() * 10 - 5), Math.round(pos.y) + Math.round(Math.random() * 10 - 5)),
            size: new Vector2(8, 8),
            xOffset: p => p.size.x * Math.floor(p.life * 4 / p.lifespan),
            vel: vel,
            lifespan: 12 + Math.floor(Math.random() * 8),
            zIndex: zIndex
        }));
    }

    smoke_spirit = (pos, vel, zIndex) => {
        this.pool.push(new Particle({
            type: `smoke_spirit`,
            pos: new Vector2(Math.round(pos.x) + Math.round(Math.random() * 10 - 5), Math.round(pos.y) + Math.round(Math.random() * 10 - 5)),
            size: new Vector2(8, 8),
            xOffset: p => p.size.x * Math.floor(p.life * 4 / p.lifespan),
            vel: vel,
            lifespan: 12 + Math.floor(Math.random() * 8),
            zIndex: zIndex
        }));
    }

    shine_white = (pos, zIndex) => {
        this.pool.push(new Particle({
            type: `shine_${Math.random() > .5 ? '' : '2_'}white`,
            pos: new Vector2(Math.round(pos.x) + Math.round(Math.random() * 20 - 10), Math.round(pos.y) + Math.round(Math.random() * 20 - 10)),
            size: new Vector2(10, 10),
            xOffset: p => p.size.x * Math.floor(p.life * 4 / p.lifespan),
            vel: new Vector2(0, 0),
            lifespan: 16,
            delay: Math.floor(Math.random() * 8),
            zIndex: zIndex
        }));
    }

    sparkle_white = pos => {
        const dir = (Math.random() > .5 ? 1 : -1) * Math.round(Math.random() * 3);
        this.pool.push(new Particle({
            type: `sparkle_white`,
            pos: pos,
            pos: new Vector2(Math.round(pos.x) + Math.round(Math.random() * 20 - 10), Math.round(pos.y) + Math.round(Math.random() * 20 - 10)),
            size: new Vector2(16, 16),
            xOffset: p => p.size.x * Math.floor(p.life * 6 / p.lifespan),
            vel: new Vector2(0, 0),
            lifespan: 24,
            zIndex: 1,
            rotate: p => Math.floor(p.life) * (Math.PI / 180) * dir,
        }));
    }

    sparkle_fire = (pos, vel) => {
        vel = !vel ? new Vector2(0, 0) : vel;
        const dir = (Math.random() > .5 ? 1 : -1) * Math.round(Math.random() * 3);
        this.pool.push(new Particle({
            type: `sparkle_fire`,
            pos: new Vector2(Math.round(pos.x) + Math.round(Math.random() * 20 - 10), Math.round(pos.y) + Math.round(Math.random() * 20 - 10)),
            size: new Vector2(16, 16),
            xOffset: p => p.size.x * Math.floor(p.life * 6 / p.lifespan),
            vel: vel,
            lifespan: 24,
            zIndex: 1,
            rotate: p => Math.floor(p.life) * (Math.PI / 180) * dir,
        }));
    }
    sparkle_fire_2 = (pos, zIndex) => {
        const dir = (Math.random() > .5 ? 1 : -1) * Math.round(Math.random() * 3);
        this.pool.push(new Particle({
            type: `sparkle_fire_2`,
            pos: new Vector2(Math.round(pos.x) + Math.round(Math.random() * 20 - 10), Math.round(pos.y) + Math.round(Math.random() * 20 - 10)),
            size: new Vector2(16, 16),
            xOffset: p => p.size.x * Math.floor(p.life * 6 / p.lifespan),
            vel: new Vector2(0, 0),
            lifespan: 24,
            zIndex: zIndex,
            rotate: p => Math.floor(p.life) * (Math.PI / 180) * dir,
        }));
    }
    sparkle_fire_3 = pos => {
        const dir = (Math.random() > .5 ? 1 : -1) * Math.round(Math.random() * 3);
        this.pool.push(new Particle({
            type: `sparkle_fire_3`,
            pos: new Vector2(Math.round(pos.x) + Math.round(Math.random() * 20 - 10), Math.round(pos.y) + Math.round(Math.random() * 20 - 10)),
            size: new Vector2(16, 16),
            xOffset: p => p.size.x * Math.floor(p.life * 6 / p.lifespan),
            vel: new Vector2(0, 0),
            lifespan: 24,
            zIndex: 1,
            rotate: p => Math.floor(p.life) * (Math.PI / 180) * dir,
        }));
    }
    sparkle_fire_4 = pos => {
        const dir = (Math.random() > .5 ? 1 : -1) * Math.round(Math.random() * 3);
        this.pool.push(new Particle({
            type: `sparkle_fire_4`,
            pos: new Vector2(Math.round(pos.x) + Math.round(Math.random() * 20 - 10), Math.round(pos.y) + Math.round(Math.random() * 20 - 10)),
            size: new Vector2(16, 16),
            xOffset: p => p.size.x * Math.floor(p.life * 6 / p.lifespan),
            vel: new Vector2(0, 0),
            lifespan: 24,
            zIndex: 1,
            rotate: p => Math.floor(p.life) * (Math.PI / 180) * dir,
        }));
    }
    
    shine_vel_white = (pos, vel, zIndex) => {
        this.pool.push(new Particle({
            type: `shine_${Math.random() > .5 ? '' : '2_'}white`,
            pos: new Vector2(Math.round(pos.x) + Math.round(Math.random() * 20 - 10), Math.round(pos.y) + Math.round(Math.random() * 20 - 10)),
            size: new Vector2(10, 10),
            xOffset: p => p.size.x * Math.floor(p.life * 4 / p.lifespan),
            vel: vel,
            lifespan: 16,
            delay: Math.floor(Math.random() * 8),
            zIndex: zIndex
        }));
    }

    impact = pos => {
        this.pool.push(new Particle({
            type: `impact`,
            pos: pos,
            size: new Vector2(32, 32),
            xOffset: p => p.size.x * Math.floor(p.life * 2 / p.lifespan),
            vel: new Vector2(0, 0),
            lifespan: 8,
            zIndex: 1
        }));
    }
    
    ray = pos => {
        for (let i = 0; i < 2; i++) {
            this.pool.push(new Particle({
                type: `ray_${Math.ceil(Math.random() * 4)}`,
                pos: pos,
                size: new Vector2(128, 128),
                vel: new Vector2(0, 0),
                lifespan: 2,
                zIndex: 1,
                delay: i * 4
            }));
        }
    }

    charge = pos => {
        const dir = (Math.random() > .5 ? 1 : -1) * Math.round(Math.random() * 3);
        const dist = 20 + Math.random() * 12;
        const a = Math.cos(Math.random() * 2 * Math.PI);
        const b = Math.sin(Math.random() * 2 * Math.PI);
        this.pool.push(new Particle({
            type: `sparkle_white`,
            pos: pos.plus(new Vector2(a * dist, b * dist)),
            size: new Vector2(16, 16),
            xOffset: p => p.size.x * Math.floor(p.life * 6 / p.lifespan),
            vel: new Vector2(-a, -b),
            lifespan: 24,
            zIndex: 1,
            rotate: p => Math.floor(p.life) * (Math.PI / 180) * dir,
        }));
    }
    
    charge_fire = pos => {
        const dir = (Math.random() > .5 ? 1 : -1) * Math.round(Math.random() * 3);
        const dist = 20 + Math.random() * 12;
        const a = Math.cos(Math.random() * 2 * Math.PI);
        const b = Math.sin(Math.random() * 2 * Math.PI);
        this.pool.push(new Particle({
            type: `sparkle_fire`,
            pos: pos.plus(new Vector2(a * dist, b * dist)),
            size: new Vector2(16, 16),
            xOffset: p => p.size.x * Math.floor(p.life * 6 / p.lifespan),
            vel: new Vector2(-a, -b),
            lifespan: 24,
            zIndex: 1,
            rotate: p => Math.floor(p.life) * (Math.PI / 180) * dir,
        }));
    }
    charge_fire_2 = pos => {
        const dir = (Math.random() > .5 ? 1 : -1) * Math.round(Math.random() * 3);
        const dist = 20 + Math.random() * 12;
        const a = Math.cos(Math.random() * 2 * Math.PI);
        const b = Math.sin(Math.random() * 2 * Math.PI);
        this.pool.push(new Particle({
            type: `sparkle_fire_2`,
            pos: pos.plus(new Vector2(a * dist, b * dist)),
            size: new Vector2(16, 16),
            xOffset: p => p.size.x * Math.floor(p.life * 6 / p.lifespan),
            vel: new Vector2(-a, -b),
            lifespan: 24,
            zIndex: 1,
            rotate: p => Math.floor(p.life) * (Math.PI / 180) * dir,
        }));
    }
    charge_fire_3 = pos => {
        const dir = (Math.random() > .5 ? 1 : -1) * Math.round(Math.random() * 3);
        const dist = 20 + Math.random() * 12;
        const a = Math.cos(Math.random() * 2 * Math.PI);
        const b = Math.sin(Math.random() * 2 * Math.PI);
        this.pool.push(new Particle({
            type: `sparkle_fire_3`,
            pos: pos.plus(new Vector2(a * dist, b * dist)),
            size: new Vector2(16, 16),
            xOffset: p => p.size.x * Math.floor(p.life * 6 / p.lifespan),
            vel: new Vector2(-a, -b),
            lifespan: 24,
            zIndex: 1,
            rotate: p => Math.floor(p.life) * (Math.PI / 180) * dir,
        }));
    }
    charge_fire_4 = pos => {
        const dir = (Math.random() > .5 ? 1 : -1) * Math.round(Math.random() * 3);
        const dist = 20 + Math.random() * 12;
        const a = Math.cos(Math.random() * 2 * Math.PI);
        const b = Math.sin(Math.random() * 2 * Math.PI);
        this.pool.push(new Particle({
            type: `sparkle_fire_4`,
            pos: pos.plus(new Vector2(a * dist, b * dist)),
            size: new Vector2(16, 16),
            xOffset: p => p.size.x * Math.floor(p.life * 6 / p.lifespan),
            vel: new Vector2(-a, -b),
            lifespan: 24,
            zIndex: 1,
            rotate: p => Math.floor(p.life) * (Math.PI / 180) * dir,
        }));
    }
}

class Particle {
    life = 0;

    constructor(data) {
        const {
            type,
            pos,
            size,
            offset,
            vel,
            lifespan,
            delay,
            rotate,
            scale,
            zIndex
        } = data;
        Object.assign(this, data);
    }

    update = (cx, assets) => {
        if (this.delay) this.delay--;
        else {
            cx.save();
            cx.translate(this.pos.x, this.pos.y);
            if (this.rotate) cx.rotate(this.rotate(this));
            if (this.scale) cx.scale(...this.scale(this));
            this.pos = this.pos.plus(this.vel);
            const xOffset = this.xOffset ? this.xOffset(this) : 0;
            cx.drawImage(assets.images[`vfx_${this.type}`], xOffset, 0, this.size.x, this.size.y, -this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
            cx.restore();
            this.life++;
        }
    }
}