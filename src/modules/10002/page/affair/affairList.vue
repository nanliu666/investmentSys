<template>
  <div class="affairList">
    <div class="appTopOther"></div>
    <x-header class="header" :left-options="{showBack: false}" v-if="!hasSearch">
      <img
        src="../../assets/images/返回@3x.png"
        slot="left"
        class="fs-backICon"
        alt
        @click="goback()"
      >
      事务管理
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
        placeholder="请输入事务关键字"
        v-model="enterText"
        @on-enter="onEnter"
        class="searchInput fs-search"
      >
        <img class="searchImg" src="../../assets/images/搜索.png" @click="onEnter" slot="right" alt>
      </x-input>
      <div class="cancel" @click="searchCancel">取消</div>
    </section>
    <section class="tittle">
      <div class="backlog" :class="[!hasActive ? 'active' : '']" @click="getNeedTODO">待办</div>
      <div class="feige">|</div>
      <div class="finished" :class="[hasActive ? 'active' : '']" @click="getFinished">已办</div>
    </section>
    <mescroll-vue
      class="mescroll"
      ref="mescroll"
      :down="mescrollDown"
      :up="mescrollUp"
      @init="mescrollInit"
    >
      <!--内容...-->
      <li class="newLi" v-for="(item) in affairList" :key="item.MessageId" @click="getDeatil(item)">
        <div class="top">
          <div class="topLeft">{{item.Title}}</div>
          <div class="topRight">审批</div>
        </div>
        <div class="bottom">
          <div class="bottomLeft">提交人:{{item.Receiveuserloginname}}</div>
          <div class="bottomRight">{{item.Senddatetime | dataFrm('YYYY-MM-DD')}}</div>
        </div>
      </li>
    </mescroll-vue>
    <p id="NoData"></p>
  </div>
</template>

<script>
import { XHeader, XInput } from "vux";
import { getTodoList } from "@/axios/api";
import MescrollVue from "mescroll.js/mescroll.vue";
import imgSrc from "../../assets/images/分组.png";
import topimgSrc from "../../assets/images/gototop.png";
export default {
  name: "affairList",
  data() {
    return {
      hasActive: false,
      affairList: [],
      affairCond: {
        LoginName: "",
        PageIndex: 1,
        PageSize: 10,
        Status: 1, //1表示待办 2表示已办
        Keyword: ""
      },
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
        noMoreSize: 5, //如果列表已无数据,可设置列表总数大于5才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
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
      }
    };
  },
  components: {
    XHeader,
    XInput,
    MescrollVue
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "affairDetail") {
      to.meta.isBack = true;
    }
    // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
    next(vm => {
      // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteEnter方法
      vm.$refs.mescroll.beforeRouteEnter(); // 进入路由时,滚动到原来的列表位置,恢复回到顶部按钮和isBounce的配置
    });
  },
  beforeRouteLeave(to, from, next) {
    // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteLeave方法
    // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
    this.$refs.mescroll && this.$refs.mescroll.beforeRouteLeave(); // 退出路由时,记录列表滚动的位置,隐藏回到顶部按钮和isBounce的配置
    next();
  },
  created() {
    this.isFirstEnter = true;
    document.addEventListener("deviceready", this.onDeviceReady, false);
  },
  activated() {
    if (!this.$route.meta.isBack || this.isFirstEnter) {
      // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
      // 如果isFirstEnter是true，表明是第一次进入此页面或用户刷新了页面，需获取新数据
      this.affairList = []; // 把数据清空，可以稍微避免让用户看到之前缓存的数据
      this.mescroll.resetUpScroll(); // ajax获取数据方法
    }
    // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
    this.$route.meta.isBack = false;
    this.isFirstEnter = false;
  },
  methods: {
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
      // 用户名
      this.affairCond.LoginName = data["username"];
      this.mescroll.resetUpScroll();
    },
    errorCallBack(data) {
      console.log(data);
    },
    getDeatil(data) {
      sessionStorage.setItem("affairDetail", JSON.stringify(data));
      this.$router.push({
        name: "affairDetail",
        params: {
          id: data.ThirdPartyKey,
          data: data
        }
      });
    },
    onEnter(value) {
      this.affairCond.Keyword = value;
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
      if (typeof cordova !== "function") {
        this.affairCond.LoginName = "qw";
      }
      this.affairCond.PageIndex = page.num;
      this.affairCond.PageSize = page.size;
      getTodoList(this.affairCond)
        .then(res => {
          let arr = res.Content;
          // 如果是第一页需手动制空列表
          if (page.num === 1) this.affairList = [];
          // 把请求到的数据添加到列表 过滤未提交状态--因为合同没有未提交的状态
          this.affairList = this.affairList.concat(arr);
          console.log("消息列表===>", this.affairList);
          // 数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(() => {
            mescroll.endByPage(arr.length, res.Total); //修复结束条件
          });
        })
        .catch(e => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr();
        });
    },
    getNeedTODO() {
      this.hasActive = !this.hasActive;
      this.affairCond.Status = 1;
      this.mescroll.resetUpScroll();
    },
    getFinished() {
      this.hasActive = !this.hasActive;
      this.affairCond.Status = 2;
      this.mescroll.resetUpScroll();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/sass/mixin";
.affairList {
  height: 100%;
}
.header {
  box-shadow: 0 0px 0px 0 #fff !important; //重叠头部
}
.tittle {
  background-color: #fff;
  @include fj(space-around);
  @include sc(28px, rgba(30, 30, 30, 1));
  padding: 10px 0px 0px;
  margin-top: -10px;
  box-shadow: 0 4px 14px 0 rgba(126, 158, 230, 0.15);

  .feige {
    color: #ccc;
  }
  .finished,
  .backlog {
    width: 12%;
    @include flexCenter;
    padding-bottom: 20px;
  }
  .active {
    border-bottom: 4px solid rgba(105, 167, 254, 1);
  }
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
  position: fixed;
  top: 230px;
  bottom: 0;
  height: auto;
  .newLi {
    background-color: #fff;
    padding: 26px 40px;
    margin-bottom: 1px;
    .top {
      @include fj;
      margin-bottom: 14px;

      .topLeft {
        @include sc(30px, rgba(30, 30, 30, 1));
        @include ellipsis;
        width: 80%;
      }
      .topRight {
        background-color: rgba(105, 167, 254, 1);
        @include wh(80px, 38px);
        @include flexCenter;
        @include sc(20px, rgba(255, 255, 255, 1));
      }
    }
    .bottom {
      @include fj;
      @include sc(28px, rgba(136, 136, 136, 1));
    }
  }
}
.mescroll-totop {
  background-color: red;
}
#NoData {
  // @include center;
  @include flexCenter;
  height: 80%;
  width: 100%;
}
</style>


