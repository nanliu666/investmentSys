<template>
  <div class="reservePart">
    <div class="appTopOther"></div>
    <x-header :left-options="{showBack: false}" class="header">
      <img src="../../assets/images/返回@3x.png" slot="left" class="fs-backICon" alt @click="goback">
      <span v-if="hasDeatil">预定详情</span>
      <span v-if="!hasDeatil">预定新增</span>
    </x-header>
    <section class="content">
      <div class="group">
        <div class="cientInfo">客户信息</div>
        <li class="groupLi" @click="getClient">
          <div class="liLeft">
            <span>客户姓名</span>
            <span class="badge">*</span>
          </div>
          <div
            class="liRight"
            :class="[!!businessNewObj.Accountname ? 'cellValueClass' : 'placeholderClass']"
          >
            <span>{{!!businessNewObj.Accountname ? businessNewObj.Accountname : '请选择联系人'}}</span>
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
            :class="[!!businessNewObj.Userphone ? 'cellValueClass' : 'placeholderClass']"
          >
            <span>{{!!businessNewObj.Userphone ? businessNewObj.Userphone : '请选择联系人'}}</span>
          </div>
        </li>
        <div class="cientInfo">单元信息</div>
        <li class="groupLi" @click="getUint" v-if="hasDanyuan">
          <div class="liLeft">
            <span>预定单元</span>
            <span class="badge">*</span>
          </div>
          <div
            class="liRight"
            :class="[unitList.length !== 0 ? 'cellValueClass' : 'placeholderClass']"
          >
            <span v-if="unitList.length === 0">请选择意向单元</span>
            <span v-if="unitList.length !== 0" class="liRightContent">
              <span v-for="(item, index) in unitList" :key="index">{{item.Unitno}}</span>
            </span>
            <img src="../../assets/images/路径 2 copy.png" class="fs-goaheadICon" alt>
          </div>
        </li>
        <li class="groupLi" @click="getStartTime">
          <div class="liLeft">
            <span>预定开始日期</span>
            <span class="badge">*</span>
          </div>
          <div
            class="liRight"
            :class="[!!businessNewObj.Bookstartdate ? 'cellValueClass' : 'placeholderClass']"
          >
            <span
              v-if="!!businessNewObj.Bookstartdate"
            >{{businessNewObj.Bookstartdate | dataFrm('YYYY-MM-DD')}}</span>
            <span v-if="!businessNewObj.Bookstartdate">请选择预定开始日期</span>
            <img src="../../assets/images/路径 2 copy.png" class="fs-goaheadICon" alt>
          </div>
        </li>
        <li class="groupLi" @click="getEndTime">
          <div class="liLeft">
            <span>预定结束日期</span>
            <span class="badge">*</span>
          </div>
          <div
            class="liRight"
            :class="[!!businessNewObj.Bookexpirydate ? 'cellValueClass' : 'placeholderClass']"
          >
            <span
              v-if="!!businessNewObj.Bookexpirydate"
            >{{businessNewObj.Bookexpirydate | dataFrm('YYYY-MM-DD')}}</span>
            <span v-if="!businessNewObj.Bookexpirydate">请选择预定结束日期</span>
            <img src="../../assets/images/路径 2 copy.png" class="fs-goaheadICon" alt>
          </div>
        </li>

        <li class="groupLi">
          <div class="liLeft">
            <span>面积(m²)</span>
          </div>
          <div
            class="liRight"
            :class="[!!businessNewObj.Rentalarea ? 'cellValueClass' : 'placeholderClass']"
          >
            <input
              type="number"
              placeholder="请填写面积"
              style="text-align: right"
              v-model="businessNewObj.Rentalarea"
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
        Prospectid: -1, //商机ID，没有为-1
        Bookid: 0 //预定ID，新增为0
      },
      unitList: [],
      hasStatus: false
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
        startDate: this.nowDate,
        onConfirm: val => {
          this.businessNewObj.Bookstartdate = val;
          console.log(this.businessNewObj.Bookstartdate);
        }
      });
    },
    getEndTime() {
      this.$vux.datetime.show({
        cancelText: "取消",
        confirmText: "确定",
        format: "YYYY-MM-DD",
        value: this.nextDate,
        startDate: this.nextDate,
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
          from: "reserveAdd"
        }
      });
    },
    getUint() {
      this.$router.replace({
        name: "unitInfoALL",
        query: {
          from: "reserveAdd"
        }
      });
    },
    reserveDetailData() {
      //来自预定详情的数据
      this.hasDeatil = !this.hasDeatil;
      this.businessNewObj = this.$route.params.data;
      this.unitList = JSON.parse(this.$route.params.data.Resunitinfjson);
      this.RESERVEADD(this.businessNewObj);
    },
    businessDetailData() {
      //来自商机详情的数据
      this.businessNewObj = this.$route.params.data;
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
        this.businessNewObj = Object.assign(this.businessNewObj, this.reserveObj);
      }
      if (this.$route.query.from === "reserveDetail") {
        //从单元信息过来，商机部分有展示
        this.reserveDetailData();
      } else if (this.$route.query.from === "businessDetail") {
        this.businessDetailData();
      } else {
        if (this.clientDetail) {
          // 选择了联系人
          this.businessNewObj.Accountname = this.clientDetail.Name;
          this.businessNewObj.Accountid = this.clientDetail.Accountid; //存起来客户ID
          this.businessNewObj.Userphone = this.clientDetail.Phone;
        }
        if (!!this.uintDetailList && this.uintDetailList.length !== 0) {
          // 选择了单元信息
          this.unitList = this.uintDetailList;
          this.businessNewObj.Propertyid = this.uintDetailList[0].Projectid; //项目ID
          this.businessNewObj.Companyid = this.uintDetailList[0].Companyid;
          let A = this.uintDetailList.map(item => {
            return Number(item.Builduparea);
          });
          this.businessNewObj.Rentalarea = A.reduce(function(
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
      let data = {
        Reservemgmt: this.businessNewObj,
        Units: {
          Jsondata: this.unitList
        }
      };
      if (
        this.businessNewObj.Bookstartdate >= this.businessNewObj.Bookexpirydate
      ) {
        this.$vux.toast.show({
          text: "开始时间必须小于等于结束时间",
          type: "warn"
        });
      } else if (this.unitList.length === 0) {
        this.$vux.toast.show({
          text: "请选择意向单元",
          type: "warn"
        });
      } else {
        EditReserveMgmt(data).then(res => {
          if (res.Success !== false) {
            this.$vux.toast.show({
              text: "成功！",
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
              text: res.Message,
              type: "warn"
            });
          }
        });
      }
    }
  }
};
</script>

