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
        this.w = img.width;
        this.h = img.height;
        resolve(this);
      };
    });
    img.src = src;
    return promise;
  }

  render(ctx) {
    const {x, y, w, h, scale, offsetX, offsetY, img} = this;
    ctx.save();
    ctx.drawImage(img, x + offsetX, y + offsetY, w * scale, h * scale);
    ctx.restore();
  }
}