import './style.scss';
import World from "../../dist/World";

const world = new World(document.getElementById('stage'));

world.addRectangle(0, 900, 5000, 100, '#444444', true);  // floor
let circle = world.addCircle(200, 0 , 20, '#FF9900');
const rect = world.addRectangle(400, 0, 100, 100, '#00FF99');
const rect2= world.addRectangle(200, 0, 80, 80, '#993399');

setInterval(() => {
    rect2.setVelocity(20, 10);
    circle.setVelocity(5, -25);
}, 2000);

setInterval(() => {
    // circle = world.addCircle(200, 0 , 20, '#FF9900');
    rect.setVelocity(-40, 10);
    circle.setVelocity(-5, -25);
}, 4500);

world.setCameraMovement(-1, 0);
// world.setCameraFollowObject(rect2);

