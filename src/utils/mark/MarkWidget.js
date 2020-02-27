import {RectWidget} from "./RectWidget";

const {v1: uuid} = require('uuid');

/**
 * 标注框实例
 */
export class MarkWidget extends RectWidget {

  constructor(props) {
    super();
    this.id = uuid();
    this.color = 'red';
    this.width = 1;
    this.scale = 1;
    Object.assign(this, props);
  }

  render(ctx, point) {
    const {color, width, x, y, w, h, scale, hasPoint} = this;
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = point && hasPoint(point) ? 'yellow' : color;
    ctx.lineWidth = width;
    const rx = Math.floor(x * scale) + 0.5;
    const ry = Math.floor(y * scale) + 0.5;
    ctx.moveTo(rx, ry);
    ctx.rect(rx, ry, w * scale, h * scale);
    ctx.stroke();
    ctx.restore();
  }
}