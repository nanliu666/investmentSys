<template>
  <div class="addSign">
    <div class="appTopOther"></div>
    <x-header :left-options="{showBack: false}" class="header">
      <img src="../../assets/images/返回@3x.png" slot="left" class="fs-backICon" alt @click="goback">
      同意
    </x-header>
    <section class="ApprovalFlow">
      <group>
        <x-textarea placeholder="请填写审批意见" class="textarea" :max="200" v-model="requestData.Comment"></x-textarea>
        <section class="tipsWord">
          <span v-for="(item, index) in tipsWordList" :key="index" @click="getTip(item)">{{item}}</span>
        </section>
      </group>
    </section>
    <section class="button">
      <button class="submit" @click="submit">保存</button>
    </section>
  </div>
</template>


<script>
import { XHeader, XTextarea, Group } from "vux";
import { ActionApprove } from "@/axios/api";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      CommentTemp: [],
      tipsWordList: ["同意", "收到"],
      requestData: {
        Entiid: 0, //流程id，预定是28，合同是345。有平台业务主键时传0
        Datakey: "",
        Platformkey: "",
        Comment: ""
      }
    };
  },
  components: {
    XHeader,
    XTextarea,
    Group
  },
  name: "WorkFlowAgree",
  created() {
    this.onLoad();
  },
  methods: {
    getTip(item) {
      this.CommentTemp.push(item);
      let A = this.CommentTemp.join(",");
      this.requestData.Comment = A;
    },
    goback() {
      this.$router.back(-1);
    },
    onLoad() {
      this.requestData.Platformkey = this.$route.params.Platformkey;
    },
    submit() {
      ActionApprove(this.requestData).then(res => {
        if (res.Success === false) {
        } else {
          this.$router.push({ name: "affairList" });
        }
      });
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


