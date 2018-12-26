<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
        <!-- 这里是会被缓存的视图组件，比如客户详情页面 -->
      </router-view>
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive">
      <!-- 这里是不被缓存的视图组件，比如客户列表/编辑页面 -->
    </router-view>
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
  .upwarp-tip {
    background-color: red;
  }
}
</style>
