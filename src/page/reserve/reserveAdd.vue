<template>
  <div class="reservePart">
    <div class="appTopOther"></div>

    <x-header :left-options="{showBack: false}" class="header">
      <img src="../../assets/images/返回@3x.png" slot="left" class="fs-backICon" alt @click="goback">
      新增预定
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
          <div
            class="liRight"
            :class="[!!businessNewObj.clientDataName ? 'cellValueClass' : 'placeholderClass']"
          >
            <span>{{!!businessNewObj.clientDataName ? businessNewObj.clientDataName : '请选择联系人'}}</span>
            <img src="../../assets/images/路径 2 copy.png" class="fs-goaheadICon" alt>
          </div>
        </li>
        <li class="groupLi">
          <div class="liLeft">
            <span>手机号码</span>
            <span class="badge">*</span>
          </div>
          <div
            class="liRight"
            :class="[!!businessNewObj.clientDataPhone ? 'cellValueClass' : 'placeholderClass']"
          >
            <span>{{!!businessNewObj.clientDataPhone ? businessNewObj.clientDataPhone : '请选择联系人'}}</span>
          </div>
        </li>
        <div class="cientInfo">单元信息</div>
        <li class="groupLi" @click="getUint">
          <div class="liLeft">
            <span>预定单元</span>
          </div>
          <div
            class="liRight"
            :class="[businessNewObj.Units.Jsondata.length !== 0 ? 'cellValueClass' : 'placeholderClass']"
          >
            <span v-if="businessNewObj.Units.Jsondata.length === 0">请选择意向单元</span>
            <span v-if="businessNewObj.Units.Jsondata.length !== 0" class="liRightContent">
              <span
                v-for="(item, index) in businessNewObj.Units.Jsondata"
                :key="index"
              >{{item.Unitno}}</span>
            </span>
            <img src="../../assets/images/路径 2 copy.png" class="fs-goaheadICon" alt>
          </div>
        </li>
        <li class="groupLi" @click="getStartTime">
          <div class="liLeft">
            <span>预定开始日期</span>
          </div>
          <div
            class="liRight"
            :class="[!!businessNewObj.reseveStartTime ? 'cellValueClass' : 'placeholderClass']"
          >
            <input
              readonly
              type="text"
              placeholder="请选择预定日期"
              style="text-align: right"
              v-model="businessNewObj.reseveStartTime"
            >
            <img src="../../assets/images/路径 2 copy.png" class="fs-goaheadICon" alt>
          </div>
        </li>
        <li class="groupLi" @click="getEndTime">
          <div class="liLeft">
            <span>预定结束日期</span>
          </div>
          <div
            class="liRight"
            :class="[!!businessNewObj.reseveEndTime ? 'cellValueClass' : 'placeholderClass']"
          >
            <input
              readonly
              type="text"
              placeholder="请选择预定日期"
              style="text-align: right"
              v-model="businessNewObj.reseveEndTime"
            >
            <img src="../../assets/images/路径 2 copy.png" class="fs-goaheadICon" alt>
          </div>
        </li>

        <li class="groupLi">
          <div class="liLeft">
            <span>面积(m²)</span>
          </div>
          <div
            class="liRight"
            :class="[!!businessNewObj.unitArea ? 'cellValueClass' : 'placeholderClass']"
          >
            <input
              readonly
              type="number"
              placeholder="请填写面积"
              style="text-align: right"
              v-model="businessNewObj.unitArea"
            >
          </div>
        </li>
        <li class="groupLi">
          <div class="liLeft">
            <span>定金(￥)</span>
          </div>
          <div
            class="liRight"
            :class="[!!businessNewObj.reserveMoney ? 'cellValueClass' : 'placeholderClass']"
          >
            <input
              type="number"
              placeholder="请填写定金金额请求后端补全定金"
              style="text-align: right"
              v-model="businessNewObj.reserveMoney"
            >
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
import { EditBizOpportunity } from "@/axios/api";
import { mapMutations, mapState } from "vuex";
export default {
  name: "reserve",
  data() {
    return {
      nowDate: "",
      nextDate: "",
      businessNewObj: {
        reseveEndTime: "", //预定开始日期
        reseveStartTime: "", //预定结束日期
        reserveMoney: "",
        Prospectid: 0, //商机ID，如果是新增就为0
        Sourceid: "", //商机来源id
        Priorityid: "", //紧急程度id
        Remark: "", //备注
        Propertyid: "", //项目id
        Companyid: "", //公司id
        Accountid: "", //客户id
        clientDataName: "", //客户名称
        unitArea: "",
        clientDataPhone: "", //客户手机
        Units: {
          //选择的单元信息
          Jsondata: []
        }
      },
      hasStatus: false,
      hasUint: false
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
    ...mapState(["uintDetailList", "clientDetail"])
  },
  created() {
    this.onLoad();
  },
  methods: {
    getStartTime() {
      this.$vux.datetime.show({
        cancelText: "取消",
        confirmText: "确定",
        format: "YYYY-MM-DD",
        value: this.nowDate,
        onConfirm: val => {
          this.businessNewObj.reseveStartTime = val;
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
          this.businessNewObj.reseveEndTime = val;
        }
      });
    },
    openStatus() {
      this.hasStatus = !this.hasStatus;
    },
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
    onLoad() {
      this.nowDate = moment(new Date()).format("YYYY-MM-DD");
      this.nextDate = moment(new Date())
        .add(1, "months")
        .format("YYYY-MM-DD");
      if (this.$route.query.from === "unitInfoAll") {
        //从单元所有过来，商机部分有展示
        this.hasUint = !this.hasUint;
      }
      if (this.$route.query.from === "reserveDetail") {
        this.businessNewObj.clientDataName = this.$route.params.data.Accountname;
        this.businessNewObj.Accountid = this.$route.params.data.Accountid;
        this.businessNewObj.clientDataPhone = `预定详情接口没有返回联系人手机号`;
        console.log("===", this.businessNewObj.clientDataName);
      } else {
        this.businessNewObj.clientDataName = this.clientDetail.Name;
        this.businessNewObj.Accountid = this.clientDetail.Accountid; //存起来客户ID
        this.businessNewObj.clientDataPhone = this.clientDetail.Phone;
        if (!!this.uintDetailList && this.uintDetailList.length !== 0) {
          this.businessNewObj.Units.Jsondata = this.uintDetailList;
          let A = this.uintDetailList.map(item => {
            return Number(item.Builduparea);
          });
          this.businessNewObj.unitArea = A.reduce(function(
            prev,
            curr,
            idx,
            arr
          ) {
            return prev + curr;
          });
        }
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
          // @include sc(30px, rgba(209, 209, 209, 1));
        }
      }
    }
  }
}
</style>



