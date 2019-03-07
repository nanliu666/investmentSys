<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<script>
import { GetUserId } from "@/axios/api";
export default {
  name: "App",
  mounted() {
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    if (process.env.NODE_ENV !== "production") {
      script.setAttribute("src", "ifcaapp://cordova.js");
    } else {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        script.setAttribute("src", "./static/js/ios_cordova.js");
      } else {
        script.setAttribute("src", "./static/js/android_cordova.js");
      }
      var heads = document.getElementsByTagName("head");
      if (heads.length) {
        heads[0].appendChild(script);
      } else {
        document.documentElement.appendChild(script);
      }

      document.addEventListener("deviceready", this.onDeviceReady(), false);
    }
  },
  methods: {
    onDeviceReady() {
    console.log('cordova传入===',cordova)
      // 禁用安卓返回键
      cordova.exec(null, null, "ifcaPlugIns", "enabledsystembackFunc", [false]);
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

.fs-addNew {
  @include wh(18px, 18px);
  margin-left: 10px;
}

#app {
  height: 100%;
  .header {
    background-color: #fff;
    box-shadow: 0 4px 14px 0 rgba(126, 158, 230, 0.15);
    h1 {
      @include sc(34px, rgba(3, 3, 3, 1));
      @include flexCenter;
      font-family: $fm;
    }
  }
  .searchImg,
  .addImg {
    @include wh(38px, 38px);
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
