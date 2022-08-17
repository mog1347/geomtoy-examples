
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
import { g as Polygon, P as Point, h as Box, M as Maths, f as Path } from './geomtoy.js';
import { e as strokeFill } from './multiple-canvas-renderer.js';

function randomPolygonVertex(box = [-100, -100, 200, 200]) {
  return Polygon.vertex(Point.random(box));
}
function randomPathCommand(box = [-100, -100, 200, 200]) {
  const typeRandom = Maths.random();
  const commandType = typeRandom > 0.2 ? typeRandom > 0.4 ? typeRandom > 0.6 ? typeRandom > 0.8 ? "arcTo" : "bezierTo" : "quadraticBezierTo" : "lineTo" : "moveTo";

  switch (commandType) {
    case "moveTo":
      {
        return Path.moveTo(Point.random(box));
      }

    case "lineTo":
      {
        return Path.lineTo(Point.random(box));
      }

    case "quadraticBezierTo":
      {
        return Path.quadraticBezierTo(Point.random(box), Point.random(box));
      }

    case "bezierTo":
      {
        return Path.bezierTo(Point.random(box), Point.random(box), Point.random(box));
      }

    case "arcTo":
      {
        const radiusX = Box.width(box) * Maths.random() / 2;
        const radiusY = Box.height(box) * Maths.random() / 2;
        const positive = Maths.random() > 0.5;
        const largeArc = Maths.random() > 0.5;
        const rotation = Maths.random() * Maths.PI * 2;
        return Path.arcTo(radiusX, radiusY, rotation, largeArc, positive, Point.random(box));
      }
  }
}
function strokeFillByIndex(index) {
  const arr = [strokeFill("purple"), strokeFill("green"), strokeFill("cyan"), strokeFill("orange"), strokeFill("lightBlue"), strokeFill("deepOrange"), strokeFill("teal"), strokeFill("amber"), strokeFill("lime"), strokeFill("brown")];
  return arr[index % arr.length];
}

export { randomPolygonVertex as a, randomPathCommand as r, strokeFillByIndex as s };
