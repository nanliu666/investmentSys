<template>
  <div class="reservePart">
    <x-header :left-options="{backText: ''}" class="header">预定新增</x-header>

    <section class="content">
      <div class="reseveTitle" v-if="hasUint">
        <div class="danyuan">当前预定单元</div>
        <div class="qi">星月湾·东街二期 &nbsp; 403</div>
      </div>
      <li class="reserveLi">
        <div class="liTitle">预定单元</div>
        <div class="liRight">
          <span>请选择</span>
          <!-- <span></span> -->
          <i class="iconfont icon-youjiantou"></i>
        </div>
      </li>
      <li class="title">客户信息</li>
      <li class="reserveLi">
        <div class="liTitle">客户姓名</div>
        <div class="liRight">
          <span>请选择</span>
          <i class="iconfont icon-youjiantou"></i>
        </div>
      </li>
      <li class="reserveLi">
        <div class="liTitle">手机号码</div>
        <div class="liRight">
          <span>请填写</span>
        </div>
      </li>
      <li class="title">客户信息</li>
      <li class="reserveLi">
        <div class="liTitle">定金 (￥)</div>
        <input class="hasLiRight" type="text" placeholder="请输入定金金额">
      </li>
      <li class="reserveLi">
        <div class="liTitle">面积 (m²)</div>
        <input class="hasLiRight" type="text" placeholder="请输入面积">
      </li>
      <group>
        <datetime
          v-model="limitHourValue"
          :start-date="startDate"
          :end-date="endDate"
          @on-change="change"
          format="YYYY-MM-DD"
          title="开始时间"
        ></datetime>
      </group>
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
  Badge,
  Confirm,
  Datetime,
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
    Badge,
    Datetime,
    XInput
  },
  data() {
    return {
      hasUint: false,
      limitHourValue: "",
      startDate: "2015-11-11",
      endDate: "2017-10-11"
    };
  },
  created() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      console.log(1);
    },
    change(value) {
      console.log("change", value);
    }
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
        font-family: $fr;
      }
      .qi {
        @include sc(32px, rgba(30, 30, 30, 1));
        font-family: $fm;
      }
    }
    .group {
      margin-top: -30px;
      background: #000;
    }
    .reserveLi {
      background-color: #fff;
      @include fj(space-between);
      @include wh(100%, 96px);
      padding: 0 40px;
      margin-bottom: 4px;
      font-family: $fr;
      .liTitle {
        @include flexCenter;
        @include sc(30px, rgba(136, 136, 136, 1));
      }
      .liRight {
        @include flexCenter;
        @include sc(30px, rgba(209, 209, 209, 1));
      }
      .hasLiRight {
        @include sc(30px, rgba(30, 30, 30, 1));
      }
      input {
        text-align: right;
      }
      input::-webkit-input-placeholder {
        /* WebKit browsers */
        direction: rtl;
        @include sc(30px, rgba(209, 209, 209, 1));
      }
      input:-ms-input-placeholder {
        direction: rtl;
        @include sc(30px, rgba(209, 209, 209, 1));
      }
    }
    .title {
      @include wh(100%, 96px);
      @include flexHCenter;
      font-family: $fr;
      @include sc(28px, rgba(85, 85, 85, 1));
      padding: 0 40px;
    }
    .button {
      @include fj(space-around);
      button {
        @include wh(320px, 88px);
        @include sc(36px, $fc);
        @include borderRadius(44px);
        font-family: $fm;
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


