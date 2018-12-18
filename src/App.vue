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
@import '@/assets/sass/common.scss';
#app {
  height: 100%;
}
</style>
