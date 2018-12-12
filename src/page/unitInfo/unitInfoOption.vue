<template>
  <div>
    <header-top></header-top>
    <section class="uintOption">
      <div class="option-title">我的项目</div>
      <section>
        <div>恒大广场五期</div>
        <div>恒大广场五期</div>
        <div>恒大广场五期</div>
      </section>
    </section>
  </div>
</template>


<script>
import headerTop from "@/components/headerTOP";
export default {
  components: {
    headerTop,
  }
};
</script>

<style scoped lang="scss">
@import "src/assets/sass/mixin";
.XHeader {
  background-color: $fc;
  .header-text {
    font-family: $familyMedium;
    @include sc(17px, #030303);
  }
}
.uintOption {
  padding: 1.2rem 1rem 0;
  .option-title {
    @include sc(16px, #1e1e1e);
    margin-bottom: 17px;
    margin-left: 8px;
  }
  section {
    @include flexwrap(wrap);
    div {
      padding: 7px 28px;
      margin: 8px;
      background-color: $fc;
      @include borderStyle(#ececec);
      font-family: $familyMedium;
      @include sc(15px, #888888);
    }
  }
}
</style>


