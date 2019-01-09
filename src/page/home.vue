<template>
  <div style="height:100%;">
    <view-box ref="viewBox">
      <section class="homeTop">
        <div class="message">
          <i class="iconfont icon-youjian"></i>
          <badge class="badge" text="8"></badge>
        </div>
        <div class="signCount">
          <div class="signTittle">本月签约合同</div>
          <div class="signNum">
            <span class="signMoeny">6,8976.00</span>
            <span class="getContranct">
              <span class="getContranctTittle">查看合同</span>
              <i class="iconfont icon-youjiantou"></i>
            </span>
          </div>
          <div class="Expire">
            <div class="ExpireLeft">
              <span>近三个月合同到期数</span>
              <span class="ExpireNum">4</span>
            </div>
            <div class="ExpireRight">
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
              <img src="../assets/images/分组 11.png" alt>
            </span>
            <span>单元信息</span>
          </router-link>
          <router-link tag="li" to="/reserveList">
            <span>
              <img src="../assets/images/分组 4.png" alt>
            </span>
            <span>预定管理</span>
          </router-link>
          <router-link tag="li" to="/businessList">
            <span>
              <img src="../assets/images/分组 5.png" alt>
            </span>
            <span>商机管理</span>
          </router-link>
          <router-link tag="li" to="/foo">
            <span>
              <img src="../assets/images/分组 6.png" alt>
            </span>
            <span>事务管理</span>
          </router-link>
        </ul>
        <div class="performance">
          <div class="performanceTitle">我的业绩完成率</div>
          <div class="performanceSheet">
            <v-chart ref="demo" :data="data">
              <v-scale x field="classes"/>
              <v-scale y field="percent" :min="0" :max="1" :formatter="formatter"/>
              <v-bar series-field="country" adjust="stack"/>
              <v-tooltip show-value-in-legend/>
            </v-chart>
          </div>
        </div>
      </section>
      <tabbar class="navBar">
        <tabbar-item selected>
          <i class="iconfont icon-xiazai45" slot="icon"></i>
          <span slot="label" class="tabbarTitle">首页</span>
        </tabbar-item>
        <tabbar-item>
          <i class="iconfont icon-yingyong" slot="icon"></i>
          <span slot="label">应用</span>
        </tabbar-item>
        <tabbar-item>
          <i class="iconfont icon-wode" slot="icon"></i>
          <span slot="label">我的</span>
        </tabbar-item>
      </tabbar>
    </view-box>
  </div>
</template>

<script>
import {
  VChart,
  VLegend,
  VBar,
  VTooltip,
  VScale,
  Tabbar,
  TabbarItem,
  ViewBox,
  Badge
} from "vux";
export default {
  components: {
    VChart,
    VTooltip,
    VLegend,
    VBar,
    VScale,
    Tabbar,
    ViewBox,
    Badge,
    TabbarItem
  },
  data() {
    return {
      formatter: function(val) {
        return (val * 100).toFixed(0) + "%";
      },
      data: [
        {
          country: "完成率",
          classes: "交易金额",
          value: 900,
          percent: 0.9
        },
        {
          country: "未完成率",
          classes: "交易金额",
          value: 100,
          percent: 0.1
        },
        {
          country: "完成率",
          classes: "交易面积",
          value: 203,
          percent: 0.24224343675417662
        },
        {
          country: "未完成率",
          classes: "交易面积",
          value: 635,
          percent: 0.7577565632458234
        },
        {
          country: "完成率",
          classes: "签约数",
          value: 276,
          percent: 0.2543778801843318
        },
        {
          country: "未完成率",
          classes: "签约数",
          value: 809,
          percent: 0.7456221198156682
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/sass/mixin";
.navBar {
  box-shadow: 0 -4px 14px 0px rgba(126, 158, 230, 0.15);
  font-family: $fr;
  .tabbarTitle {
    font-size: 24px;
  }
}
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
      right: 40px;
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
        @include sc(84px, $fc);
        font-family: Hiragino Kaku Gothic ProN W3;
        font-weight: normal;
      }
      .getContranct {
        font-size: 28px;
        .icon-youjiantou {
          margin-left: 10px;
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
          margin-left: 10px;
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




