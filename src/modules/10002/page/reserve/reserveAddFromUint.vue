<template>
  <div class="reservePart">
    <div class="appTopOther"></div>
    <x-header :left-options="{showBack: false}" class="header">
      <img src="../../assets/images/返回@3x.png" slot="left" class="fs-backICon" alt @click="gobackByrouter()">
      <span>预定新增</span>
    </x-header>
    <section class="content">
      <div class="reseveTitle">
        <div class="danyuan">当前预定单元</div>
        <div
          class="qi"
        >{{businessNewObj.Companyname}}·{{businessNewObj.Projectname}} &nbsp; {{businessNewObj.Units.Jsondata[0].Unitno}}</div>
        <div class="shangji">
          <div>
            当前铺位已有
            <span class="shangjiNum">&nbsp;{{businessNewObj.Prospectnum}}&nbsp;</span>条可直接载入商机
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
        <li class="groupLi" @click="getStartTime">
          <div class="liLeft">
            <span>预定开始日期</span>
          </div>
          <div
            class="liRight"
            :class="[!!businessNewObj.Bookstartdate ? 'cellValueClass' : 'placeholderClass']"
          >
            <span>{{!!businessNewObj.Bookstartdate ? businessNewObj.Bookstartdate : '请选择预定开始日期'}}</span>
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
            <span>{{!!businessNewObj.Bookexpirydate ? businessNewObj.Bookexpirydate : '请选择预定结束日期'}}</span>
            <img src="../../assets/images/路径 2 copy.png" class="fs-goaheadICon" alt>
          </div>
        </li>

        <li class="groupLi">
          <div class="liLeft">
            <span>面积(m²)</span>
          </div>
          <div
            class="liRight"
            :class="[!!businessNewObj.Builduparea ? 'cellValueClass' : 'placeholderClass']"
          >
            <span>{{!!businessNewObj.Builduparea ? businessNewObj.Builduparea : '暂无面积'}}</span>
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
  name: "reserveAddFromUint",
  data() {
    return {
      hasDanyuan: true,
      nowDate: "",
      nextDate: "",
      businessNewObj: {
        Bookstartdate: '',
        Bookexpirydate: '',
        Prospectid: -1, //商机ID，没有为-1 默认-1
        Bookid: 0, //预定ID，新增为0 -默认0
        Propertyid: "",
        Remark: "", //备注
        Accountid: "", //客户id
        clientDataName: "", //客户名称
        clientDataPhone: "", //客户手机
        Units: {
          //选择的单元信息
          Jsondata: []
        }
      },
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
        startDate: this.nowDate,
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
        startDate: this.nextDate,
        value: this.nextDate,
        onConfirm: val => {
          this.businessNewObj.Bookexpirydate = val;
          console.log("shijian==", this.businessNewObj.Bookexpirydate);
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

    getClient() {
      this.$router.replace({
        name: "clientList",
        params: {
          data: this.$route.params.data
        },
        query: {
          from: "reserveAddFromUint"
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

    unitInfoData() {
      //来自单元信息的数据
      this.hasDanyuan = !this.hasDanyuan;
      this.businessNewObj = Object.assign(
        this.businessNewObj,
        this.$route.params.data
      );
      this.businessNewObj.Propertyid = this.$route.params.data.Projectid; //商机ID
      this.businessNewObj.Units.Jsondata.push({
        Unitid: this.$route.params.data.Unitid,
        Unitno: this.$route.params.data.Unitno
      });
      console.log("cun==", this.businessNewObj);
      this.RESERVEADD(this.businessNewObj);
    },
    onLoad() {
      this.nowDate = moment(new Date()).format("YYYY-MM-DD");
      this.nextDate = moment(new Date())
        .add(1, "months")
        .format("YYYY-MM-DD");
      if (this.$route.query.from === "unitInfoAll") {
        //从预订列表过来，完全新增，所有vux的都清除
        this.CLIENT_DETAIL();
        this.UINT_DETAIL();
        this.RESERVEADD();
      }
      //vux里面有预定对象，渲染数据使用vux的对象
      if (!!this.reserveObj) {
        this.businessNewObj = Object.assign(
          this.businessNewObj,
          this.reserveObj
        );
      }

      if (this.$route.query.from === "unitInfoAll") {
        //从单元信息过来，商机部分有展示
        this.unitInfoData();
      } else {
        if (this.clientDetail) {
          // 选择了联系人
          this.businessNewObj.clientDataName = this.clientDetail.Name;
          this.businessNewObj.Accountid = this.clientDetail.Accountid; //存起来客户ID
          this.businessNewObj.clientDataPhone = this.clientDetail.Phone;
        }
      }
    },
    submit() {
      this.RESERVEADD(this.businessNewObj);
      let data = {
        Reservemgmt: this.businessNewObj,
        Units: this.businessNewObj.Units
      };
      if (
        this.businessNewObj.Bookstartdate >= this.businessNewObj.Bookexpirydate
      ) {
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
