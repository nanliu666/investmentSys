<template>
  <div class="addSign">
    <div class="appTopOther"></div>
    <x-header :left-options="{showBack: false}" class="header">
      <img
        src="../../../assets/images/返回@3x.png"
        slot="left"
        class="fs-backICon"
        alt
        @click="gobackByrouter()"
      >
      移交
    </x-header>
    <section class="ApprovalFlow">
      <ul class="addContent">
        <li class="addContentLi" @click="getClient">
          <div>请选择移交人</div>
          <div class="liRight">{{requestData.linkMan ? requestData.linkMan : '请选择 >'}}</div>
        </li>
      </ul>
    </section>
    <popup v-model="hasClient">
      <popup-header
        left-text="取消"
        right-text="确认"
        title="请选择移交人"
        :show-bottom-border="false"
        @on-click-left="hasClient = false"
        @on-click-right="hasClient = false"
      ></popup-header>
      <group gutter="0">
        <radio :options="clientOptions" @on-change="getOtherChange"></radio>
      </group>
    </popup>
    <section class="ApprovalFlow">
      <group title="移交意见">
        <x-textarea placeholder="请填写审批意见" class="textarea" :max="200" v-model="requestData.Remark"></x-textarea>
        <!-- <section class="tipsWord">
          <span v-for="(item, index) in tipsWordList" :key="index" @click="getTip(item)">{{item}}</span>
        </section>-->
      </group>
    </section>
    <section class="button">
      <button class="submit" @click="submit">提交</button>
    </section>
  </div>
</template>


<script>
import { XHeader, XTextarea, Group, Popup, PopupHeader, Radio } from "vux";
import { BizProspecttransfer, GetAgentsDropdown } from "@/axios/api";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      clientOptions: [], //联系人选择
      hasClient: false,
      CommentTemp: [],
      isNewGo: false,
      businessDetail: {},
      requestData: {
        Fromagentid: "",
        Prospectid: "",
        Remark: "",
        linkMan: "",
        Toagentid: ""
      }
    };
  },
  components: {
    XHeader,
    PopupHeader,
    Radio,
    Popup,
    XTextarea,
    Group
  },
  name: "businessTransfer",
  created() {
    this.onLoad();
  },
  methods: {
    getOtherChange(value) {
      this.requestData.linkMan = value;
      this.requestData.Toagentid = this.FlowsUserList.filter(
        item => item.Text === value
      )[0].Value;
    },
    getClient() {
      this.hasClient = !this.hasClient;
    },

    onLoad() {
      this.businessDetail = JSON.parse(
        sessionStorage.getItem("businessDetail")
      );
      this.requestData.Fromagentid = this.businessDetail.Agentid;
      this.requestData.Fromagentname = this.businessDetail.Agentname;
      this.requestData.Prospectid = this.businessDetail.Prospectid;
      let REdata = {
        Companyid: 0
      };
      GetAgentsDropdown(REdata).then(res => {
        this.FlowsUserList = res.Option.Dropdowntoagentid;
        this.FlowsUserList.map(item => {
          this.clientOptions.push(item.Text);
        });
      });
    },
    submit() {
      let data = {
        Transfer: this.requestData
      }
      BizProspecttransfer(data).then(res => {
        console.log(res);
        if (!!res.Success) {
          this.$vux.toast.show({
            text: "移交失败！",
            type: "warn"
          });
        } else {
          this.$vux.toast.show({
            text: "移交成功！",
            type: "success"
          });
          this.$router.push({ name: "businessList" });
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "src/assets/sass/mixin";
.addSign {
  height: 100%;
  .ApprovalFlow {
    position: relative;
    .contractTitle {
      @include fj;
      @include sc(28px, rgba(136, 136, 136, 1));
      padding: 20px 40px;
    }
    .flowMain {
      background-color: #fff;
      padding: 30px 40px 0;
      font-family: $fr;
      li {
        @include fd;
        // &:last-child {
        //   .shuxian {
        //     width: 0 !important;
        //   }
        // }
        .flowLeft {
          .flowFlag {
            @include flexCenter;
            img {
              @include wh(46px, 46px);
            }
          }
          width: 20%;
          @include fd(column);
          margin-right: 24px;
          .iconTittle {
            margin-top: 6px;
            @include sc(24px, rgba(136, 136, 136, 1));
            @include flexCenter;
          }
          .shuxianBox {
            width: 100%;
            @include flexWCenter;
            margin-bottom: 10px;
            .shuxian {
              padding: 6px 0;
              @include wh(2px, 106px);
              background: rgb(244, 246, 248);
            }
          }
        }
        .flowRight {
          .top {
            @include sc(24px, rgba(136, 136, 136, 1));
            margin-bottom: 8px;
          }
          .main {
            background: rgba(243, 247, 253, 1);
            @include wh(600px, 138px);
            padding: 24px 0 0 24px;
            .mainTop {
              @include sc(30px, rgba(80, 80, 80, 1));
              margin-bottom: 8px;
            }
            .mainBottom {
              @include sc(24px, rgba(136, 136, 136, 1));
            }
          }
        }
      }
    }
    .addContent {
      margin-top: 20px;
      @include sc(30px, rgba(136, 136, 136, 1));
      font-family: $fr;
      .addContentLi {
        background-color: #fff;
        @include wh(100%, 96px);
        line-height: 96px;
        @include fj;
        @include flexHCenter;
        padding: 40px;
        margin-bottom: 4px;
        &:last-child {
          margin: 0;
        }
        .liRight {
          @include fj;
          @include sc(30px, rgba(30, 30, 30, 1));

          .radio-box {
            display: inline-block;
            @include fj;
            position: relative;
            margin-right: 30px;
            &:last-child {
              margin-right: 0px;
            }
            .flowFlag {
              @include flexCenter;
              margin-right: 10px;
              img {
                @include wh(46px, 46px);
              }
              .noCheched {
                @include wh(46px, 46px);
                border-radius: 23px;
                border: 1px solid rgba(219, 219, 219, 1);
              }
            }
            .input-radio {
              display: inline-block;
              position: absolute;
              opacity: 0;
              width: 25px;
              height: 25px;
              cursor: pointer;
              left: 0px;
              outline: none;
              -webkit-appearance: none;
            }
          }
        }
      }
    }
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
}
</style>


