<template>
  <div class="addSign">
    <div class="appTopOther"></div>
    <x-header :left-options="{showBack: false}" class="header">
      <img
        src="../../assets/images/返回@3x.png"
        slot="left"
        class="fs-backICon"
        alt
        @click="gobackByrouter()"
      >
      备注
    </x-header>
    <section class="ApprovalFlow">
      <group>
        <x-textarea placeholder="请填写备注" class="textarea" :max="200" v-model="businessNewObj.Remark"></x-textarea>
        <!-- <section class="tipsWord">
          <span v-for="(item, index) in tipsWordList" :key="index" @click="getTip(item)">{{item}}</span>
        </section>-->
      </group>
    </section>
    <section class="button">
      <button class="submit" @click="submit">保存</button>
    </section>
  </div>
</template>


<script>
import { XHeader, XTextarea, Group } from "vux";
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      CommentTemp: [],
      // tipsWordList: ["同意", "收到"],
      businessNewObj: {
        Remark: ""
      }
    };
  },
  components: {
    XHeader,
    XTextarea,
    Group
  },
  computed: {
    ...mapState(["reserveObj"])
  },
  name: "reserveRemark",
  methods: {
    ...mapMutations(["RESERVEADD"]),
    submit() {
      this.RESERVEADD(this.businessNewObj);
      console.log(this.reserveObj);
      this.gobackByrouter();
    }
  }
};
</script>

<style scoped lang="scss">
@import "src/assets/sass/mixin";
.ApprovalFlow {
  position: relative;
}
.tipsWord {
  position: absolute;
  bottom: 20px;
  font-family: $fr;
  @include sc(26px, rgba(136, 136, 136, 1));
  span {
    padding: 10px 16px;
    background: rgba(247, 247, 247, 1);
    margin: 10px;
  }
}
</style>


