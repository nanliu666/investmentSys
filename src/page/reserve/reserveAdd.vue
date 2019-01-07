<template>
  <div class="reservePart">
    <x-header :left-options="{backText: ''}" class="header">预定新增</x-header>
    <section class="content">
      <div class="reseveTitle" v-if="hasUint">
        <div class="danyuan">当前预定单元</div>
        <div class="qi">星月湾·东街二期 &nbsp; 403</div>
      </div>
      <group title="客户信息" label-width="4.5em" label-margin-right="2em" label-align="right">
        <cell class="cellLeft" title="客户姓名" :link="{path:'/clientList'}"></cell>
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
      <!-- 警告框 -->
      <confirm
        v-model="hasMustConfirm"
        title="警告"
        :show-cancel-button="false"
        @on-confirm="onMustConfirm"
      >
        <p style="text-align:center;">请填入必选项</p>
      </confirm>
    </section>
  </div>
</template>


<script>
import {
  XHeader,
  Group,
  Cell,
  XInput,
  PopupPicker,
  XTextarea,
  XButton,
  Confirm,
  Toast
} from "vux";

export default {
  name: "reserveAdd",
  components: {
    XHeader,
    Group,
    PopupPicker,
    XTextarea,
    Toast,
    XButton,
    Confirm,
    Cell,
    XInput
  },
  data() {
    return {
      hasUint: false,
      ToastText: "",
      hasToast: false,
      hasConfirm: false,
      hasMustConfirm: false,
      hasSameConfirm: false,
      clientDeatil: {},
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
      clientOtherContactid: "", //其他联系人的ID
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
    // 必填项
    onMustConfirm() {
      this.hasMustConfirm = !this.hasMustConfirm;
    },
    onSameConfirm() {
      this.hasSameConfirm = !this.hasSameConfirm;
    },
    onLoad() {
      // 数据加载函数
      const clientDeatil = this.$route.params.clientDeatil;
      console.log("传递过来的数据=>", clientDeatil);
      if (!!clientDeatil) {
        //编辑的时候
        this.clientDeatil = clientDeatil;
        this.clientPhone = clientDeatil.Datasource[0].Phone;
        this.remark = clientDeatil.Datasource[0].Remark;
        //性别
        const sexID = clientDeatil.Datasource[0].Sexid
          ? clientDeatil.Datasource[0].Sexid
          : 6502;
        const SexValue = clientDeatil.Option.Dropdownsexid.filter(item => {
          //性别有没有选择
          return item.Value === sexID;
        });
        this.SexValue.push(SexValue[0].Text);
        //客户性质
        let customTemp = "";
        if (clientDeatil.Datasource[0].Customertypeid === 0) {
          customTemp = "";
        } else {
          let customValue = clientDeatil.Option.Dropdowncustomertypeid.filter(
            item => {
              return item.Value === clientDeatil.Datasource[0].Customertypeid;
            }
          );
          customTemp = customValue[0].Text; //A为暂存，如果加盟商没有选择为空
        }
        this.customValue.push(customTemp);

        //有其他联系人的时候加载的数据
        if (!!clientDeatil.Datasource[0].Otherinfo) {
          this.clientOtherName = clientDeatil.Datasource[0].Otherinfo[0].Name
            ? clientDeatil.Datasource[0].Otherinfo[0].Name
            : "";
          this.clientOtherContactid = clientDeatil.Datasource[0].Otherinfo[0]
            .Contactid
            ? clientDeatil.Datasource[0].Otherinfo[0].Contactid
            : "";
          this.clientOtherPhone = clientDeatil.Datasource[0].Otherinfo[0]
            .Mobilephone
            ? clientDeatil.Datasource[0].Otherinfo[0].Mobilephone
            : "";
          const sexID = clientDeatil.Datasource[0].Otherinfo[0].Sexid
            ? clientDeatil.Datasource[0].Otherinfo[0].Sexid
            : 6502;
          const SexValue = clientDeatil.Option.Dropdownsexid.filter(item => {
            return item.Value === sexID;
          });
          this.clientOtherSex.push(SexValue[0].Text);
        } else {
          //没有其他联系人，其他联系人的数据跟着data定义的走
        }
      }
    },
    onSexChange(val) {
      //联系人性别改变处理
      const clientDeatil = this.$route.params.clientDeatil;
      if (!!clientDeatil) {
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
            this.SexSelect = 6502;
            break;
        }
      }
    },
    onOtherSexChange(val) {
      //  其他联系人性别改变
      const clientDeatil = this.$route.params.clientDeatil;
      if (!!clientDeatil) {
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
            this.clientOtherSelectSex = 6502;
            break;
        }
      }
    },

    submit() {}
  }
};
</script>

<style scoped lang="scss">
@import "src/assets/sass/mixin";
.reservePart {
  .content {
    .reseveTitle {
      height: 160px;
      padding: 32px 40px;
      .danyuan {
        @include sc(24px, rgba(136, 136, 136, 1));
        margin-bottom: 10px;
        font-family: $familyR;
      }
      .qi {
        @include sc(32px, rgba(30, 30, 30, 1));
        font-family: fm;
      }
    }
    .cellLeft {
      @include sc(30px, rgba(136, 136, 136, 1));

    }
    .button {
      @include fj(space-around);
      button {
        @include wh(320px, 88px);
        @include sc(36px, $fc);
        @include borderRadius(44px);
        font-family: fm;
        margin-top: 40px;
        box-shadow: 0 4px 20px 0 rgba(96, 137, 210, 0.17);
      }
      .save {
        background: linear-gradient(
          to left,
          rgba(120, 202, 255, 1),
          rgba(55, 185, 255, 1)
        );
      }
      .submit {
        background: linear-gradient(
          to left,
          rgba(56, 153, 255, 1),
          rgba(74, 116, 226, 1)
        );
      }
    }
  }
}
</style>


