<template>
  <div class="controls" v-bind:class="{ fullscreen: videoStore.fullScreen }">
    <big-play-button v-if="bigPlayButton"></big-play-button>
    <time-marker></time-marker>
    <time-slider v-if="timeSlider"></time-slider>
    <playing-time v-if="time"></playing-time>
    <full-screen-button v-if="fullScreenButton"></full-screen-button>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import BigPlayButton from "@/components/controls/single-controls/BigPlayButton.vue";
import TimeSlider from "@/components/controls/single-controls/TimeSlider.vue";
import FullScreenButton from "@/components/controls/single-controls/FullScreenButton.vue";
import PlayingTime from "@/components/controls/single-controls/PlayingTime.vue";
import { useVideoStore } from "@/store/video";
import TimeMarker from "@/components/controls/single-controls/TimeMarker.vue";

defineProps({
  time: {
    type: Boolean,
    default: true,
  },
  timeSlider: {
    type: Boolean,
    default: true,
  },
  bigPlayButton: {
    type: Boolean,
    default: true,
  },
  fullScreenButton: {
    type: Boolean,
    default: true,
  },
});

const videoStore = useVideoStore();
</script>

<style scoped lang="scss">
/* Controls must be positioned absolute*/
.controls * {
  position: absolute;
}

.controls.fullscreen * {
  margin-bottom: 25px;
}

.controls.fullscreen .big-play-button {
  margin-bottom: 0 !important;
}
</style>
