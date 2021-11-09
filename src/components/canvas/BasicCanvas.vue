<template>
  <div id="video-canvas-container">
    <canvas id="c"></canvas>
    <button
      @click="drawingStore.isDiscardDrawingChangesModalVisible = true"
      class="exit_button"
    ></button>
    <button id="undo" @click="undoChanges()" class="undo_button">
      <i class="icon-undo"></i>
    </button>
    <button
      :disabled="disableButton"
      class="send_button"
      @click="
        saveCurrentCanvas();
        commentStore.onSendComment();
      "
    ></button>
    <discard-drawing-changes-modal
      v-if="drawingStore.isDiscardDrawingChangesModalVisible"
      class="modals"
    ></discard-drawing-changes-modal>
  </div>
</template>

<script setup lang="ts">
import { fabric } from "fabric";
import { Canvas } from "fabric/fabric-impl";
import { onMounted, ref } from "vue";
import { useVideoStore } from "@/store/video";
import { useDrawingStore } from "@/store/drawing";
import DiscardDrawingChangesModal from "@/components/modals/DiscardDrawingChangesModal.vue";
import { useCommentStore } from "@/store/comment";

let canvas: Canvas;
let paths: fabric.Object[] = [];
const videoStore = useVideoStore();
const drawingStore = useDrawingStore();
const commentStore = useCommentStore();
let disableButton = ref(true);

const undoChanges = () => {
  if (paths.length > 0) {
    canvas.remove(paths.pop()!);
    if (paths.length <= 0) {
      disableButton.value = true;
    }
  }
};

const saveCurrentCanvas = () => {
  drawingStore.isCanvasVisible = false;
  if (drawingStore.fullscreen) drawingStore.toggleFullscreen();
  drawingStore.drawingAsSVG = canvas.toSVG();
  drawingStore.drawingAsJSON = JSON.stringify(canvas.toJSON());
};

const createCanvasVideoElement = (width: number, height: number) => {
  let videoE = document.createElement("video");
  videoE.width = width;
  videoE.height = height;
  videoE.muted = true;
  videoE.currentTime = videoStore.currentTime;
  let source = document.createElement("source");
  source.src = videoStore.source?.src || "";
  source.type = "video/mp4";
  videoE.appendChild(source);
  return videoE;
};

const resizeCanvas = () => {
  canvas.setWidth(
    drawingStore.video_canvas_container?.getBoundingClientRect().width || 300
  );
  canvas.setHeight(
    drawingStore.video_canvas_container?.getBoundingClientRect().height || 300
  );

  let videoE = createCanvasVideoElement(
    videoStore.video?.videoWidth || 400,
    videoStore.video?.videoHeight || 100
  );

  let videoCanvasElement = new fabric.Image(videoE!, {
    left: 0,
    top: 0,
  });
  canvas.setBackgroundImage(videoCanvasElement, canvas.renderAll.bind(canvas), {
    scaleX: canvas.width! / videoCanvasElement.width!,
    scaleY: canvas.height! / videoCanvasElement.height!,
  });
};

onMounted(() => {
  drawingStore.video_canvas_container = document.getElementById(
    "video-canvas-container"
  );
  new ResizeObserver(resizeCanvas).observe(
    drawingStore.video_canvas_container!
  );
  if (!drawingStore.fullscreen) drawingStore.toggleFullscreen();

  canvas = new fabric.Canvas("c");
  canvas.isDrawingMode = true;
  canvas.freeDrawingBrush.width = 5;
  canvas.freeDrawingBrush.color = "#ff0000";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  canvas.on("path:created", function (e: any) {
    e.path.set();
    paths.push(e.path);
    disableButton.value = false;
  });

  fabric.util.requestAnimFrame(function render() {
    canvas.renderAll();
    fabric.util.requestAnimFrame(render);
  });
});
</script>

<style lang="scss" scoped>
.exit_button {
  width: 4rem;
  height: 4rem;
  background-image: url("../../assets/exit-button.svg");
  background-repeat: no-repeat;
  background-size: cover;
  --box-shadow: none;
  --background-activated: none;
  background-color: transparent;
  border-radius: 2rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.undo_button {
  display: flex;
  justify-content: space-evenly;
  width: 4rem;
  height: 4rem;
  background-color: transparent;
  position: absolute;
  top: 1rem;
  right: 6rem;
}

.icon-undo {
  font-size: 3rem;
  color: var(--primary);
}

.send_button:disabled {
  background-image: linear-gradient(
      rgba(200, 200, 200, 0.5),
      rgba(200, 200, 200, 0.5)
    ),
    url("../../assets/send-button.svg");
}

.send_button {
  width: 7rem;
  height: 4.5rem;
  background-image: url("../../assets/send-button.svg");
  background-repeat: no-repeat;
  background-size: cover;
  --box-shadow: none;
  --background-activated: none;
  background-color: transparent;
  border-radius: 2rem;
  position: absolute;
  bottom: 2rem;
  right: 1rem;
}

#video-canvas-container {
  display: flex;
  justify-content: center;
}
</style>
