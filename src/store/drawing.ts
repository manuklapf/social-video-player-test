import { defineStore } from "pinia";
import { useUserStore } from "@/store/user";
import { useCommentStore } from "@/store/comment";

export const useDrawingStore = defineStore({
  id: "drawingStore",
  state: () => ({
    isCommentConfirmationModalVisible: false,
    isDrawTutorialModalVisible: false,
    isCanvasVisible: false,
    isDiscardDrawingChangesModalVisible: false,
    isFirstTimeDrawing: localStorage.getItem("isFirstTimeDrawing"),
    drawingAsSVG: "",
    drawingAsJSON: "",
    userStore: useUserStore(),
    video_canvas_container: null as HTMLElement | null,
    fullscreen: false,
    parser: new DOMParser(),
    offsetDuration: 0.5,
  }),
  actions: {
    async startDrawing() {
      this.isCommentConfirmationModalVisible = false;
      if (this.isFirstTimeDrawing == undefined) {
        try {
          const user = await this.userStore.getUser();
          this.isFirstTimeDrawing = String(user.first_time_drawing);
          localStorage.setItem("isFirstTimeDrawing", this.isFirstTimeDrawing);
        } catch (e) {
          console.error(e);
        }
      }
      if (this.isFirstTimeDrawing == "1") {
        this.isDrawTutorialModalVisible = true;
        this.isFirstTimeDrawing = "0";
        localStorage.setItem("isFirstTimeDrawing", this.isFirstTimeDrawing);
        await this.userStore.setFirstTimeDrawingToFalse();
      } else {
        this.isCanvasVisible = true;
      }
    },
    closeDrawTutorialModal() {
      this.isDrawTutorialModalVisible = false;
      this.startDrawing();
    },
    exitDrawing() {
      this.fullscreen = false;
      this.isCanvasVisible = false;
      this.isDiscardDrawingChangesModalVisible = false;
      this.isCommentConfirmationModalVisible = true;
    },
    toggleFullscreen() {
      if (!this.video_canvas_container) {
        console.error(
          "Parent of HTML5 video and canvas not set. Please define a div that is wrapping the HTML5 video and canvas."
        );
        return;
      }
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document
            .exitFullscreen()
            .then(() => console.log("Exited fullscreen."));
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
        if (this.video_canvas_container.requestFullscreen) {
          this.video_canvas_container.requestFullscreen();
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
        } else if (this.video_canvas_container.webkitRequestFullscreen) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          this.video_canvas_container.webkitRequestFullscreen();
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
        } else if (this.video_canvas_container.msRequestFullScreen) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          this.video_canvas_container.msRequestFullScreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
    showDrawings(currentTime: number) {
      const filteredComments = useCommentStore().comments.filter(
        (comment) =>
          comment.timestamp >= currentTime - this.offsetDuration &&
          comment.timestamp <= currentTime + this.offsetDuration &&
          comment.drawingAsSVG
      );

      const drawingsContainer =
        document.getElementById("svg_drawings") || new HTMLElement();
      drawingsContainer.innerHTML! = "";

      filteredComments.forEach((comment) => {
        const svgElement = this.parser.parseFromString(
          comment.drawingAsSVG,
          "image/svg+xml"
        ).documentElement;
        svgElement.classList.add("svg_element");
        drawingsContainer.append(svgElement);
      });
    },
  },
});
