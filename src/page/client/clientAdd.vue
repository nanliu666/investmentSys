<template>
  <div>
    <x-header :left-options="{backText: ''}" class="header">客户新增</x-header>
    <group label-width="4.5em" label-margin-right="2em" label-align="right">
      <x-input title="客户姓名" placeholder="必填" v-model="clientName" required></x-input>
      <x-input
        title="电话号码"
        placeholder="必填"
        v-model="clientPhone"
        type="number"
        is-type="china-mobile"
        required
      ></x-input>
      <popup-picker
        title="性别"
        :data="Sexlist"
        v-model="SexValue"
        @on-change="onSexChange"
        value-text-align="left"
      ></popup-picker>
      <popup-picker
        title="客户性质"
        :data="customlist"
        v-model="customValue"
        @on-change="onCustomChange"
        value-text-align="left"
      ></popup-picker>
      <x-textarea title="备注" v-model="remark" placeholder="请输入备注"></x-textarea>
    </group>
    <section class="button">
      <x-button class="submit" @click.native="submit" action-type="submit">保存</x-button>
    </section>
    <!-- <toast v-model="hasToast" type="warn" :text="ToastText">请填入必填项</toast> -->
  </div>
</template>

<script>
import { EditCustomer } from "@/axios/api";
import {
  XHeader,
  Group,
  XInput,
  PopupPicker,
  XTextarea,
  XButton,
  Toast
} from "vux";

export default {
  name: "clientAdd",
  components: {
    XHeader,
    Group,
    PopupPicker,
    XTextarea,
    Toast,
    XButton,
    XInput
  },
  data() {
    return {
      ToastText: "",
      hasToast: false,
      clientDeatil: {},
      clientName: "",
      clientPhone: "",
      remark: "",
      Sexlist: [["男", "女", "未定义"]],
      SexValue: [],
      SexSelect: "",
      customlist: [["加盟商", "品牌商", "其它类型"]],
      customValue: [],
      customSelect: ""
    };
  },
  created() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      const clientDeatil = this.$route.params.clientDeatil;
      if (!!clientDeatil) {
        //编辑
        this.clientDeatil = clientDeatil;
        this.clientName = clientDeatil.Datasource[0].Name;
        this.clientPhone = clientDeatil.Datasource[0].Phone;
        this.remark = clientDeatil.Datasource[0].Remark;
        //性别
        const SexValue = clientDeatil.Option.Dropdownsexid.filter(item => {
          return item.Value === clientDeatil.Datasource[0].Sexid;
        });
        this.SexValue.push(SexValue[0].Text);
        //客户性质
        const customValue = clientDeatil.Option.Dropdowncustomertypeid.filter(
          item => {
            return item.Value === clientDeatil.Datasource[0].Customertypeid;
          }
        );
        this.customValue.push(customValue[0].Text);
      } else {
        //完全新增
        this.clientDeatil = "";
        this.clientName = "";
        this.clientPhone = "";
        this.remark = "";
        //性别
        this.SexValue = [];
        //客户性质
        this.customValue = [];
      }
    },
    onSexChange(val) {
      //性别改变处理
      if (!!this.clientDeatil) {
        //有数据传过来
        this.SexSelect = this.clientDeatil.Option.Dropdownsexid.filter(item => {
          return item.Text === val + "";
        })[0].Value;
      } else {
        switch (val + "") {
          case "男":
            this.SexSelect = 406;
            break;
          case "女":
            this.SexSelect = 405;
            break;
          case "未定义":
            this.SexSelect = 6502;
            break;
        }
      }
    },
    onCustomChange(val) {
      if (!!this.clientDeatil) {
        //有数据传过来
        this.customSelect = this.clientDeatil.Option.Dropdowncustomertypeid.filter(
          item => {
            return item.Text === val + "";
          }
        )[0].Value;
      } else {
        switch (val + "") {
          case "加盟商":
            this.SexSelect = 5542;
            break;
          case "品牌商":
            this.SexSelect = 5543;
            break;
          case "其他类型":
            this.SexSelect = 5544;
            break;
        }
      }
    },
    submit() {
      let Customer = {};
      if (!!this.clientName || !!this.clientPhone) {
        if (!!this.clientDeatil) {
          //编辑的数据
          Customer = {
            Accountid: this.clientDeatil.Datasource[0].Accountid || 0,
            Name: this.clientName,
            Phone: this.clientPhone,
            Sexid: this.SexSelect || this.clientDeatil.Datasource[0].Sexid || 0, //有选择后=>有数据=>没有选择没有数据为0
            Customertypeid:
              this.customSelect ||
              this.clientDeatil.Datasource[0].Customertypeid ||
              0, //没有选择为0
            Remark: this.remark
          };
        } else {
          Customer = {
            //新增数据
            Accountid: 0,
            Name: this.clientName,
            Phone: this.clientPhone,
            Sexid: this.SexSelect || 0, //有数据=>没有选择没有数据为0
            Customertypeid: this.customSelect || 0, //没有选择为0
            Remark: this.remark
          };
        }

        //有数据才进入
        const data = { Customer };
        EditCustomer(data)
          .then(res => {
            console.log(res);
            if (!!res) {
              this.$vux.toast.show({
                //编辑和新增成功 toast
                text: '成功',
                type: "success",
                onHide() {
                  this.hasToast = !this.hasToast;
                }
              });
              this.$router.push({name: 'clientList'})
            }
          })
          .catch(err => {
            this.$vux.toast.show({
              //新增姓名相同
              text: err.d.Message,
              type: "warn",
              onHide() {
                this.hasToast = !this.hasToast;
              }
            });
          });
      } else {
        //姓名、电话没填
        this.$vux.toast.show({
          text: "请填入必填项",
          type: "warn",
          onHide() {
            this.hasToast = !this.hasToast;
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/sass/mixin";
.button {
  @include fj(space-around);
  button {
    @include wh(640px, 88px);
    @include sc(36px, $fc);
    @include borderRadius(44px);
    font-family: $familyMedium;
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
</style>

