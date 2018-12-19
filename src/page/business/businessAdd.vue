<template>
  <div class="reservePart">
    <header-top headerText="新增商机"></header-top>
    <section class="content">
      <div class="reseveTitle">
        <div class="danyuan">当前预定单元</div>
        <div class="qi">星月湾·东街二期 &nbsp; 403</div>
      </div>
      <group class="group">
        <div class="cientInfo">客户信息</div>

        <cell title="客户姓名" link='/clientList'>
          <span slot="title" class="phone">
            <span style="vertical-align:middle;">客户姓名</span>
            <badge text="*" class="badge"></badge>
            <input type="text" required value="张三">
          </span>
        </cell>
        <x-input title="手机号码" placeholder="请输入手机号" v-model="phoneValue"></x-input>
        <div class="cientInfo">商机信息</div>
        <popup-picker title="商机来源" :data="sourceList" v-model="sourceValue"></popup-picker>
        <cell title="总面积" value="500.25 m²"></cell>
        <cell title="预计成交金额" value="¥453.5万"></cell>
        <popup-picker title="紧急程度" :data="urgencyList" v-model="urgencyValue"></popup-picker>
        <x-textarea title="备注" placeholder="请填写备注" :show-counter="false" :rows="3"></x-textarea>
      </group>
      <section class="button">
        <x-button class="submit" @click.native="submit">保存</x-button>
      </section>
    </section>
  </div>
</template>


<script>
import headerTop from "@/components/headerTOP";
import {
  Datetime,
  Group,
  Cell,
  Picker,
  XButton,
  Divider,
  XSwitch,
  XTextarea,
  XInput,
  Badge
} from "vux";

// api
import {
  GetBizOpportunity,
  GetBizOpportunityDetail,
  GetUnitByBlock,
  GetBizopprtunityDropdown
} from "@/axios/api";

export default {
  name: "reserve",
  data() {
    return {
      urgencyList: [["不重要", "一般", "重要", "非常重要"]],
      sourceList: [
        [
          "电视电台",
          "广告杂志",
          "户外广告",
          "朋友介绍",
          "网上展销",
          "宣传单张",
          "邮件短信"
        ]
      ],
      value1: ["iPhone"],
      nameValue: "张三",
      urgencyValue: ["一般"],
      phoneValue: "136445678786",
      sourceValue: ["电视电台"],
      unitInfoName: '',
    };
  },
  created() {
    this.onLoad();
  },
  components: {
    headerTop,
    Group,
    Picker,
    XButton,
    Divider,
    Cell,
    XSwitch,
    Badge,
    XInput,
    XTextarea,
    Datetime
  },
  methods: {
    onLoad() {
      // var data = {
      //   Bizopportunity: {},
      //   Prospectid: 0
      // };
      // 模拟楼栋信息
      const uBdata = {
        Blockid: 0,
        Statucode: 'UnitAvailable ', //可租
        Floorno: '1',
        Startdate: '' ,
        Enddate: '' ,
      }

      GetUnitByBlock(uBdata).then(res => {
        console.log(res)
      })
    },
    submit() {
      this.$router.push('/businessList')
    }
  }
};
</script>

<style scoped lang="scss">
@import "src/assets/sass/mixin";
.reservePart {
  .content {
    padding-top: 90px;
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
        font-family: $familyR;
      }
      .qi {
        @include sc(32px, rgba(255, 255, 255, 1));
        font-family: $familyMedium;
      }
    }
    .cientInfo {
      // @include sc(28px, #1e1e1e);
      // font-family: $familyR;
      padding: 16px 40px;
      background-color: $bc;
    }
    .phone {
      background-color: #fff;
      color: #000;
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
  }
}
</style>



