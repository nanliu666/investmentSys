<template>
  <div class="reservePart">
    <div class="appTopOther"></div>
    <x-header :left-options="{showBack: false}" class="header">
      <img
        src="../../assets/images/返回@3x.png"
        slot="left"
        class="fs-backICon"
        alt
        @click="gobackByrouter()"
      >
      <span>预定新增</span>
    </x-header>
    <section class="content">
      <div class="reseveTitle">
        <div class="danyuan">当前预定单元</div>
        <div
          class="qi"
        >{{businessNewObj.Companyname}}·{{businessNewObj.Projectname}} &nbsp; {{businessNewObj.Unitno}}</div>
        <div class="shangji">
          <div>
            当前铺位已有
            <span class="shangjiNum">&nbsp;{{businessNewObj.Prospectnum}}&nbsp;</span>条可直接载入商机
          </div>
          <div>
            <span class="imgBox" @click="openStatus">
              <img
                src="../../assets/images/dropDown.png"
                class="fs-dropDownImg"
                v-show="!hasStatus"
                alt
              >
            </span>
            <span class="imgBox" @click="openStatus">
              <img
                src="../../assets/images/dropDown.png"
                class="fs-dropDownImg"
                style="transform:rotate(180deg);"
                v-show="hasStatus"
                alt
              >
            </span>
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
            <span>{{!!businessNewObj.clientDataPhone ? businessNewObj.clientDataPhone : '请填写手机号码'}}</span>
          </div>
        </li>
        <div class="cientInfo">单元信息</div>
        <li class="groupLi" @click="getStartTime">
          <div class="liLeft">
            <span>预定开始日期</span>
            <span class="badge">*</span>
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
            <span class="badge">*</span>
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
            <span class="badge">*</span>
          </div>
          <div
            class="liRight"
            :class="[!!businessNewObj.Bookamt ? 'cellValueClass' : 'placeholderClass']"
          >
            <input
              @input="BookamtChange"
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
            @click="getRemark"
          >
            <span class="remark">{{!!businessNewObj.Remark? businessNewObj.Remark: '请填写备注'}}</span>
            <img
              v-if="hasRemark"
              src="../../assets/images/路径 2 copy.png"
              class="fs-goaheadICon"
              alt
            >
          </div>
        </li>
      </div>
      <section class="Xbutton">
        <x-button class="save" @click.native="save">保存</x-button>
        <x-button class="submit" @click.native="submit">提交</x-button>
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
      hasRemark: true,
      nowDate: "",
      nextDate: "",
      businessNewObj: {
        Bookstartdate: "",
        Bookexpirydate: "",
        Prospectid: -1, //商机ID，没有为-1 默认-1
        Bookid: 0, //预定ID，新增为0 -默认0
        Propertyid: "",
        Remark: "", //备注
        Accountid: "", //客户id
        clientDataName: "", //客户名称
        clientDataPhone: "", //客户手机
        Units: {
          //选择的单元信息
          Jsondata: [{ Unitid: "", Unitno: "" }]
        }
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
    BookamtChange() {
      this.RESERVEADD(this.businessNewObj);
    },
    getRemark() {
      this.$router.push({
        name: "reserveRemark",
        params: {
          data: this.businessNewObj
        }
      });
    },
    getStartTime() {
      this.$vux.datetime.show({
        cancelText: "取消",
        confirmText: "确定",
        format: "YYYY-MM-DD",
        startDate: this.nowDate,
        value: this.nowDate,
        onConfirm: val => {
          this.businessNewObj.Bookstartdate = val;
          this.RESERVEADD(this.businessNewObj);
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
          this.RESERVEADD(this.businessNewObj);
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
    onLoad() {
      this.nowDate = moment(new Date()).format("YYYY-MM-DD");
      this.nextDate = moment(new Date())
        .add(1, "months")
        .format("YYYY-MM-DD");

      //vux里面有预定对象，渲染数据使用vux的对象
      if (!!this.reserveObj) {
        this.businessNewObj = Object.assign(
          this.businessNewObj,
          this.reserveObj
        );
        console.log("===", this.reserveObj);
        this.businessNewObj.Units.Jsondata[0].Unitid = this.reserveObj.Unitid;
        this.businessNewObj.Units.Jsondata[0].Unitno = this.reserveObj.Unitno;
        this.businessNewObj.Propertyid = this.reserveObj.Projectid; //项目ID
      }
      if (this.$route.query.from === "businessDetail") {
        // this.businessNewObj.Units.Jsondata[0].Unitno = this.reserveObj.Unitno;
        console.log("zheshicanshu====>", this.businessNewObj);
      }
      if (this.clientDetail) {
        // 选择了联系人
        this.businessNewObj.clientDataName = this.clientDetail.Name;
        this.businessNewObj.Accountid = this.clientDetail.Accountid; //存起来客户ID
        this.businessNewObj.clientDataPhone = this.clientDetail.Phone;
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
    },
    save() {
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
