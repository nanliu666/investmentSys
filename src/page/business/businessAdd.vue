<template>
  <div class="reservePart">
    <div class="appTopOther"></div>
    <x-header :left-options="{showBack: false}" class="header">
      <img src="../../assets/images/返回@3x.png" slot="left" class="fs-backICon" alt @click="goback">
      新增商机
    </x-header>
    <section class="content">
      <div class="reseveTitle" v-if="hasUint">
        <div class="danyuan">当前预定单元</div>
        <div class="qi">星月湾·东街二期 &nbsp; 403</div>
        <div class="shangji">
          <div>
            当前铺位已有
            <span class="shangjiNum">&nbsp;2&nbsp;</span>条可直接载入商机
          </div>
          <div>
            <x-icon type="ios-arrow-down" size="25" v-show="!hasStatus" @click="openStatus"></x-icon>
            <x-icon type="ios-arrow-up" size="25" v-show="hasStatus" @click="openStatus"></x-icon>
          </div>
        </div>
      </div>
      <div class="group">
        <div class="cientInfo">客户信息</div>
        <li class="groupLi" @click="getClient">
          <div class="liLeft">
            <span>客户姓名</span>
            <span class="badge">*</span>
          </div>
          <div class="liRight" :class="[!!clientDataName ? 'cellValueClass' : 'placeholderClass']">
            <span>{{!!clientDataName ? clientDataName : '请选择联系人'}}</span>
            <img src="../../assets/images/路径 2 copy.png" class="fs-goaheadICon" alt>
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
        <div class="cientInfo">商机信息</div>
        <li class="groupLi" @click="getUint">
          <div class="liLeft">
            <span>当前意向</span>
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
        <li class="groupLi" @click="chancesource">
          <div class="liLeft">
            <span>商机来源</span>
          </div>
          <div
            class="liRight"
            :class="[!!radioOptionsValue ? 'cellValueClass' : 'placeholderClass']"
          >
            <span>{{!!radioOptionsValue ? radioOptionsValue : '商机来源'}}</span>
            <img src="../../assets/images/路径 2 copy.png" class="fs-goaheadICon" alt>
          </div>
        </li>
        <li class="groupLi">
          <div class="liLeft">
            <span>期望铺位面积(m²)</span>
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
        <li class="groupLi" @click="getUrgencySource">
          <div class="liLeft">
            <span>成交几率(范围)</span>
          </div>
          <div class="liRight" :class="[!!urgencyValue ? 'cellValueClass' : 'placeholderClass']">
            <span>{{!!urgencyValue ? urgencyValue : '请选择成交几率'}}</span>
            <img src="../../assets/images/路径 2 copy.png" class="fs-goaheadICon" alt>
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
        <popup v-model="hasUrgencySource">
          <popup-header
            left-text="取消"
            right-text="确认"
            title="请选择成交几率"
            :show-bottom-border="false"
            @on-click-left="hasUrgencySource = false"
            @on-click-right="hasUrgencySource = false"
          ></popup-header>
          <group gutter="0">
            <radio :options="urgencyList" @on-change="getUrgencyChange"></radio>
          </group>
        </popup>
      </div>
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
  Cell,
  Picker,
  XButton,
  PopupHeader,
  Radio,
  Popup
} from "vux";
// api
import { EditBizOpportunity, GetBizopprtunityDropdown } from "@/axios/api";
import { mapMutations, mapState } from "vuex";
export default {
  name: "reserve",
  data() {
    return {
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
      chanceValue: false, //商机来源默认值 --popup判断
      hasUrgencySource: false, //商机来源默认值--popup判断
      urgencySource: [], //数据源
      urgencyList: [], //紧急程度处理后的数据源
      urgencyObj: [], //紧急程度被传递的值
      urgencyValue: "" //紧急默认值
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
    Cell,
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
    this.isFirstEnter = true;
    if (this.$route.query.from === 'unitInfoAll') {
      this.hasUint = !this.hasUint;
    }
    this.onLoad();
    console.log(this.$route.params.data)
  },
  methods: {
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
    getClient() {
      this.$router.push({
        name: "clientList"
      });
    },
    getUint() {
      this.$router.push({
        name: "unitInfoALL"
      });
    },
    getUrgencyChange(value) {
      this.urgencyValue = value;
      this.urgencyObj = this._.filter(this.urgencySource, item => {
        return item.Text === value;
      });
      this.businessNewObj.Bizopportunity.Priorityid = this.urgencyObj[0].Value; //存起来成交几率
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
    getUrgencySource() {
      this.hasUrgencySource = !this.hasUrgencySource;
    },
    onLoad() {
      this.clientDataName = this.clientDetail.Name;
      this.businessNewObj.Bizopportunity.Accountid = this.clientDetail.Accountid; //存起来客户ID
      this.clientDataPhone = this.clientDetail.Phone;
      if (this.uintDetailList.length !== 0) {
        console.log(this.uintDetailList)
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
      GetBizopprtunityDropdown("").then(res => {
        this.urgencySource = res.Option.Dropdownpriorityid; //紧急程度
        this.radioOptionsList = res.Option.Dropdownsourceid;
        this.radioOptionsList.map(item => {
          this.radioOptions.push(item.Text);
        });
        this.urgencySource.map(item => {
          this.urgencyList.push(item.Text);
        });
      });
    },
    submit() {
      console.log(this.businessNewObj);
      // EditBizOpportunity().then(res => {
      //   console.log(res);
      // });
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
          // @include sc(30px, rgba(209, 209, 209, 1));
        }
      }
    }
  }
}
</style>



