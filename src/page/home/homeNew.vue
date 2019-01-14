<template>
  <div>
    <x-header class="header" :left-options="{backText: ''}">信息列表</x-header>
    <section class="newList"></section>
  </div>
</template>

<script>
import { XHeader } from "vux";
import { getAgencyAndNewest } from "@/axios/api";
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
      getAgencyAndNewest(data).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>


