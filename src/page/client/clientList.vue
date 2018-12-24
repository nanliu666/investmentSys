<template>
  <div>
    <x-header :left-options="{backText: ''}" class="header">客户管理<a class="add" slot="right">＋</a></x-header>

  </div>
</template>

<script>
import {XHeader} from 'vux'
export default {
  name: "clientList",
  components: {
    XHeader,
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/sass/mixin";
.add {
  font-size: 44px !important;
  color: rgba(136, 136, 136, 1) !important;
}
</style>
