<template>
  <div class="reservePart">
    <x-header :left-options="{backText: ''}" class="header">预定新增</x-header>
    <section class="content">
      <div class="reseveTitle" v-if="hasUint">
        <div class="danyuan">当前预定单元</div>
        <div class="qi">星月湾·东街二期 &nbsp; 403</div>
        <div class="shangji">
          <div>
            当前铺位已有
            <span class="shangjiNum">&nbsp;2&nbsp;</span>条可直接载入商机
          </div>
          <div>
            <x-icon type="ios-arrow-down" size="25" v-show="!hasStatus" @click="openStatus"></x-icon>
            <x-icon type="ios-arrow-up" size="25" v-show="hasStatus" @click="openStatus"></x-icon>
          </div>
        </div>
      </div>
      <group
        label-width="6em"
        label-margin-right="2em"
        label-align="left"
        class="firstGroup"
        v-if="!hasUint"
      >
        <cell title="预定单元" value="请选择" value-align="right" is-link></cell>
      </group>
      <group title="客户信息" label-width="6em" label-margin-right="2em" label-align="left">
        <cell
          title="客户姓名"
          value-align="right"
          v-model="clientDataName"
          is-link
          @click.native="getClient"
        ></cell>
        <cell title="电话号码" value-align="right" v-model="clientDataPhone"></cell>
      </group>
      <group title="客户信息" label-width="6em" label-margin-right="2em" label-align="left">
        <x-input
          title="定金(￥)"
          placeholder="请填入定金金额"
          v-model="depositMoney"
          type="number"
          @on-change="depositMoneyChange"
          placeholder-align="right"
          value-align="right"
          text-align="right"
        ></x-input>
        <x-input
          title="面积(m²)"
          placeholder="请填入面积"
          placeholder-align="right"
          v-model="area"
          @on-change="areaChange"
          type="number"
          value-align="right"
          text-align="right"
        ></x-input>
        <datetime
          class="dateTime"
          v-model="startTime"
          @on-change="startChange"
          format="YYYY-MM-DD"
          title="预定日期"
        ></datetime>
        <datetime
          class="dateTime"
          v-model="endTime"
          @on-change="endChange"
          format="YYYY-MM-DD"
          title="预定结束日期"
        ></datetime>
        <x-textarea
          title="备注"
          @on-change="textAreaChange"
          v-model="remark"
          placeholder="请输入备注"
          class="textArea"
        ></x-textarea>
      </group>
      <div class="button">
        <button class="save" @click="save">保存</button>
        <button class="submit" @click="submit">提交</button>
      </div>
    </section>
    <router-view/>
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
  Confirm,
  Datetime,
  Toast
} from "vux";
import { mapMutations, mapState } from "vuex";
export default {
  name: "reserveAdd",
  components: {
    XHeader,
    Group,
    PopupPicker,
    XTextarea,
    Toast,
    Confirm,
    Cell,
    Datetime,
    XInput
  },
  data() {
    return {
      area: "",
      clientDataName: "",
      clientDataPhone: "",
      depositMoney: "",
      remark: "",
      hasStatus: false,
      hasUint: false,
      startTime: "",
      endTime: ""
    };
  },
  beforeRouteLeave(to, from, next) {
    this.TO_PAGE_NAME(from.name); //离开的时候在vuex存起来本组件的路由名称
    next();
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "clientList") {
      to.meta.isBack = true;
    }
    // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
    next();
  },
  created() {
    this.isFirstEnter = true;
    console.log(this.$route.params.data);
    if (!!this.$route.params.data) {
      this.hasUint = !this.hasUint;
    }
    this.onLoad();
  },
  activated() {
    if (!this.$route.meta.isBack || this.isFirstEnter) {
      // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
      // 如果isFirstEnter是true，表明是第一次进入此页面或用户刷新了页面，需获取新数据
      // this.area = ""; // 把数据清空，可以稍微避免让用户看到之前缓存的数据
      // this.clientDataName = "";
      // this.clientDataPhone = "";
      // this.depositMoney = "";
      // this.remark = "";
      // this.startTime = "";
      // this.endTime = "";
      this.onLoad(); // ajax获取数据方法
    }
    // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
    this.$route.meta.isBack = false;
    this.isFirstEnter = false;
  },
  computed: {
    ...mapState(["toPageName", "clientDetail", "reserveObj",'scrollTop'])
  },
  methods: {
    save() {
      this.RESERVEADD({ clientDataName: this.clientDataName });
      this.RESERVEADD({ clientDataPhone: this.clientDataPhone });
      console.log(this.reserveObj);
    },
    submit() {
      console.log(1);
    },
    textAreaChange: _.debounce(function(value) {
      this.RESERVEADD({ remark: value });
    }, 1000),
    depositMoneyChange: _.debounce(function(value) {
      this.RESERVEADD({ depositMoney: value });
    }, 1000),
    areaChange: _.debounce(function(value) {
      this.RESERVEADD({ area: value });
    }, 1000),
    ...mapMutations(["TO_PAGE_NAME", "RESERVEADD"]),
    onLoad() {
      this.clientDataName = this.clientDetail.Name;
      this.clientDataPhone = this.clientDetail.Phone;
      this.depositMoney = this.reserveObj.depositMoney;
      this.area = this.reserveObj.area;
      this.startTime = this.reserveObj.startTime;
      this.endTime = this.reserveObj.endTime;
      this.remark = this.reserveObj.remark;
      console.log(this.reserveObj);
    },
    startChange(value) {
      this.RESERVEADD({ startTime: value });
    },
    endChange(value) {
      this.RESERVEADD({ endTime: value });
    },
    openStatus() {},
    getClient() {
      this.$router.replace({
        name: "clientList"
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "src/assets/sass/mixin";
.reservePart {
  .content {
    .reseveTitle {
      background-color: #fff;
      .danyuan {
        @include sc(30px, rgba(136, 136, 136, 1));
        padding: 32px 40px 0;
        margin-bottom: 10px;
        font-family: $fr;
      }
      .qi {
        @include sc(34px, rgba(30, 30, 30, 1));
        padding: 0 40px;
        font-family: $fm;
        border-bottom: 2px solid rgb(244, 246, 248);
      }
      .shangji {
        @include fj(space-between);
        @include wh(100%, 96px);
        @include flexHCenter;
        padding: 0 40px;
        font-family: $fr;
        @include sc(32px, rgba(136, 136, 136, 1));
        .shangjiNum {
          @include sc(32px, rgba(105, 167, 254, 1));
        }
      }
    }
    .firstGroup {
      margin-top: -40px;
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
        background: rgba(120, 202, 255, 1);
      }
      .submit {
        background: rgba(105, 167, 254, 1);
      }
    }
  }
}
</style>


