<template>
  <div>
    <div class="appTopOther"></div>
    <x-header
      :left-options="{showBack: false}"
      class="header"
      :right-options="{showMore: true}"
      @on-click-more="showMenus = true"
    >
      <img
        src="../../assets/images/返回@3x.png"
        slot="left"
        class="fs-backICon"
        alt
        @click="goback"
      >
      客户详情
    </x-header>
    <section class="content" v-for="(item, index) in clientDeatil" :key="index">
      <div class="group">
        <div class="cientInfo">基本信息</div>
        <li class="groupLi">
          <div class="liLeft">
            <span>客户姓名</span>
          </div>
          <div class="liRight" :class="[!!item.Name ? 'cellValueClass' : 'placeholderClass']">
            <span>{{!!item.Name ? item.Name : '暂无联系人'}}</span>
          </div>
        </li>
        <li class="groupLi">
          <div class="liLeft">
            <span>手机号码</span>
          </div>
          <div class="liRight" :class="[!!item.Phone ? 'cellValueClass' : 'placeholderClass']">
            <span>{{!!item.Phone ? item.Phone : '暂无联系人电话'}}</span>
          </div>
        </li>
        <li class="groupLi">
          <div class="liLeft">
            <span>客户性别</span>
          </div>
          <div class="liRight" :class="[!!sexText ? 'cellValueClass' : 'placeholderClass']">
            <span>{{!!sexText ? sexText : '暂无联系人性别'}}</span>
          </div>
        </li>
        <li class="groupLi">
          <div class="liLeft">
            <span>客户性质</span>
          </div>
          <div
            class="liRight"
            :class="[!!CustomertypeText ? 'cellValueClass' : 'placeholderClass']"
          >
            <span>{{!!CustomertypeText ? CustomertypeText : '暂无客户性质'}}</span>
          </div>
        </li>
        <li class="groupLi">
          <div class="liLeft">
            <span>备注</span>
          </div>
          <div class="liRight" :class="[!!item.Remark ? 'cellValueClass' : 'placeholderClass']">
            <span>{{!!item.Remark ? item.Remark : '暂无备注'}}</span>
          </div>
        </li>
        <div class="cientInfo">其他联系人</div>
        <li class="groupLi">
          <div class="liLeft">
            <span>姓名</span>
          </div>
          <div
            class="liRight"
            :class="[item.Otherinfo.length !== 0 ? 'cellValueClass' : 'placeholderClass']"
          >
            <span>{{item.Otherinfo.length !== 0 ? item.Otherinfo[0].Name : '暂无其他联系人'}}</span>
          </div>
        </li>
        <li class="groupLi">
          <div class="liLeft">
            <span>手机号码</span>
          </div>
          <div
            class="liRight"
            :class="[item.Otherinfo.length !== 0 ? 'cellValueClass' : 'placeholderClass']"
          >
            <span>{{item.Otherinfo.length !== 0 ? item.Otherinfo[0].Mobilephone : '暂无其他联系人电话'}}</span>
          </div>
        </li>
        <li class="groupLi">
          <div class="liLeft">
            <span>性别</span>
          </div>
          <div
            class="liRight"
            :class="[item.Otherinfo.length !== 0 ? 'cellValueClass' : 'placeholderClass']"
          >
            <span>{{item.Otherinfo.length !== 0 ? OtherSexText : '暂无联系人性别'}}</span>
          </div>
        </li>
      </div>
    </section>

    <actionsheet
      v-model="showMenus"
      :menus="menus"
      @on-click-menu-editor="onEditor"
      @on-click-menu-delete="onDelete"
      show-cancel
    ></actionsheet>
    <alert v-model="alertShow">客户已有业务数据，不能删除！</alert>
  </div>
</template>

<script>
import {
  GetCustomerDetail,
  DeleteCustomer,
  GetCustomerDropdown
} from "@/axios/api";
import { XHeader, Actionsheet, Group, Cell, Alert } from "vux";

export default {
  name: "clientDeatil",
  components: {
    XHeader,
    Group,
    Cell,
    Alert,
    Actionsheet
  },
  data() {
    return {
      alertShow: false,
      clientDeatil: [], //暂存当前客户所有数据
      sexText: "", //联系人性别
      OtherSexText: "", //其他联系人性别
      CustomertypeText: "", //客户性质
      clientDeatilObj: {}, //暂存当前客户所有数据
      menus: {
        editor: "编辑",
        delete: "删除"
      },
      showMenus: false,
      hasToast: false
    };
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "clientAdd") {
      to.meta.isBack = true;
    }
    next();
  },
  created() {
    this.isFirstEnter = true;
  },
  activated() {
    if (!this.$route.meta.isBack || this.isFirstEnter) {
      // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
      // 如果isFirstEnter是true，表明是第一次进入此页面或用户刷新了页面，需获取新数据
      this.clientDeatil = []; // 把数据清空，可以稍微避免让用户看到之前缓存的数据
      this.onLoad(); // ajax获取数据方法
    }
    // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
    this.$route.meta.isBack = false;
    this.isFirstEnter = false;
  },
  watch: {
    clientDeatil() {
      this.$nextTick(() => {
        GetCustomerDropdown("").then(res => {
          this.comSource = res.Option.Dropdowncustomertypeid; //公司
          this.sexList = res.Option.Dropdownsexid; //本人联系人性别
          this.otherSexList = res.Option.Dropdownsexid; //其他联系人
          if (this.clientDeatil.length !== 0) {
            console.log(this.clientDeatil);
            if (this.clientDeatil[0].Sexid !== 0) {
              let ATemp = this._.filter(this.sexList, item => {
                return item.Value === this.clientDeatil[0].Sexid;
              });
              this.sexText = ATemp[0].Text;
            }
            if (this.clientDeatil[0].Customertypeid !== 0) {
              let BTemp = this._.filter(this.comSource, item => {
                return item.Value === this.clientDeatil[0].Customertypeid;
              });
              this.CustomertypeText = BTemp[0].Text;
            }
            if (
              this.clientDeatil[0].Otherinfo.length !== 0 &&
              this.clientDeatil[0].Otherinfo[0].Sexid !== 0
            ) {
              let CTemp = this._.filter(this.otherSexList, item => {
                return item.Value === this.clientDeatil[0].Otherinfo[0].Sexid;
              });
              this.OtherSexText = CTemp[0].Text;
            }
          }
        });
      });
    }
  },
  methods: {
    goback() {
      this.$router.push({name: 'clientList'})
    },
    onLoad() {
      let data = {
        Customer: {
          Accountid: this.$route.params.id
        }
      };
      GetCustomerDetail(data).then(res => {
        this.clientDeatilObj = res;
        this.clientDeatil = res.Datasource;
      });
    },
    // 编辑
    onEditor() {
      //todo 传入数据给新增
      const clientDeatilObj = this.clientDeatilObj;
      localStorage.setItem(
        "clientDeatilObj",
        JSON.stringify(this.clientDeatilObj)
      );
      this.$router.push({
        name: "clientAdd",
        params: { clientDeatilObj },
        query: {
          from: "clientDetail"
        }
      });
    },
    // 删除
    onDelete() {
      const data = {
        Accountid: this.clientDeatil[0].Accountid
      };
      DeleteCustomer(data).then(res => {
        if (res.Success === false) {
          this.$vux.toast.show({
            //新增姓名相同
            text: "客户已有业务数据",
            type: "warn"
          });
          setTimeout(() => {
            this.$router.push({ name: "clientList" });
          }, 3000);
        } else {
          this.$vux.toast.show({
            //新增姓名相同
            text: "删除成功",
            type: "success"
          });
          this.$router.push({ name: "clientList" });
        }
      });
    }
  }
};
</script>

<style lang="sass" scoped>

</style>
