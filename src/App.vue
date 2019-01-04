<template>
  <div id="app">
    <keep-alive>
      <transition name="fade" mode="out-in">
        <router-view v-if="$route.meta.keepAlive">
          <!-- 这里是会被缓存的视图组件，比如客户详情页面 -->
        </router-view>
      </transition>
    </keep-alive>
    <transition name="fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive">
        <!-- 这里是不被缓存的视图组件，比如客户列表/编辑页面 -->
      </router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      script.setAttribute("src", "./scripts/ios_cordova.js");
    } else {
      script.setAttribute("src", "./scripts/android_cordova.js");
    }
    var heads = document.getElementsByTagName("head");
    if (heads.length) {
      heads[0].appendChild(script);
    } else {
      document.documentElement.appendChild(script);
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/sass/common.scss";
@import "@/assets/sass/mixin.scss";
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
#app {
  height: 100%;
  .header {
    background-color: #fff;
    box-shadow: 0 4px 14px 0 rgba(126, 158, 230, 0.15);
    h1 {
      @include sc(34px, rgba(3, 3, 3, 1));
    }
  }
  //下拉刷新，上拉加载文字补充 ---fix px2rem
  .downwarp-tip,
  .upwarp-tip,
  .upwarp-nodata {
    @include sc(28px, rgba(136, 136, 136, 1));
  }
  .empty-tip {
    margin-top: 20px;
    @include sc(30px, rgba(136, 136, 136, 1));
  }
  .weui-input {
    //覆盖input样式
    color: #757575;
  }
  .weui-search-bar__label {
    //覆盖搜索居中问题
    @include flexCenter;
  }
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
}
</style>
