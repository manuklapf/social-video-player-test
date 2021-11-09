<template>
  <div class="feed-container">
    <div class="comment-container">
      <comment
        v-for="comment in commentStore.comments"
        :id="'comment-' + comment.id"
        :key="comment.id"
        :comment="comment"
      ></comment>
    </div>
    <comment-form class="form-container"></comment-form>
  </div>
</template>

<script lang="ts" setup>
import Comment from "@/components/comment/Comment.vue";
import { useCommentStore } from "@/store/comment";
import CommentForm from "@/components/comment/CommentForm.vue";
import { useVideoStore } from "@/store/video";

const commentStore = useCommentStore();
commentStore.fetchComments(useVideoStore().id);
</script>

<style scoped>
.feed-container {
  display: flex;
  flex-direction: column;
  min-height: 0;
  flex: 1;
  background: #f7fafa;
}
.comment-container {
  padding: 0.5em;
  flex: 1;
  overflow-y: auto;
}
.form-container {
  flex-shrink: 0;
}
</style>
