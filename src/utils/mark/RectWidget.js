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
    ctx.moveTo(x + offsetX, y + offsetY);
    ctx.rect(x + offsetX + 0.5, y + offsetY + 0.5, w * scale, h * scale);
    ctx.fill();
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

  moveWithScale(offsetX, offsetY, nextScale) {
    const {x, y, scale} = this;
    let step = 0.1;
    if(scale < nextScale) {
      step = - 0.1;
    }
    const s = step / scale;
    this.x = x - x * s + offsetX * s;
    this.y = y - y * s + offsetY * s;
    this.setScale(nextScale);
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

  /**
   * 判断某个点是否在这个矩形
   * @param offsetX 点横坐标
   * @param offsetY 点纵坐标
   * @returns {boolean}
   */
  hasPoint({offsetX, offsetY}) {
    const {x, y, w, h} = this;
    const x1 = x + w, y1 = y + h;
    return x <= offsetX && offsetX <= x1 && y <= offsetY && offsetY <= y1;
  }

}