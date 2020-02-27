import {RectWidget} from "./RectWidget";

export class CanvasWidget extends RectWidget {

  constructor(props) {
    super(props);
  }

  render(canvas) {
    const {x, y, w, h, scale, offsetX, offsetY} = this;
    canvas.width = w * scale;
    canvas.height = h * scale;
    canvas.style.left = x + offsetX + 'px';
    canvas.style.top = y + offsetY + 'px';
  }

}