<template>
  <div>
    <x-header
      :left-options="{backText: '', preventGoBack: true}"
      @on-click-back="goback"
      class="header"
    >客户新增</x-header>
    <group title="基本信息" label-width="4.5em" label-margin-right="2em" label-align="right">
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
    <group title="其他联系人" label-width="4.5em" label-margin-right="2em" label-align="right">
      <x-input title="客户姓名" placeholder="请填入其他联系人姓名" v-model="clientOtherName"></x-input>
      <x-input
        title="电话号码"
        placeholder="请填入其他联系人电话"
        v-model="clientOtherPhone"
        type="number"
        is-type="china-mobile"
      ></x-input>
      <popup-picker
        title="性别"
        :data="Sexlist"
        v-model="clientOtherSex"
        @on-change="onOtherSexChange"
        value-text-align="left"
      ></popup-picker>
    </group>
    <section class="button">
      <x-button class="submit" @click.native="submit" action-type="submit">保存</x-button>
    </section>
    <!-- 警告框 -->
    <confirm v-model="hasConfirm" title="警告" @on-cancel="onCancel" @on-confirm="onConfirm">
      <p style="text-align:center;">您的数据还未保存，是否离开?</p>
    </confirm>
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
  Confirm,
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
    Confirm,
    XInput
  },
  data() {
    return {
      ToastText: "",
      hasToast: false,
      hasConfirm: false,
      clientDeatil: {},
      clientName: "",
      clientPhone: "",
      remark: "",
      Sexlist: [["男", "女", "未定义"]],
      SexValue: [], //v-model用的
      SexSelect: "", // 传递数据
      customlist: [["加盟商", "品牌商", "其它类型"]],
      customValue: [],
      customSelect: "",
      clientOtherName: "", //其他联系人
      clientOtherPhone: "",
      clientOtherSex: [], //v-model用的
      clientOtherSelectSex: "" //传递数据
    };
  },
  created() {
    this.onLoad();
  },
  methods: {
    // 没有填完数据直接返回
    goback() {
      this.hasConfirm = !this.hasConfirm;
    },
    // 取消离开
    onCancel() {
      console.log("on cancel");
    },
    // 确定离开
    onConfirm(msg) {
      history.go(-1);
    },
    onLoad() {
      // 数据加载函数
      const clientDeatil = this.$route.params.clientDeatil;
      console.log(clientDeatil);
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
        if (!!clientDeatil.Datasource[0].Otherinfo) {
          //有其他联系人的时候加载的数据
          this.clientOtherName = clientDeatil.Datasource[0].Otherinfo[0].Name;
          this.clientOtherPhone =
            clientDeatil.Datasource[0].Otherinfo[0].Mobilephone;
          const SexValue = clientDeatil.Option.Dropdownsexid.filter(item => {
            return item.Value === clientDeatil.Datasource[0].Otherinfo[0].Sexid;
          });
          this.clientOtherSex.push(SexValue[0].Text);
        } else {
          //没有其他联系人，其他联系人的数据跟着data定义的走
        }
      } else {
        //完全新增的时候，加载为空值
        this.clientDeatil = "";
        this.clientName = "";
        this.clientPhone = "";
        this.remark = "";
        //性别
        this.SexValue = [];
        //客户性质
        this.customValue = [];
        //其他联系人 --姓名
        this.clientOtherName = "";
        //其他联系人 --电话号码
        this.clientOtherPhone = "";
        //其他联系人 --性别
        this.clientOtherSex = [];
      }
    },
    onSexChange(val) {
      //联系人性别改变处理
      if (!!this.clientDeatil) {
        //有数据传过来
        this.SexSelect = this.clientDeatil.Option.Dropdownsexid.filter(item => {
          return item.Text === val + "";
        })[0].Value;
        return this.SexSelect;
      } else {
        switch (val + "") {
          case "男":
            this.SexSelect = 406;
            break;
          case "女":
            this.SexSelect = 405;
            break;
          case "未定义":
            this.SexSelect = 650;
            break;
        }
      }
    },
    onOtherSexChange(val) {
      //  其他联系人性别改变
      if (!!this.clientDeatil) {
        //有数据传过来
        this.clientOtherSelectSex = this.clientDeatil.Option.Dropdownsexid.filter(
          item => {
            return item.Text === val + "";
          }
        )[0].Value;
        return this.clientOtherSelectSex;
      } else {
        switch (val + "") {
          case "男":
            this.clientOtherSelectSex = 406;
            break;
          case "女":
            this.clientOtherSelectSex = 405;
            break;
          case "未定义":
            this.clientOtherSelectSex = 650;
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
            this.customSelect = 5542;
            break;
          case "品牌商":
            this.customSelect = 5543;
            break;
          case "其他类型":
            this.customSelect = 5544;
            break;
        }
      }
    },
    submit() {
      //数据提交函数
      let Customer = {};
      let Otherinfo = [];
      if (!!this.clientName || !!this.clientPhone) {
        //必填项已经填了
        if (!!this.clientDeatil) {
          //编辑页面有数据传递过来
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
          if (!!this.clientDeatil.Datasource[0].Otherinfo) {
            // 有其他联系人，没有改变其他联系人/选择了其他联系人
            console.log("有其他联系人");
            Otherinfo = {
              Otherinfo: [
                {
                  Name:
                    this.clientOtherName ||
                    this.clientDeatil.Datasource[0].Otherinfo.Name,
                  Mobilephone:
                    this.clientOtherPhone ||
                    this.clientDeatil.Datasource[0].Otherinfo.Mobilephone,
                  Sexid:
                    this.clientOtherSelectSex ||
                    this.clientDeatil.Datasource[0].Otherinfo.Sexid
                }
              ]
            };
          } else {
            // 没有其他联系人，而且还没选择其他联系人/选择了其他联系人
            console.log("提交的时候没有其他联系人");
            Otherinfo = {
              Otherinfo: [
                {
                  Name: this.clientOtherName, //选择了
                  Mobilephone: this.clientOtherPhone,
                  Sexid: this.clientOtherSelectSex || 0
                }
              ]
            };
          }
          Object.assign(Customer, Otherinfo);
        } else {
          Customer = {
            //新增数据
            Accountid: 0,
            Name: this.clientName,
            Phone: this.clientPhone,
            Sexid: this.SexSelect || 0, //有选择操作=>没有选择为0
            Customertypeid: this.customSelect || 0, //没有选择为0
            Remark: this.remark,
            // 其他联系人
            Otherinfo: [
              {
                Name: this.clientOtherName || 0,
                Mobilephone: this.clientOtherPhone || 0,
                Sexid: this.clientOtherSelectSex || 0
              }
            ]
          };
        }

        //有数据才进入
        const data = { Customer };
        console.log(Customer);
        EditCustomer(data)
          .then(res => {
            if (!!res) {
              this.$vux.toast.show({
                //编辑和新增成功 toast
                text: "成功",
                type: "success",
                onHide() {
                  this.hasToast = !this.hasToast;
                }
              });
              this.$router.push({ name: "clientList" });
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

