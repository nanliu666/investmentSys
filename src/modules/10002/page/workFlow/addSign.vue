<template>
  <div class="addSign">
    <div class="appTopOther"></div>
    <x-header :left-options="{showBack: false}" class="header">
      <div slot="left" @click="gobackByrouter()" class="fs-backBox">
        <img src="../../assets/images/返回@3x.png" class="fs-backICon" alt>
      </div>加签
    </x-header>
    <section class="ApprovalFlow">
      <div class="contractTitle">当前位置</div>
      <ul class="flowMain">
        <li>
          <div class="flowLeft">
            <div class="flowFlag">
              <img src="../../assets/images/椭圆形@2x.png" alt>
            </div>
            <span class="iconTittle">待审</span>
            <div class="shuxianBox">
              <div class="shuxian"></div>
            </div>
          </div>
          <div class="flowRight">
            <div class="top">2018-11-12</div>
            <div class="main">
              <div class="mainTop">审批人:{{!!requestData.linkMan ? requestData.linkMan : '暂无当前审批人'}}</div>
            </div>
          </div>
        </li>
      </ul>
    </section>
    <section class="ApprovalFlow">
      <div class="contractTitle">加签内容</div>
      <ul class="addContent">
        <li class="addContentLi">
          <div>加签位置</div>
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
        <li class="addContentLi" @click="getClient">
          <div>加签人</div>
          <div class="liRight">{{requestData.Flowuser ? requestData.Flowuser : '请选择' }} ></div>
        </li>
      </ul>
    </section>
    <section class="ApprovalFlow">
      <group title="本人审批意见">
        <x-textarea placeholder="请填写审批意见" class="textarea" :max="200" v-model="requestData.Comment"></x-textarea>
      </group>
    </section>
    <section class="button">
      <button class="submit" @click="submit">保存</button>
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
  </div>
</template>


<script>
import { XHeader, XTextarea, Group, Popup, PopupHeader, Radio } from "vux";
import { GetUserInfo, AddFlow } from "@/axios/api";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      hasClient: false,
      clientOptions: [], //联系人选择
      clientOptionsList: [], //联系人选择
      requestData: {
        Entiid: 0, //流程id，预定是28，合同是345。有平台业务主键时传0
        Datakey: "",
        Platformkey: "",
        linkMan: "",
        Flowuser: "",
        Flowtype: "Approve",
        Comment: "",
        Currentruntflowid: 0, //当前节点为0,默认为0
        Addtype: "before", //前加签before，后加签after
        Flowuserids: "" //加签人员ID
      },
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
          label: "前",
          value: "1",
          isChecked: true
        },
        {
          label: "后",
          value: "2",
          isChecked: false
        }
      ]
    };
  },
  components: {
    XHeader,
    Popup,
    PopupHeader,
    Radio,
    XTextarea,
    Group
  },
  name: "addSign",
  created() {
    this.onLoad();
  },
  methods: {
    submit() {
      if (!!this.requestData.Flowuserids) {
        AddFlow(this.requestData).then(res => {
          if (res === null) {
            this.$vux.toast.show({
              text: "加签成功",
              type: "success"
            });
            this.$router.push({ name: "affairList" });
          } else {
            this.$vux.toast.show({
              text: res.Message,
              type: "warn"
            });
          }
        });
      } else {
        this.$vux.toast.show({
          text: "请选择加签人",
          type: "warn"
        });
      }
    },
    getOtherChange(value) {
      this.requestData.Flowuser = value;
      let ATemp = this.clientOptionsList.filter(item => {
        return item.Username === value;
      });
      this.requestData.Flowuserids = ATemp[0].Userid;
    },
    getClient(index) {
      this.hasClient = !this.hasClient;
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
          this.requestData.Addtype = "before";
          break;
        case 1:
          this.requestData.Addtype = "after";
          break;
      }
    },
    onLoad() {
      this.requestData.Platformkey = this.$route.params.Platformkey;
      this.requestData.linkMan = this.$route.params.linkMan;
      let data = {
        Urlpara: {
          PageIndex: 1,
          PageSize: 100
        }
      };
      GetUserInfo(data).then(res => {
        this.clientOptionsList = JSON.parse(res.Content);
        this.clientOptionsList.map(item => {
          this.clientOptions.push(item.Username);
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
}
</style>


