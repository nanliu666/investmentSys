<template>
  <div class="contractList">
    <div class="appTopOther"></div>
    <x-header :left-options="{showBack: false}" class="header" v-if="!hasSearch">
      <div slot="left" @click="goback()" class="fs-backBox">
        <img src="../../assets/images/返回@3x.png" class="fs-backICon" alt>
      </div>商机管理
      <img
        class="fs-addNew"
        src="../../../../assets/images/搜索.png"
        @click="openSearch"
        slot="right"
        alt
      >
      <img
        src="../../../../assets/images/addNew.png"
        @click="addBusiness"
        slot="right"
        class="fs-addNew"
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
        <img
          class="fs-addNew"
          src="../../../../assets/images/搜索.png"
          @click="onEnter"
          slot="right"
          alt
        >
      </x-input>
      <div class="cancel" @click="searchCancel">取消</div>
    </section>
    <projeceSelect
      :statusDetail="statusDetail"
      @FilterUpdate="FilterUpdate"
      comName="businessList"
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
          <span>{{item.Accountname}}</span>
          <span
            :class="getbusinessStatus(item.Recordstatus)"
            v-text="getbusinessText(item.Recordstatus)"
          ></span>
        </div>
        <div class="bottom">
          <div class="client">
            <div>
              <label>意向单元：</label>
              <span class="text">{{item.Companyname}}{{item.Projectname}}{{item.Unitdesc}}</span>
            </div>
            <div class="cycleText">
              <label>最后一次接触时间：</label>
              <span v-if="item.Lastdate === '1900-01-01T00:00:00'"></span>
              <span v-else>{{item.Lastdate | dataFrm('YYYY-MM-DD')}}</span>
              <!-- <span class="text">{{item.Lastdate | dataFrm('YYYY-MM-DD')}}</span> -->
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
import { GetBizOpportunity, GetCompanyies, GetPropertys } from "@/axios/api";
// 引入下拉组件
import MescrollVue from "mescroll.js/mescroll.vue";
import imgSrc from "../../../../assets/images/noData.png";
import topimgSrc from "../../assets/images/gototop.png";
export default {
  name: "businessList",
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
      require(["../../../../components/projectSelect.vue"], resolve);
    }
  },
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
    addBusiness() {
      this.$router.push({
        name: "businessAdd",
        query: {
          from: "businessList"
        }
      });
    },
    FilterUpdate(data) {
      this.FilterCond = data;
      this.dataList = []; // 把数据清空，可以稍微避免让用户看到之前缓存的数据

      this.mescroll.resetUpScroll();
    },
    onEnter(value) {
      this.FilterCond = {
        Filter: `Accountname like '%${this.enterText}%'`
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
          if (!!res) {
            let arr = JSON.parse(res.Content);
            // 如果是第一页需手动制空列表
            if (page.num === 1) this.dataList = [];
            // 把请求到的数据添加到列表
            this.dataList = this.dataList.concat(arr);
            console.log("商机数组", this.dataList);
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
      localStorage.setItem("businessDetail", JSON.stringify(data));
      this.$router.push({
        name: "businessDetail",
        params: {
          id: data.Prospectid
        },
        query: {
          from: "businessList"
        }
      });
    },
    getbusinessText(data) {
      let strDatd = this.$options.filters.firstUpperCase(data);
      // console.log(strDatd);
      switch (strDatd) {
        case "Active":
          return "新商机";
          break;
        case "Lost":
          return "已流失";
          break;
        case "Signed":
          return "已签约";
          break;
        case "Quotation":
          return "已报价";
          break;
        case "Booked":
          return "已预订";
          break;
        case "INACTIVE":
          return "已删除";
          break;
        case "Used":
          return "已使用";
          break;
      }
    },
    getbusinessStatus(data) {
      let strDatd = this.$options.filters.firstUpperCase(data);
      // console.log(strDatd);
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
  .fs-addNew {
    @include wh(18px, 18px);
    margin-left: 10px;
  }
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
    top: 230px;
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
        padding: 20px 30px;
        @include flexHCenter;
        border-bottom: 4px dashed rgba(218, 228, 250, 0.8); /*no*/
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
          line-height: 36px;
          label {
            @include sc(28px, rgba(136, 136, 136, 1));
            font-family: $fr;
          }
          .text {
            @include sc(28px, rgba(30, 30, 30, 1));
          }
          .cycleText {
            margin-top: 25px;
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

