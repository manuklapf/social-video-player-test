import { defineStore } from "pinia";
import { useDrawingStore } from "@/store/drawing";

export const useVideoStore = defineStore({
  id: "videoStore",
  state: () => ({
    id: 1,
    video: null as HTMLVideoElement | null,
    currentTime: 0,
    duration: 0,
    fullScreen: false,
    paused: true,
    source: null as HTMLSourceElement | null,
  }),
  actions: {
    setVideo(video: HTMLVideoElement) {
      this.video = video;
    },

    setCurrentTime(time = 0) {
      this.currentTime = Number(time) || 0;
      this.video!.currentTime = Number(time) || 0;
    },

    setVideoDuration() {
      this.duration = this.video?.duration || 0;
    },

    setSource(source: HTMLSourceElement) {
      this.source = source;
    },

    playPause() {
      if (this.video?.paused) this.video.play();
      else this.video?.pause();
    },

    onPause() {
      this.paused = true;
    },

    onPlay() {
      this.paused = false;
    },

    pauseVideo() {
      this.video?.pause();
    },
    updateCurrentTime() {
      this.currentTime = this.video?.currentTime || 0;
      useDrawingStore().showDrawings(this.currentTime);
    },

    toggleFullScreen() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const div: any = this.video?.parentElement;
      if (!div) {
        console.error(
          "Parent of HTML5 video not set. Please define a div that is wrapping the HTML5 video and add your custom controls there."
        );
        return;
      }
      if (this.fullScreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          if (document.webkitExitFullscreen) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            document.webkitExitFullscreen();
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
          } else if (document.msExitFullScreen) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            document.msExitFullScreen();
          }
        }
      } else {
        if (div.requestFullscreen) {
          div.requestFullscreen();
        } else if (div.webkitRequestFullscreen) {
          div.webkitRequestFullscreen();
        } else if (div.msRequestFullScreen) {
          div.msRequestFullScreen();
        }
      }
      this.fullScreen = !this.fullScreen;
    },
  },
});
