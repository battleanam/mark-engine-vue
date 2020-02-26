import {MouseEventListener} from "../utils/event/MouseEventListener";

export default {
  props: {
    mouseEvent: {
      type: MouseEventListener,
      default() {
        return null;
      }
    }
  }
}