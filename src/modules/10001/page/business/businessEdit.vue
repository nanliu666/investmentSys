<template>
  <div class="reservePart">
    <div class="appTopOther"></div>
    <x-header :left-options="{showBack: false}" class="header">
      <div slot="left" @click="gobackByrouter()" class="fs-backBox">
        <img src="../../assets/images/返回@3x.png" class="fs-backICon" alt>
      </div>商机编辑
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
            :class="[!!businessNewObj.Phone ? 'cellValueClass' : 'placeholderClass']"
          >
            <span>{{!!businessNewObj.Phone ? businessNewObj.Phone : '请选择联系人'}}</span>
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
              <span>{{`${businessNewObj.Companyname}·${businessNewObj.Projectname}`}}</span>
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
            :class="[!!businessNewObj.Sourcename ? 'cellValueClass' : 'placeholderClass']"
          >
            <span>{{!!businessNewObj.Sourcename ? businessNewObj.Sourcename : '商机来源'}}</span>
            <img src="../../assets/images/路径 2 copy.png" class="fs-goaheadICon" alt>
          </div>
        </li>
        <li class="groupLi">
          <div class="liLeft">
            <span>期望铺位面积(m²)</span>
          </div>
          <div
            class="liRight"
            :class="[!!businessNewObj.Expunitarea ? 'cellValueClass' : 'placeholderClass']"
          >
            <input
              type="number"
              placeholder="请填写面积"
              style="text-align: right"
              v-model="businessNewObj.Expunitarea"
            >
          </div>
        </li>
        <li class="groupLi" @click="getUrgencySource">
          <div class="liLeft">
            <span>成交几率(范围)</span>
          </div>
          <div
            class="liRight"
            :class="[!!businessNewObj.Priortyname ? 'cellValueClass' : 'placeholderClass']"
          >
            <span>{{!!businessNewObj.Priortyname ? businessNewObj.Priortyname : '请选择成交几率'}}</span>
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
            @click="getRemark"
          >
            <span class="remark">{{!!businessNewObj.Remark? businessNewObj.Remark: '请填写备注'}}</span>
            <img src="../../assets/images/路径 2 copy.png" class="fs-goaheadICon" alt>
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
        Prospectid: 0, //商机ID，如果是新增就为0
        Sourceid: 0, //商机来源id
        Sourcename: "", //选中商机来源值
        Priorityid: 0, //紧急程度id
        Priortyname: "", //紧急默认值
        Remark: "", //备注
        Propertyid: "", //项目id
        Companyid: "", //公司id
        Accountid: "", //客户id
        Accountname: "", //客户名称
        Expunitarea: "", //面积
        Phone: "", //客户手机
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
    getRemark() {
      this.$router.push({
        name: "reserveRemark",
        params: {
          data: this.businessNewObj
        }
      });
    },
    openStatus() {
      this.hasStatus = !this.hasStatus;
    },
    ...mapMutations(["TO_PAGE_NAME", "RESERVEADD"]),
    getClient() {
      // window.open(
      //   "http://192.168.0.197:8086/10005/index.html#/clientList?from=businessAdd"
      // );
      if (typeof cordova === "object" && typeof cordova.exec === "function") {
        cordova.exec(null, null, "ifcaPlugIns", "openWebviewFunc", [
          { Url: "10005/index.html#/clientList?from=businessAdd" }
        ]);
      } else {
        document.addEventListener(
          "deviceready",
          () => {
            cordova.exec(null, null, "ifcaPlugIns", "openWebviewFunc", [
              { Url: "10005/index.html#/clientList?from=businessAdd" }
            ]);
          },
          false
        );
      }
      // this.$router.replace({
      //   name: "clientList",
      //   query: {
      //     from: "businessEdit"
      //   }
      // });
    },
    getUint() {
      this.$router.replace({
        name: "unitInfoALL",
        query: {
          from: "businessEdit"
        }
      });
    },
    getUrgencyChange(value) {
      this.businessNewObj.Priortyname = value;
      this.urgencyObj = this._.filter(this.urgencySource, item => {
        return item.Text === value;
      });
      this.businessNewObj.Priorityid = this.urgencyObj[0].Value; //存起来成交几率
    },
    getBusinessChange(value) {
      this.businessNewObj.Sourcename = value;
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

    onLoad() {
      if (!!this.reserveObj) {
        this.businessNewObj = Object.assign(
          this.businessNewObj,
          this.reserveObj
        );
        this.businessNewObj.Units.Jsondata = JSON.parse(
          this.reserveObj.Unitinfjson
        );
      }
      console.log(this.uintDetailList);
      if (this.clientDetail) {
        // 选择了联系人
        this.businessNewObj.Accountname = this.clientDetail.Name;
        this.businessNewObj.Accountid = this.clientDetail.Accountid; //存起来客户ID
        this.businessNewObj.Phone = this.clientDetail.Phone;
      }

      if (!!this.uintDetailList && this.uintDetailList.length !== 0) {
        // 选择了单元信息
        this.businessNewObj.Units.Jsondata = this.uintDetailList;
        this.businessNewObj.Propertyid = this.uintDetailList[0].Projectid; //项目ID
        this.businessNewObj.Companyid = this.uintDetailList[0].Companyid;
        this.businessNewObj.Expunitarea = Number(
          this.businessNewObj.Expunitarea
        ).toFixed(0);
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
      if (this.businessNewObj.Units.Jsondata.length === 0) {
        this.$vux.toast.show({
          text: "请选择意向单元",
          type: "warn"
        });
      } else {
        EditBizOpportunity(data).then(res => {
          if (res.Success !== false) {
            this.$vux.toast.show({
              text: "成功！",
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
              text: "失败!",
              type: "warn"
            });
          }
        });
      }
    }
  }
};
</script>
