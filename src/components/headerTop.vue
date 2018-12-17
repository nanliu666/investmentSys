<template>
  <div class="header">
    <div class="header-top">
      <section class="header-goback">
        <img src="../assets/images/返回@3x.png" alt>
      </section>
      <section class="header-title">
        <span class="header-text">{{headerText}}</span>
        <span class="header-row">
          <img class="row-img" src="@/assets/images/下拉@3x.png" alt>
        </span>
      </section>
      <span v-if="hasSearch"><i class="iconfont icon-fangdajing"></i></span>
    </div>
    <section class="filter" v-if="hasState">
      <div>
        <span>状态</span>
        <img class="row-img" src="@/assets/images/下拉@3x.png" alt>
      </div>
      <span class="decollator">|</span>
      <div>
        <span>项目</span>
        <img class="row-img" src="@/assets/images/下拉@3x.png" alt>
      </div>
    </section>
  </div>
</template>


<script>
export default {
  data() {
    return {};
  },
  props: {
    headerText: {
      type: String,
      required: true
    },
    hasState: {
      type: Boolean
    },
    hasSearch: {
      type: Boolean
    }
  },
  methods: {},
  computed: {}
};
</script>

<style scoped lang="scss">
@import "src/assets/sass/mixin";
.header {
  position: fixed;
  width: 100%;
  background-color: $fc;
  padding: 20px 40px;
  box-shadow: 0 4px 14px 0 rgba(126, 158, 230, 0.15);
  .header-top {
    @include fj(space-between);
    .header-goback {
      display: flex;
      @include flexHCenter;
      img {
        max-width: 14px;
        max-height: 26px;
      }
    }
    .header-title {
      @include flexWCenter;
      width: 100%;
      .header-text {
        font-family: $familyMedium;
        font-size: 34px; /*px*/
        color: #030303;
      }
      .header-row {
        @include flexCenter;
        margin: 18px 8px;
      }
    }
  }
  .row-img {
    max-width: 26px;
    max-height: 11px;
  }
  .filter {
    @include fj(space-around);
    padding: 28px 0;
    div {
      span {
        //状态，项目文字
        @include sc(28px, rgba(30, 30, 30, 1));
        font-family: $familyR;
        margin-right: 12px;
      }
    }
    .decollator {
      //分隔符
      @include wh(4px, 32px);
      color: rgba(219, 219, 219, 1);
    }
  }
}
</style>


