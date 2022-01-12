import { Engine, Runner, Bodies, Composite } from 'matter-js'
import Two from "two.js";
import Size from "../models/Size";
import Circle from "./shapes/Circle";
import BaseObject from "./BaseObject";
import Rectangle from "./shapes/Rectangle";
import Vector from "../models/Vector";

export default class World {
    readonly engine: Engine;
    readonly runner: Runner;
    private canvas: any;
    private stage: any;
    private parentContainer: HTMLElement;
    private viewSize: Size;
    private objects: BaseObject[] = [];
    private cameraMovement: Vector = { x: 0, y: 0 };
    private cameraFollowObject: BaseObject | null = null;

    constructor(element: HTMLElement) {
        this.engine = Engine.create({
            gravity: { x: 0, y: 5 }
        });
        this.runner = Runner.create();
        this.parentContainer = element;
        this.viewSize = {
            width: element.clientWidth,
            height: element.clientHeight
        };
        this.canvas = new Two({
            type: Two.Types.webgl,
            fitted: true
        }).appendTo(element);
        this.stage = this.canvas.makeGroup();
        Runner.run(this.runner, this.engine);
        this.canvas.bind('update', this.update.bind(this));
        this.canvas.play();
    }

    get cameraPos(): Vector {
        return this.stage.position;
    }

    addCircle(x: number, y: number, radius: number, color: string, isStatic = false) {
        const circle = new Circle(x, y, radius, color, isStatic);
        return this.addObject(circle);
    }

    addRectangle(x: number, y: number, width: number, height: number, color: string, isStatic = false) {
        const rect = new Rectangle(x, y, width, height, color, isStatic);
        return this.addObject(rect);
    }

    moveCamera(amounts: Vector) {
        this.stage.position.x -= amounts.x;
        this.stage.position.y -= amounts.y;
    }

    setCameraMovement(xSpeed: number, ySpeed: number) {
        this.cameraMovement.x = xSpeed;
        this.cameraMovement.y = ySpeed;
    }

    setCameraFollowObject(object: BaseObject | null) {
        this.cameraMovement.x = 0;
        this.cameraMovement.y = 0;
        this.cameraFollowObject = object;
    }

    private addObject(object: BaseObject) {
        Composite.add(this.engine.world, object.physics);
        this.stage.add(object.drawing);
        this.objects.push(object);
        return object;
    }

    private update() {
        this.objects.forEach( object => {
            object.update();
        });
        if (this.cameraMovement.x || this.cameraMovement.y) {
            this.moveCamera(this.cameraMovement);
        }
        if (this.cameraFollowObject) {
            this.stage.position.x = -this.cameraFollowObject.drawing.position.x + (this.viewSize.height / 2);
            this.stage.position.y = -this.cameraFollowObject.drawing.position.y + (this.viewSize.height / 2);
        }
    }
}