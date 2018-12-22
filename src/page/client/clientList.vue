<template>
  <div>
    <x-header :left-options="{backText: ''}" class="header">客户管理<a slot="right">搜索</a></x-header>

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
</style>
