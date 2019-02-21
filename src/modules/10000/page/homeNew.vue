<template>
  <div class="contractList">
    <div class="appTopOther"></div>
    <x-header
      :left-options="{backText: '', preventGoBack: true}"
      class="header"
      @on-click-back="goback"
    >消息列表</x-header>
    <!--mescroll滚动区域的基本结构-->
    <mescroll-vue
      class="mescroll"
      ref="mescroll"
      :down="mescrollDown"
      :up="mescrollUp"
      @init="mescrollInit"
    >
      <!--内容...-->
      <div v-for="(Item, index) in timeList" :key="index">
        <div class="time">{{Item}}</div>
        <li
          v-for="(item, index) in dataList[Item]"
          class="mescrollLi"
          :key="index"
          @click="getDetail(item)"
        >
          <div class="liLeft">
            <img src="../assets/images/shenpi.png" alt>
          </div>
          <div class="liRight">
            <div class="top">{{item.Messagecontent}}</div>
            <div class="bottom">审批意见:{{item.Comment}}</div>
          </div>
        </li>
      </div>
    </mescroll-vue>
    <p id="NoData"></p>
  </div>
</template>
<script>
import { XHeader } from "vux";
import { GetUserMessage, GetToDoDetailFromMsg } from "@/axios/api";
// 引入下拉组件
import MescrollVue from "mescroll.js/mescroll.vue";
import imgSrc from "../assets/images/noData.png"; //无数据显示
import topimgSrc from "../assets/images/gototop.png";
export default {
  name: "homeNew",
  data() {
    return {
      timeList: {},
      mescroll: null, // mescroll实例对象
      mescrollDown: {}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
      mescrollUp: {
        // 上拉加载的配置.
        callback: this.upCallback, // 上拉回调,此处可简写; 相当于 callback: function (page, mescroll) { getListData(page); }
        //以下是一些常用的配置,当然不写也可以的.
        page: {
          num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
          size: 10 //每页数据条数,默认10
        },
        htmlNodata: '<p class="upwarp-nodata">我也是有底线的~</p>',
        noMoreSize: 10, //如果列表已无数据,可设置列表总数大于5才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
        toTop: {
          //回到顶部按钮
          src: topimgSrc, //图片路径,默认null,支持网络图
          warpClass: "mescroll-totop",
          offset: 1000 //列表滚动1000px才显示回到顶部按钮
        },
        empty: {
          //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
          warpId: "NoData", //父布局的id (1.3.5版本支持传入dom元素)
          icon: imgSrc, //图标,默认null,支持网络图
          tip: "暂无相关数据~" //提示
        }
      },
      dataList: [] //所有的合同列表数据
    };
  },
  components: {
    XHeader,
    MescrollVue
  },
  beforeRouteEnter(to, from, next) {
    // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
    next(vm => {
      vm.$refs.mescroll.beforeRouteEnter(); // 进入路由时,滚动到原来的列表位置,恢复回到顶部按钮和isBounce的配置
    });
  },
  beforeRouteLeave(to, from, next) {
    // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
    this.$refs.mescroll.beforeRouteLeave(); // 退出路由时,记录列表滚动的位置,隐藏回到顶部按钮和isBounce的配置
    next();
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    getDetail(data) {
      localStorage.setItem("affairDetail", JSON.stringify(data));
      if (typeof cordova === "object") {
        cordova.exec(null, null, "ifcaPlugIns", "openWebviewFunc", [
          { Url: `10002/index.html#/affairDetail/${data.Platformkey}` }
        ]);
      } else {
        // document.addEventListener(
        //   "deviceready",
        //   () => {
        //     cordova.exec(null, null, "ifcaPlugIns", "openWebviewFunc", [
        //       { Url: `10002/index.html#/affairDetail/${data.Platformkey}` }
        //     ]);
        //   },
        //   false
        // );
        window.open(`http://10.122.10.59:8086/10002/index.html#/affairDetail/${data.Platformkey}`)
      }
    },
    // mescroll组件初始化的回调,可获取到mescroll对象 (如果this.mescroll并没有使用到,可不用写mescrollInit)
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback(page, mescroll) {
      // 上拉下拉不区分状态、项目请求
      let data = {
        Urlpara: {
          Pageindex: page.num,
          Pagesize: page.size
        }
      };
      GetUserMessage(data)
        .then(res => {
          let arr = JSON.parse(res.Content);
          // 如果是第一页需手动制空列表
          if (page.num === 1) this.dataList = [];
          // 把请求到的数据添加到列表 过滤未提交状态--因为合同没有未提交的状态
          this.dataList = this.dataList.concat(arr);
          this.dataList = this._.groupBy(this.dataList, function(item) {
            return moment(item.Senddate).format("YYYY-MM");
          });
          console.log(this.dataList);
          this.timeList = Object.keys(this.dataList);
          // 数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(() => {
            mescroll.endByPage(arr.length, res.Pagecount); //修复结束条件
          });
        })
        .catch(e => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr();
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/sass/mixin";

.mescroll {
  @include cl;
  position: fixed;
  top: 160px;
  bottom: 0;
  height: auto;
  font-family: $fr;
  .time {
    @include flexCenter;
    margin-bottom: 14px;
    @include sc(24px, rgba(136, 136, 136, 1));
  }
  .mescrollLi {
    @include fd;
    border-radius: 6px;
    margin-bottom: 24px;

    .liLeft {
      width: 20%;
      @include flexWCenter;
      img {
        @include wh(72px, 72px);
      }
    }
    .liRight {
      position: relative;
      width: 74%;
      background-color: #fff;
      padding: 20px 40px;
      font-family: $fr;
      .top {
        @include sc(32px, rgba(30, 30, 30, 1));
        margin-bottom: 24px;
      }
      .bottom {
        @include sc(28px, rgba(136, 136, 136, 1));
      }
      &::before {
        content: "";
        position: absolute;
        right: 100%;
        top: 26px;
        width: 0;
        height: 0;
        border-top: 13px solid transparent;
        border-right: 26px solid $fc;
        border-bottom: 13px solid transparent;
      }
    }
  }
}
</style>

