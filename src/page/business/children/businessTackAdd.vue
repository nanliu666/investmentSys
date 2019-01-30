<template>
  <div class="reservePart">
    <div class="appTopOther"></div>
    <x-header :left-options="{showBack: false}" class="header">
      <img
        src="../../../assets/images/返回@3x.png"
        slot="left"
        class="fs-backICon"
        alt
        @click="goback"
      >
      <span v-if="hasDeatil">跟踪详情</span>
      <span v-if="!hasDeatil">新增跟踪</span>
    </x-header>
    <section class="content">
      <div class="group">
        <div class="cientInfo">跟踪信息</div>
        <li class="groupLi" @click="getStartTime">
          <div class="liLeft">
            <span>跟踪时间</span>
          </div>
          <div
            class="liRight"
            :class="[!!businessNewObj.Followupdate ? 'cellValueClass' : 'placeholderClass']"
          >
            <input
              readonly
              type="text"
              placeholder="请选择预定日期"
              style="text-align: right"
              v-model="businessNewObj.Followupdate"
            >
            <img src="../../../assets/images/路径 2 copy.png" class="fs-goaheadICon" alt>
          </div>
        </li>
        <li class="groupLi" @click="getEndTime">
          <div class="liLeft">
            <span>下次跟踪时间</span>
          </div>
          <div
            class="liRight"
            :class="[!!businessNewObj.Nextfollowupdate ? 'cellValueClass' : 'placeholderClass']"
          >
            <input
              readonly
              type="text"
              placeholder="请选择预定日期"
              style="text-align: right"
              v-model="businessNewObj.Nextfollowupdate"
            >
            <img src="../../../assets/images/路径 2 copy.png" class="fs-goaheadICon" alt>
          </div>
        </li>
        <li class="groupLi" @click="chancesource">
          <div class="liLeft">
            <span>跟踪方式</span>
          </div>
          <div
            class="liRight"
            :class="[!!businessNewObj.radioOptionsValue ? 'cellValueClass' : 'placeholderClass']"
          >
            <span>{{!!businessNewObj.radioOptionsValue ? businessNewObj.radioOptionsValue : '请选择跟踪方式'}}</span>
            <img src="../../../assets/images/路径 2 copy.png" class="fs-goaheadICon" alt>
          </div>
        </li>
        <li class="groupLi" @click="getUrgencySource">
          <div class="liLeft">
            <span>跟踪状态</span>
          </div>
          <div
            class="liRight"
            :class="[!!businessNewObj.urgencyValue ? 'cellValueClass' : 'placeholderClass']"
          >
            <span>{{!!businessNewObj.urgencyValue ? businessNewObj.urgencyValue : '请选择跟踪方式'}}</span>
            <img src="../../../assets/images/路径 2 copy.png" class="fs-goaheadICon" alt>
          </div>
        </li>
        <li class="groupLi">
          <div class="liLeft">
            <span>备注</span>
          </div>
          <div
            class="liRight"
            :class="[!!businessNewObj.Remark ? 'cellValueClass' : 'placeholderClass']"
          >
            <input
              type="text"
              placeholder="请填写备注"
              style="text-align: right"
              v-model="businessNewObj.Remark"
            >
          </div>
        </li>
      </div>
      <popup v-model="chanceValue">
        <popup-header
          left-text="取消"
          right-text="确认"
          title="请选择跟踪方式"
          :show-bottom-border="false"
          @on-click-left="chanceValue = false"
          @on-click-right="chanceValue = false"
        ></popup-header>
        <group gutter="0">
          <radio :options="radioOptions" @on-change="getBusinessChange"></radio>
        </group>
      </popup>
      <popup v-model="hasUrgencySource">
        <popup-header
          left-text="取消"
          right-text="确认"
          title="请选择跟踪状态"
          :show-bottom-border="false"
          @on-click-left="hasUrgencySource = false"
          @on-click-right="hasUrgencySource = false"
        ></popup-header>
        <group gutter="0">
          <radio :options="urgencyList" @on-change="getUrgencyChange"></radio>
        </group>
      </popup>
      <section class="button">
        <x-button class="submit" @click.native="submit">保存</x-button>
      </section>
    </section>
  </div>
</template>


<script>
import {
  XHeader,
  Group,
  Picker,
  XButton,
  PopupHeader,
  Radio,
  Datetime,
  Popup
} from "vux";
// api
import { GetFollowupDropdown, EditFollowUp } from "@/axios/api";
import { mapMutations, mapState } from "vuex";
export default {
  name: "businessTackAdd",
  data() {
    return {
      hasDeatil: false,
      nowDate: "",
      nextDate: "",
      businessNewObj: {
        Followupdate: "", //跟踪日期
        Nextfollowupdate: "", //下次跟踪时间
        Prospectid: 0, //商机ID，没有为0
        Followuptypeid: "", //跟踪方式id
        radioOptionsValue: "", //选中跟踪方式默认值
        Probabilityid: "", //跟踪状态ID
        urgencyValue: "", //选中跟踪方式默认值
        Remark: "" //备注
      },
      radioOptions: [], //跟踪状态列表
      radioOptionsList: [], //实际跟踪状态列表
      radioOptionsSelect: [], //选中跟踪状态值--传递的值
      hasUrgencySource: false, //商机来源默认值--popup判断
      urgencySource: [], //数据源
      urgencyList: [], //紧急程度处理后的数据源
      urgencyObj: [], //紧急程度被传递的值
      hasStatus: false,
      chanceValue: false
    };
  },
  created() {
    this.onLoad();
  },
  components: {
    XHeader,
    Group,
    Picker,
    XButton,
    Datetime,
    PopupHeader,
    Popup,
    Radio
  },
  beforeRouteLeave(to, from, next) {
    this.TO_PAGE_NAME(from.name); //离开的时候在vuex存起来本组件的路由名称
    next();
  },
  computed: {
    ...mapState(["reserveObj"])
  },
  methods: {
    getUrgencyChange(value) {
      this.businessNewObj.urgencyValue = value;
      this.urgencyObj = this._.filter(this.urgencySource, item => {
        return item.Text === value;
      });
      this.businessNewObj.Probabilityid = this.urgencyObj[0].Value; //存起来跟踪状态
    },
    getUrgencySource() {
      this.hasUrgencySource = !this.hasUrgencySource;
    },
    chancesource() {
      this.chanceValue = !this.chanceValue;
    },
    getBusinessChange(value) {
      this.businessNewObj.radioOptionsValue = value;
      this.radioOptionsSelect = this._.filter(this.radioOptionsList, item => {
        return item.Text === value;
      });
      this.businessNewObj.Followuptypeid = this.radioOptionsSelect[0].Value; //存起来跟踪状态
    },
    getStartTime() {
      this.$vux.datetime.show({
        cancelText: "取消",
        confirmText: "确定",
        format: "YYYY-MM-DD",
        value: this.nowDate,
        onConfirm: val => {
          this.businessNewObj.Followupdate = val;
        }
      });
    },
    getEndTime() {
      this.$vux.datetime.show({
        cancelText: "取消",
        confirmText: "确定",
        format: "YYYY-MM-DD",
        value: this.nextDate,
        onConfirm: val => {
          this.businessNewObj.Nextfollowupdate = val;
        }
      });
    },
    ...mapMutations(["RESERVEADD", "TO_PAGE_NAME"]),
    goback() {
      this.$router.back(-1);
    },
    TrackDeatilData() {
      //来自预定详情的数据
      this.hasDeatil = !this.hasDeatil;
      this.businessNewObj.Followupdate = this.$options.filters.dataFrm(
        this.$route.params.data.Followupdate,
        "YYYY-MM-DD"
      );
      this.businessNewObj.Nextfollowupdate = this.$options.filters.dataFrm(
        this.$route.params.data.Nextfollowupdate,
        "YYYY-MM-DD"
      );
      this.businessNewObj.Remark = this.$route.params.data.Remark;
      this.businessNewObj.Propertyid = this.$route.params.data.Propertyid; //商机ID
      this.businessNewObj.Prospectfollowupid = this.$route.params.data.Prospectfollowupid; //跟踪ID
      this.businessNewObj.radioOptionsValue = this.$route.params.data.Followuptype; //跟踪方式
      this.businessNewObj.Followuptypeid = this.$route.params.data.Followuptypeid; //跟踪方式ID
      this.businessNewObj.urgencyValue = this.$route.params.data.Probability; //跟踪状态
      this.businessNewObj.Probabilityid = this.$route.params.data.Probabilityid; //跟踪状态ID
      this.RESERVEADD(this.businessNewObj);
    },
    onLoad() {
      this.nowDate = moment(new Date()).format("YYYY-MM-DD");
      this.nextDate = moment(new Date())
        .add(1, "months")
        .format("YYYY-MM-DD");
      this.businessNewObj.Prospectid = this.$route.params.data.Prospectid;
      if (this.$route.query.from === "businessTrackDeatil") {
        this.TrackDeatilData()
      }
      GetFollowupDropdown("").then(res => {
        this.urgencySource = res.Option.Dropdownprobabilityid; //跟踪方式
        this.radioOptionsList = res.Option.Dropdownfollowuptypeid; //跟踪状态
        this.radioOptionsList.map(item => {
          this.radioOptions.push(item.Text);
        });
        this.urgencySource.map(item => {
          this.urgencyList.push(item.Text);
        });
      });
    },
    submit() {
      this.RESERVEADD(this.businessNewObj);
      let data = {
        Followup: this.businessNewObj
      };
      EditFollowUp(data).then(res => {
        if (res.Success !== false) {
          this.$vux.toast.show({
            text: "新增成功！",
            type: "success"
          });
          this.$router.push({
            name: "businessTrackList",
            params: {
              isLoad: true,
              id: this.$route.params.data.Prospectid
            }
          });
        } else {
          this.$vux.toast.show({
            text: "新增失败!",
            type: "warn"
          });
        }
      });
    }
  }
};
</script>
<style lang="scss">
@import "src/assets/sass/mixin";
.cellValueClass {
  font-family: $fr;
  @include sc(30px, rgba(30, 30, 30, 1));
}
.placeholderClass {
  font-family: $fr;
  @include sc(30px, rgba(209, 209, 209, 1));
}

.fs-goaheadICon {
  margin-left: 4px;
  @include wh(6px, 10px);
}
</style>
<style scoped lang="scss">
@import "src/assets/sass/mixin";
.reservePart {
  .content {
    .reseveTitle {
      background-color: #fff;
      .danyuan {
        @include sc(30px, rgba(136, 136, 136, 1));
        padding: 32px 40px 0;
        margin-bottom: 10px;
        font-family: $fr;
      }
      .qi {
        @include sc(34px, rgba(30, 30, 30, 1));
        padding: 0 40px;
        font-family: $fm;
        border-bottom: 2px solid rgb(244, 246, 248);
      }
      .shangji {
        @include fj(space-between);
        @include wh(100%, 96px);
        @include flexHCenter;
        padding: 0 40px;
        font-family: $fr;
        @include sc(32px, rgba(136, 136, 136, 1));
        .shangjiNum {
          @include sc(32px, rgba(105, 167, 254, 1));
        }
      }
    }
    .cientInfo {
      @include sc(28px, rgba(136, 136, 136, 1));
      padding: 16px 40px;
      background-color: $bc;
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
        background: linear-gradient(
          to left,
          rgba(56, 153, 255, 1),
          rgba(74, 116, 226, 1)
        );
      }
    }
    .group {
      .groupLi {
        background-color: #fff;
        @include wh(100%, 96px);
        @include fj;
        padding: 0 40px;
        @include flexHCenter;
        border-bottom: 4px solid #f4f6f8;
        .liLeft {
          width: 36%;
          @include fj(flex-start);
          @include sc(30px, rgba(136, 136, 136, 1));
          .badge {
            margin-left: 4px;
            @include flexCenter;
            background-color: #fff;
            color: red;
          }
        }
        .liRight {
          @include fj(flex-end);
          @include flexHCenter;
          width: 64%;
          .liRightContent {
            text-align: right;
            width: 100%;
            @include ellipsis;
            span {
              margin-left: 5px;
            }
          }
          input {
            width: 100%;
          }
          // @include sc(30px, rgba(209, 209, 209, 1));
        }
      }
    }
  }
}
</style>



