<template>
  <div class="businessTrack">
    <x-header :left-options="{backText: ''}" class="header">
      <div class="headerTittle">跟踪记录</div>
    </x-header>
  </div>
</template>


<script>
import { XHeader } from "vux";
import { GetPropertys } from "@/axios/api";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  components: {
    XHeader
  },
  name: "businessTrack",
  created() {
    this.onLoad();
  },

  methods: {
    onLoad() {}
  }
};
</script>

<style scoped lang="scss">
@import "src/assets/sass/mixin";

.imgBox {
  @include flexCenter;
  .fs-dropImg {
    @include wh(11px, 6px);
  }
}
.uintNumber {
  background-color: rgba(231, 237, 244, 1);
  @include wh(100%, 88px);
  @include sc(26px, rgba(30, 30, 30, 1));
  @include flexHCenter;
  padding: 0 34px;
}
</style>


