<template>
  <div class="header">
    <section class="header-goback">
      <img src="../assets/images/返回@3x.png" alt="">
    </section>
    <section class="header-title">
      <span class="header-text">选择项目</span>
      <span><img src="@/assets/images/下拉@3x.png" alt=""></span>
    </section>
  </div>
</template>


<script>
export default {};
</script>

<style scoped lang="scss">
@import "src/assets/sass/mixin";
.header {
  display: flex;
  background-color: $fc;
  .header-goback {
    margin-left: 20px;
    display: flex;
    @include flexHCenter;
    img {
      max-width: .8rem;
      max-height: .8rem;
    }

  }
  .header-title {
    @include flexWCenter;
    width: 100%;
    .header-text {
      font-family: $familyMedium;
      @include sc(17px, #030303)
    }
    img {
      max-width: 11px;
      max-height: 6px;
    }
  }
}
</style>


