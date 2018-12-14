<template>
  <div class="reservePart">
    <header-top headerText="预定"></header-top>
    <section class="content">
      <div>
        <div>当前预定单元</div>
        <div>星月湾·东街二期 &nbsp; 403</div>
      </div>
    </section>
  </div>
</template>


<script>
import headerTop from "@/components/headerTOP";
export default {
  name: "reserve",
  created() {
    this.onLoad();
  },
  components: {
    headerTop
  },
  methods: {}
};
</script>

<style scoped lang="scss">
@import "src/assets/sass/mixin";
.reservePart {
  .content {
    padding-top: 90px;
  }
}
</style>


