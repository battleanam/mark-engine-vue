/**
 * 鼠标事件监听器
 */
export class MouseEventListener {

  /**
   * 构造函数
   * @param element 监听鼠标事件的 target
   */
  constructor(element) {
    // 当前鼠标位置
    this.x = 0;
    this.y = 0;
    // 鼠标按下的位置
    this.sx = 0;
    this.sy = 0;
    // 按下到弹起经过的距离
    this.dx = 0;
    this.dy = 0;
    // 当前鼠标位置距离起点的位置
    this.cdx = 0;
    this.cdy = 0;
    // 当前的缩放比例
    this.scale = 1;
    // 鼠标是否按下
    this.mousedown = false;
    // 是否在按着空格
    this.spacepress = false;
    // 当前挂载的HTML元素
    this.element = element;
    this.createEventBus();
    this.initEvent();
  }


  onMouseMove({offsetX, offsetY}) {
    this.x = offsetX;
    this.y = offsetY;
    this.cdx = offsetX - this.sx;
    this.cdy = offsetY - this.sy;
    this.eventBus['mousemove'].forEach(fn => fn(this));
  }

  onMouseDown({offsetX, offsetY}) {
    this.mousedown = true;
    this.sx = offsetX;
    this.sy = offsetY;
    this.eventBus['mousedown'].forEach(fn => fn(this));
  }

  onMouseUp({offsetX, offsetY}) {
    this.mousedown = false;
    this.dx = offsetX - this.sx;
    this.dy = offsetY - this.sy;
    this.sx = 0;
    this.sy = 0;
    this.eventBus['mouseup'].forEach(fn => fn(this));
  }

  onKeydown(e) {
    if (e.key === " ") {
      e.preventDefault();
      this.spacepress = true;
      this.eventBus['keydown'].forEach(fn => fn(this));
    }
  }

  onKeyup(e) {
    if (e.key === " ") {
      e.preventDefault();
      this.spacepress = false;
      this.eventBus['keydown'].forEach(fn => fn(this));
    }
  }

  onMouseWheel(e) {
    e.preventDefault();
    const delta = e.wheelDelta / 1200; // 计算缩放比例增量
    const scale = this.scale + delta; // 暂存缩放后的比例
    if (scale > .1 && scale < 4) { // 缩放比例在 10倍 到 25% 之间
      this.scale = scale;
      this.eventBus['mousewheel'].forEach(fn => fn(this));
    }
  }


  /**
   * 添加事件监听器
   * @param type 事件类型
   * @param handler 事件处理器
   */
  addEventListener(type, handler) {
    if (type in this.eventBus) {
      const handlers = this.eventBus[type];
      handlers.push(handler);
    } else {
      console.error('[MouseEventListener_addEventListener] can not find event type named：' + type);
    }
  }

  /**
   * 删除某个事件监听器
   * @param type
   * @param handler
   */
  removeEventListener(type, handler) {
    if (type in this.eventBus) {
      const handlers = this.eventBus[type];
      const index = handlers.findIndex(fn => fn === handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    } else {
      console.error('[MouseEventListener_removeEventListener] can not find event type named：' + type);
    }
  }

  /**
   * 创建一个内部事件总线
   */
  createEventBus() {
    this.eventBus = {
      mousemove: [],
      mousedown: [],
      mouseup: [],
      keydown: [],
      keyup: [],
      mousewheel: [],
    };
  }

  /**
   * 注册本地事件
   */
  initEvent() {
    const {element} = this;
    element.addEventListener('mousemove', this.onMouseMove.bind(this));
    element.addEventListener('mousedown', this.onMouseDown.bind(this));
    element.addEventListener('mouseup', this.onMouseUp.bind(this));
    document.addEventListener('keydown', this.onKeydown.bind(this));
    document.addEventListener('keyup', this.onKeyup.bind(this));
    element.addEventListener('mousewheel', this.onMouseWheel.bind(this));
  }

  destroy() {
    if (this.element) {
      this.element.removeEventListener('mousemove', this.onMouseMove);
      this.element.removeEventListener('mousedown', this.onMouseDown);
      this.element.removeEventListener('mouseup', this.onMouseUp);
      this.element.removeEventListener('keydown', this.onKeydown);
      this.element.removeEventListener('keyup', this.onKeyup);
      this.element.removeEventListener('mousewheel', this.onMouseWheel);
    }
  }
}