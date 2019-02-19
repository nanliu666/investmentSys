<template>
  <div style="height:100%;" class="home">
    <view-box ref="viewBox">
      <div class="appTopHome"></div>
      <section class="homeTop">
        <div class="message" @click="gotoNew">
          <img src="../assets/images/分组 12.png">
          <span class="badge">{{messageNum}}</span>
        </div>
        <div class="signCount">
          <div class="signTT">
            <span class="signTittle">本月签约金额</span>
          </div>
          <div class="signNum">
            <span class="signMoeny">{{signMoeny}}</span>
            <span class="getContranct" @click="gotoContranctMonth">
              <span class="getContranctTittle">查看合同</span>
              <div class="rightImgBox">
                <img class="rightImg" src="../assets/images/路径 2.png" alt>
              </div>
            </span>
          </div>
          <div class="Expire">
            <div class="ExpireLeft">
              <span>近三个月将到期合同数</span>
              <span class="ExpireNum">{{ExpireNum }}</span>
            </div>
            <div class="ExpireRight" @click="gotoContranctExpire">
              <span>立即处理</span>
              <div class="rightImgBox">
                <img class="rightImg" src="../assets/images/路径 2.png" alt>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="homeBottom">
        <ul class="nav">
          <li @click="gounitInfoALL">
            <span>
              <img src="../assets/images/分组 11.png" alt>
            </span>
            <span>单元信息</span>
          </li>
          <li @click="goreserveList">
            <span>
              <img src="../assets/images/分组 4.png" alt>
            </span>
            <span>预定管理</span>
          </li>
          <li @click="gobusinessList">
            <span>
              <img src="../assets/images/分组 5.png" alt>
            </span>
            <span>商机管理</span>
          </li>
          <li @click="goaffairList">
            <span>
              <img src="../assets/images/分组 6.png" alt>
            </span>
            <span>事务管理</span>
          </li>
        </ul>
        <div class="performance">
          <div class="performanceTitle">我的业绩完成率</div>
          <div class="performanceSheet">
            <v-chart ref="demo" :data="data">
              <v-legend disabled/>
              <v-scale x field="year"/>
              <v-scale y field="percent" :min="0" :max="0.5" :formatter="formatter"/>
              <v-bar series-field="country" adjust="stack" :colors="dataColor"/>
              <v-tooltip :show-item-marker="false"/>
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
import { mapMutations, mapState } from "vuex";
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
  beforeRouteLeave(to, from, next) {
    this.TO_PAGE_NAME(from.name); //离开的时候在vuex存起来本组件的路由名称
    //离开隐藏底部栏
    if (!!cordova) {
      cordova.exec(null, null, "ifcaPlugIns", "setHiddenTabbarFunc", [true]);
    }
    next();
  },
  beforeRouteEnter(to, from, next) {
    //进入开启隐藏底部栏
    if (!!cordova) {
      cordova.exec(null, null, "ifcaPlugIns", "setHiddenTabbarFunc", [false]);
    }
    next();
  },
  methods: {
    ...mapMutations(["TO_PAGE_NAME", "RESERVEADD"]),
    gotoNew() {
      this.$router.push({
        name: "homeNew"
      });
    },
    gotoContranctMonth() {
      if (!!cordova) {
        cordova.exec(null, null, "ifcaPlugIns", "openWebviewFunc", [
          { Url: "10002/index.html#/contractList?dateTime=currentMonth" }
        ]);
      } else {
        window.open(
          "http://10.122.10.59:8086/10002/index.html#/contractList?dateTime=currentMonth"
        );
      }
    },
    gotoContranctExpire() {
      if (!!cordova) {
        cordova.exec(null, null, "ifcaPlugIns", "openWebviewFunc", [
          { Url: "10002/index.html#/contractList?dateTime=threeMonth" }
        ]);
      } else {
        window.open(
          "http://10.122.10.59:8086/10002/index.html#/contractList?dateTime=threeMonth"
        );
      }
    },
    gounitInfoALL() {
      if (!!cordova) {
        cordova.exec(null, null, "ifcaPlugIns", "openWebviewFunc", [
          { Url: "10002/index.html#/unitInfoALL" }
        ]);
      } else {
        window.open("http://10.122.10.59:8086/10002/index.html#/unitInfoALL");
      }
    },
    goreserveList() {
      if (!!cordova) {
        window.open("http://10.122.10.59:8086/10002/index.html#/reserveList");
      } else {
        cordova.exec(null, null, "ifcaPlugIns", "openWebviewFunc", [
          { Url: "10002/index.html#/reserveList" }
        ]);
      }
    },
    gobusinessList() {
      if (!!cordova) {
        cordova.exec(null, null, "ifcaPlugIns", "openWebviewFunc", [
          { Url: "10002/index.html#/businessList" }
        ]);
        } else {
        window.open("http://10.122.10.59:8086/10002/index.html#/businessList");
      }
    },
    goaffairList() {
      if (!!cordova) {
        cordova.exec(null, null, "ifcaPlugIns", "openWebviewFunc", [
          { Url: "10002/index.html#/affairList" }
        ]);
        } else {
        window.open("http://10.122.10.59:8086/10002/index.html#/affairList");
      }
    },
    formatNumber(
      number,
      decimals = 2,
      dec_point = ".",
      thousands_sep = ",",
      roundtag
    ) {
      /*
       * 参数说明：
       * number：要格式化的数字
       * decimals：保留几位小数 默认2位
       * dec_point：小数点符号 默认为.
       * thousands_sep：千分位符号 默认为,
       * roundtag:舍入参数，默认 "ceil" 向上取,"floor"向下取,"round" 四舍五入
       * */
      number = (number + "").replace(/[^0-9+-Ee.]/g, "");
      roundtag = roundtag || "ceil"; //"ceil","floor","round"
      var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = typeof thousands_sep === "undefined" ? "," : thousands_sep,
        dec = typeof dec_point === "undefined" ? "." : dec_point,
        s = "",
        toFixedFix = function(n, prec) {
          var k = Math.pow(10, prec);
          return (
            "" +
            parseFloat(
              Math[roundtag](parseFloat((n * k).toFixed(prec * 2))).toFixed(
                prec * 2
              )
            ) /
              k
          );
        };
      s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
      var re = /(-?\d+)(\d{3})/;
      while (re.test(s[0])) {
        s[0] = s[0].replace(re, "$1" + sep + "$2");
      }

      if ((s[1] || "").length < prec) {
        s[1] = s[1] || "";
        s[1] += new Array(prec - s[1].length + 1).join("0");
      }
      return s.join(dec);
    },
    onLoad() {
      const PageNEWData = {
        Datetime: moment()
          .locale("zh-cn")
          .format("YYYY-MM-DD HH:mm:ss")
      };
      GetAgentDefaultPageNEW(PageNEWData).then(res => {
        if (res.Currmonthamt > 10000) {
          this.signMoeny = `${Math.round(parseInt(res.Currmonthamt) / 100) /
            100}万`;
        } else {
          this.signMoeny = this.formatNumber(res.Currmonthamt);
        }
        this.ExpireNum = res.Overduesoon;
      });
      GetAgentDefaultPageChartNEW(PageNEWData).then(res => {
        // console.log('tuxing===', res)
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
          // percent: 1.1
        },
        {
          country: "未完成率",
          year: "交易金额"
          // percent: 0
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
<style lang="scss">
.weui-tab__panel {
  padding-bottom: 0 !important;
}
</style>
<style lang="scss" scoped>
@import "../assets/sass/mixin";
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
    padding: 40px 54px 0;
    img {
      @include wh(42px, 32px);
    }
    .badge {
      position: absolute;
      background-color: rgba(255, 66, 66, 1);
      @include sc(24px, rgba(255, 255, 255, 1));
      @include flexCenter;
      @include wh(40px, 40px);
      border-radius: 20px;
      right: 38px;
      top: 22px;
    }
  }
  .signCount {
    .signTT {
      padding: 90px 40px 0;
      font-size: 32px;
      @include fj;
    }
    .signNum {
      font-family: $fr;
      padding: 20px 40px 90px;
      @include fj;
      align-items: flex-end;
      .signMoeny {
        display: flex;
        flex-wrap: wrap;
        @include sc(84px, $fc);
        font-family: Hiragino Kaku Gothic ProN W3;
        font-weight: normal;
      }
      .getContranct {
        height: 40px;
        line-height: 40px;
        @include flexHCenter;
        @include fj;
        margin-bottom: 10px;
        .getContranctTittle {
          @include sc(32px, rgba(255, 255, 255, 1));
        }
        .icon-youjiantou {
          font-size: 28px;
        }
      }
    }
    .rightImgBox {
      @include flexCenter;
      margin-left: 10px;
      .rightImg {
        @include wh(16px, 26px);
      }
    }
    .Expire {
      @include fj;
      @include flexHCenter;
      @include wh(100%, 120px);
      padding: 0 40px;
      background: rgba(255, 255, 255, 0.2);
      font-size: 32px;
      .ExpireLeft {
        .ExpireNum {
          @include sc(36px, rgba(248, 231, 28, 1));
          font-family: $fs;
          font-weight: bolder;
          margin-left: 10px;
        }
      }
      .ExpireRight {
        @include fj;
        .icon-youjiantou {
          margin-left: 8px;
          font-size: 28px;
        }
      }
    }
  }
}
.homeBottom {
  height: 60%;
  background-color: rgba(244, 246, 248, 1);
  font-family: $fr;

  .nav {
    background-color: rgba(255, 255, 255, 1);
    padding: 0 40px;
    height: 20%;
    @include flexHCenter;
    @include fj;
    margin-bottom: 2.5%;
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
    height: 75%;
    background-color: #fff;
    .performanceTitle {
      height: 15%;
      @include flexHCenter;
      padding: 0 40px;
      border-bottom: 4px solid rgba(244, 246, 248, 1);
      @include flexHCenter;
      @include sc(30px, rgba(30, 30, 30, 1));
    }
  }
}
</style>




