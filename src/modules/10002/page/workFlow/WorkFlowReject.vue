<template>
  <div class="addSign">
    <div class="appTopOther"></div>
    <x-header :left-options="{showBack: false}" class="header">
      <img src="../../assets/images/返回@3x.png" slot="left" class="fs-backICon" alt @click="goback">
      驳回
    </x-header>
    <section class="ApprovalFlow">
      <ul class="addContent">
        <li class="addContentLi">
          <div>重走流程</div>
          <div class="liRight">
            <div
              class="radio-box"
              v-for="(item,index) in radios"
              :key="index"
              @click="check(index)"
            >
              <div class="flowFlag">
                <img v-if="item.isChecked" src="../../assets/images/椭圆形@2x (2).png" alt>
                <span v-if="!item.isChecked" class="noCheched"></span>
              </div>
              <input
                v-model="radio"
                :value="item.value"
                class="input-radio"
                :checked="item.isChecked"
                type="radio"
              >
              {{item.label}}
            </div>
          </div>
        </li>
        <li class="addContentLi" v-if="isNewGo" @click="getClient">
          <div>流程退回至</div>
          <div class="liRight">{{requestData.linkMan ? requestData.linkMan : '请选择 >'}}</div>
        </li>
      </ul>
    </section>
    <popup v-model="hasClient">
      <popup-header
        left-text="取消"
        right-text="确认"
        title="请选择审批人"
        :show-bottom-border="false"
        @on-click-left="hasClient = false"
        @on-click-right="hasClient = false"
      ></popup-header>
      <group gutter="0">
        <radio :options="clientOptions" @on-change="getOtherChange"></radio>
      </group>
    </popup>
    <section class="ApprovalFlow">
      <group title="审批意见">
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
import { XHeader, XTextarea, Group, Popup, PopupHeader, Radio } from "vux";
import { RejectAction, GetRejectWorkflows, GetToDoHistory } from "@/axios/api";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      clientOptions: [], //联系人选择
      hasClient: false,
      CommentTemp: [],
      tipsWordList: ["信息不完整，需补充", "请与我面谈"],
      isNewGo: false,
      requestData: {
        Entiid: 0, //流程id，预定是28，合同是345。有平台业务主键时传0
        Datakey: "", //在这传空值
        Isstartover: "Return", //是否重走流程，是（Return），否（ReturnNotStartOver）
        Platformkey: "", //父节点传过来的
        Backtoruntflowid: 0, //驳回节点
        Comment: ""
      },
      radio: "1",
      radios: [
        {
          label: "是",
          value: "1",
          isChecked: true
        },
        {
          label: "否",
          value: "2",
          isChecked: false
        }
      ]
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
  name: "WorkFlowReject",
  created() {
    this.onLoad();
  },
  methods: {
    getOtherChange(value) {
      this.requestData.linkMan = value;
      let ATemp = this.FlowsUserList.filter(item => {
        return item.FlowName === value;
      });
      this.requestData.Backtoruntflowid = 0;
      this.requestData.Backtoruntflowid = ATemp[0].RuntFlowId;
    },
    getClient() {
      this.hasClient = !this.hasClient;
    },
    getTip(item) {
      this.CommentTemp.push(item);
      let A = this.CommentTemp.join(",");
      this.requestData.Comment = A;
    },
    check(index) {
      // 先取消所有选中项
      this.radios.forEach(item => {
        item.isChecked = false;
      });
      //再设置当前点击项选中
      this.radio = this.radios[index].value;
      // 设置值，以供传递
      this.radios[index].isChecked = true;
      switch (index) {
        case 0:
          //需要重走流程
          this.isNewGo = false;
          this.requestData.Isstartover = "Return";
          this.requestData.Backtoruntflowid = 0;
          break;
        case 1:
          this.isNewGo = true;
          this.requestData.Isstartover = "ReturnNotStartOver";
          break;
      }
    },
    goback() {
      this.$router.back(-1);
    },
    onLoad() {
      this.requestData.Platformkey = this.$route.params.id;
      let REdata = {
        Entiid: 0,
        Datakey: "",
        Platformkey: this.$route.params.id
      };
      GetRejectWorkflows(REdata).then(res => {
        this.FlowsUserList = res;
        this.FlowsUserList.map(item => {
          this.clientOptions.push(item.FlowName);
        });
      });
    },
    submit() {
      RejectAction(this.requestData).then(res => {
        if (res === "") {
          this.$vux.toast.show({
            text: "成功",
            type: "success"
          });
          this.$router.push({
            name: "affairList"
          });
        } else {
          this.$vux.toast.show({
            text: res.Message,
            type: "warn"
          });
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


