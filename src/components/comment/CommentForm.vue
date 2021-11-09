<template>
  <div class="input-container">
    <input
      v-model="text"
      class="input-field"
      id="comment-input-field"
      type="text"
      :placeholder="placeholder"
      @focus="videoStore.pauseVideo()"
    />
    <div class="action-button-container">
      <button
        :disabled="disableButton"
        class="icon-only action-button"
        @click="prepareSendComment()"
      >
        <i class="icon-send"></i>
      </button>
    </div>
    <comment-confirmation-modal
      v-if="drawingStore.isCommentConfirmationModalVisible"
      @draw="drawingStore.startDrawing()"
      @comment="commentStore.onSendComment()"
      class="modals"
    />
    <draw-tutorial-modal
      v-if="drawingStore.isDrawTutorialModalVisible"
      @close="drawingStore.closeDrawTutorialModal()"
      class="modals"
    ></draw-tutorial-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useCommentStore } from "@/store/comment";
import { useVideoStore } from "@/store/video";
import { useDrawingStore } from "@/store/drawing";
import CommentConfirmationModal from "@/components/modals/CommentConfirmationModal.vue";
import DrawTutorialModal from "@/components/modals/DrawTutorialModal.vue";

const commentStore = useCommentStore();
const videoStore = useVideoStore();
const drawingStore = useDrawingStore();
const text = ref("");
const placeholder = "Kommentar verfassen...";
const disableButton = ref(false);
const prepareSendComment = () => {
  if (!text.value) return;
  commentStore.text = text.value;
  drawingStore.isCommentConfirmationModalVisible = true;
};
</script>

<style scoped>
.input-container {
  display: flex;
  border: 1px solid #d8d8d8;
}
.input-field {
  flex: 1;
  padding: 0.5rem;
  border: unset;
  background: #ffffff;
  color: #090951;
}
.action-button {
  border-left: 1px solid #d8d8d8;
  margin: 0.25rem 0.5rem 0.25rem 0.5rem;
  font-size: 1.25rem;
}
.action-button-container {
  padding: 0.2rem 0 0.2rem 0;
  background: #ffffff;
}
input:focus {
  outline: none;
}
</style>
