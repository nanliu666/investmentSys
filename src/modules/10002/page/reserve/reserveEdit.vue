<template>
  <div class="reservePart">
    <div class="appTopOther"></div>
    <x-header :left-options="{showBack: false}" class="header">
      <div slot="left" @click="gobackByrouter()" class="fs-backBox">
        <img src="../../assets/images/返回@3x.png" class="fs-backICon" alt>
      </div>
      预定编辑
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
            <span>{{!!businessNewObj.Userphone ? businessNewObj.Userphone : '请填写联系电话'}}</span>
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
            <span>租赁面积(m²)</span>
          </div>
          <div
            class="liRight"
            :class="[!!businessNewObj.Rentalarea ? 'cellValueClass' : 'placeholderClass']"
          >
            <input
              readonly
              type="number"
              placeholder="请填写租赁面积"
              style="text-align: right"
              v-model="businessNewObj.Rentalarea"
            >
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
  name: "reserve",
  data() {
    return {
      hasRemark: true,
      hasDeatil: false,
      hasDanyuan: true,
      nowDate: "",
      nextDate: "",
      businessNewObj: {
        Bookstartdate: "",
        Bookexpirydate: "",
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
        value: this.nowDate,
        startDate: this.nowDate,
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
        value: this.nextDate,
        startDate: this.nextDate,
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
          from: "reserveEdit"
        }
      });
    },
    getUint() {
      this.$router.replace({
        name: "unitInfoALL",
        query: {
          from: "reserveEdit"
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
        this.unitList = JSON.parse(this.reserveObj.Resunitinfjson);

        console.log("cun===>", this.businessNewObj);
      }
      // if (this.$route.query.from === "businessDetail") {
      //   this.unitList = JSON.parse(this.reserveObj.Unitinfjson);
      //   this.businessNewObj.Userphone = this.reserveObj.Phone;

      //   this.RESERVEADD(this.businessNewObj);
      // }
      this.businessNewObj.Rentalarea = Number(
        this.businessNewObj.Rentalarea
      ).toFixed(0);
      this.RESERVEADD(this.businessNewObj);
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
    },
    submit() {
      this.RESERVEADD(this.businessNewObj);
      this.businessNewObj.Rentalarea = this.businessNewObj.Rentalarea;
      console.log("mianki", this.businessNewObj.Rentalarea);
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
            sessionStorage.setItem(
              "reserveDetail",
              JSON.stringify(res.Datasource[0])
            );
            this.$vux.toast.show({
              text: "成功！",
              type: "success"
            });
            this.$router.push({
              name: "workFlowSubmit"
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
      this.businessNewObj.Rentalarea = this.businessNewObj.Rentalarea;

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

