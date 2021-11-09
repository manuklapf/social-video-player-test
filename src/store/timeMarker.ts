import { defineStore } from "pinia";
import { useCommentStore } from "@/store/comment";

export const useTimeMarkerStore = defineStore({
  id: "timeMarkerStore",
  state: () => ({}),
  getters: {
    getTimeMarker() {
      return useCommentStore().comments;
    },
  },
});
