<template>
  <div>
    <header-top headerText="选择项目"></header-top>
    <section class="uintOption">
      <div class="option-title">我的项目</div>
      <section class="content">
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
.uintOption {
  padding: 1.2rem 1rem 0;
  .option-title {
    @include sc(16px, #1e1e1e);
    margin-bottom: 17px;
  }
  .content {
    @include flexwrap(wrap);
    @include fj(space-between);
    div {
      padding: 0.3rem 1.2rem;
      margin: 0.25rem 0;
      background-color: $fc;
      @include borderStyle(#ececec);
      font-family: $familyMedium;
      @include sc(15px, #888888);
    }
  }
}
</style>


