<template>
  <div class="time-marker-container">
    <time-marker-element
      v-for="timeMarker in timeMarkerStore.getTimeMarker"
      :key="timeMarker.id"
      :time-marker="timeMarker"
    ></time-marker-element>
  </div>
</template>

<script setup lang="ts">
import { useTimeMarkerStore } from "@/store/timeMarker";
import TimeMarkerElement from "@/components/controls/single-controls/TimeMarkerElement.vue";

const timeMarkerStore = useTimeMarkerStore();
</script>

<style scoped>
.time-marker-container {
  width: 100%;
  position: relative;
}
</style>
