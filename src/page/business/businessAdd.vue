<template>
  <div class="reservePart">
    <x-header :left-options="{backText: ''}" class="header">
      <img src="../../assets/images/返回@3x.png" slot="left" class="backICon" alt>
      新增商机
    </x-header>
    <section class="content">
      <div class="reseveTitle">
        <div class="danyuan">当前预定单元</div>
        <div class="qi">星月湾·东街二期 &nbsp; 403</div>
      </div>
      <group class="group">
        <div class="cientInfo">客户信息</div>
        <cell is-link>
          <div slot="title" class="phone">
            <span style="vertical-align:middle;">客户姓名</span>
            <badge text="*" class="badge"></badge>
          </div>
          <span
            :class="[!!nameValue ? 'cellValueClass' : 'placeholderClass']"
          >{{!!nameValue ? nameValue : '请选择联系人'}}</span>
        </cell>
        <cell>
          <div slot="title" class="phone">
            <span style="vertical-align:middle;">手机号码</span>
            <badge text="*" class="badge"></badge>
          </div>
          <span
            :class="[!!phoneValue ? 'cellValueClass' : 'placeholderClass']"
          >{{!!nameValue ? phoneValue : '请选择联系人'}}</span>
        </cell>
        <div class="cientInfo">商机信息</div>
        <popup-picker
          title="商机来源"
          :data="chanceSource"
          v-model="chanceValue"
          @on-change="chanceChange"
        ></popup-picker>
        <cell>
          <div slot="title" class="phone">
            <span style="vertical-align:middle;">总面积</span>
          </div>
          <span
            :class="[!!phoneValue ? 'cellValueClass' : 'placeholderClass']"
          >{{!!nameValue ? phoneValue : '暂无面积数'}}</span>
        </cell>
        <cell>
          <div slot="title" class="phone">
            <span style="vertical-align:middle;">预计成交金额</span>
          </div>
          <span
            :class="[!!phoneValue ? 'cellValueClass' : 'placeholderClass']"
          >{{!!nameValue ? phoneValue : '暂无面积数'}}</span>
        </cell>
        <!-- <cell title="预计成交金额" value="¥453.5万"></cell> -->
        <popup-picker
          title="紧急程度"
          :data="urgencyList"
          v-model="urgencyValue"
          @on-change="urgencyChange"
        ></popup-picker>
        <x-textarea title="备注" placeholder="请填写备注" :show-counter="true" :rows="1" v-model="Remark" autosize></x-textarea>
      </group>
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
  XTextarea,
  Badge,
  PopupPicker
} from "vux";

// api
import { EditBizOpportunity, GetBizopprtunityDropdown } from "@/axios/api";

export default {
  name: "reserve",
  data() {
    return {
      Remark: "", //备注
      nameValue: "11",
      OpSource: [], // 商机数据源
      chanceSource: [], //商机处理后的数据源
      chanceValue: [], //商机来源默认值
      Sourceid: "", //商机来源ID
      urgencySource: [], //数据源
      urgencyList: [], //紧急程度处理后的数据源
      urgencyValue: [], //紧急默认值
      Priorityid: "", //紧急情况id
      phoneValue: "",
      unitInfoName: ""
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
    Badge,
    PopupPicker,
    XTextarea
  },
  methods: {
    onLoad() {
      GetBizopprtunityDropdown("").then(res => {
        this.urgencySource = res.Option.Dropdownpriorityid; //紧急程度
        this.OpSource = res.Option.Dropdownsourceid; //商机来源
        //商机来源 数据转化
        this.chanceSource.push(
          this.OpSource.map((item, index) => {
            let newArr = [];
            newArr.push(item.Text);
            return newArr;
          })
        );
        //初始化商机来源默认值，完全新增默认为数据源第一个
        // todo 从楼盘进来就不同情况
        this.chanceValue = this.chanceSource[0][0];

        this.urgencyList.push(
          this.urgencySource.map((item, index) => {
            let newArr = [];
            newArr.push(item.Text);
            return newArr;
          })
        );
        //初始化紧急程度，完全新增默认为数据源第一个
        // todo 从楼盘进来就不同情况
        this.urgencyValue = this.urgencyList[0][0];
      });
    },
    // 商机改变
    chanceChange(value) {
      let A = this.OpSource.filter(function(item) {
        return item.Text === value[0];
      });
      this.Sourceid = A[0].Value;
    },
    // 紧急程度改变
    urgencyChange(value) {
      let A = this.urgencySource.filter(function(item) {
        return item.Text === value[0];
      });
      this.Priorityid = A[0].Value;
    },
    submit() {
      let data = {
        Bizopportunity: {
          Propertyid: 1, //项目
          Companyid: 1, //公司ID
          Prospectid: 0, //商机ID
          Budgetlevelid: 0, //预计成交金额ID
          Unitdesc: 0, //意向单元
          Accountid: 1, //客户id
          Priorityid: this.Priorityid, //紧急程度
          Sourceid: this.Sourceid, //商机来源ID
          Remark: this.Remark
        },
        Units: {
          Jsondata: [
            { Unitid: 78, Unitno: "A207" },
            { Unitid: 78, Unitno: "A208" }
          ]
        }
      };
      console.log(this.Priorityid);
      //发送请求
      // EditBizOpportunity(data).then(res => {
      //   console.log(res);
      // });
      // this.$router.push("/businessList");
    }
  }
};
</script>
<style lang="scss">
@import "src/assets/sass/mixin";
.cellValueClass {
  font-family: $fr;
  @include sc(30px, rgba(30, 30, 30, 1));
}
.placeholderClass {
  font-family: $fr;
  @include sc(30px, rgba(209, 209, 209, 1));
}
</style>
<style scoped lang="scss">
@import "src/assets/sass/mixin";
.reservePart {
  .backICon {
    @include wh(14px, 26px);
  }
  .content {
    .reseveTitle {
      height: 160px;
      padding: 32px 40px;
      margin-bottom: -44px; /*no*/
      background: linear-gradient(
        to left,
        rgba(56, 153, 255, 1),
        rgba(74, 116, 226, 1)
      );
      box-shadow: 0 0 28px 0 rgba(96, 137, 210, 0.17);
      .danyuan {
        @include sc(28px, rgba(255, 255, 255, 1));
        margin-bottom: 10px;
        font-family: $fr;
      }
      .qi {
        @include sc(32px, rgba(255, 255, 255, 1));
        font-family: $fm;
      }
    }
    .cientInfo {
      @include sc(28px, rgba(136, 136, 136, 1));
      // font-family: $fr;
      padding: 16px 40px;
      background-color: $bc;
    }
    .phone {
      font-family: $fr;
      @include sc(30px, rgba(136, 136, 136, 1));
      background-color: #fff;
    }
    .badge {
      background-color: #fff;
      color: red;
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



