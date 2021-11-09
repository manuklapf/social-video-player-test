<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="container">
        <slot name="body">
          <p class="modal-text">Zeichnung verwerfen?</p>
          <div class="button-container">
            <button class="modal-button" @click="drawingStore.exitDrawing()">
              {{ $t("YES") }}
            </button>
            <button
              class="modal-button"
              @click="drawingStore.isDiscardDrawingChangesModalVisible = false"
            >
              {{ $t("NO") }}
            </button>
          </div>
        </slot>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useDrawingStore } from "@/store/drawing";

const drawingStore = useDrawingStore();
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  background-color: white;
  align-items: flex-end;
  padding: 0 1rem 1rem 1rem;
  border-radius: 0.5rem;
}

.container p {
  display: inline-block;
}

.modal-text {
  font-size: 1.5rem;
  color: var(--primary);
  text-align: center;
}

.modal-button {
  color: var(--blue);
  --background: transparent;
  background-repeat: no-repeat;
  background-size: cover;
  --box-shadow: none;
  --background-activated: none;
  background-color: transparent;
  border: none;
}
.button-container {
  display: inline-block;
}

.modal-button:active {
  filter: brightness(85%);
}

.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(9, 9, 81, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
