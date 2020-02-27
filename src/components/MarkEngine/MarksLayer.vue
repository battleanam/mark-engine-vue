<template>
  <canvas ref="marksLayer"></canvas>
</template>

<script>
  import withMouseEventProp from "../../minixs/withMouseEventProp";
  import {MarkWidget} from "../../utils/mark/MarkWidget";
  import withRectProp from "../../minixs/withRectProp";

  export default {
    name: "MarksLayer",
    mixins: [
      withMouseEventProp,
      withRectProp
    ],
    data() {
      return {
        marks: [], // 标注框列表
        mark: new MarkWidget(), // 当前正在操作的标注框
      }
    },
    computed: {
      marksLayer: function () {
        return this.$refs['marksLayer'];
      },
      ctx: function () {
        return this.marksLayer.getContext('2d');
      }
    },
    mounted() {
    },
    methods: {
      onMouseWheel({scale}) {
        this.clear().marks.forEach(mark => {
          mark.setScale(scale)
            .render(this.ctx);
        });
      },
      onMouseMove({cdx, cdy}) {
          this.mark.w = cdx;
          this.mark.h = cdy;
          this.updateMark(this.mark).clear().render();
      },
      onMouseDown({x, y, scale}) {
        this.mark = new MarkWidget({x, y, scale});
        this.addMark(this.mark);
      },
      onMouseup({dx, dy}) {
        if (dx === 0 && dy === 0) {
          this.removeMark(this.mark);
        }
      },
      bindMouseEvent() {
        this.mouseEvent.addEventListener('mouseup', this.onMouseup.bind(this));
      },
      addMark(mark) {
        this.marks.push(mark);
        return this;
      },
      removeMark(mark) {
        const index = this.marks.findIndex(({id}) => id === mark.id);
        this.marks.splice(index, 1);
        return this;
      },
      updateMark(mark) {
        const index = this.marks.findIndex(({id}) => id === mark.id);
        this.marks.splice(index, 1, mark);
        return this;
      },
      clear() {
        this.ctx.clearRect(0, 0, this.marksLayer.width, this.marksLayer.height);
        return this;
      },
      render() {
        this.marks.forEach(mark => {
          mark.render(this.ctx);
        });
      }
    },
  }
</script>

<style scoped>
  canvas {
    pointer-events: none;
    position: absolute;
    z-index: 2;
    left: 0;
    top: 0;
    border: 1px solid;
  }
</style>