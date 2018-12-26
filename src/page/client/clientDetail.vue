<template>
  <div>
    <x-header
      :left-options="{backText: ''}"
      class="header"
      :right-options="{showMore: true}"
      @on-click-more="showMenus = true"
    >客户详情</x-header>
    <group label-width="4.5em" label-margin-right="2em" label-align="right">
      <cell title="客户姓名" :value="clientName" value-align="left"></cell>
      <cell title="电话号码" :value="clientPhone" value-align="left"></cell>
      <cell title="性别" :value="clientSex" value-align="left"></cell>
      <cell title="客户性质" :value="clientType" value-align="left"></cell>
      <cell title="备注" :value="clientRemark" value-align="left"></cell>
    </group>
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
import { GetCustomerDetail, DeleteCustomer } from "@/axios/api";
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
      clientDeatil: {}, //暂存当前客户所有数据
      clientSex: "",
      clientName: "",
      clientPhone: "",
      clientRemark: "",
      clientType: "",
      menus: {
        editor: "编辑",
        delete: "删除"
      },
      showMenus: false,
      hasToast: false
    };
  },
  //todo 路由离开之前，详情页面会再次触发一次请求数据?怎么解决不清楚
  created() {
    this.isFirstEnter = true;
    this.onLoad();
  },
  activated() {
    if (!this.$route.meta.isBack || this.isFirstEnter) {
      // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
      // 如果isFirstEnter是true，表明是第一次进入此页面或用户刷新了页面，需获取新数据
      this.data = ""; // 把数据清空，可以稍微避免让用户看到之前缓存的数据
      this.onLoad(); // ajax获取数据方法
    }
    // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
    this.$route.meta.isBack = false;
    this.isFirstEnter = false;
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "clientAdd") {
      to.meta.isBack = true;
    }
    next();
  },
  methods: {
    onLoad() {
      let data = {
        Customer: {
          Accountid: this.$route.params.id
        }
      };
      GetCustomerDetail(data).then(res => {
        this.clientDeatil = res;
        if (!!res) {
          this.clientRemark = res.Datasource[0].Remark;
          this.clientName = res.Datasource[0].Name;
          this.clientPhone = res.Datasource[0].Phone;
          const Sex = this._.filter(
            res.Option.Dropdownsexid,
            item => item.Value === res.Datasource[0].Sexid
          )[0];
          this.clientSex = !!JSON.stringify(Sex) ? Sex.Text : "";
          const Type = this._.filter(
            res.Option.Dropdowncustomertypeid,
            item => item.Value === res.Datasource[0].Customertypeid
          )[0];
          this.clientType = !!JSON.stringify(Type) ? Type.Text : "";
        }
      });
    },
    // 编辑
    onEditor() {
      //todo 传入数据给新增
      const clientDeatil = this.clientDeatil;
      this.$router.push({ name: "clientAdd", params: { clientDeatil } });
    },
    // 删除
    onDelete() {
      const data = {
        Accountid: this.clientDeatil.Datasource[0].Accountid
      };
      DeleteCustomer(data)
        .then(res => {
          console.log(res);
          if (!!res) {
            this.$router.push({ name: "clientList" });
            this.$vux.toast.show({
              //新增姓名相同
              text: "删除成功",
              type: "success",
              onHide() {
                this.hasToast = !this.hasToast;
              }
            });
          }
        })
        .catch(err => {
          this.alertShow = !this.alertShow;
        });
    }
  }
};
</script>

<style lang="sass" scoped>

</style>
