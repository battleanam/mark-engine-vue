import {RectWidget} from "./RectWidget";

export class ImageWidget extends RectWidget {

  constructor(props) {
    super(props);
    Object.assign(this, props);
  }

  /**
   * 加载图片
   * @param src
   * @param afterImgLoaded
   */
  loadImg(src, afterImgLoaded) {
    const img = new Image();
    const promise = new Promise(resolve => {
      img.onload = () => {
        this.img = img;
        resolve(this);
      };
    });
    img.src = src;
    return promise;
  }

  /**
   * 重置位置
   */
  resetLocation({clientWidth, clientHeight}) {
    const {img: {width, height}} = this;
    this.w = clientWidth;
    this.h = clientWidth * height / width;
    this.y = (clientHeight - this.h) / 2;
    return this;
  }

  render(ctx) {
    const {x, y, w, h, scale, offsetX, offsetY, img} = this;
    ctx.save();
    ctx.drawImage(img, x + offsetX, y + offsetY, w * scale, h * scale);
    ctx.restore();
  }
}