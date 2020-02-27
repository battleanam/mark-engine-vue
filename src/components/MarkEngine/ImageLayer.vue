<template>
  <canvas ref="imageLayer" :width="width" :height="height"></canvas>
</template>

<script>
  import {ImageWidget} from "../../utils/mark/ImageWidget";
  import withMouseEventProp from "../../minixs/withMouseEventProp";
  import withRectProp from "../../minixs/withRectProp";

  export default {
    name: "ImageLayer",
    mixins: [
      withMouseEventProp,
      withRectProp
    ],
    data() {
      return {
        imgWidget: new ImageWidget(),
      }
    },
    mounted() {

    },
    computed: {
      imageLayer: function () {
        return this.$refs['imageLayer'];
      },
      ctx: function () {
        return this.imageLayer.getContext('2d');
      }
    },
    methods: {
      onMouseWheel({scale, x, y}) {
        this.imgWidget
          .clear(this.ctx)
          .setScale(scale)
          // .moveWithScale(x, y)
          .render(this.ctx);
      },
      onMouseMove({cdx, cdy, spacepress, mousedown}) {
        if (spacepress && mousedown) {
          this.imgWidget
            .clear(this.ctx)
            .move({offsetX: cdx, offsetY: cdy})
            .render(this.ctx);
        }
      },
      onMouseDown() {
        this.imgWidget.updateLocation();
      },
      bindMouseEvent() {
        this.mouseEvent.addEventListener('mousewheel', this.onMouseWheel.bind(this));
        this.mouseEvent.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.mouseEvent.addEventListener('mousedown', this.onMouseDown.bind(this));
      },
      setImage(src, callback) {
        this.imgWidget = new ImageWidget();
        this.imgWidget
          .loadImg(src)
          .then(imgWidget => {
            imgWidget.resetLocation(this.mouseEvent.element).render(this.ctx);
            callback && callback(imgWidget);
          });
      }
    },
    // watch: {
    //   mouseEvent: function (val) {
    //     if (val) {
    //       this.setImage(
    //         require('../../assets/bug.jpg'),
    //         () => this.bindMouseEvent()
    //       );
    //     }
    //   }
    // }
  }
</script>

<style scoped>
  canvas {
    pointer-events: none;
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
  }
</style>