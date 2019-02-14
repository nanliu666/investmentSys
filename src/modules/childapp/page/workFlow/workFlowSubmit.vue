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
        <li v-for="(item, index) in flowList" :key="index" :ref="'flowLi' + index">
          <section class="flowMainLi">
            <div class="flowLeft">
              <div class="flowLeftFlag">
                <div class="flowFlag">
                  <div class="flowCircle"></div>
                </div>
                <div>{{item.tittle}}</div>
              </div>
              <div class="shuxianBox">
                <div class="shuxian shuxianH38px"></div>
              </div>
            </div>
            <div
              class="flowRight flowRightH100"
              :class="[!!hasAddSign ? 'flowRightW60' : 'flowRightW100']"
            >
              <div class="flowRightTop" @click="getClient(index)">
                <div>
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
                <div>
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
          :options="clientOptions"
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
import { ActionSubmit, GetSubmitWorkflows } from "@/axios/api";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      Addchecklist: [],
      submitData: {
        Platformkey: "", //提交的时候没有值
        Comment: "", //审批意见
        Entiid: 28, //预定提交28
        Datakey: "AEEC68C1-119B-47F2-A434-79575D9EDF0C", //预定id
        Selectedflows: [
          {
            RuntFlowId: 0,
            FlowName: "提交",
            FlowType: "Cosigner", //顺序审批 Cosigner 同时审批 Approve
            FlowType2: "Add", //Add 新增 Normal正常
            ContextGuid: "3f0907a1-2cfa-424e-bd27-b7217baac77a", //这一条的ID ,要用GUID生成
            ParentContextGuid: "", //父节点id
            Participants: "1539" //传选中的用户ID，用逗号（,）分开
          }
        ]
      },
      FlowsUserList: [], //联系人列表
      getClientIndex: -1, //存第几个审批列表index
      getClientIndexByAdd: -1, //存第几个审批列表index
      hasClient: false,
      hasADDClient: false,
      clientOptions: [], //联系人选择
      flowList: [
        {
          tittle: "提交",
          AddMan: [],
          littleTittle: "提交人",
          hasDelete: false,
          linkMan: "yujing(真机用户)"
        },
        {
          tittle: "审批",
          littleTittle: "审批人",
          AddMan: [],
          hasDelete: false,
          linkMan: ""
        }
      ],
      flowListSelect: "", //选中后的index
      hasAddSign: false, // 加签，取消切换
      hasNewSgin: -1, //控制加号,通过index匹配
      hasNewLi: -1, //直接控制加签li显示
      hasClientByADD: false,
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
    submit() {
      console.log(this.submitData);
      ActionSubmit(this.submitData).then(res => {
        console.log(res);
      });
    },
    getOtherChange(value) {
      this.flowList[this.getClientIndex].linkMan = value;
      // let ATemp = this.FlowsUserList.filter(item => {
      //   return item.Name === value;
      // });
      // console.log(ATemp[0].UId);
    },

    getAddChange(value) {
      if (this.getClientIndexByAdd !== -1) {
        this.flowList[this.getClientIndexByAdd].AddMan = this.Addchecklist;
      }
    },
    getClient(index) {
      this.hasClientByADD = false;
      if (index === 0) return false;
      this.getClientIndex = index;
      this.hasClient = !this.hasClient;
    },
    getClientByAdd(index) {
      this.hasClientByADD = true;
      this.getClientIndexByAdd = index;
      this.hasADDClient = !this.hasADDClient;
    },
    removeAdd(index) {
      this.flowList.splice(index, 1);
    },
    cancelAdd() {
      this.hasNewSgin = -1;
      this.hasNewLi = -1;
    },
    ConfirmAdd() {
      if (!!this.flowList[this.getClientIndexByAdd]) {
        if (this.radio === "1") {
          //顺序审批
          this.Addchecklist.map(item => {
            this.flowList.splice(this.flowListSelect + 1, 0, {
              tittle: "加签",
              littleTittle: "审批人",
              hasDelete: true,
              linkMan: item,
              AddMan: []
            });
          });
        } else {
          //同时审批
          this.flowList.splice(this.flowListSelect + 1, 0, {
            tittle: "加签",
            littleTittle: "审批人",
            hasDelete: true,
            linkMan: this.flowList[this.getClientIndexByAdd].AddMan.join(','),
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
        this.flowList.map(item => (item.hasDelete = false)); //关闭所有垃圾桶
      }
    },
    addNewSgin(index) {
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
    },
    onLoad() {
      this.submitData.Datakey = JSON.parse(
        sessionStorage.getItem("reserveDetail")
      ).Bookid;

      let data = {
        entiId: 28,
        dataKey: "2c066614-c5f4-4f66-823f-5b24d08abe7b",
        userId: 1541 //yujing 账号的ID
      };
      GetSubmitWorkflows(data).then(res => {
        console.log(res);
        this.FlowsUserList = res[0].Flows[0].Users;
        res[0].Flows[0].Users.map(item => {
          this.clientOptions.push(item.Name);
        });
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
            .RightName {
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


