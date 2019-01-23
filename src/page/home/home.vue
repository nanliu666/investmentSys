<template>
  <div style="height:100%;">
    <view-box ref="viewBox">
      <section class="homeTop">
        <div class="message" @click="gotoNew">
          <img src="../../assets/images/分组 12.png">
          <span class="badge">{{messageNum}}</span>
        </div>
        <div class="signCount">
          <div class="signTittle">本月签约合同</div>
          <div class="signNum">
            <span class="signMoeny">{{signMoeny | formatNumber(0)}}</span>
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
            <v-chart ref="demo" :data="data">
              <v-scale x field="year"/>
              <v-scale y field="percent" :min="0" :max="0.5" :formatter="formatter"/>
              <v-bar series-field="country" adjust="stack" :colors="dataColor"/>
              <v-tooltip show-value-in-legend/>
            </v-chart>
          </div>
        </div>
      </section>
    </view-box>
  </div>
</template>

<script>
import {
  ViewBox,
  VChart,
  VLine,
  VArea,
  VTooltip,
  VLegend,
  VBar,
  XButton,
  VScale
} from "vux";
import {
  GetAgentDefaultPageNEW,
  GetAgentDefaultPageChartNEW,
  GetUserMessageTotal
} from "@/axios/api";
export default {
  components: {
    ViewBox,
    VChart,
    VLine,
    VArea,
    VTooltip,
    VLegend,
    VBar,
    XButton,
    VScale
  },
  created() {
    this.onLoad();
  },
  methods: {
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
      console.log(this.gotoTop);
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
    return {
      dataColor: ["rgb(105, 167, 254)", "rgb(228, 233, 245)"],
      formatter: function(val) {
        return (val * 100).toFixed(0) + "%";
      },
      data: [
        {
          country: "完成率",
          year: "交易金额"
        },
        {
          country: "未完成率",
          year: "交易金额"
        },
        {
          country: "完成率",
          year: "交易面积"
        },
        {
          country: "未完成率",
          year: "交易面积"
        },
        {
          country: "完成率",
          year: "签约数"
        },
        {
          country: "未完成率",
          year: "签约数"
        }
      ],
      signMoeny: "",
      ExpireNum: "",
      messageNum: ""
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
    img {
      @include wh(42px, 32px);
    }
    .badge {
      position: absolute;
      background-color: rgba(255, 66, 66, 1);
      @include sc(24px, rgba(255, 255, 255, 1));
      @include flexCenter;
      @include wh(34px, 34px);
      border-radius: 17px;
      padding: 0px 8px;
      right: 40px;
      top: 20px;
    }
  }
  .signCount {
    .signTittle {
      padding: 0 40px 16px;
      font-size: 28px;
    }
    .signNum {
      font-family: $fr;
      padding: 0 40px 94px;
      @include fj;
      align-items: flex-end;
      .signMoeny {
        display: flex;
        flex-wrap: wrap;
        width: 78%;
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
          @include sc(28px, rgba(248, 231, 28, 1));
          font-family: $fs;
          font-weight: 500;
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




