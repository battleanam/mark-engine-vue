<template>
  <canvas ref="marksLayer"></canvas>
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

</style>