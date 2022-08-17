
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
import { U as Utility, V as View, C as CanvasRenderer, P as Point, D as Dynamic, M as Maths, A as Arc, b as ShapeArray, R as Rectangle, a as ViewElement, c as ViewGroupElement } from '../../js/geomtoy.js';
import { t as tpl, c as codeHtml, l as lightStrokeFill, s as stroke } from '../../js/multiple-canvas-renderer.js';
import 'http://cdn.jsdelivr.net/npm/tweakpane@3.0.8/dist/tweakpane.min.js';
import 'https://cdn.jsdelivr.net/npm/prismjs@1.28.0/prism.min.js';
import 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js';
import '../../js/color.js';

tpl.title("Arc extrema and bounding box");
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
  const centerPoint = new Point(0, 0);
  const restParams = new Dynamic({
    radiusX: 20,
    radiusY: 10,
    startAngle: Maths.PI / 4,
    endAngle: 5 * Maths.PI / 4,
    positive: true,
    rotation: 0
  });
  const arc = new Arc().bind([[centerPoint, "any"], [restParams, "any"]], function ([e1, e2]) {
    const {
      radiusX,
      radiusY,
      startAngle,
      endAngle,
      positive,
      rotation
    } = e2.target;
    this.copyFrom(Arc.fromCenterPointAndStartEndAnglesEtc(e1.target, radiusX, radiusY, startAngle, endAngle, positive, rotation));
  });
  const extremePoints = new ShapeArray().bind([[arc, "any"]], function ([e]) {
    this.shapes = e.target.extrema().map(([p]) => p);
  });
  const boundingBoxRectangle = new Rectangle().bind([[arc, "any"]], function ([e]) {
    this.copyFrom(new Rectangle(...e.target.getBoundingBox()));
  });
  card.setDescription(codeHtml(` 
    const centerPoint = new Point( 0, 0);
    const restParams = new Dynamic( {
        radiusX: 20,
        radiusY: 10,
        startAngle: Maths.PI / 4,
        endAngle: (5 * Maths.PI) / 4,
        positive: true,
        rotation: 0
    });

    const arc = new Arc().bind(
        [
            [centerPoint, "any"],
            [restParams, "any"]
        ],
        function ([e1, e2]) {
            const { radiusX, radiusY, startAngle, endAngle, positive, rotation } = e2.target;
            this.copyFrom(Arc.fromCenterPointAndStartEndAnglesEtc( e1.target, radiusX, radiusY, startAngle, endAngle, positive, rotation));
        }
    );
    const extremePoints = new ShapeArray(g).bind([[arc, "any"]], function ([e]) {
        this.shapes = e.target.extrema().map(([p]) => p);
    });
    const boundingBoxRectangle = new Rectangle(g).bind([[arc, "any"]], function ([e]) {
        this.copyFrom(new Rectangle(this.owner, ...e.target.getBoundingBox()));
    });
    `));
  const pane = new Tweakpane.Pane({
    title: "Construction-2",
    container: card.pane
  });
  const cpInput = pane.addInput({
    centerPoint
  }, "centerPoint", {
    y: {
      inverted: true
    }
  });
  centerPoint.on("any", () => cpInput.refresh());
  pane.addInput(restParams, "radiusX", {
    min: Number.EPSILON
  });
  pane.addInput(restParams, "radiusY", {
    min: Number.EPSILON
  });
  pane.addInput(restParams, "startAngle", {
    format: v => v.toFixed(2)
  });
  pane.addInput(restParams, "endAngle", {
    format: v => v.toFixed(2)
  });
  pane.addInput(restParams, "positive");
  pane.addInput(restParams, "rotation", {
    min: 0,
    max: 2 * Math.PI
  });
  view.add(new ViewElement(centerPoint, {
    interactable: true,
    ...lightStrokeFill("brown")
  }));
  view.add(new ViewElement(arc, {
    interactable: false,
    ...stroke("brown")
  }));
  view.add(new ViewGroupElement(extremePoints.shapes, {
    interactable: false,
    ...stroke("lightBlue")
  }));
  view.add(new ViewElement(boundingBoxRectangle, {
    interactable: false,
    ...stroke("cyan")
  }));
}
