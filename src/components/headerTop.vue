<template>
  <div class="header">
    <section class="header-goback">
      <img src="../assets/images/返回@3x.png" alt>
    </section>
    <section class="header-title">
      <span class="header-text">{{headerText}}</span>
      <span class="header-row">
        <img src="@/assets/images/下拉@3x.png" alt>
      </span>
    </section>

  </div>
</template>


<script>
export default {
  data() {
    return {};
  },
  methods: {},
  props: ['headerText'],
};
</script>

<style scoped lang="scss">
@import "src/assets/sass/mixin";
.header {
  display: flex;
  background-color: $fc;
  padding: .2rem 1rem;
  .header-goback {
    display: flex;
    @include flexHCenter;
    img {
      max-width: 0.8rem;
      max-height: 0.8rem;
    }
  }
  .header-title {
    @include flexWCenter;
    width: 100%;
    .header-text {
      font-family: $familyMedium;
      @include sc(17px, #030303);
    }
    .header-row {
      @include flexCenter;
      margin: 0 .1rem;
      img {
        max-width: 11px;
        max-height: 6px;
      }
    }
  }
}
</style>


