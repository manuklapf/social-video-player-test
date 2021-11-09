<template>
  <p class="playing-time">
    {{ formattedCurrentTimeStamp }}
    /
    {{ formattedDurationTimeStamp }}
  </p>
</template>

<script setup lang="ts">
import { useVideoStore } from "@/store/video";
import formatSecondsToMSString from "@/composables/timestampComposable";
import { computed } from "vue";

const videoStore = useVideoStore();
const formattedCurrentTimeStamp = computed(() => {
  return formatSecondsToMSString(videoStore.currentTime);
});
const formattedDurationTimeStamp = computed(() => {
  return formatSecondsToMSString(videoStore.duration);
});
</script>

<style scoped>
.playing-time {
  position: absolute;
  bottom: 10px;
  left: 0;
  margin: 10px 10px 1px;
  color: white;
  font-weight: 500;
}
</style>
