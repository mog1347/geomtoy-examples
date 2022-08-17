
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
import { U as Utility, V as View, C as CanvasRenderer, P as Point, D as Dynamic, A as Arc, b as ShapeArray, a as ViewElement } from '../../js/geomtoy.js';
import { t as tpl, d as thinStrokeFill, s as stroke } from '../../js/multiple-canvas-renderer.js';
import 'http://cdn.jsdelivr.net/npm/tweakpane@3.0.8/dist/tweakpane.min.js';
import 'https://cdn.jsdelivr.net/npm/prismjs@1.28.0/prism.min.js';
import 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js';
import '../../js/color.js';

tpl.title("Arc portion");
tpl.addSection(`portion`);
{
  const card = tpl.addCard({
    canvasId: Utility.uuid(),
    className: "col-12",
    aspectRatio: "2:1",
    withPane: true
  });
  const view = new View({}, new CanvasRenderer(card.canvas, {}, {
    density: 10,
    zoom: 1,
    yAxisPositiveOnBottom: false
  }));
  view.startResponsive((width, height) => view.renderer.display.origin = [width / 2, height / 2]);
  view.startInteractive();
  const point1 = new Point(37.10824611144065, -87.28029770415789);
  const point2 = new Point(84.66159676012853, 45.97215672141252);
  const restParams = new Dynamic({
    radiusX: 63.68193437809403,
    radiusY: 78.20682581430138,
    largeArc: false,
    positive: false,
    rotation: 2.07636608164263
  });
  const arc = new Arc().bind([[point1, "any"], [point2, "any"], [restParams, "any"]], function ([e1, e2, e3]) {
    const {
      radiusX,
      radiusY,
      largeArc,
      positive,
      rotation
    } = e3.target;
    this.copyFrom(new Arc(e1.target, e2.target, radiusX, radiusY, largeArc, positive, rotation));
  });
  restParams.bind([[arc, "radiusX|radiusY"]], function ([e]) {
    restParams.radiusX = e.target.radiusX;
    restParams.radiusY = e.target.radiusY;
  }, {
    hasRecursiveEffect: true
  });
  const pane = new Tweakpane.Pane({
    title: "Arc",
    container: card.pane
  });
  const p1Input = pane.addInput({
    point1
  }, "point1", {
    y: {
      inverted: true
    }
  });
  const p2Input = pane.addInput({
    point2
  }, "point2", {
    y: {
      inverted: true
    }
  });
  point1.on("any", () => p1Input.refresh());
  point2.on("any", () => p2Input.refresh());
  const rxInput = pane.addInput(restParams, "radiusX", {
    min: Number.EPSILON
  });
  restParams.on("radiusX", () => rxInput.refresh());
  const ryInput = pane.addInput(restParams, "radiusY", {
    min: Number.EPSILON
  });
  restParams.on("radiusY", () => ryInput.refresh());
  pane.addInput(restParams, "largeArc");
  pane.addInput(restParams, "positive");
  pane.addInput(restParams, "rotation", {
    min: 0,
    max: 2 * Math.PI
  });
  const portions = new ShapeArray();
  portions.shapes = arc.splitAtAngles([2.057936580355297, 2.101784776463127]);
  view.add(new ViewElement(point1, {
    interactable: true,
    ...thinStrokeFill("brown")
  }));
  view.add(new ViewElement(point2, {
    interactable: true,
    ...thinStrokeFill("brown")
  }));
  view.add(new ViewElement(arc, {
    interactable: false,
    ...stroke("brown")
  }));
  view.add(new ViewElement(portions.shapes[0], {
    interactable: false,
    ...stroke("purple")
  }), true);
  view.add(new ViewElement(portions.shapes[1], {
    interactable: false,
    ...stroke("green")
  }), true);
  view.add(new ViewElement(portions.shapes[2], {
    interactable: false,
    ...stroke("lime")
  }), true);
}
