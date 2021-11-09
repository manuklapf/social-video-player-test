<template>
  <input
    ref="rangeSlider"
    type="range"
    v-model="timeSlider"
    class="time-slider"
    step="0.001"
    min="0"
    :max="videoStore.duration"
    @input="videoStore.setCurrentTime(timeSlider)"
  />
</template>

<script setup lang="ts">
import { useVideoStore } from "@/store/video";
import { Ref, ref, watch } from "vue";

const timeSlider = ref(0);
const videoStore = useVideoStore();
const rangeSlider: Ref<HTMLInputElement | null> = ref(null);

const updateSliderColor = () => {
  const value = (timeSlider.value / videoStore.duration) * 100;
  rangeSlider.value!.style.background =
    "linear-gradient(to right, var(--tertiary) 0%, var(--tertiary) " +
    value +
    "%, var(--light-grey) " +
    value +
    "%, var(--light-grey) 100%)";
};

watch(
  () => videoStore.currentTime,
  () => {
    timeSlider.value = videoStore.video?.currentTime || 0;
    updateSliderColor();
  }
);
</script>

<style scoped lang="scss">
@import "../../../theme/variables";

.time-slider {
  bottom: -2px;
  left: -2px;
  width: 100%;
}

.time-slider[type="range"] {
  -webkit-appearance: none;
  background: $light-grey;
  border-radius: 5px;
}

.time-slider[type="range"]::-webkit-slider-runnable-track {
  height: 2px;
  -webkit-appearance: none;
  background: transparent;
  border: none;
  border-radius: 0;
}

.time-slider[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  border: none;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: white;
  margin-top: -8px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
}

.time-slider[type="range"]:focus {
  outline: none;
}
</style>
