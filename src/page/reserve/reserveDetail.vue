<template>
  <div class="reservePart">
    <div class="appTopOther"></div>
    <x-header
      :left-options="{showBack: false}"
      class="header"
      :right-options="{showMore: true}"
      @on-click-more="showMenus = true"
    >
      <img src="../../assets/images/返回@3x.png" slot="left" class="fs-backICon" alt @click="goback">
      预定详情
    </x-header>
    <actionsheet :menus="menus" v-model="showMenus" show-cancel></actionsheet>
    <section class="content">
      <div class="group">
        <div class="cientInfo">客户信息</div>
        <li class="groupLi">
          <div class="liLeft">
            <span>客户姓名</span>
            <span class="badge">*</span>
          </div>
          <div class="liRight" :class="[!!clientDataName ? 'cellValueClass' : 'placeholderClass']">
            <span>{{!!clientDataName ? clientDataName : '请选择联系人'}}</span>
          </div>
        </li>
        <li class="groupLi">
          <div class="liLeft">
            <span>手机号码</span>
            <span class="badge">*</span>
          </div>
          <div class="liRight" :class="[!!clientDataPhone ? 'cellValueClass' : 'placeholderClass']">
            <span>{{!!clientDataPhone ? clientDataPhone : '请选择联系人'}}</span>
          </div>
        </li>
        <div class="cientInfo">单元信息</div>
        <li class="groupLi" @click="getUint">
          <div class="liLeft">
            <span>预定单元</span>
          </div>
          <div
            class="liRight"
            :class="[businessList.length !== 0 ? 'cellValueClass' : 'placeholderClass']"
          >
            <span v-if="businessList.length === 0">请选择意向单元</span>
            <span v-if="businessList.length !== 0" class="liRightContent">
              <span v-for="(item, index) in businessList" :key="index">{{item}}</span>
            </span>
            <img src="../../assets/images/路径 2 copy.png" class="fs-goaheadICon" alt>
          </div>
        </li>
        <li class="groupLi" @click="getStartTime">
          <div class="liLeft">
            <span>预定开始日期</span>
          </div>
          <div class="liRight" :class="[!!reseveStartTime ? 'cellValueClass' : 'placeholderClass']">
            <input
              readonly
              type="text"
              placeholder="请选择预定日期"
              style="text-align: right"
              v-model="reseveStartTime"
            >
            <img src="../../assets/images/路径 2 copy.png" class="fs-goaheadICon" alt>
          </div>
        </li>
        <li class="groupLi" @click="getEndTime">
          <div class="liLeft">
            <span>预定结束日期</span>
          </div>
          <div class="liRight" :class="[!!reseveEndTime ? 'cellValueClass' : 'placeholderClass']">
            <input
              readonly
              type="text"
              placeholder="请选择预定日期"
              style="text-align: right"
              v-model="reseveEndTime"
            >
            <img src="../../assets/images/路径 2 copy.png" class="fs-goaheadICon" alt>
          </div>
        </li>

        <li class="groupLi">
          <div class="liLeft">
            <span>面积(m²)</span>
          </div>
          <div class="liRight" :class="[!!unitArea ? 'cellValueClass' : 'placeholderClass']">
            <input
              readonly
              type="number"
              placeholder="请填写面积"
              style="text-align: right"
              v-model="unitArea"
            >
          </div>
        </li>
        <li class="groupLi">
          <div class="liLeft">
            <span>定金(￥)</span>
          </div>
          <div class="liRight" :class="[!!unitArea ? 'cellValueClass' : 'placeholderClass']">
            <input type="number" placeholder="请填写定金金额" style="text-align: right" v-model="unitArea">
          </div>
        </li>
        <li class="groupLi">
          <div class="liLeft">
            <span>备注</span>
          </div>
          <div class="liRight" :class="[!!Remark ? 'cellValueClass' : 'placeholderClass']">
            <input
              type="text"
              placeholder="请填写备注"
              style="text-align: right"
              v-model="Remark"
              @input="TextAreaChange()"
            >
          </div>
        </li>
        <popup v-model="chanceValue">
          <popup-header
            left-text="取消"
            right-text="确认"
            title="请选择商机来源"
            :show-bottom-border="false"
            @on-click-left="chanceValue = false"
            @on-click-right="chanceValue = false"
          ></popup-header>
          <group gutter="0">
            <radio :options="radioOptions" @on-change="getBusinessChange"></radio>
          </group>
        </popup>
      </div>
    </section>
  </div>
</template>


<script>
import {
  XHeader,
  Group,
  Actionsheet,
  Picker,
  PopupHeader,
  Radio,
  Datetime,
  Popup
} from "vux";
import { EditBizOpportunity } from "@/axios/api";
import { mapMutations, mapState } from "vuex";
export default {
  name: "reserve",
  data() {
    return {
      showMenus: false,
      menus: {
        menu1: "编辑",
        menu2: "删除"
      },
      nowDate: "",
      nextDate: "",
      reseveStartTime: "",
      reseveEndTime: "",
      businessNewObj: {
        Bizopportunity: {
          Prospectid: 0, //商机ID，如果是新增就为0
          Sourceid: "", //商机来源id
          Priorityid: "", //紧急程度id
          Remark: "", //备注
          Propertyid: "", //项目id
          Companyid: "", //公司id
          Accountid: "", //客户id
          Units: {
            //选择的单元信息
            Jsondata: {}
          }
        }
      },
      hasStatus: false,
      hasUint: "",
      Remark: "", //备注
      clientDataName: "", //姓名
      clientDataPhone: "", //电话
      businessList: [], //当前意向
      radioOptions: [], //商机来源列表
      radioOptionsList: [], //实际商机来源列表
      radioOptionsValue: "", //选中商机来源值
      radioOptionsSelect: [], //选中商机来源值--传递的值
      unitArea: "", //铺位面积
      chanceValue: false //商机来源默认值 --popup判断
    };
  },
  components: {
    XHeader,
    Actionsheet,
    Group,
    Picker,
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
    ...mapState(["uintDetailList", "clientDetail"])
  },
  created() {
    console.log(this.$route.params)
    this.isFirstEnter = true;
    if (!!this.$route.params.data) {
      this.hasUint = !this.hasUint;
    }
    this.onLoad();
    this.nowDate = moment(new Date()).format("YYYY-MM-DD");
    this.nextDate = moment(new Date())
      .add(1, "months")
      .format("YYYY-MM-DD");
  },
  methods: {
    getStartTime() {
      this.$vux.datetime.show({
        cancelText: "取消",
        confirmText: "确定",
        format: "YYYY-MM-DD",
        value: this.nowDate,
        onConfirm: val => {
          this.reseveStartTime = val;
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
          this.reseveEndTime = val;
        }
      });
    },
    openStatus() {
      this.hasStatus = !this.hasStatus;
    },
    TextAreaChange: _.debounce(function() {
      this.businessNewObj.Bizopportunity.Remark = this.Remark; //存起来成交几率
    }, 1000),
    ...mapMutations(["TO_PAGE_NAME", "RESERVEADD"]),
    goback() {
      this.$router.back(-1);
    },

    getUint() {
      this.$router.push({
        name: "unitInfoALL"
      });
    },
    getBusinessChange(value) {
      this.radioOptionsValue = value;
      this.radioOptionsSelect = this._.filter(this.radioOptionsList, item => {
        return item.Text === value;
      });
      this.businessNewObj.Bizopportunity.Sourceid = this.radioOptionsSelect[0].Value; //存起来商机来源
    },
    chancesource() {
      this.chanceValue = !this.chanceValue;
    },
    onLoad() {
      this.clientDataName = this.clientDetail.Name;
      this.businessNewObj.Bizopportunity.Accountid = this.clientDetail.Accountid; //存起来客户ID
      this.clientDataPhone = this.clientDetail.Phone;
      if (!!this.uintDetailList && this.uintDetailList.length !== 0) {
        this.businessNewObj.Bizopportunity.Units.Jsondata = this.uintDetailList; //存起来选择的单元信息
        this.businessList = this.uintDetailList.map(item => {
          return item.Unitno;
        });
        let A = this.uintDetailList.map(item => {
          return Number(item.Builduparea);
        });
        this.unitArea = A.reduce(function(prev, curr, idx, arr) {
          return prev + curr;
        });
      }
    },
    submit() {
      console.log(this.businessNewObj);
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
.fs-backICon {
  @include wh(7px, 13px);
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
        }
      }
    }
  }
}
</style>



