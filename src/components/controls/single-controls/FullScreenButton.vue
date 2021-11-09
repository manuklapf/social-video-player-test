<template>
  <button
    class="full-screen-button icon-only"
    @click="videoStore.toggleFullScreen()"
  >
    <i class="icon-fullscreen"></i>
  </button>
</template>

<script setup lang="ts">
import { useVideoStore } from "@/store/video";

const videoStore = useVideoStore();
</script>

<style scoped>
.full-screen-button {
  position: absolute;
  right: 0;
  bottom: 10px;
  color: white;
  margin: 5px 5px 0px 5px;
}
</style>
