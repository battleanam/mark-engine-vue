<template>
  <div ref="markEngine" class="markEngineWrapper">
    <ImageLayer ref="imageLayer" :mouseEvent="mouseEventListener"/>
    <MarksLayer ref="marksLayer" :mouseEvent="mouseEventListener" />
  </div>
</template>

<script>
  import ImageLayer from "../components/MarkEngine/ImageLayer";
  import MarksLayer from "../components/MarkEngine/MarksLayer";
  import {MouseEventListener} from "../utils/event/MouseEventListener";
  export default {
    name: "MarkEngine",
    components: {MarksLayer, ImageLayer},
    data() {
      return {
        mouseEventListener: null,
      }
    },
    mounted() {
      this.mouseEventListener = new MouseEventListener(this.markEngine);
      this.bindMouseEvent();
    },
    computed: {
      markEngine() {
        return this.$refs['markEngine'];
      },
    },
    methods: {
      handleCursor({spacepress, mousedown}) {
         if(spacepress && mousedown) {
          this.markEngine.style.cursor = 'grabbing';
        }else if(spacepress) {
          this.markEngine.style.cursor = 'grab';
        }else {
          this.markEngine.style.cursor = 'default';
        }
      },
      bindMouseEvent() {
        this.mouseEventListener.addEventListener('keydown', this.handleCursor.bind(this));
        this.mouseEventListener.addEventListener('keyup', this.handleCursor.bind(this));
        this.mouseEventListener.addEventListener('mousedown', this.handleCursor.bind(this));
        this.mouseEventListener.addEventListener('mouseup', this.handleCursor.bind(this));
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
  }
</style>