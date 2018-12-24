<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>
<style lang="scss">
@import "@/assets/sass/common.scss";
@import "@/assets/sass/mixin.scss";
#app {
  height: 100%;
  .header {
    background-color: #fff;
    box-shadow: 0 4px 14px 0 rgba(126, 158, 230, 0.15);
    h1 {
      @include sc(34px, rgba(3, 3, 3, 1));
    }
  }
}
</style>
