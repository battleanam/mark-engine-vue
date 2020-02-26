<template>
  <canvas ref="imageLayer" width="600" height="400"></canvas>
</template>

<script>
  import {ImageWidget} from "../../utils/mark/ImageWidget";
  import withMouseEventProp from "../../minixs/withMouseEventProp";

  export default {
    name: "ImageLayer",
    mixins: [
      withMouseEventProp
    ],
    data() {
      return {
        imgWidget: new ImageWidget(),
        imgLoaded: false, // 图片加载完成
      }
    },
    mounted() {
      this.imgWidget = new ImageWidget();
      this.imgWidget
        .loadImg(require('../../assets/bug.jpg'))
        .then(imgWidget => {
          imgWidget.render(this.ctx);
          this.imgLoaded = true;
        });
    },
    computed: {
      imageLayer() {
        return this.$refs['imageLayer'];
      },
      ctx() {
        return this.imageLayer.getContext('2d');
      }
    },
    methods: {
      onMouseWheel({scale}) {
        this.imgLoaded && this.imgWidget
          .clear(this.ctx)
          .setScale(scale)
          .render(this.ctx);
      },
      onMouseMove({cdx, cdy, spacepress, mousedown}) {
        if (this.imgLoaded &&  spacepress && mousedown) {
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
      }
    },
    watch: {
      mouseEvent(val) {
        if (val) {
          this.bindMouseEvent();
        }
      }
    }
  }
</script>

<style scoped>

</style>