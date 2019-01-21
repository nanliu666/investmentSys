<template>
  <div class="reservePart">
    <x-header :left-options="{showBack: false}" class="header">
      <img src="../../assets/images/返回@3x.png" slot="left" class="fs-backICon" alt @click="goback">
      新增商机
    </x-header>
    <section class="content">
      <div class="reseveTitle">
        <div class="danyuan">当前预定单元</div>
        <div class="qi">星月湾·东街二期 &nbsp; 403</div>
      </div>
      <div class="group">
        <div class="cientInfo">客户信息</div>
        <li class="groupLi" @click="getClient">
          <div class="liLeft">
            <span>客户姓名</span>
            <span class="badge">*</span>
          </div>
          <div class="liRight" :class="[!!nameValue ? 'cellValueClass' : 'placeholderClass']">
            <span>{{!!nameValue ? nameValue : '请选择联系人'}}</span>
            <img src="../../assets/images/路径 2 copy.png" class="fs-goaheadICon" alt>
          </div>
        </li>
        <li class="groupLi">
          <div class="liLeft">
            <span>手机号码</span>
            <span class="badge">*</span>
          </div>
          <div class="liRight" :class="[!!nameValue ? 'cellValueClass' : 'placeholderClass']">
            <span>{{!!nameValue ? nameValue : '请选择联系人'}}</span>
          </div>
        </li>
        <div class="cientInfo">商机信息</div>
        <li class="groupLi">
          <div class="liLeft">
            <span>当前意向</span>
          </div>
          <div class="liRight" :class="[!!nameValue ? 'cellValueClass' : 'placeholderClass']">
            <span>{{!!nameValue ? nameValue : '请选择联系人'}}</span>
          </div>
        </li>
        <li class="groupLi" @click="chancesource">
          <div class="liLeft">
            <span>商机来源</span>
          </div>
          <div class="liRight" :class="[!!nameValue ? 'cellValueClass' : 'placeholderClass']">
            <span>{{!!nameValue ? nameValue : '请选择联系人'}}</span>
            <img src="../../assets/images/路径 2 copy.png" class="fs-goaheadICon" alt>
          </div>
        </li>
        <li class="groupLi">
          <div class="liLeft">
            <span>期望铺位面积(m²)</span>
          </div>
          <div class="liRight" :class="[!!nameValue ? 'cellValueClass' : 'placeholderClass']">
            <span>{{!!nameValue ? nameValue : '请选择联系人'}}</span>
          </div>
        </li>
        <li class="groupLi">
          <div class="liLeft">
            <span>成交几率(范围)</span>
          </div>
          <div class="liRight" :class="[!!nameValue ? 'cellValueClass' : 'placeholderClass']">
            <span>{{!!nameValue ? nameValue : '请选择联系人'}}</span>
            <img src="../../assets/images/路径 2 copy.png" class="fs-goaheadICon" alt>
          </div>
        </li>
        <li class="groupLi">
          <div class="liLeft">
            <span>备注</span>
          </div>
          <div class="liRight" :class="[!!nameValue ? 'cellValueClass' : 'placeholderClass']">
            <span>{{!!nameValue ? nameValue : '请选择联系人'}}</span>
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
            <radio :options="radioOptions" @on-change="getpopupHeader" v-model="radio001Value"></radio>
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

export default {
  name: "reserve",
  data() {
    return {
      Remark: "", //备注
      nameValue: "11",
      OpSource: [], // 商机数据源
      radioOptions: [],
      chanceValue: false, //商机来源默认值
      Sourceid: "", //商机来源ID
      urgencySource: [], //数据源
      urgencyList: [], //紧急程度处理后的数据源
      urgencyValue: [], //紧急默认值
      Priorityid: "", //紧急情况id
      phoneValue: "",
      radio001Value: "电视电台",
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
    PopupHeader,
    Popup,
    Radio
  },
  methods: {
    goback() {
      this.$router.back(-1);
    },
    getClient() {
      this.$router.push({ name: "clientList" });
    },
    getpopupHeader(value, label) {
      console.log(value);
    },
    chancesource() {
      this.chanceValue = !this.chanceValue;
    },
    onLoad() {
      GetBizopprtunityDropdown("").then(res => {
        this.urgencySource = res.Option.Dropdownpriorityid; //紧急程度
        this.OpSource = res.Option.Dropdownsourceid; //商机来源
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
    submit() {}
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
.fs-backICon {
  @include wh(7px, 13px);
}
.fs-goaheadICon {
  @include wh(6px, 10px);
}
</style>
<style scoped lang="scss">
@import "src/assets/sass/mixin";
.reservePart {
  .content {
    .reseveTitle {
      height: 160px;
      padding: 32px 40px;
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
      padding: 16px 40px;
      background-color: $bc;
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
    .group {
      .groupLi {
        background-color: #fff;
        @include wh(100%, 96px);
        @include fj;
        padding: 0 40px;
        @include flexHCenter;
        border-bottom: 4px solid #f4f6f8;
        .liLeft {
          @include fj;
          @include sc(30px, rgba(136, 136, 136, 1));
          .badge {
            margin-left: 4px;
            @include flexCenter;
            background-color: #fff;
            color: red;
          }
        }
        .liRight {
          // @include sc(30px, rgba(209, 209, 209, 1));
        }
      }
    }
  }
}
</style>



