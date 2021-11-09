<template>
  <div class="player-app">
    <div class="video-container">
      <video
        id="social-video"
        ref="video"
        playsinline
        @timeupdate="videoStore.updateCurrentTime()"
        @loadeddata="videoStore.setVideoDuration()"
        @click="videoStore.playPause()"
        @pause="videoStore.onPause()"
        @play="videoStore.onPlay()"
        v-bind:class="{ fullscreen: videoStore.fullScreen }"
      >
        <source ref="videoSource" :src="source" type="video/mp4" />
        Your browser does not support HTML video.
      </video>
      <div id="svg_drawings" @click="videoStore.playPause()"></div>
      <controls></controls>
    </div>
    <comment-feed></comment-feed>
    <basic-canvas
      v-if="videoStore.video && drawingStore.isCanvasVisible"
    ></basic-canvas>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, onMounted, ref, watch } from "vue";
import { useVideoStore } from "@/store/video";
import Controls from "@/components/controls/Controls.vue";
import CommentFeed from "@/components/comment/CommentFeed.vue";
import { useDrawingStore } from "@/store/drawing";
import BasicCanvas from "@/components/canvas/BasicCanvas.vue";

defineProps({
  source: {
    type: String,
    default: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
});

const videoStore = useVideoStore();
const drawingStore = useDrawingStore();
const video = ref<HTMLVideoElement | null>(null);
const videoSource = ref<HTMLSourceElement | null>(null);

onMounted(() => {
  if (video.value) {
    videoStore.setVideo(video.value);
    videoStore.setSource(videoSource.value!);
  }
});

const emit = defineEmits<{
  (event: "onFullscreenEnter"): void;
  (event: "onFullscreenLeave"): void;
}>();
watch(
  () => videoStore.fullScreen,
  (fullscreen) => {
    if (fullscreen) emit("onFullscreenEnter");
    else emit("onFullscreenLeave");
  }
);
watch(
  () => drawingStore.fullscreen,
  (fullscreen) => {
    if (fullscreen) emit("onFullscreenEnter");
    else emit("onFullscreenLeave");
  }
);
</script>

<style lang="scss">
@import "theme/global";
@import "theme/variables";

:root {
  --primary: #090951;
  --secondary: #ddedfb;
  --tertiary: #d8523d;
  --blue: #1c87e4;
  --grey: #b0b0b0;
  --light-grey: #d8d8d8;
}
</style>

<style scoped lang="scss">
#svg_drawings {
  position: absolute;
  width: 100%;
  height: 100%;
}

.player-app {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.video-container {
  display: flex;
  flex-direction: column;
  position: relative;
}

#social-video {
  width: 100%;
  height: 100%;
}

#social-video.fullscreen {
  margin: auto;
}

video::-webkit-media-controls-fullscreen-button {
  display: none;
}
video::-webkit-media-controls-play-button {
  display: none;
}
video::-webkit-media-controls-play-button {
  display: none;
}
video::-webkit-media-controls-timeline {
  display: none;
}
video::-webkit-media-controls-current-time-display {
  display: none;
}
video::-webkit-media-controls-time-remaining-display {
  display: none;
}
video::-webkit-media-controls-time-remaining-display {
  display: none;
}
video::-webkit-media-controls-mute-button {
  display: none;
}
video::-webkit-media-controls-toggle-closed-captions-button {
  display: none;
}
video::-webkit-media-controls-volume-slider {
  display: none;
}
video::-webkit-media-controls-menu-list {
  display: none;
}
video::-webkit-media-controls-enclosure {
  display: none;
}
</style>
