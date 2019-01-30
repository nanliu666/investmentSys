<template>
  <div class="reservePart">
    <div class="appTopOther"></div>
    <x-header :left-options="{showBack: false}" class="header">
      <img src="../../assets/images/返回@3x.png" slot="left" class="fs-backICon" alt @click="goback">
      <span v-if="hasDeatil">预定详情</span>
      <span v-if="!hasDeatil">预定新增</span>
    </x-header>
    <section class="content">
      <div class="reseveTitle" v-if="hasUint">
        <div class="danyuan">当前预定单元</div>
        <div
          class="qi"
        >{{businessNewObj.Companyname}}·{{businessNewObj.Projectname}} &nbsp; {{businessNewObj.Units.Jsondata[0].Unitno}}</div>
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
        <li class="groupLi" @click="getUint" v-if="hasDanyuan">
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
            :class="[!!businessNewObj.Bookstartdate ? 'cellValueClass' : 'placeholderClass']"
          >
            <input
              readonly
              type="text"
              placeholder="请选择预定日期"
              style="text-align: right"
              v-model="businessNewObj.Bookstartdate"
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
            :class="[!!businessNewObj.Bookexpirydate ? 'cellValueClass' : 'placeholderClass']"
          >
            <input
              readonly
              type="text"
              placeholder="请选择预定日期"
              style="text-align: right"
              v-model="businessNewObj.Bookexpirydate"
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
            :class="[!!businessNewObj.Bookamt ? 'cellValueClass' : 'placeholderClass']"
          >
            <input
              type="number"
              placeholder="请填写定金金额"
              style="text-align: right"
              v-model="businessNewObj.Bookamt"
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
import { EditBizOpportunity, EditReserveMgmt } from "@/axios/api";
import { mapMutations, mapState } from "vuex";
export default {
  name: "reserve",
  data() {
    return {
      hasDeatil: false,
      hasDanyuan: true,
      nowDate: "",
      nextDate: "",
      businessNewObj: {
        Companyname: "", //公司名称
        Projectname: "", //项目名称
        Bookexpirydate: "", //预定开始日期
        Bookstartdate: "", //预定结束日期
        Bookamt: "", //定金
        Prospectid: -1, //商机ID，没有为-1
        Bookid: 0, //预定ID，新增为0
        Remark: "", //备注
        Propertyid: "", //项目id
        Companyid: "", //公司id
        Accountid: "", //客户id
        clientDataName: "", //客户名称
        unitArea: "", //面积
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
    ...mapState(["uintDetailList", "clientDetail", "reserveObj"])
  },
  methods: {
    getStartTime() {
      this.$vux.datetime.show({
        cancelText: "取消",
        confirmText: "确定",
        format: "YYYY-MM-DD",
        value: this.nowDate,
        onConfirm: val => {
          this.businessNewObj.Bookstartdate = val;
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
          this.businessNewObj.Bookexpirydate = val;
        }
      });
    },
    openStatus() {
      this.hasStatus = !this.hasStatus;
    },
    ...mapMutations([
      "CLIENT_DETAIL",
      "RESERVEADD",
      "UINT_DETAIL",
      "TO_PAGE_NAME"
    ]),
    goback() {
      this.$router.back(-1);
    },
    getClient() {
      this.$router.replace({
        name: "clientList",
        params: {
          data: this.$route.params.data
        },
        query: {
          from: "businessAdd"
        }
      });
    },
    getUint() {
      this.$router.replace({
        name: "unitInfoALL",
        query: {
          from: "businessAdd"
        }
      });
    },
    reserveDetailData() {
      //来自预定详情的数据
      this.hasDeatil = !this.hasDeatil;
      this.businessNewObj.clientDataName = this.$route.params.data.Accountname;
      this.businessNewObj.Accountid = this.$route.params.data.Accountid;
      this.businessNewObj.clientDataPhone = this.$route.params.data.Userphone;
      this.businessNewObj.unitArea = this.$route.params.data.Rentalarea;
      this.businessNewObj.Bookstartdate = this.$options.filters.dataFrm(
        this.$route.params.data.Bookexpirydate,
        "YYYY-MM-DD"
      );
      this.businessNewObj.Bookexpirydate = this.$options.filters.dataFrm(
        this.$route.params.data.Bookexpirydate,
        "YYYY-MM-DD"
      );
      this.businessNewObj.Remark = this.$route.params.data.Remark;
      this.businessNewObj.Bookamt = this.$route.params.data.Bookamt;
      this.businessNewObj.Prospectid = this.$route.params.data.Prospectid; //项目ID
      this.businessNewObj.Propertyid = this.$route.params.data.Propertyid; //商机ID
      this.businessNewObj.Companyid = this.$route.params.data.Companyid;
      this.businessNewObj.Units.Jsondata = JSON.parse(
        this.$route.params.data.Resunitinfjson
      );
      this.RESERVEADD(this.businessNewObj);
    },
    businessDetailData() {
      //来自商机详情的数据
      this.businessNewObj.clientDataName = this.$route.params.data.Accountname;
      this.businessNewObj.Accountid = this.$route.params.data.Accountid;
      this.businessNewObj.clientDataPhone = this.$route.params.data.Phone;
      this.businessNewObj.Bookstartdate = this.$options.filters.dataFrm(
        this.$route.params.data.Modifydate,
        "YYYY-MM-DD"
      );
      this.businessNewObj.Bookexpirydate = this.$options.filters.dataFrm(
        this.$route.params.data.Lastdate,
        "YYYY-MM-DD"
      );
      this.businessNewObj.Prospectid = this.$route.params.data.Prospectid; //项目ID
      this.businessNewObj.Propertyid = this.$route.params.data.Propertyid; //商机ID
      this.businessNewObj.Companyid = this.$route.params.data.Companyid;
      this.businessNewObj.Units.Jsondata = JSON.parse(
        this.$route.params.data.Unitinfjson
      );
      this.RESERVEADD(this.businessNewObj);
    },
    onLoad() {
      this.nowDate = moment(new Date()).format("YYYY-MM-DD");
      this.nextDate = moment(new Date())
        .add(1, "months")
        .format("YYYY-MM-DD");
      if (
        this.$route.query.from === "reserveList" ||
        this.$route.query.from === "unitInfoAll"
      ) {
        //从预订列表过来，完全新增，所有vux的都清除
        this.CLIENT_DETAIL();
        this.UINT_DETAIL();
        this.RESERVEADD();
      }
      //vux里面有预定对象，渲染数据使用vux的对象
      if (!!this.reserveObj) {
        this.businessNewObj = this.reserveObj;
      }
      if (this.$route.query.from === "reserveDetail") {
        //从单元信息过来，商机部分有展示
        this.hasUint = !this.hasUint;
        this.reserveDetailData();
      } else if (this.$route.query.from === "businessDetail") {
        this.businessDetailData();
      } else {
        if (this.clientDetail) {
          // 选择了联系人
          this.businessNewObj.clientDataName = this.clientDetail.Name;
          this.businessNewObj.Accountid = this.clientDetail.Accountid; //存起来客户ID
          this.businessNewObj.clientDataPhone = this.clientDetail.Phone;
        }
        if (!!this.uintDetailList && this.uintDetailList.length !== 0) {
          // 选择了单元信息
          this.businessNewObj.Units.Jsondata = this.uintDetailList;
          this.businessNewObj.Propertyid = this.uintDetailList[0].Projectid; //项目ID
          this.businessNewObj.Companyid = this.uintDetailList[0].Companyid;
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
      this.RESERVEADD(this.businessNewObj);
      let TempA = this.$options.filters.dataFrm(
        this.businessNewObj.Bookstartdate,
        "YYYY-MM-DD HH:mm:ss"
      );
      let TempB = this.$options.filters.dataFrm(
        this.businessNewObj.Bookexpirydate,
        "YYYY-MM-DD HH:mm:ss"
      );
      let TempObj = this._.omit(this.businessNewObj, "Units");
      TempObj.Bookstartdate = TempA;
      TempObj.Bookexpirydate = TempB;
      let data = {
        Reservemgmt: TempObj,
        Units: this.businessNewObj.Units
      };
      if (TempObj.Bookstartdate >= TempObj.Bookexpirydate) {
        this.$vux.toast.show({
          text: "开始时间必须小于等于结束时间",
          type: "warn"
        });
      } else if (this.businessNewObj.Units.Jsondata.length === 0) {
        this.$vux.toast.show({
          text: "请选择意向单元",
          type: "warn"
        });
      } else {
        EditReserveMgmt(data).then(res => {
          if (res.Success !== false) {
            this.$vux.toast.show({
              text: "新增成功！",
              type: "success"
            });
            this.$router.push({
              name: "reserveList",
              params: {
                isLoad: true
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



