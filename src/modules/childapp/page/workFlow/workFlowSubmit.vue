<template>
  <div class="addSign">
    <div class="appTopOther"></div>
    <x-header :left-options="{showBack: false}" class="header">
      <img src="../../assets/images/返回@3x.png" slot="left" class="fs-backICon" alt @click="goback">
      提交
      <!-- <span slot="right" @click="getAddSgin">{{!!hasAddSign ? '取消': '加签'}}</span> -->
      <span slot="right" v-if="hasAddSign" @click="getAddSgin(0)">取消</span>
      <span slot="right" v-if="!hasAddSign" @click="getAddSgin(1)">加签</span>
    </x-header>
    <section class="ApprovalFlow">
      <div class="contractTitle">审批流程</div>
      <ul class="flowMain">
        <li v-for="(item, index) in flowList" :key="index" :ref="'flowLi' + index">
          <div class="flowLeft">
            <div class="flowLeftFlag">
              <div class="flowFlag">
                <div class="flowCircle"></div>
              </div>
              <div>提交{{item}}</div>
            </div>
            <div class="shuxianBox">
              <div class="shuxian shuxianH38px"></div>
            </div>
          </div>
          <div
            class="flowRight flowRightH100"
            :class="[!!hasAddSign ? 'flowRightW60' : 'flowRightW100']"
          >
            <div class="flowRightTop">
              <div>
                <span>发起人:</span>
                <span class="RightName">张连峰</span>
              </div>
              <span class="getApprove">></span>
            </div>
          </div>
          <div class="addBox" v-show="hasAddSign">
            <div class="addFlag" v-show="hasNewSgin !== index" @click="addNewSgin(index)">+</div>
          </div>
        </li>
        <li ref="addSignLi" v-show="hasNewLi">
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
            <div class="flowRightTop">
              <div>
                <span>审批人:</span>
                <span class="RightName">请选择</span>
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
        </li>
      </ul>
    </section>
    <section class="ApprovalFlow">
      <group title="提交意见">
        <x-textarea placeholder="请填写提交意见" class="textarea" :max="200"></x-textarea>
      </group>
    </section>
    <section class="button">
      <x-button class="submit" @click.native="submit">提交</x-button>
    </section>
  </div>
</template>


<script>
import { XHeader, XTextarea, XButton, Group } from "vux";
import { GetFollowUp, EditFollowUp, DeleteFollowup } from "@/axios/api";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      flowList: [1, 2, 3],
      flowListSelect: "", //选中后的index
      hasAddSign: false, // 加签，取消切换
      hasNewSgin: -1, //控制加号,通过index匹配
      hasNewLi: false, //直接控制加签li显示
      TrackList: [],
      hasNodata: false,
      showMenus: -1,
      menus: {
        menu1: "编辑",
        menu2: "删除"
      },
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
    XButton,
    XTextarea,
    Group
  },
  name: "addSign",
  created() {
    this.onLoad();
  },
  methods: {
    cancelAdd() {
      this.hasNewSgin = -1;
      this.hasNewLi = false;
    },
    ConfirmAdd() {
      this.hasNewSgin = -1;
      this.hasNewLi = false;
      this.flowList.splice(this.flowListSelect + 1, 0, "加签");
    },
    getAddSgin(index) {
      this.hasAddSign = !this.hasAddSign;
      this.hasNewLi = false;
      if (index === 1) {
        this.hasNewSgin = -1;
      }
    },
    addNewSgin(index) {
      this.hasNewSgin = index;
      this.flowListSelect = index; //存起来，用来添加加签后的li
      this.hasNewLi = true;
      let selectDomArr = Object.entries(this.$refs).filter(item => {
        return item[0] === `flowLi${index}`;
      });
      selectDomArr[0][1][0].after(this.$refs.addSignLi);
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
    onLoad() {}
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
      li {
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
              background-color: red;
              // background: rgba(244, 246, 248, 1);
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


