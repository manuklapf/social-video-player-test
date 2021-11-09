<template>
  <div class="comment-container">
    <div class="avatar">
      <img :src="comment.user?.avatar" />
    </div>
    <div class="content-container">
      <div class="header">
        <div class="author-info">
          <span>{{ comment.user?.name }} am {{ comment.createdAt }}</span>
        </div>
        <div class="time-marker">
          <span>{{ formattedTimestamp }}</span>
        </div>
      </div>
      <div class="content">
        <span> {{ comment.text }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, PropType, ref } from "vue";
import formatSecondsToMSString from "@/composables/timestampComposable";
import Comment from "@/models/comment";
const props = defineProps({
  comment: {
    type: Object as PropType<Comment>,
    required: true,
  },
});
const formattedTimestamp = ref(
  formatSecondsToMSString(props.comment.timestamp)
);
</script>
<style lang="scss" scoped>
.comment-container {
  display: flex;
}
.content {
  background-color: #ecf0f1;
  padding: 1em;
  color: #090951;
  border-radius: 0.3em;
  margin-right: 2.5em;
  font-size: 0.9em;
}
.header {
  font-size: 0.75em;
  width: 100%;
  padding: 1em 0 0.8em 0;
  color: #b0b0b0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .author-info {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .time-marker {
    padding: 0 0 0 0.25em;
    border-left: 0.1em solid #090951;
    color: #090951;
  }
}
.avatar {
  padding: 0.5em 0.5em 0 0;
  img {
    height: 2.5em;
    width: 2.5em;
    border-radius: 50%;
  }
}
.content-container {
  text-align: left;
  min-width: 0;
  flex: 1;
}
</style>
