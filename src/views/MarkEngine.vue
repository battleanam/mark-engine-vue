<template>
  <div ref="markEngine" class="markEngineWrapper">
    <ImageLayer ref="imageLayer" :width="600" :height="400" :mouseEvent="mouseEventListener"/>
    <MarksLayer ref="marksLayer" :width="600" :height="400" :mouseEvent="mouseEventListener"/>
  </div>
</template>

<script>
  import ImageLayer from "../components/MarkEngine/ImageLayer";
  import MarksLayer from "../components/MarkEngine/MarksLayer";
  import {MouseEventListener} from "../utils/event/MouseEventListener";
  import {CanvasWidget} from "../utils/mark/CanvasWidget";

  export default {
    name: "MarkEngine",
    components: {MarksLayer, ImageLayer},
    data() {
      return {
        mouseEventListener: null,
        canvas: null,
      }
    },
    mounted() {
      this.mouseEventListener = new MouseEventListener(this.markEngine);
      this.bindCursorEvent();
      this.imageLayer.setImage(
        require('../assets/GetBigPic.jpg'),
        ({x, y, w, h}) => {
          this.canvas = new CanvasWidget({
            x, y, w, h
          });
          this.canvas.render(this.marksLayer.marksLayer);
          this.marksLayer.bindMouseEvent();
          this.imageLayer.bindMouseEvent();
          this.bindMouseEvent();
        }
      );
    },
    computed: {
      markEngine: function () {
        return this.$refs['markEngine'];
      },
      imageLayer: function () {
        return this.$refs['imageLayer'];
      },
      marksLayer: function () {
        return this.$refs['marksLayer'];
      }
    },
    methods: {
      /**
       * 处理鼠标样式
       * @param spacepress
       * @param mousedown
       */
      handleCursor({spacepress, mousedown}) {
        if (spacepress && mousedown) {
          this.markEngine.style.cursor = 'grabbing';
        } else if (spacepress) {
          this.markEngine.style.cursor = 'grab';
        } else {
          this.markEngine.style.cursor = 'default';
        }
      },
      /**
       * 绑定处理鼠标样式的处理器
       */
      bindCursorEvent() {
        this.mouseEventListener.addEventListener('keydown', this.handleCursor.bind(this));
        this.mouseEventListener.addEventListener('keyup', this.handleCursor.bind(this));
        this.mouseEventListener.addEventListener('mousedown', this.handleCursor.bind(this));
        this.mouseEventListener.addEventListener('mouseup', this.handleCursor.bind(this));
      },
      onMouseWheel({scale}) {
        this.canvas
          .setScale(scale)
          .render(this.marksLayer.marksLayer);
        this.marksLayer.onMouseWheel({scale});
      },
      onMouseMove({cdx, cdy, spacepress, mousedown, scale}) {
        if (spacepress && mousedown) {
          this.canvas
            .move({offsetX: cdx, offsetY: cdy})
            .render(this.marksLayer.marksLayer);
          this.marksLayer.clear().render();
        } else if (mousedown) {
          this.marksLayer.onMouseMove({cdx: cdx / scale, cdy: cdy / scale});
        }
      },
      onMouseDown({x, y, spacepress, scale}) {
        this.canvas.updateLocation();
        if (!spacepress) {
          this.marksLayer.onMouseDown({
            x: (x - this.canvas.x) / scale,
            y: (y - this.canvas.y) / scale,
            scale
          });
        }
      },
      onMouseup() {
        // this.marksLayer.marks.forEach(mark => mark.updateLocation());
      },
      bindMouseEvent() {
        this.mouseEventListener.addEventListener('mousewheel', this.onMouseWheel.bind(this));
        this.mouseEventListener.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.mouseEventListener.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.mouseEventListener.addEventListener('mouseup', this.onMouseup.bind(this));
      }
    }
  }
</script>

<style scoped>
  .markEngineWrapper {
    height: 400px;
    width: 600px;
    border: 2px solid black;
    position: relative;
    margin: auto;
    overflow: hidden;
  }
</style>