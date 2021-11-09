import { defineStore } from "pinia";
import Comment from "@/models/comment";
import axios from "axios";
import { useComment } from "@/composables/commentComposable";
import { useDrawingStore } from "@/store/drawing";
import { useVideoStore } from "@/store/video";

export const useCommentStore = defineStore({
  id: "commentStore",
  state: () => ({
    comments: [] as Comment[],
    comment: {} as Comment,
    text: "",
  }),
  actions: {
    async onSendComment(): Promise<boolean> {
      useDrawingStore().isCommentConfirmationModalVisible = false;
      let status = false;
      return await new Promise((resolve, reject) => {
        this.sendComment(
          useVideoStore().id,
          this.text,
          useVideoStore().currentTime,
          useDrawingStore().drawingAsSVG,
          useDrawingStore().drawingAsJSON
        )
          .then((comment: Comment) => {
            this.text = "";
            useComment().scrollToComment(comment.id);
            status = true;
            resolve(status);
          })
          .catch((e) => {
            console.error(e);
            status = false;
            reject(status);
          });
      });
    },
    async sendComment(
      videoId: number,
      text: string,
      timestamp: number,
      drawingAsSVG = "",
      drawingAsJSON = ""
    ): Promise<Comment> {
      return await new Promise((resolve, reject) => {
        axios
          .post("/api/comments", {
            videoId,
            text,
            timestamp,
            drawingAsSVG,
            drawingAsJSON,
          })
          .then(
            (response) => {
              const element: HTMLInputElement = <HTMLInputElement>(
                document.getElementById("comment-input-field")!
              );
              element.value = "";

              const comment = response.data.data as Comment;
              this.comments.push(comment);
              resolve(comment);
            },
            (e) => {
              reject(e);
              console.error(e);
            }
          );
      });
    },
    async fetchComments(videoId: number) {
      return await new Promise((resolve, reject) => {
        axios.get("/api/videos/" + videoId + "/comments").then(
          (response) => {
            const comments = response.data.data as Comment[];
            this.comments = comments;
            resolve(comments);
          },
          (e) => {
            reject(e);
            console.error(e);
          }
        );
      });
    },
  },
});
