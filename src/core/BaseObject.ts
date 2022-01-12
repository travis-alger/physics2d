import { Body } from 'matter-js'

export default class BaseObject {
    drawing: any;
    physics: Body;
    constructor(drawingObject: any, physicsObject: Body) {
        this.drawing = drawingObject;
        this.physics = physicsObject;
    }

    update() {
        const x = this.physics.position.x;
        const y = this.physics.position.y;
        this.drawing.translation.x = x;
        this.drawing.translation.y = y;
        this.drawing.rotation = this.physics.angle;
    }

    applyForce(x: number, y: number) {
        Body.applyForce(this.physics, this.physics.position, { x: x, y: y });
    }

    setVelocity(x: number, y: number) {
        Body.setVelocity(this.physics, { x: x, y: y });
    }
}