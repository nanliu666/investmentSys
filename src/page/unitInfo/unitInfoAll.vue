<template>
  <div>
    <header-top headerText="星月湾第二期"></header-top>
    <section class="uintInfoAll">
      <section class="uintOne">
        <div class="uintFloor">14F</div>
        <div class="unitRoom">
          <div>1407</div>
          <div>1407</div>
          <div>1407</div>
          <div>1407</div>
        </div>
      </section>
    </section>
  </div>
</template>


<script>
import { apiUnitALL } from "@/axios/api";
import headerTop from "@/components/headerTOP";
export default {
  name: "unitALL",
  created() {
    this.onLoad();
  },
  components: {
    headerTop
  },
  methods: {
    onLoad() {
      apiUnitALL().then(res => {
        // console.log(res.data.d);
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "src/assets/sass/mixin";
.uintInfoAll {
  .uintOne {
    @include fj(space-around);
    background-color: $fc;
    padding: 0.9rem 0.9rem 0;
    .uintFloor {
      @include sc(22px, #888);
      font-family: $familyMedium;
    }
    .unitRoom {
      @include fj(space-around);
    }
  }
}
</style>


