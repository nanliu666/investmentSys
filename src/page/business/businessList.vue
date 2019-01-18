<template>
  <div class="contractList">
    <x-header :left-options="{backText: ''}" class="header" v-if="!hasSearch">
      商机管理
      <img
        class="searchImg"
        src="../../assets/images/搜索.png"
        @click="openSearch"
        slot="right"
        alt
      >
    </x-header>
    <section class="searchPart" v-if="hasSearch">
      <x-input
        type="text"
        placeholder="请输入商机关键字"
        v-model="enterText"
        @on-enter="onEnter"
        class="searchInput fs-search"
      >
        <img class="searchImg" src="../../assets/images/搜索.png" @click="onEnter" slot="right" alt>
      </x-input>
      <div class="cancel" @click="searchCancel">取消</div>
    </section>
    <projeceSelect
      :statusDetail="statusDetail"
      @FilterUpdate="FilterUpdate"
      comName="contractList"
    />
    <!--mescroll滚动区域的基本结构-->
    <mescroll-vue
      class="mescroll"
      ref="mescroll"
      :down="mescrollDown"
      :up="mescrollUp"
      @init="mescrollInit"
    >
      <!--内容...-->
      <li v-for="(item) in dataList" :key="item.Rentalid" @click="gotoDetail(item)">
        <div class="top">
          <span>{{item.Accountname}} {{item.Companyname}}</span>
          <span
            :class="getbusinessStatus(item.Recordstatus)"
            v-text="statusDetail[item.Recordstatus]"
          ></span>
        </div>
        <div class="bottom">
          <div class="client">
            <div>
              <label>意向单元：</label>
              <span class="text">{{item.Unitdesc}}</span>
            </div>
          </div>
          <div>
            <label class="cycleText">最后一次接触时间：</label>
            <span class="cycleText">{{item.Lastdate | dataFrm('YYYY-MM-DD')}}</span>
          </div>
        </div>
      </li>
    </mescroll-vue>
    <p id="NoData"></p>
  </div>
</template>
<script>
import { XHeader, Search, Popup, XInput } from "vux";
import { GetBizOpportunity, GetCompanyies, GetPropertys } from "@/axios/api";
// 引入下拉组件
import MescrollVue from "mescroll.js/mescroll.vue";
import imgSrc from "../../assets/images/分组.png";
import topimgSrc from "../../assets/images/gototop.png";
export default {
  name: "contractList",
  data() {
    return {
      enterText: "",
      hasSearch: false,
      FilterCond: {},
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
        noMoreSize: 1, //如果列表已无数据,可设置列表总数大于5才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
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
      dataList: [], //所有的合同列表数据
      statusDetail: {
        all: "所有状态",
        Active: "新商机",
        Lost: "已流失",
        Signed: "已签约",
        Quotation: "已报价",
        Booked: "已预订 ",
        INACTIVE: "已删除 ",
        Used: "已使用"
      }
    };
  },
  components: {
    XHeader,
    XInput,
    Popup,
    Search,
    MescrollVue,
    projeceSelect: function(resolve) {
      require(["../../components/projectSelect.vue"], resolve);
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "businessDetail" || from.name === "businessAdd") {
      to.meta.isBack = true;
    }
    // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
    next(vm => {
      // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteEnter方法
      vm.$refs.mescroll.beforeRouteEnter(); // 进入路由时,滚动到原来的列表位置,恢复回到顶部按钮和isBounce的配置
    });
  },
  created() {
    this.isFirstEnter = true;
  },
  activated() {
    if (!this.$route.meta.isBack || this.isFirstEnter) {
      // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
      // 如果isFirstEnter是true，表明是第一次进入此页面或用户刷新了页面，需获取新数据
      this.dataList = []; // 把数据清空，可以稍微避免让用户看到之前缓存的数据
      this.mescroll.resetUpScroll(); // ajax获取数据方法
    }
    // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
    this.$route.meta.isBack = false;
    this.isFirstEnter = false;
  },
  methods: {
    FilterUpdate(data) {
      console.log("子组件传递过来的修改的值", data);
      this.FilterCond = data;
      this.mescroll.resetUpScroll();
    },
    onEnter(value) {
      this.FilterCond = {
        Filter: `Keyword.like.${this.enterText}`
      };
      this.mescroll.resetUpScroll();
    },
    searchCancel() {
      this.hasSearch = !this.hasSearch;
    },
    openSearch() {
      this.hasSearch = !this.hasSearch;
    },
    // mescroll组件初始化的回调,可获取到mescroll对象 (如果this.mescroll并没有使用到,可不用写mescrollInit)
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback(page, mescroll) {
      // 上拉下拉不区分状态、项目请求
      const data = {
        Urlpara: {
          Pageindex: page.num,
          Pagesize: page.size
        }
      };
      Object.assign(data.Urlpara, this.FilterCond);
      GetBizOpportunity(data)
        .then(res => {
          let arr = JSON.parse(res.Content);
          console.log(arr);
          // 如果是第一页需手动制空列表
          if (page.num === 1) this.dataList = [];
          // 把请求到的数据添加到列表 过滤未提交状态--因为合同没有未提交的状态
          this.dataList = this._.filter(this.dataList.concat(arr), item => {
            return item.Contractstatushow !== "Active";
          });
          // 数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(() => {
            mescroll.endByPage(arr.length, res.Pagecount); //修复结束条件
          });
        })
        .catch(e => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr();
        });
    },
    gotoDetail(data) {
      console.log(data);
    },
    getbusinessStatus(data) {
      let strDatd = this.$options.filters.firstUpperCase(data);
      let str = this;
      switch (strDatd) {
        case "Active":
          return "Active";
          break;
        case "Lost":
          return "Lost";
          break;
        case "Signed":
          return "Signed";
          break;
        case "Quotation":
          return "Quotation";
          break;
        case "Booked":
          return "Booked";
          break;
        case "INACTIVE":
          return "INACTIVE";
          break;
        case "Used":
          return "Used";
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/sass/mixin";
.contractList {
  height: 100%;
  .header {
    box-shadow: 0 0px 0px 0 #fff !important; //重叠头部
  }

  .searchPart {
    padding: 0 40px;
    @include fj(space-between);
    background-color: #fff;
    .fs-search {
      height: 32px;
      border-radius: 18px;
      margin: 7px 0;
    }
    .searchInput {
      border: 1px solid rgba(235, 237, 239, 1);

      width: 88%;
    }
    .cancel {
      @include sc(32px, rgba(136, 136, 136, 1));
      @include flexCenter;
    }
  }

  .mescroll {
    @include cl;
    width: 670px;
    position: fixed;
    top: 180px;
    margin-top: 30px;
    bottom: 0;
    height: auto;
    li {
      margin-bottom: 20px;
      @include borderRadius(20px);
      box-shadow: 0 0 4px 10px 0 rgba(126, 158, 230, 0.15);
      background-color: $fc;
      .top {
        //详情头部
        @include fj(space-between);
        padding: 30px 30px 26px;
        border-bottom: 4px dashed rgba(244, 246, 248, 1); /*no*/
        span:first-child {
          @include sc(32px, rgba(30, 30, 30, 1));
          font-family: $fm;
        }
        span:last-child {
          @include wh(80px, 38px);
          @include flexCenter;
          @include borderRadius(4px);
          @include sc(20px, rgba(255, 255, 255, 1));
          font-family: $fr;
        }
        //新商机
        .Active {
          background-color: rgba(152, 226, 72, 1);
        }
        //已签约
        .Signed {
          background: rgba(59, 222, 186, 1);
        }
        //已流失
        .Lost {
          background: rgba(188, 204, 212, 1);
        }
        //已预订
        .Booked {
          background: rgba(120, 202, 255, 1);
        }
        //已删除
        .INACTIVE {
          background: rgba(188, 204, 212, 1);
        }
        //已使用
        .Used {
          background: rgba(248, 123, 123, 1);
        }
      }
      .bottom {
        // 底部
        padding: 28px 34px;
        div {
          label {
            @include sc(28px, rgba(136, 136, 136, 1));
            font-family: $fr;
          }
          .text {
            @include sc(28px, rgba(30, 30, 30, 1));
          }
          .cycleText {
            @include sc(24px, rgba(174, 174, 174, 1));
          }
          .lookRecord {
            @include flexCenter;
            height: 50px;
            background-color: $fc;
            @include borderRadius(25px);
            @include sc(28px, rgba(72, 121, 230, 1));
            font-family: $fr;
            border: 1px solid rgba(72, 121, 230, 1); /*no*/
            padding: 0px 26px;
          }
        }
      }
    }
  }
  .mescroll-totop {
    background-color: red;
  }
  #NoData {
    @include flexCenter;
    height: 80%;
    width: 100%;
  }
}
</style>

