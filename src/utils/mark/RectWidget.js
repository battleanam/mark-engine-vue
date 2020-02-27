/**
 * 矩形组件实例
 */
export class RectWidget {

  constructor(props) {
    this.x = 0; // 起点
    this.y = 0;
    this.w = 0;
    this.h = 0;
    this.scale = 1;
    this.offsetX = 0;
    this.offsetY = 0;
    Object.assign(this, props);
  }

  render(ctx) {
    const {x, y, w, h, scale, offsetX, offsetY} = this;
    ctx.save();
    ctx.fillRect(x + offsetX, y + offsetY, w * scale, h * scale);
    ctx.restore();
  }


  setScale(scale) {
    this.scale = scale;
    return this;
  }

  move({offsetX, offsetY}) {
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    return this;
  }

  clear(ctx) {
    ctx.clearRect(0, 0, 600, 400);
    return this;
  }

  updateLocation() {
    const {offsetX, offsetY} = this;
    this.x += offsetX;
    this.y += offsetY;
    this.offsetX = 0;
    this.offsetY = 0;
    return this;
  }

}