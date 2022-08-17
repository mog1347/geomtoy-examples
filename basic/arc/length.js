
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
import { U as Utility, V as View, C as CanvasRenderer, P as Point, D as Dynamic, M as Maths, A as Arc, a as ViewElement } from '../../js/geomtoy.js';
import { t as tpl, s as stroke } from '../../js/multiple-canvas-renderer.js';
import 'http://cdn.jsdelivr.net/npm/tweakpane@3.0.8/dist/tweakpane.min.js';
import 'https://cdn.jsdelivr.net/npm/prismjs@1.28.0/prism.min.js';
import 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js';
import '../../js/color.js';

tpl.title("Arc length");
{
  const card = tpl.addCard({
    canvasId: Utility.uuid(),
    aspectRatio: "2:1",
    className: "col-12",
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
  const length = new Dynamic({
    length: 0
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
  arc.on("any", function () {
    length.length = arc.getLength();
  });
  const pane = new Tweakpane.Pane({
    title: "Arc length",
    container: card.pane
  });
  const arcFolder = pane.addFolder({
    title: "Arc"
  });
  const cpInput = arcFolder.addInput({
    centerPoint
  }, "centerPoint", {
    y: {
      inverted: true
    }
  });
  centerPoint.on("any", () => cpInput.refresh());
  arcFolder.addInput(restParams, "radiusX", {
    min: Number.EPSILON
  });
  arcFolder.addInput(restParams, "radiusY", {
    min: Number.EPSILON
  });
  arcFolder.addInput(restParams, "startAngle", {
    format: v => v.toFixed(2)
  });
  arcFolder.addInput(restParams, "endAngle", {
    format: v => v.toFixed(2)
  });
  arcFolder.addInput(restParams, "positive");
  arcFolder.addInput(restParams, "rotation", {
    min: 0,
    max: 2 * Math.PI
  });
  const lengthFolder = pane.addFolder({
    title: "Length"
  });
  lengthFolder.addMonitor(length, "length", {
    format: v => v.toFixed(10)
  });
  view.add(new ViewElement(centerPoint, {
    interactable: true,
    ...stroke("brown")
  }));
  view.add(new ViewElement(arc, {
    interactable: false,
    ...stroke("brown")
  }));
}
