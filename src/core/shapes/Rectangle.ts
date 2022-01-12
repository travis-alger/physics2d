import BaseObject from "../BaseObject";
import { Bodies } from 'matter-js';
import Two from 'two.js';

export default class Rectangle extends BaseObject {
    constructor(x: number, y: number,  width: number, height: number, color: string, isStatic = false) {
        const physics = Bodies.rectangle(x, y, width, height, { isStatic: isStatic });
        const drawing = new Two.Rectangle(x, y, width, height);
        drawing.fill = color;
        super(drawing, physics);
    }
}