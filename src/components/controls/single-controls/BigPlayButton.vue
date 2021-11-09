<template>
  <button
    v-show="videoStore.paused"
    class="big-play-button icon-only"
    @click="videoStore.playPause()"
  >
    <i class="icon-playbutton"></i>
  </button>
</template>

<script setup lang="ts">
import { useVideoStore } from "@/store/video";

const videoStore = useVideoStore();
</script>

<style scoped>
.big-play-button {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 3em;
  height: 3em;
  color: white;
}

.big-play-button .icon-playbutton {
  font-size: 3rem;
}
</style>
