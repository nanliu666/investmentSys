<template>
  <div class="reservePart">
    <div class="appTopOther"></div>
    <x-header :left-options="{showBack: false}" class="header">
      <img src="../../assets/images/返回@3x.png" slot="left" class="fs-backICon" alt @click="goback">
      <span v-if="hasDeatil">商机详情</span>
      <span v-if="!hasDeatil">新增商机</span>
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
        <div class="cientInfo">商机信息</div>
        <li class="groupLi" @click="getUint">
          <div class="liLeft">
            <span>当前意向</span>
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
        <li class="groupLi" @click="chancesource">
          <div class="liLeft">
            <span>商机来源</span>
          </div>
          <div
            class="liRight"
            :class="[!!businessNewObj.radioOptionsValue ? 'cellValueClass' : 'placeholderClass']"
          >
            <span>{{!!businessNewObj.radioOptionsValue ? businessNewObj.radioOptionsValue : '商机来源'}}</span>
            <img src="../../assets/images/路径 2 copy.png" class="fs-goaheadICon" alt>
          </div>
        </li>
        <li class="groupLi">
          <div class="liLeft">
            <span>期望铺位面积(m²)</span>
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
        <li class="groupLi" @click="getUrgencySource">
          <div class="liLeft">
            <span>成交几率(范围)</span>
          </div>
          <div
            class="liRight"
            :class="[!!businessNewObj.urgencyValue ? 'cellValueClass' : 'placeholderClass']"
          >
            <span>{{!!businessNewObj.urgencyValue ? businessNewObj.urgencyValue : '请选择成交几率'}}</span>
            <img src="../../assets/images/路径 2 copy.png" class="fs-goaheadICon" alt>
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
      hasDeatil: false,
      businessNewObj: {
        Prospectid: 0, //商机ID，如果是新增就为0
        Sourceid: "", //商机来源id
        radioOptionsValue: "", //选中商机来源值
        Priorityid: "", //紧急程度id
        urgencyValue: "", //紧急默认值
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
      businessList: [], //当前意向
      radioOptions: [], //商机来源列表
      radioOptionsList: [], //实际商机来源列表
      radioOptionsSelect: [], //选中商机来源值--传递的值
      chanceValue: false, //商机来源默认值 --popup判断
      hasUrgencySource: false, //商机来源默认值--popup判断
      urgencySource: [], //数据源
      urgencyList: [], //紧急程度处理后的数据源
      urgencyObj: [] //紧急程度被传递的值
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
    ...mapState(["uintDetailList", "clientDetail", "reserveObj"])
  },
  created() {
    this.isFirstEnter = true;
    this.onLoad();
  },
  methods: {
    openStatus() {
      this.hasStatus = !this.hasStatus;
    },
    ...mapMutations(["TO_PAGE_NAME", "RESERVEADD"]),
    goback() {
      this.$router.back(-1);
    },
    getClient() {
      this.$router.replace({
        name: "clientList",
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
    getUrgencyChange(value) {
      this.businessNewObj.urgencyValue = value;
      this.urgencyObj = this._.filter(this.urgencySource, item => {
        return item.Text === value;
      });
      this.businessNewObj.Priorityid = this.urgencyObj[0].Value; //存起来成交几率
    },
    getBusinessChange(value) {
      this.businessNewObj.radioOptionsValue = value;
      this.radioOptionsSelect = this._.filter(this.radioOptionsList, item => {
        return item.Text === value;
      });
      this.businessNewObj.Sourceid = this.radioOptionsSelect[0].Value; //存起来商机来源
    },
    chancesource() {
      this.chanceValue = !this.chanceValue;
    },
    getUrgencySource() {
      this.hasUrgencySource = !this.hasUrgencySource;
    },
    ...mapMutations([
      "CLIENT_DETAIL",
      "RESERVEADD",
      "UINT_DETAIL",
      "TO_PAGE_NAME"
    ]),
    businessDetailData() {
      //来自商机详情详情的数据
      this.hasDeatil = !this.hasDeatil;
      this.businessNewObj.clientDataName = this.$route.params.data.Accountname;
      this.businessNewObj.Accountid = this.$route.params.data.Accountid;
      this.businessNewObj.clientDataPhone = this.$route.params.data.Phone;
      this.businessNewObj.unitArea = this.$route.params.data.Rentalarea;
      this.businessNewObj.Remark = this.$route.params.data.Remark;
      this.businessNewObj.Prospectid = this.$route.params.data.Prospectid; //商机ID
      this.businessNewObj.Propertyid = this.$route.params.data.Propertyid; // 项目ID
      this.businessNewObj.Companyid = this.$route.params.data.Companyid;
      this.businessNewObj.Units.Jsondata = JSON.parse(
        this.$route.params.data.Unitinfjson
      );
      this.RESERVEADD(this.businessNewObj);
    },
    unitInfoData() {
      //来自单元信息的数据
      this.businessNewObj.Prospectid = 0, // 新增商机
      this.businessNewObj.unitArea = this.$route.params.data.Builduparea; //面积
      this.businessNewObj.Propertyid = this.$route.params.data.Projectid; //项目ID
      this.businessNewObj.Companyid = this.$route.params.data.Companyid; //公司ID
      this.businessNewObj.Units.Jsondata.push({
        Unitid: this.$route.params.data.Unitid,
        Unitno: this.$route.params.data.Unitno
      });
      this.RESERVEADD(this.businessNewObj);
    },
    onLoad() {
      if (
        this.$route.query.from === "businessList" ||
        this.$route.query.from === "unitInfoAll"
      ) {
        this.CLIENT_DETAIL();
        this.UINT_DETAIL();
        this.RESERVEADD();
      }
      if (this.$route.query.from === "unitInfoAll") {
        this.unitInfoData();
      }
      if (!!this.reserveObj) {
        this.businessNewObj = this.reserveObj;
      }
      if (this.clientDetail) {
        // 选择了联系人
        this.businessNewObj.clientDataName = this.clientDetail.Name;
        this.businessNewObj.Accountid = this.clientDetail.Accountid; //存起来客户ID
        this.businessNewObj.clientDataPhone = this.clientDetail.Phone;
      }

      if (this.$route.query.from === "businessDetail") {
        // 来自预定详情的数据处理
        this.businessDetailData();
      }
      if (!!this.uintDetailList && this.uintDetailList.length !== 0) {
        // 选择了单元信息
        this.businessNewObj.Units.Jsondata = this.uintDetailList;
        this.businessNewObj.Propertyid = this.uintDetailList[0].Projectid; //项目ID
        this.businessNewObj.Companyid = this.uintDetailList[0].Companyid;
        let A = this.uintDetailList.map(item => {
          return Number(item.Builduparea);
        });
        this.businessNewObj.unitArea = A.reduce(function(prev, curr, idx, arr) {
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
      this.RESERVEADD(this.businessNewObj);
      let TempObj = this._.omit(this.businessNewObj, "Units");
      let data = {
        Bizopportunity: TempObj,
        Units: this.businessNewObj.Units
      };
      if (!!this.businessNewObj.Sourceid === false) {
        this.$vux.toast.show({
          text: "请选择商机来源",
          type: "warn"
        });
      } else if (this.businessNewObj.Units.Jsondata.length === 0) {
        this.$vux.toast.show({
          text: "请选择意向单元",
          type: "warn"
        });
      } else if (!!this.businessNewObj.Priorityid === false) {
        this.$vux.toast.show({
          text: "请选择成交几率",
          type: "warn"
        });
      } else {
        EditBizOpportunity(data).then(res => {
          if (res.Success !== false) {
            this.$vux.toast.show({
              text: "新增成功！",
              type: "success"
            });
            this.$router.push({
              name: "businessList",
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
