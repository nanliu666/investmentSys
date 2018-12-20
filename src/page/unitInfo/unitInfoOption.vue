<template>
  <div>
    <header-top :hasRow="hasRow" :unitOp="unitOp"></header-top>
    <section class="uintOption">
      <div class="option-title">我的项目</div>
      <section class="content">
        <div v-for="(item, index) in Propertys" :key="index">
          <span @click="Property2all(index)">{{item.Blockname}}</span>
        </div>
      </section>
    </section>
  </div>
</template>


<script>
import headerTop from "@/components/headerTOP";
import { GetPropertys,GetBlocks } from "@/axios/api";
export default {
  data() {
    return {
      hasRow: true,
      unitOp: true,
      Propertys: [] // 我的项目
    };
  },
  created() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      GetBlocks({ Blockid: 0 }).then(res => {
        this.Propertys = res.Content;
      });
    },
    Property2all(index) {
      let params =  this.Propertys[index];
      this.$router.push({
        name: "unitAll",
        params,
      });
    }
  },
  components: {
    headerTop
  }
};
</script>

<style scoped lang="scss">
@import "src/assets/sass/mixin";
.uintOption {
  padding: 140px 40px 0;
  .option-title {
    @include sc(16px * 2, #1e1e1e);
    margin-bottom: 17px * 2;
  }
  .content {
    @include flexwrap(wrap);
    @include fj(space-between);
    div {
      padding: 14px 54px;
      margin: 12px 0;
      background-color: $fc;
      span {
        font-family: $familyMedium;
        @include sc(30px, #888888);
      }
      @include borderStyle(#ececec);
    }
  }
}
</style>


