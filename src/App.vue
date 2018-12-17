<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
}
</script>
<style lang="scss">
@import "../src/assets/sass/common.scss";
#app {
  height: 100%;
}
</style>
