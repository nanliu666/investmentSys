<template>
  <div class="contractList">
    <div class="appTopOther"></div>
    <x-header :left-options="{showBack: false}" class="header" v-if="!hasSearch">
      <div slot="left" @click="goback()" class="fs-backBox">
        <img src="../../assets/images/返回@3x.png" class="fs-backICon" alt>
      </div>合同管理
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
        placeholder="请输入客户名称"
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
          <span>{{item.Projectname}} {{item.Unitdesc}}</span>
          <!-- <span>月亮湾二期 1506</span> -->
          <span
            :class="getbusinessStatus(item.Contractstatushow)"
            v-text="statusDetail[item.Contractstatushow]"
          ></span>
        </div>
        <div class="bottom">
          <div class="client">
            <div>
              <label>签约客户：</label>
              <span class="text">{{item.Debtorname}}</span>
            </div>
            <div class="phone">
              <label>合同总额:</label>
              <span class="text">￥{{item.Contractamt | formatNumber}}</span>
            </div>
            <div>
              <label>面&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;积:</label>
              <span class="text">{{item.Totalrentalarea}}M²</span>
            </div>
            <div class="cycleText">
              <label>租赁周期：</label>
              <span
                class="text"
              >{{item.Defaultstartdate | dataFrm('YYYY-MM-DD')}}&nbsp;至&nbsp;{{item.Defaultexpirydate | dataFrm('YYYY-MM-DD')}}</span>
            </div>
          </div>
        </div>
      </li>
    </mescroll-vue>
    <p id="NoData"></p>
    <section class="ListNoData" v-if="hasData">
      <img src="../../assets/images/noData.png" alt>
      <div class="noDataTittle">暂无数据</div>
    </section>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import { XHeader, Search, Popup, XInput } from "vux";
import { GetContractMgmt, GetCompanyies, GetPropertys } from "@/axios/api";
// 引入下拉组件
import MescrollVue from "mescroll.js/mescroll.vue";
import imgSrc from "../../assets/images/noData.png";
import topimgSrc from "../../assets/images/gototop.png";
export default {
  name: "contractList",
  data() {
    return {
      hasData: false,
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
        Active: "未提交",
        Submitted: "审批中",
        Signed: "已签约",
        Voing: "变更中",
        Expired: "已到期 ",
        Closed: "已关闭 ",
        Terminated: "已终止",
        Releting: "续租中",
        Rejected: "已驳回",
        Execing: "执行中",
        Approved: "已审核",
        Tempsave: "暂存"
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
      require(["../../../../components/projectSelect.vue"], resolve);
    }
  },
  // beforeRouteEnter(to, from, next) {
  //   // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
  //   next(vm => {
  //     vm.$refs.mescroll.beforeRouteEnter(); // 进入路由时,滚动到原来的列表位置,恢复回到顶部按钮和isBounce的配置
  //   });
  // },
  // beforeRouteLeave(to, from, next) {
  //   // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
  //   this.$refs.mescroll.beforeRouteLeave(); // 退出路由时,记录列表滚动的位置,隐藏回到顶部按钮和isBounce的配置
  //   next();
  // },
  // created() {
  //   if (process.env.NODE_ENV !== "production") {
  //     this.isFirstEnter = true;
  //     this.dataList = []; // 把数据清空，可以稍微避免让用户看到之前缓存的数据
  //     this.mescroll.resetUpScroll(); // ajax获取数据方法
  //   }
  // },
  mounted() {
    if (typeof cordova === "object" && typeof cordova.exec === "function") {
      cordova.exec(
        this.successCallBack,
        this.errorCallBack,
        "ifcaPlugIns",
        "getAppInfoFunc",
        []
      );
    } else {
      document.addEventListener("deviceready", this.onDeviceReady, false);
    }
  },
  methods: {
    ...mapMutations(["LOGIN_NAME"]),

    onDeviceReady() {
      cordova.exec(
        this.successCallBack,
        this.errorCallBack,
        "ifcaPlugIns",
        "getAppInfoFunc",
        []
      );
    },
    successCallBack(data) {
      localStorage.setItem("loginname", data["username"]);
      this.LOGIN_NAME(data["username"]);
      this.mescrollInit.resetUpScroll(); // ajax获取数据方法
    },
    errorCallBack() {
      alert("失败");
    },
    FilterUpdate(data) {
      this.FilterCond = data;
      // console.log("组件返回参数===", this.FilterCond);
      this.mescroll.resetUpScroll();
    },
    onEnter(value) {
      this.FilterCond = {
        Filter: `Debtorname like '%${this.enterText}%'`
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
      let data = {
        Urlpara: {
          Pageindex: page.num,
          Pagesize: page.size
        }
      };
      switch (this.$route.query.dateTime) {
        case "currentMonth": //当月额
          let nowTime = moment()
            .locale("zh-cn")
            .format("YYYY-MM");
          Object.assign(data.Urlpara, {
            Showmonthdata: nowTime,
            Filter: `Flag=main`
          });
          break;
        case "threeMonth": //近3个月到期
          let MONTH_NUMBER = 3; //常量3
          Object.assign(data.Urlpara, {
            Showexpiresoon: MONTH_NUMBER,
            Filter: `Flag=main`
          });
          break;
      }
      Object.assign(data.Urlpara, this.FilterCond);
      console.log(data);
      GetContractMgmt(data)
        .then(res => {
          if (!!res) {
            let arr = JSON.parse(res.Content);
            // 如果是第一页需手动制空列表
            if (page.num === 1) this.dataList = [];
            // 把请求到的数据添加到列表
            this.dataList = this.dataList.concat(arr);
            console.log(this.dataList);
            // 数据渲染成功后,隐藏下拉刷新的状态
            this.$nextTick(() => {
              mescroll.endByPage(arr.length, res.Pagecount); //修复结束条件
            });
          } else {
            this.dataList = [];
            this.hasData = !this.hasData;
            mescroll.endByPage(arr.length, res.Pagecount);
          }
        })
        .catch(e => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr();
        });
    },
    gotoDetail(data) {
      const requestData = {
        Contractmgmt: {
          Rentalid: data.Rentalid,
          Companyid: data.Companyid,
          Propertyid: data.Propertyid
        }
      };
      this.$router.push({
        name: "contractDetail",
        params: { id: requestData.Contractmgmt.Rentalid, data: requestData }
      });
    },
    getbusinessStatus(data) {
      switch (data) {
        case "Active":
          return "Active";
          break;
        case "Submitted":
          return "Submitted";
          break;
        case "Signed":
          return "Signed";
          break;
        case "Voing":
          return "Voing";
          break;
        case "Expired":
          return "Expired";
          break;
        case "Closed":
          return "Closed";
          break;
        case "Terminated":
          return "Terminated";
          break;
        case "Releting":
          return "Releting";
          break;
        case "Rejected":
          return "Rejected";
          break;
        case "Execing":
          return "Execing";
          break;
        case "Approved":
          return "Approved";
          break;
        case "Tempsave":
          return "Tempsave";
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
    padding: 0 40px;
    position: fixed;
    top: 270px;
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
        @include flexHCenter;
        padding: 20px 30px;
        border-bottom: 4px dashed rgba(218, 228, 250, 0.8);
        span:first-child {
          @include sc(32px, rgba(30, 30, 30, 1));
          font-family: $fm;
          @include flexHCenter;
          font-weight: bolder;
        }
        span:last-child {
          @include wh(100px, 50px);
          @include flexCenter;
          @include borderRadius(4px);
          @include sc(24px, rgba(255, 255, 255, 1));
          font-family: $fr;
        }
        //未提交
        .Active {
          background-color: #fff;
          border: 1px solid rgba(235, 237, 239, 1);
          color: rgba(0, 0, 0, 1) !important;
        }
        //已签约
        .Signed {
          background: rgba(59, 222, 186, 1);
        }
        //审批中
        .Submitted {
          background: rgba(105, 167, 254, 1);
        }
        //执行中
        .Execing {
          background: rgba(105, 167, 254, 1);
        }
        //变更中
        .Voing {
          background: rgba(149, 154, 255, 1);
        }
        //已到期
        .Expired {
          background: rgba(255, 166, 112, 1);
        }
        //已关闭
        .Closed {
          background: rgba(188, 204, 212, 1);
        }
        //已终止
        .Terminated {
          background: rgba(248, 123, 123, 1);
        }
        //续租中
        .Releting {
          background: rgba(135, 226, 248, 1);
        }
        //已驳回
        .Rejected {
          background: rgba(253, 180, 84, 1);
        }
        //已审核
        .Approved {
          background: rgba(120, 202, 255, 1);
        }
        //暂存
        .Tempsave {
          background: linear-gradient(
            to left,
            rgba(203, 220, 234, 1),
            rgba(173, 188, 198, 1)
          );
        }
      }
      .bottom {
        // 底部
        padding: 28px 30px 14px;
        div {
          margin-bottom: 14px;
          line-height: 36px;
          label {
            @include sc(28px, rgba(136, 136, 136, 1));
            font-family: $fr;
          }
          .text {
            @include sc(28px, rgba(30, 30, 30, 1));
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
        .cycleText {
          margin-top: 25px;
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

