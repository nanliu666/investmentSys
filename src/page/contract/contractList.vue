<template>
  <div>
    <x-header :left-options="{backText: ''}" class="header">
      合同管理
      <i class="iconfont icon-fangdajing" slot="right" @click="search"></i>
    </x-header>
    <section class="filter">
      <div class="projectFilter">
        <span>项目</span>
      </div>
      <div @click="openStatus">
        <span>状态</span>
        <x-icon type="ios-arrow-down" size="25" v-show="!hasStatus"></x-icon>
        <x-icon type="ios-arrow-up" size="25" v-show="hasStatus"></x-icon>
        <!-- 选择状态 -->
        <transition
          name="custom-classes-transition"
          enter-active-class="animated bounceInDown"
          leave-active-class="animated bounceOutRight"
        >
          <section v-if="hasStatus" class="status">
            <!-- <div
              v-for="(item, index) in statusDetail"
              :key="index"
            ></div> -->
          </section>
        </transition>
      </div>
    </section>
    <!--mescroll滚动区域的基本结构-->
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <!--内容...-->
      <li v-for="(item) in dataList" :key="item.Rentalid" @click="gotoDetail(item)">
        <div class="top">
          <span>月亮湾二期 1506</span>
          <span
            :class="getbusinessStatus(item.Contractstatushow)"
            v-text="statusDetail[item.Contractstatushow]"
          >审批中</span>
        </div>
        <div class="bottom">
          <div class="client">
            <div>
              <label>客户：</label>
              <span class="text">{{item.Debtorname}}</span>
            </div>
            <div class="phone">
              <label>合同总额:</label>
              <span class="text">￥{{item.Contractamt | formatNumber}}</span>
            </div>
            <div class="trace">
              <label>面积:</label>
              <span class="text">{{item.Totalrentalarea}}M²</span>
            </div>
          </div>
          <div>
            <label>租赁周期：</label>
            <span
              class="text"
            >{{item.Defaultstartdate | dataFrm('YYYY-MM-DD')}}至{{item.Defaultexpirydate | dataFrm('YYYY-MM-DD')}}</span>
          </div>
        </div>
      </li>
    </mescroll-vue>
  </div>
</template>
<script>
import { XHeader, Search } from "vux";
import { GetContractMgmt } from "@/axios/api";
// 引入下拉组件
import MescrollVue from "mescroll.js/mescroll.vue";
export default {
  name: "contractList",
  data() {
    return {
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
        htmlNodata: '<p class="upwarp-nodata">亲,没有更多数据了~</p>',
        noMoreSize: 5, //如果列表已无数据,可设置列表总数大于5才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
        toTop: {
          //回到顶部按钮
          src: "./static/mescroll/mescroll-totop.png", //图片路径,默认null,支持网络图
          offset: 1000 //列表滚动1000px才显示回到顶部按钮
        },
        empty: {
          //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
          warpId: "xxid", //父布局的id (1.3.5版本支持传入dom元素)
          icon: "./static/mescroll/mescroll-empty.png", //图标,默认null,支持网络图
          tip: "暂无相关数据~" //提示
        }
      },
      dataList: [], //所有的合同列表数据

      hasSearch: false,
      hasStatus: false,
      statusDetail: {
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
      },
      statusList: [],//状态列表

    };
  },
  components: {
    XHeader,
    Search,
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
    // mescroll组件初始化的回调,可获取到mescroll对象 (如果this.mescroll并没有使用到,可不用写mescrollInit)
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback(page, mescroll) {
      // 联网请求
      const data = {
        Urlpara: {
          Pageindex: page.num,
          Pagesize: page.size
        }
      };
      GetContractMgmt(data)
        .then(res => {
          // 请求的列表数据
          let arr = JSON.parse(res.Content);
          console.log(arr);
          // 如果是第一页需手动制空列表
          if (page.num === 1) this.dataList = [];
          // 把请求到的数据添加到列表
          this.dataList = this.dataList.concat(arr);
          // 数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(() => {
            mescroll.endSuccess(arr.length);
          });
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
      console.log(requestData);
    },
    search() {
      this.hasSearch = !this.hasSearch;
    },
    openStatus() {
      this.hasStatus = !this.hasStatus;
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

.header {
  box-shadow: 0 0px 0px 0 #fff !important; //重叠头部
}
.filter {
  background-color: #fff;
  @include fd(row);
  box-shadow: 0 4px 14px 0 rgba(126, 158, 230, 0.15);
  padding: 10px 0;
  .projectFilter {
    border-right: 1px solid #ccc;
  }
  div {
    width: 50%;
    @include flexCenter;
    span {
      //状态，项目文字
      @include sc(28px, rgba(30, 30, 30, 1));
      font-family: $familyR;
      margin-right: 12px;
    }
  }
  //状态选择
  .status {
    position: absolute;
    right: 0;
    top: 146px;
    width: 50%;
    background-color: #fff;
    @include fd(column);
    a {
      width: 100%;
      @include flexCenter;
      padding: 10px;
    }
  }
}
.mescroll {
  // padding: 10px 40px 0;
  @include cl;
  width: 88%;
  position: fixed;
  top: 160px;
  bottom: 0;
  height: auto;
  li {
    margin-bottom: 20px;
    @include borderRadius(8px);
    box-shadow: 0 0 4px 10px 0 rgba(126, 158, 230, 0.15);
    background-color: $fc;
    .top {
      //详情头部
      @include fj(space-between);
      padding: 30px;
      border-bottom: 2px dashed rgba(72, 121, 230, 1); /*no*/
      span:first-child {
        @include sc(32px, rgba(30, 30, 30, 1));
        font-family: $familyMedium;
      }
      span:last-child {
        padding: 6px 10px;
        @include borderRadius(4px);

        @include sc(20px, rgba(255, 255, 255, 1));
        font-family: $familyR;
      }
      //未提交
      .Active {
        background: linear-gradient(
          to left,
          rgba(96, 229, 139, 1),
          rgba(10, 188, 108, 1)
        );
      }
      //已签约
      .Signed {
        background: linear-gradient(
          to left,
          rgba(40, 140, 241, 1),
          rgba(120, 202, 255, 1)
        );
      }
      //审批中
      .Submitted {
        background: linear-gradient(
          to left,
          rgba(123, 110, 240, 1),
          rgba(202, 154, 210, 1)
        );
      }
      //执行中
      .Execing {
        background: linear-gradient(
          to left,
          rgba(203, 220, 234, 1),
          rgba(173, 188, 198, 1)
        );
      }
      //变更中
      .Voing {
        background: linear-gradient(
          to left,
          rgba(203, 220, 234, 1),
          rgba(173, 188, 198, 1)
        );
      }
      //已到期
      .Expired {
        background: linear-gradient(
          to left,
          rgba(203, 220, 234, 1),
          rgba(173, 188, 198, 1)
        );
      }
      //已关闭
      .Closed {
        background: linear-gradient(
          to left,
          rgba(203, 220, 234, 1),
          rgba(173, 188, 198, 1)
        );
      }
      //已终止
      .Terminated {
        background: linear-gradient(
          to left,
          rgba(203, 220, 234, 1),
          rgba(173, 188, 198, 1)
        );
      }
      //续租中
      .Releting {
        background: linear-gradient(
          to left,
          rgba(203, 220, 234, 1),
          rgba(173, 188, 198, 1)
        );
      }
      //已驳回
      .Rejected {
        background: linear-gradient(
          to left,
          rgba(203, 220, 234, 1),
          rgba(173, 188, 198, 1)
        );
      }
      //已审核
      .Approved {
        background: linear-gradient(
          to left,
          rgba(203, 220, 234, 1),
          rgba(173, 188, 198, 1)
        );
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
      padding: 28px 30px;
      div {
        margin-bottom: 20px;
        label {
          @include sc(28px, rgba(136, 136, 136, 1));
          font-family: $familyR;
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
          font-family: $familyR;
          border: 1px solid rgba(72, 121, 230, 1); /*no*/
          padding: 0px 26px;
        }
      }
    }
  }
}
</style>

