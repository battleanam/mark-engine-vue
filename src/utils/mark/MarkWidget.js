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

  render(ctx) {
    console.log(this);
    const {color, width, x, y, w, h, scale} = this;
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.strokeRect(x * scale, y * scale, w * scale, h * scale);
    ctx.restore();
  }
}