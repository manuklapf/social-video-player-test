<template>
  <div class="time-marker-element"></div>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import { useVideoStore } from "@/store/video";
const props = defineProps({
  timeMarker: {
    type: Object,
    required: true,
  },
});
const position = ref(null);
const elementWidth = ref(1.5);
const videoStore = useVideoStore();
const calculatePosition = () => {
  position.value =
    (videoStore.video.clientWidth / videoStore.video.duration) *
      props.timeMarker.timestamp -
    elementWidth.value;
  position.value = position.value < 0 ? 0 : position.value;
};
new ResizeObserver(calculatePosition).observe(videoStore.video);
</script>

<style scoped>
.time-marker-element {
  position: absolute;
  left: v-bind(position + "px");
  height: 12px;
  border-left: v-bind(elementWidth + "px solid #090951");
}
</style>
