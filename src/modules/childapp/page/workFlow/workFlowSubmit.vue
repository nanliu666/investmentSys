<template>
  <div class="addSign">
    <div class="appTopOther"></div>
    <x-header :left-options="{showBack: false}" class="header">
      <img src="../../assets/images/返回@3x.png" slot="left" class="fs-backICon" alt @click="goback">
      提交
      <span slot="right" v-if="hasAddSign" @click="getAddSgin(0)">取消</span>
      <span slot="right" v-if="!hasAddSign" @click="getAddSgin(1)">加签</span>
    </x-header>
    <section class="ApprovalFlow">
      <div class="contractTitle">审批流程</div>
      <ul class="flowMain">
        <li v-for="(item, index) in submitData.Selectedflows" :key="index" :ref="'flowLi' + index">
          <section class="flowMainLi">
            <div class="flowLeft">
              <div class="flowLeftFlag">
                <div class="flowFlag">
                  <div class="flowCircle"></div>
                </div>
                <div>{{item.FlowName}}</div>
              </div>
              <div class="shuxianBox">
                <div class="shuxian shuxianH38px"></div>
              </div>
            </div>
            <div
              class="flowRight flowRightH100"
              :class="[!!hasAddSign ? 'flowRightW60' : 'flowRightW100']"
            >
              <div class="flowRightTop" v-if="item.hasDelete">
                <div class="RightNameDiv">
                  <span>{{item.littleTittle}}:</span>
                  <span class="RightName">{{item.linkMan}}</span>
                </div>
              </div>
              <div class="flowRightTop" v-if="!item.hasDelete" @click="getClient(index)">
                <div class="RightNameDiv">
                  <span>{{item.littleTittle}}:</span>
                  <span class="RightName">{{item.linkMan}}</span>
                </div>
                <span class="getApprove" v-if="index !== 0">></span>
              </div>
            </div>
            <div class="removeAdd" v-if="item.hasDelete" @click="removeAdd(index)">
              <span class="iconfont icon-lajitong"></span>
            </div>
            <div class="addBox" v-show="hasAddSign">
              <div class="addFlag" v-show="hasNewSgin !== index" @click="addNewSgin(index)">+</div>
            </div>
          </section>
          <section ref="addSignLi" class="addSignLi" v-show="hasNewLi === index">
            <div class="flowLeft">
              <div class="flowLeftFlag">
                <div class="flowFlag">
                  <div class="flowCircle"></div>
                </div>
                <div>加签</div>
              </div>
              <div class="shuxianBox">
                <div class="shuxian shuxianH290px"></div>
              </div>
            </div>
            <div class="flowRight flowRightW60 flowRightH60">
              <div class="flowRightTop" @click="getClientByAdd(index)">
                <div class="RightNameDiv">
                  <span>审批人:</span>
                  <span
                    class="RightName"
                  >{{item.AddMan.length !== 0 ? item.AddMan.join(',') : '请选择审批人'}}</span>
                </div>
                <span class="getApprove">></span>
              </div>
              <div class="flowRightBottom">
                <div class="flowOrder">
                  <div>审批顺序:</div>
                  <div class="allRadioBox">
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
                </div>
                <div class="flowButton">
                  <button @click="cancelAdd">取消</button>
                  <button @click="ConfirmAdd">确定</button>
                </div>
              </div>
            </div>
          </section>
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
    <popup v-model="hasADDClient">
      <popup-header
        left-text="取消"
        right-text="确认"
        title="请选择加签人"
        :show-bottom-border="false"
        @on-click-left="hasADDClient = false"
        @on-click-right="hasADDClient = false"
      ></popup-header>
      <group gutter="0">
        <checklist
          required
          :options="clientADDOptions"
          v-model="Addchecklist"
          @on-change="getAddChange"
        ></checklist>
      </group>
    </popup>
    <group title="提交意见">
      <x-textarea placeholder="请填写提交意见" class="textarea" :max="200" v-model="submitData.Comment"></x-textarea>
    </group>
    <section class="button">
      <button class="submit" @click="submit">提交</button>
    </section>
  </div>
</template>


<script>
import {
  XHeader,
  XTextarea,
  XButton,
  Group,
  Popup,
  Radio,
  Checklist,
  PopupHeader
} from "vux";
import { ActionSubmit, GetSubmitWorkflows, GetUserInfo } from "@/axios/api";
import { mapState, mapMutations } from "vuex";
let ENTIID = 28; //表示预定，写死28
export default {
  data() {
    return {
      Addchecklist: [],
      AddLinkManlist: [], //数据
      submitData: {
        Platformkey: "", //提交的时候没有值
        Comment: "", //审批意见
        Entiid: ENTIID, //预定提交28
        Datakey: "", //预定id
        Selectedflows: [
          {
            RuntFlowId: 0,
            FlowName: "提交",
            FlowType: "Approve", //默认为顺序审批 Cosigner 同时审批 Approve
            FlowType2: "Add",
            ContextGuid: "",
            ParentContextGuid: "",
            Participants: [],
            AddMan: [],
            littleTittle: "提交人",
            hasDelete: false,
            linkMan: "yujing(真机用户)"
          }
        ]
      },
      FlowsUserList: [], //联系人列表
      FlowsIndex: -1, //判断是第几条数据
      getClientIndex: -1, //存第几个审批列表index
      getClientIndexByAdd: -1, //存第几个审批列表index
      hasClient: false,
      hasADDClient: false,
      clientOptions: [], //联系人选择
      clientADDOptions: [], //联系人选择
      flowListSelect: "", //选中后的index
      hasAddSign: false, // 加签，取消切换
      hasNewSgin: -1, //控制加号,通过index匹配
      hasNewLi: -1, //直接控制加签li显示
      radio: "1",
      radios: [
        {
          label: "顺序审批",
          value: "1",
          isChecked: true
        },
        {
          label: "同时审批",
          value: "2",
          isChecked: false
        }
      ]
    };
  },
  components: {
    XHeader,
    Checklist,
    XButton,
    Popup,
    PopupHeader,
    Radio,
    Group,
    XTextarea
  },
  name: "addSign",
  created() {
    this.onLoad();
  },
  methods: {
    generateKet() {
      //生成密钥
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
        c
      ) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    },
    submit() {
      let submitData = [].concat(JSON.parse(JSON.stringify(this.submitData))); //拷贝数组
      submitData[0].Selectedflows.shift();
      console.log(submitData[0].Selectedflows);
      // ActionSubmit(this.submitData).then(res => {
      //   if (!!res) {
      //     this.$vux.toast.show({
      //       text: res.Message,
      //       type: "warn"
      //     });
      //   } else {
      //     this.$vux.toast.show({
      //       text: "成功",
      //       type: "success"
      //     });
      //     this.$router.push({ name: "reserveList" });
      //   }
      // });
    },
    onLoad() {
      let reData = {
        Urlpara: {
          Pageindex: 1,
          Pagesize: 100
        }
      };
      GetUserInfo(reData).then(res => {
        this.AddLinkManlist = JSON.parse(res.Content);
        this.AddLinkManlist.map(item => {
          this.clientADDOptions.push(item.Username);
        });
      });
      this.submitData.Datakey = JSON.parse(
        sessionStorage.getItem("reserveDetail")
      ).Bookid;
      let data = {
        Entiid: ENTIID,
        Platformkey: "",
        Datakey: this.submitData.Datakey
      };
      GetSubmitWorkflows(data).then(res => {
        this.FlowsUserList = res[0].Flows;
        this.FlowsUserList.map(item => {
          this.submitData.Selectedflows.push({
            FlowName: item.Text,
            littleTittle: "审批人",
            AddMan: [],
            hasDelete: false,
            RuntFlowId: 0,
            FlowType: item.Type, //默认为顺序审批 Cosigner 同时审批 Approve
            FlowType2: item.FlowType2,
            ContextGuid: item.Id,
            ParentContextGuid: item.PId,
            Participants: [item.Users[0].UId],
            linkMan: item.Users[0].Name
          });
        });
      });
    },
    getOtherChange(value) {
      this.submitData.Selectedflows[this.getClientIndex].linkMan = value;
      let ATemp = this.FlowsUserList[this.getClientIndex - 1].Users.filter(
        item => {
          return item.Name === value;
        }
      );
      this.submitData.Selectedflows[this.getClientIndex].Participants = [];
      this.submitData.Selectedflows[this.getClientIndex].Participants.push(
        ATemp[0].UId
      );
    },
    getAddChange(value) {
      if (this.getClientIndexByAdd !== -1) {
        this.submitData.Selectedflows[
          this.getClientIndexByAdd
        ].AddMan = this.Addchecklist;
      }
    },
    getClient(index) {
      this.clientOptions = [];
      this.FlowsUserList[index - 1].Users.map(item => {
        this.clientOptions.push(item.Name);
      });
      if (index === 0) return false;
      this.getClientIndex = index;
      this.hasClient = !this.hasClient;
    },
    getClientByAdd(index) {
      this.getClientIndexByAdd = index;
      this.hasADDClient = !this.hasADDClient;
    },
    removeAdd(index) {
      this.submitData.Selectedflows.splice(index, 1);
    },
    cancelAdd() {
      this.hasNewSgin = -1;
      this.hasNewLi = -1;
    },
    ConfirmAdd() {
      if (!!this.submitData.Selectedflows[this.getClientIndexByAdd]) {
        if (this.radio === "1") {
          //顺序审批
          this.Addchecklist.map(item => {
            this.submitData.Selectedflows.splice(this.flowListSelect + 1, 0, {
              RuntFlowId: 0,
              FlowType: "Cosigner", //默认为顺序审批 Cosigner 同时审批 Approve
              FlowType2: "Add",
              ContextGuid: "",
              ParentContextGuid: "",
              Participants: [],
              FlowName: "加签",
              littleTittle: "审批人",
              hasDelete: true,
              linkMan: item,
              AddMan: []
            });
          });
        } else {
          //同时审批
          this.submitData.Selectedflows.splice(this.flowListSelect + 1, 0, {
            RuntFlowId: 0,
            FlowType: "Approve", //默认为顺序审批 Cosigner 同时审批 Approve
            FlowType2: "Add",
            ContextGuid: "",
            ParentContextGuid: "",
            Participants: [],
            FlowName: "加签",
            littleTittle: "审批人",
            hasDelete: true,
            linkMan: this.submitData.Selectedflows[
              this.getClientIndexByAdd
            ].AddMan.join(","),
            AddMan: []
          });
        }
        this.hasNewLi = -1;
        this.hasNewSgin = -1;
      } else {
        this.$vux.toast.show({
          text: "请选择审批人",
          type: "cancel"
        });
      }
    },
    getAddSgin(index) {
      this.hasAddSign = !this.hasAddSign;
      this.hasNewLi = -1;
      if (index === 1) {
        this.hasNewSgin = -1; //关闭所有加号
      } else {
        this.submitData.Selectedflows.map(item => (item.hasDelete = false)); //关闭所有垃圾桶
      }
    },
    addNewSgin(index) {
      this.FlowsIndex = index;
      this.hasNewSgin = index;
      this.flowListSelect = index; //存起来，用来添加加签后的li
      this.hasNewLi = index;
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
    },
    goback() {
      this.$router.back(-1);
    }
  }
};
</script>

<style scoped lang="scss">
@import "src/assets/sass/mixin";
.addSign {
  height: 100%;
  .ApprovalFlow {
    .contractTitle {
      @include fj;
      @include sc(28px, rgba(136, 136, 136, 1));
      padding: 20px 40px;
    }
    .flowMain {
      background-color: #fff;
      padding: 30px 40px 0;
      font-family: $fr;
      .flowMainLi,
      .addSignLi {
        position: relative;
        height: 100%;
        @include fd;
        &:last-child {
          .shuxian {
            width: 0 !important;
          }
        }
        .flowLeft {
          width: 20%;
          height: 100%;
          @include fd(column);
          margin-right: 24px;
          .flowLeftFlag {
            height: 20%;
            @include fd(column);
            @include flexCenter;
            @include sc(28px, rgba(136, 136, 136, 1));
            font-family: $fr;
            margin-bottom: 4px;
            .flowFlag {
              @include wh(46px, 46px);
              background-color: rgb(230, 237, 247);
              border-radius: 23px;
              @include flexCenter;
              margin-bottom: 10px;
              .flowCircle {
                @include wh(18px, 18px);
                border-radius: 8px;
                background-color: rgba(105, 167, 254, 1);
              }
            }
          }
          .shuxianBox {
            left: 0;
            width: 100%;
            @include flexWCenter;
            margin-bottom: 10px;
            .shuxian {
              padding: 6px 0;
              width: 2px;
              background: rgba(244, 246, 248, 1);
            }
            .shuxianH38px {
              height: 38px;
            }
            .shuxianH290px {
              height: 290px;
            }
          }
        }
        .flowRight {
          position: relative;
          &::before {
            content: "";
            position: absolute;
            right: 100%;
            top: 26px;
            width: 0;
            height: 0;
            border-top: 13px solid transparent;
            border-right: 26px solid rgba(243, 247, 253, 1);
            border-bottom: 13px solid transparent;
          }
          @include fd(column);
          background-color: rgba(243, 247, 253, 1);
          font-family: $fr;
          margin-bottom: 30px;
          // @include flexHCenter;
          padding: 0 40px;
          @include sc(30px, rgba(136, 136, 136, 1));
          .flowRightTop {
            @include fj;
            margin-bottom: 10px;
            height: 100px;
            line-height: 100px;
            width: 100%;
            .RightNameDiv {
              width: 100%;
              @include fj;
              span:first-child {
                width: 30%;
              }
            }
            .RightName {
              display: inline;
              width: 70%;
              @include ellipsis;
              @include sc(30px, rgba(30, 30, 30, 1));
            }
            .getApprove {
              float: right;
            }
          }
          .flowRightBottom {
            @include fd(column);
            .flowOrder {
              border-top: 1px solid rgba(154, 182, 221, 0.3);
              padding: 20px 0;
              @include fj;
              .allRadioBox {
                @include fd(column);
                .radio-box {
                  @include fj;
                  position: relative;
                  margin-bottom: 30px;
                  height: 42px;
                  @include flexCenter;
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
            .flowButton {
              border-top: 1px solid rgba(154, 182, 221, 0.3);
              padding: 40px 0 20px;
              @include fj(space-around);
              button {
                @include wh(158px, 60px);
                border-radius: 30px;
                border: 1px solid rgba(105, 167, 254, 0.5);
                background-color: #fff;
                @include sc(30px, rgba(105, 167, 254, 1));
                @include flexCenter;
                font-family: $fr;
              }
            }
          }
        }
        .flowRightW100 {
          width: 100%;
        }
        .flowRightW60 {
          width: 60%;
        }
        .flowRightH100 {
          height: 100px;
        }
        .flowRightH60 {
          height: 356px;
        }
        .removeAdd {
          margin-bottom: 10px;
          height: 100px;
          line-height: 100px;
          margin: 0 28px;
        }
        .addBox {
          position: absolute;
          right: 0;
          @include flexCenter;
          height: 100px;

          .addFlag {
            @include wh(42px, 42px);
            border-radius: 21px;
            border: 4px solid rgba(105, 167, 254, 1);
            @include sc(42px, rgba(105, 167, 254, 1));
            @include flexCenter;
          }
        }
      }
    }
  }
  .button {
    @include fj(space-around);
    button {
      @include wh(640px, 88px);
      @include sc(36px, $fc);
      @include borderRadius(44px);
      font-family: $fm;
      margin-top: 40px;
      box-shadow: 0 4px 20px 0 rgba(96, 137, 210, 0.17);
    }
    .submit {
      background: rgba(105, 167, 254, 1);
    }
  }
}
</style>


