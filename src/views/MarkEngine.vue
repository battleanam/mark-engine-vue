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
    },
    computed: {
      markEngine() {
        return this.$refs['markEngine'];
      },
    },
  }
</script>

<style scoped>
  .markEngineWrapper {
    height: 400px;
    width: 600px;
    border: 2px solid black;
  }
</style>