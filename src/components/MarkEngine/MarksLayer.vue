<template>
  <canvas ref="marksLayer" width="600" height="400"></canvas>
</template>

<script>
  import withMouseEventProp from "../../minixs/withMouseEventProp";

  export default {
    name: "MarksLayer",
    mixins: [
      withMouseEventProp
    ]
  }
</script>

<style scoped>
  canvas {
    pointer-events: none;
    position: absolute;
    z-index: 2;
    left: 0;
    top: 0;
  }
</style>