<template>
  <div>
    <div class="appTopOther"></div>
    <x-header :left-options="{showBack: false, preventGoBack: true}" class="header">
      <img src="../../assets/images/返回@3x.png" slot="left" class="fs-backICon" alt @click="goback">
      客户新增
    </x-header>
    <section class="content">
      <div class="group">
        <div class="cientInfo">基本信息</div>
        <li class="groupLi">
          <div class="liLeft">
            <span>客户姓名</span>
            <span class="badge">*</span>
          </div>
          <div class="liRight">
            <input type="text" name id placeholder="请填写" v-model="Customer.Name" required>
          </div>
        </li>
        <li class="groupLi">
          <div class="liLeft">
            <span>手机号码</span>
            <span class="badge">*</span>
          </div>
          <div class="liRight">
            <input
              type="number"
              placeholder="请填写"
              ref="phone"
              v-model="Customer.Phone"
              is-type="china-mobile"
              maxlength="11"
              required
            >
          </div>
        </li>

        <li class="groupLi" @click="chancesource">
          <div class="liLeft">
            <span>性别</span>
          </div>
          <div
            class="liRight"
            :class="[!!Customer.sexText ? 'cellValueClass' : 'placeholderClass']"
          >
            <span>{{!!Customer.sexText ? Customer.sexText : '请选择性别'}}</span>
            <img src="../../assets/images/路径 2 copy.png" class="fs-goaheadICon" alt>
          </div>
        </li>
        <popup v-model="chanceValue">
          <popup-header
            left-text="取消"
            right-text="确认"
            title="请选择联系人性别"
            :show-bottom-border="false"
            @on-click-left="chanceValue = false"
            @on-click-right="chanceValue = false"
          ></popup-header>
          <group gutter="0">
            <radio :options="sexOptions" @on-change="getBusinessChange"></radio>
          </group>
        </popup>
        <li class="groupLi" @click="chanceCom">
          <div class="liLeft">
            <span>是否公司/企业客户</span>
          </div>
          <div
            class="liRight"
            :class="[!!Customer.CustomertypeText ? 'cellValueClass' : 'placeholderClass']"
          >
            <span>{{!!Customer.CustomertypeText ? Customer.CustomertypeText : '请选择公司/企业客户'}}</span>
            <img src="../../assets/images/路径 2 copy.png" class="fs-goaheadICon" alt>
          </div>
        </li>
        <popup v-model="hasComSource">
          <popup-header
            left-text="取消"
            right-text="确认"
            title="请选择公司企业客户"
            :show-bottom-border="false"
            @on-click-left="hasComSource = false"
            @on-click-right="hasComSource = false"
          ></popup-header>
          <group gutter="0">
            <radio :options="comOptions" @on-change="getComChange"></radio>
          </group>
        </popup>
        <li class="groupLi">
          <div class="liLeft">
            <span>备注</span>
          </div>
          <div class="liRight">
            <input type="text" placeholder="请填写" v-model="Customer.Remark" required>
          </div>
        </li>
        <div class="cientInfo">其他联系人</div>
        <li class="groupLi">
          <div class="liLeft">
            <span>客户姓名</span>
          </div>
          <div class="liRight">
            <input
              type="text"
              name
              id
              placeholder="请填写"
              v-model="Customer.Otherinfo[0].Name"
              required
            >
          </div>
        </li>
        <li class="groupLi">
          <div class="liLeft">
            <span>手机号码</span>
          </div>
          <div class="liRight">
            <input
              type="number"
              placeholder="请填写"
              ref="phone"
              v-model="Customer.Otherinfo[0].Mobilephone"
              is-type="china-mobile"
              maxlength="11"
              required
            >
          </div>
        </li>
        <li class="groupLi" @click="chanceOther">
          <div class="liLeft">
            <span>性别</span>
          </div>
          <div
            class="liRight"
            :class="[!!Customer.Otherinfo[0].OtherSexText ? 'cellValueClass' : 'placeholderClass']"
          >
            <span>{{!!Customer.Otherinfo[0].OtherSexText ? Customer.Otherinfo[0].OtherSexText : '请选择性别'}}</span>
            <img src="../../assets/images/路径 2 copy.png" class="fs-goaheadICon" alt>
          </div>
        </li>
        <popup v-model="OtherchanceValue">
          <popup-header
            left-text="取消"
            right-text="确认"
            title="请选择其他联系人性别"
            :show-bottom-border="false"
            @on-click-left="OtherchanceValue = false"
            @on-click-right="OtherchanceValue = false"
          ></popup-header>
          <group gutter="0">
            <radio :options="otherSexOptions" @on-change="getOtherChange"></radio>
          </group>
        </popup>
      </div>
      <section class="button">
        <x-button class="submit" @click.native="submit">保存</x-button>
      </section>
    </section>

    <!-- 警告框 -->
    <confirm v-model="hasConfirm" title="警告" @on-confirm="onConfirm">
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
    <!-- 警告框 -->
    <confirm
      v-model="hasSameConfirm"
      title="警告"
      :show-cancel-button="false"
      @on-confirm="onSameConfirm"
    >
      <p style="text-align:center;">新增姓名相同</p>
    </confirm>
  </div>
</template>

<script>
import {
  EditCustomer,
  GetCustomerDetail,
  GetCustomerDropdown
} from "@/axios/api";
import {
  XHeader,
  Group,
  Radio,
  XInput,
  PopupHeader,
  XButton,
  Confirm,
  Popup,
  Toast
} from "vux";

export default {
  name: "clientAdd",
  components: {
    XHeader,
    Radio,
    Group,
    Popup,
    PopupHeader,
    Toast,
    XButton,
    Confirm,
    XInput
  },
  data() {
    return {
      hasToast: false,
      hasConfirm: false,
      hasMustConfirm: false,
      hasSameConfirm: false,
      clientDeatil: {},
      Customer: {
        Accountid: 0, //新增本联系人为0
        Name: "", //客户名称
        Phone: "", //电话号码
        Sexid: 0, //性别id(不选任何值为0)
        sexText: "",
        Customertypeid: 0, //客户资质(不选任何值为0)
        CustomertypeText: "", //客户资质(不选任何值为0)
        Remark: "", //备注
        Otherinfo: [
          //其他联系人
          {
            Contactid: 0, //新增其他联系人，直接是0
            Name: "",
            Mobilephone: "",
            OtherSexText: "",
            Sexid: 0 //未选择
          }
        ]
      },
      sexOptions: [], //性别
      sexList: [], //实际性别列表
      otherSexList: [], // 其他联系人列表
      otherSexOptions: [], //其他联系人文本列表
      chanceValue: false, // 联系人判断--popup判断
      OtherchanceValue: false,
      hasComSource: false, //商机来源默认值--popup判断
      comSource: [], //公司
      comOptions: [] //
    };
  },

  created() {
    GetCustomerDropdown("").then(res => {
      this.comSource = res.Option.Dropdowncustomertypeid; //公司
      this.sexList = res.Option.Dropdownsexid; //本人联系人性别
      this.otherSexList = res.Option.Dropdownsexid;
      this.sexList.map(item => {
        this.sexOptions.push(item.Text);
      });
      this.comSource.map(item => {
        this.comOptions.push(item.Text);
      });
      this.otherSexList.map(item => {
        this.otherSexOptions.push(item.Text);
      });
    });
  },
  watch: {
    sexOptions() {
      this.$nextTick(() => {
        this.onLoad();
      });
    }
  },
  methods: {
    chancesource() {
      this.chanceValue = !this.chanceValue;
    },
    chanceCom() {
      this.hasComSource = !this.hasComSource;
    },
    chanceOther() {
      this.OtherchanceValue = !this.OtherchanceValue;
    },
    getBusinessChange(value) {
      this.Customer.sexText = value;
      let sextionsSelect = this._.filter(this.sexList, item => {
        return item.Text === value;
      });
      this.Customer.Sexid = sextionsSelect[0].Value;
    },
    getComChange(value) {
      this.Customer.CustomertypeText = value;
      let Select = this._.filter(this.comSource, item => {
        return item.Text === value;
      });
      this.Customer.Customertypeid = Select[0].Value;
    },
    getOtherChange(value) {
      this.Customer.Otherinfo[0].OtherSexText = value;
      let Select = this._.filter(this.otherSexList, item => {
        return item.Text === value;
      });
      this.Customer.Otherinfo.Sexid = Select[0].Value;
    },
    // 没有填完数据直接返回
    goback() {
      this.hasConfirm = !this.hasConfirm;
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
      if (!!this.$route.params.clientDeatil) {
        let clientDeatil = this.$route.params.clientDeatil.Datasource;
        // 数据加载函数
        if (!!clientDeatil) {
          //从详情进来
          this.Customer.Accountid = clientDeatil[0].Accountid;
          this.Customer.Name = clientDeatil[0].Name;
          this.Customer.Phone = clientDeatil[0].Phone;
          this.Customer.Remark = clientDeatil[0].Remark;
          this.Customer.Sexid = clientDeatil[0].Sexid;
          //性别文本
          let ATemp = this._.filter(this.sexList, item => {
            return item.Value === clientDeatil[0].Sexid;
          });
          this.Customer.sexText = ATemp[0].Text;
          //公司文本
          this.Customer.Customertypeid = clientDeatil[0].Customertypeid;
          let BTemp = this._.filter(this.comSource, item => {
            return item.Value === clientDeatil[0].Customertypeid;
          });
          this.Customer.CustomertypeText = BTemp[0].Text;
          // 其他联系人
          this.Customer.Otherinfo[0].Name = clientDeatil[0].Otherinfo[0].Name;
          this.Customer.Otherinfo[0].Contactid =
            clientDeatil[0].Otherinfo[0].Contactid;
          this.Customer.Otherinfo[0].Sexid = clientDeatil[0].Otherinfo[0].Sexid;
          //其他联系人文本
          let CTemp = this._.filter(this.otherSexList, item => {
            return item.Value === clientDeatil[0].Otherinfo[0].Sexid;
          });
          this.Customer.Otherinfo[0].OtherSexText = CTemp[0].Text;
          this.Customer.Otherinfo[0].Mobilephone =
            clientDeatil[0].Otherinfo[0].Mobilephone;
        }
      }
    },

    submit() {
      if (!!this.Customer.Name && !!this.Customer.Phone) {
        if (this.Customer.Phone.length !== 11) {
          this.$vux.toast.show({
            //编辑和新增成功 toast
            text: "请填入正确的电话号码",
            type: "warn",
            onHide() {
              this.hasToast = !this.hasToast;
            }
          });
        } else {
          let data = {
            Customer: this.Customer
          };
          EditCustomer(data).then(res => {
            if (res.Httpstatucode !== 200) {
              this.$vux.toast.show({
                //编辑和新增成功 toast
                text: "新增失败",
                type: "warn"
              });
            } else {
              this.$vux.toast.show({
                text: "成功",
                type: "success"
              });
              this.$router.replace({ name: "clientList" });
            }
          });
        }
      } else {
        this.hasMustConfirm = !this.hasMustConfirm;
      }

      // if (!!this.clientName && !!this.clientPhone) {
      //   //必填项已经填了
      //   if (!!clientDeatil) {
      //     //编辑页面有数据传递过来
      //     Customer = {
      //       Accountid: this.clientDeatil.Datasource[0].Accountid, //一定有ID和姓名、联系电话
      //       Name: this.clientName,
      //       Phone: this.clientPhone,
      //       Sexid:
      //         this.SexSelect || this.clientDeatil.Datasource[0].Sexid || 6502, //有选择后=>有数据=>没有选择没有数据显示未定义性别
      //       Customertypeid:
      //         this.customSelect ||
      //         this.clientDeatil.Datasource[0].Customertypeid ||
      //         0, //没有选择为0
      //       Remark: this.remark
      //     };
      //     if (!!clientDeatil.Datasource[0].Otherinfo) {
      //       // 有其他联系人的数据，
      //       // 没有改变其他联系人 -- 用带来的数据
      //       // 选择了其他联系人 --用改变的数据
      //       Otherinfo = {
      //         Otherinfo: [
      //           {
      //             Contactid: this.clientDeatil.Datasource[0].Otherinfo[0]
      //               .Contactid,
      //             Name:
      //               this.clientOtherName ||
      //               this.clientDeatil.Datasource[0].Otherinfo[0].Name,
      //             Mobilephone:
      //               this.clientOtherPhone ||
      //               this.clientDeatil.Datasource[0].Otherinfo[0].Mobilephone,
      //             Sexid:
      //               this.clientOtherSelectSex ||
      //               this.clientDeatil.Datasource[0].Otherinfo[0].Sexid ||
      //               6502
      //           }
      //         ]
      //       };
      //     } else {
      //       // 编辑页面数据，没有其他联系人
      //       Otherinfo = {
      //         Otherinfo: [
      //           {
      //             Contactid: 0,
      //             Name: this.clientOtherName || 0,
      //             Mobilephone: this.clientOtherPhone || 0,
      //             Sexid: this.clientOtherSelectSex || 6502
      //           }
      //         ]
      //       };
      //     }
      //     Object.assign(Customer, Otherinfo);
      //   } else {
      //     Customer = {
      //       //新增数据
      //       Accountid: 0,
      //       Name: this.clientName,
      //       Phone: this.clientPhone,
      //       Sexid: this.SexSelect || 0, //有选择操作=>没有选择为0
      //       Customertypeid: this.customSelect || 0, //没有选择为0
      //       Remark: this.remark,
      //       Otherinfo: [
      //         {
      //           Contactid: 0, //新增其他联系人，直接是0
      //           Name: this.clientOtherName || "",
      //           Mobilephone: this.clientOtherPhone || "",
      //           Sexid: this.clientOtherSelectSex || 6502 //没选择性别，传递未定义
      //         }
      //       ]
      //     };
      //   }
      //   const data = { Customer };
      //   if (data.Customer.Phone.length !== 11) {
      //     this.$vux.toast.show({
      //       //编辑和新增成功 toast
      //       text: "请填入正确的电话号码",
      //       type: "warn",
      //       onHide() {
      //         this.hasToast = !this.hasToast;
      //       }
      //     });
      //   } else {
      //     EditCustomer(data)
      //       .then(res => {
      //         if (res.Success === false) {
      //           this.$vux.toast.show({
      //             //编辑和新增成功 toast
      //             text: res.Message,
      //             type: "warn"
      //           });
      //         } else {
      //           this.$vux.toast.show({
      //             text: "成功",
      //             type: "success"
      //           });
      //           this.$router.replace({ name: "clientList" });
      //         }
      //       })
      //       .catch(err => {
      //         //姓名相同
      //         this.hasSameConfirm = !this.hasSameConfirm;
      //       });
      //   }
      // } else {
      //   //姓名、电话没填
      //   this.hasMustConfirm = !this.hasMustConfirm;
      // }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/sass/mixin";
input {
  text-align: right;
}
.button {
  @include fj(space-around);
  button {
    @include wh(640px, 88px);
    @include sc(36px, $fc);
    @include borderRadius(44px);
    font-family: $fm;
    margin-top: 40px;
    box-shadow: 0 4px 20px 0 rgba(96, 137, 210, 0.17);
  }
  .submit {
    background-color: rgba(105, 167, 254, 1);
  }
}
</style>

