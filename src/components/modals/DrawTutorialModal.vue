<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="container">
        <slot name="body">
          <p class="modal-text">
            {{ $t("MODAL_DRAW_TUTORIAL_TITLE") }}
          </p>
          <button @click="$emit('close')" class="modal-button">
            {{ $t("MODAL_DRAW_TUTORIAL_BUTTON") }}
          </button>
        </slot>
      </div>
    </div>
  </transition>
</template>

<script lang="ts"></script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4em 3em 0 3em;
}

.modal-text {
  font-size: 2rem;
  color: white;
  text-align: center;
}

.modal-button {
  color: var(--primary);
  font-weight: bold;
  margin-top: 4em;
  width: 301px;
  height: 64px;
  --background: transparent;
  background-image: url("../../assets/replay-button.svg");
  background-repeat: no-repeat;
  background-size: cover;
  --box-shadow: none;
  --background-activated: none;
  background-color: transparent;
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
