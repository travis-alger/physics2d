import BaseObject from "../BaseObject";
import { Bodies } from 'matter-js';
import Two from 'two.js';

export default class Circle extends BaseObject {
    constructor(x: number, y: number,  radius: number, color: string, isStatic = false) {
        const physics = Bodies.circle(x, y, radius, { isStatic: isStatic });
        const drawing = new Two.Circle(x, y, radius);
        drawing.fill = color;
        super(drawing, physics);
    }
}