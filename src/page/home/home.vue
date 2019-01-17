<template>
  <div style="height:100%;">
    <view-box ref="viewBox">
      <section class="homeTop">
        <div class="message" @click="gotoNew">
          <i class="iconfont icon-youjian"></i>
          <badge class="badge" v-text="messageNum"></badge>
        </div>
        <div class="signCount">
          <div class="signTittle">本月签约合同</div>
          <div class="signNum">
            <span class="signMoeny">{{signMoeny | formatNumber}}</span>
            <span class="getContranct" @click="gotoContranctMonth">
              <span class="getContranctTittle">查看合同</span>
              <i class="iconfont icon-youjiantou"></i>
            </span>
          </div>
          <div class="Expire">
            <div class="ExpireLeft">
              <span>近三个月合同到期数</span>
              <span class="ExpireNum">{{ExpireNum }}</span>
            </div>
            <div class="ExpireRight" @click="gotoContranctExpire">
              <span>立即处理</span>
              <i class="iconfont icon-youjiantou"></i>
            </div>
          </div>
        </div>
      </section>
      <section class="homeBottom">
        <ul class="nav">
          <router-link tag="li" to="/unitInfoAll">
            <span>
              <img src="../../assets/images/分组 11.png" alt>
            </span>
            <span>单元信息</span>
          </router-link>
          <router-link tag="li" to="/reserveList">
            <span>
              <img src="../../assets/images/分组 4.png" alt>
            </span>
            <span>预定管理</span>
          </router-link>
          <router-link tag="li" to="/businessList">
            <span>
              <img src="../../assets/images/分组 5.png" alt>
            </span>
            <span>商机管理</span>
          </router-link>
          <router-link tag="li" to="/affairList">
            <span>
              <img src="../../assets/images/分组 6.png" alt>
            </span>
            <span>事务管理</span>
          </router-link>
        </ul>
        <div class="performance">
          <div class="performanceTitle">我的业绩完成率</div>

          <div class="performanceSheet">
            <ve-histogram
              :data="chartData"
              :settings="chartSettings"
              :colors="[ 'rgb(105, 167, 254)','rgb(228, 233, 245)']"
            ></ve-histogram>
          </div>
        </div>
      </section>
    </view-box>
  </div>
</template>

<script>
import { ViewBox, Badge } from "vux";
import {
  GetAgentDefaultPageNEW,
  GetAgentDefaultPageChartNEW,
  GetUserMessageTotal
} from "@/axios/api";
export default {
  components: {
    ViewBox,
    Badge
  },
  created() {
    this.onLoad();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      document.addEventListener("deviceready", vm.onHomeDeviceReady, false);
    });
  },
  beforeRouteLeave(to, from, next) {
    document.addEventListener("deviceready", this.onLeaveDeviceReady, false);
    next();
  },
  methods: {
    onHomeDeviceReady() {
      //设置导航栏颜色的接口
      cordova.exec(null, null, "ifcaPlugIns", "setStatusBarColorFunc", [
        103,
        185,
        255
      ]);
    },
    onLeaveDeviceReady() {
      //设置导航栏颜色的接口
      cordova.exec(null, null, "ifcaPlugIns", "setStatusBarColorFunc", [
        255,
        255,
        255
      ]);
    },
    gotoNew() {
      this.$router.push({
        name: "homeNew"
      });
    },
    gotoContranctMonth() {
      this.$router.push({
        name: "contractList",
        params: {
          dateTime: "currentMonth"
        }
      });
    },
    gotoContranctExpire() {
      this.$router.push({
        name: "contractList",
        params: {
          dateTime: "threeMonth"
        }
      });
    },
    onLoad() {
      const PageNEWData = {
        Datetime: moment()
          .locale("zh-cn")
          .format("YYYY-MM-DD HH:mm:ss")
      };
      GetAgentDefaultPageNEW(PageNEWData).then(res => {
        this.signMoeny = res.Currmonthamt;
        this.ExpireNum = res.Overduesoon;
      });
      GetAgentDefaultPageChartNEW(PageNEWData).then(res => {
        this.$set(this.data[0], "percent", res[0].Chartcompleteper);
        this.$set(this.data[1], "percent", res[0].Chartnotcompleteper);
        this.$set(this.data[2], "percent", res[1].Chartcompleteper);
        this.$set(this.data[3], "percent", res[1].Chartnotcompleteper);
        this.$set(this.data[4], "percent", res[2].Chartcompleteper);
        this.$set(this.data[5], "percent", res[2].Chartnotcompleteper);
      });
      let data = "";
      GetUserMessageTotal(data).then(res => {
        this.messageNum = res.Totalmessage;
      });
    }
  },
  data() {
    this.chartSettings = {
      stack: { 用户: ["访问用户", "下单用户"] }
    };
    return {
      chartData: {
        columns: ["日期", "访问用户", "下单用户", "下单率"],
        rows: [
          { 日期: "1/1", 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: "1/2", 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: "1/3", 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
          { 日期: "1/4", 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
          { 日期: "1/5", 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: "1/6", 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 }
        ]
      },

      formatter: function(val) {
        return (val * 100).toFixed(0) + "%";
      },
      signMoeny: "",
      ExpireNum: "",
      messageNum: "",
      data: [
        {
          country: "完成率",
          classes: "交易金额"
        },
        {
          country: "未完成率",
          classes: "交易金额"
        },
        {
          country: "完成率",
          classes: "交易面积"
        },
        {
          country: "未完成率",
          classes: "交易面积"
        },
        {
          country: "完成率",
          classes: "签约数"
        },
        {
          country: "未完成率",
          classes: "签约数"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/sass/mixin";

.homeTop {
  background: linear-gradient(
    to right,
    rgba(103, 185, 255, 1),
    rgba(92, 128, 255, 1)
  );
  color: $fc;
  font-family: $fr;
  .message {
    position: relative;
    @include fd(row-reverse);
    padding: 36px 54px 0;
    .icon-youjian {
      font-size: 2rem;
    }
    .badge {
      position: absolute;
      padding: 0px 8px !important;
      right: 44px;
      top: 28px;
    }
  }
  .signCount {
    .signTittle {
      padding: 0 40px 16px;
      font-size: 28px;
    }
    .signNum {
      padding: 0 40px 94px;
      @include fj;
      align-items: flex-end;
      .signMoeny {
        // width: 80%;
        // @include ellipsis;
        @include sc(84px, $fc);
        font-family: Hiragino Kaku Gothic ProN W3;
        font-weight: normal;
      }
      .getContranct {
        font-size: 28px;
        .icon-youjiantou {
          margin-left: 8px;
          font-size: 28px;
        }
      }
    }
    .Expire {
      @include fj;
      @include flexHCenter;
      @include wh(100%, 100px);
      padding: 0 40px;
      background: rgba(255, 255, 255, 0.2);
      font-size: 28px;
      .ExpireLeft {
        .ExpireNum {
          color: rgb(215, 217, 91);
          margin-left: 10px;
        }
      }
      .ExpireRight {
        .icon-youjiantou {
          margin-left: 8px;
          font-size: 28px;
        }
      }
    }
  }
}
.homeBottom {
  background-color: rgba(244, 246, 248, 1);
  font-family: $fr;

  .nav {
    background-color: rgba(255, 255, 255, 1);
    padding: 30px 40px;
    @include fj;
    margin-bottom: 20px;
    li {
      @include fd(column);
      span {
        @include flexWCenter;
        @include sc(28px, rgba(30, 30, 30, 1));
      }
      img {
        @include wh(58px, 58px);
        margin-bottom: 12px;
      }
    }
  }
  .performance {
    background-color: #fff;
    .performanceTitle {
      padding: 20px 40px;
      border-bottom: 4px solid rgba(244, 246, 248, 1);
      @include flexHCenter;
      @include sc(30px, rgba(30, 30, 30, 1));
    }
  }
}
</style>




