<template>
  <div>
    <x-header class="header" :left-options="{backText: ''}">信息列表</x-header>
    <section class="newList"></section>
  </div>
</template>

<script>
import { XHeader } from "vux";
export default {
  name: "homeNew",
  components: { XHeader },
  created() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      const data = {
        LoginName: "qw"
      };
    }
  }
};
</script>

<style lang="scss" scoped>
</style>


