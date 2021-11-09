<template>
  <social-video-player></social-video-player>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style lang="scss">
@import "./assets/fonts/replay-icons/css/replay-icons.css";

@font-face {
  font-family: "dinosaur";
  src: url("./assets/fonts/DINosaur/DINosaur_Medium.ttf") format("truetype");
}

@font-face {
  font-family: "dinosaurBold";
  src: url("./assets/fonts/DINosaur/DINosaur_Bold.ttf") format("truetype");
  font-weight: bold;
}

@font-face {
  font-family: "dinosaurBook";
  src: url("./assets/fonts/DINosaur/DINosaur_Book.ttf") format("truetype");
}

@font-face {
  font-family: "fontello";
  src: url("./assets/fonts/replay-icons/font/replay-icons.svg") format("svg");
  font-weight: normal;
  font-style: normal;
}

:root {
  /** fonts **/
  --font-family: "dinosaur";
}

html {
  font-size: 12px;
}

body {
  margin: 0;
  font-family: dinosaur, sans-serif;
  font-style: normal;
  font-weight: 100;
}
</style>
