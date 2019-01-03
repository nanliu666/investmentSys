<template>
  <div>
    <x-header :left-options="{backText: ''}" class="header" v-if="!hasSearch">
      合同管理
      <i class="iconfont icon-fangdajing" slot="right" @click="openSearch"></i>
    </x-header>
    <section class="searchPart" v-if="hasSearch">
      <x-input
        type="text"
        placeholder="请输入合同关键字"
        v-model="enterText"
        @on-enter="onEnter"
        class="searchInput fs-search"
      >
        <i class="iconfont icon-fangdajing" slot="right" @click="onEnter"></i>
      </x-input>
      <div class="cancel" @click="searchCancel">取消</div>
    </section>
    <section class="filter">
      <div class="projectFilter">
        <span class="filterTitle" @click="openProjectStatus">项目</span>
        <x-icon type="ios-arrow-down" size="25" v-show="!hasprojectStatus"></x-icon>
        <x-icon type="ios-arrow-up" size="25" v-show="hasprojectStatus"></x-icon>
        <popup v-model="hasprojectStatus" position="bottom" class="nav" :show-mask="showMask">
          <div class="close" @click="openProjectStatus">
            <i class="iconfont icon-guanbi"></i>
          </div>
          <section class="projectSelect">
            <div class="selectTitle">请选择</div>
            <div class="selectNav">
              <span
                :class="[!!companysSelect ? 'active' : '']"
                @click="reselectCompany"
              >{{companysSelect ? companysSelect : '选择公司'}}</span>
              <span :class="[!!companysSelect ? 'iActive' : '']">>></span>
              <span
                v-if="companysSelect"
                :class="[!!PropertysSelect ? 'active' : '']"
              >{{PropertysSelect ? PropertysSelect : '选择项目'}}</span>
            </div>
            <div class="selectCompanys" v-if="!companysSelect">
              <div>公司名称</div>
              <ul>
                <li
                  v-for="item in companysList"
                  :key="item.Companyid"
                  @click="getCompanyDeatil(item)"
                >{{item.Companyname}}</li>
                <li v-if="companysList.length === 0">暂无公司</li>
              </ul>
            </div>
            <div class="selectCompanys" v-if="!!companysSelect">
              <div>项目名称</div>
              <ul>
                <li
                  v-for="item in PropertysList"
                  :key="item.Propertyid"
                  @click="getPropertyDeatil(item)"
                >{{item.Propertyname}}</li>
                <li v-if="PropertysList.length === 0">暂无项目</li>
              </ul>
            </div>
          </section>
        </popup>
      </div>
      <div class="projectStatus" @click="openStatus">
        <span class="filterTitle">状态</span>
        <x-icon type="ios-arrow-down" size="25" v-show="!hasStatus"></x-icon>
        <x-icon type="ios-arrow-up" size="25" v-show="hasStatus"></x-icon>
        <!-- 选择状态 -->
        <transition
          name="custom-classes-transition"
          enter-active-class="animated bounceInDown"
          leave-active-class="animated bounceOutRight"
        >
          <section v-if="hasStatus" class="status">
            <a v-for="(value, key) in statusDetail" :key="key" @click="getStatus(key)">{{value}}</a>
          </section>
        </transition>
      </div>
    </section>
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
          <span>{{item.Companyname}} {{item.Projectname}}</span>
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
          </div>
          <div>
            <label class="cycleText">租赁周期：</label>
            <span
              class="cycleText"
            >{{item.Defaultstartdate | dataFrm('YYYY-MM-DD')}}&nbsp;至&nbsp;{{item.Defaultexpirydate | dataFrm('YYYY-MM-DD')}}</span>
          </div>
        </div>
      </li>
    </mescroll-vue>
    <p id="NoData" v-show="hasToast"></p>
  </div>
</template>
<script>
import { XHeader, Search, Popup, XInput } from "vux";
import { GetContractMgmt, GetCompanyies, GetPropertys } from "@/axios/api";
// 引入下拉组件
import MescrollVue from "mescroll.js/mescroll.vue";
import imgSrc from "../../assets/images/分组.png";
import topimgSrc from "../../assets/images/gototop.png";
export default {
  name: "contractList",
  data() {
    return {
      enterText: "",
      projectInit: {},
      companysList: [],
      companysSelect: "",
      PropertysList: [],
      PropertysSelect: "",
      showMask: false,
      hasprojectStatus: false,
      hasSearch: false,
      hasStatus: false,
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

      hasToast: false,
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
      },
      statusList: [] //状态列表
    };
  },
  components: {
    XHeader,
    XInput,
    Popup,
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
    onEnter(value) {
      console.log("输入的值", this.enterText);
      this.FilterCond = {
        //todo 项目不能模糊搜索
        Filter: `Keyword.like.${this.enterText}`
      };
      this.mescroll.resetUpScroll();

      console.log("传输值", this.FilterCond);
    },
    searchCancel() {
      this.hasSearch = !this.hasSearch;
    },
    openSearch() {
      this.hasSearch = !this.hasSearch;
    },
    openStatus() {
      this.hasStatus = !this.hasStatus;
    },
    openProjectStatus() {
      //项目切换
      this.hasprojectStatus = !this.hasprojectStatus;
      this.getCompany();
      this.projectInit = JSON.parse(localStorage.getItem("projectSelected"));
      // console.log(this.projectInit);
      // if (this.projectInit) {
      //   //todo 需要后端补充，公司名称，显示使用公司ID
      //   this.companysSelect = this.projectInit.Companyid;
      //   this.PropertysSelect = this.projectInit.Propertyname;
      //   this.FilterCond = {
      //     Filter: `Companyid.=.${this.projectInit.Companyid}&Propertyid.=.${
      //       this.projectInit.Propertyid
      //     }`
      //   };
      // }
    },
    getCompany() {
      const data = {
        Companyid: 0
      };
      GetCompanyies(data).then(res => {
        this.companysList = res.Content;
      });
    },
    getCompanyDeatil(data) {
      //获得公司
      this.companysSelect = data.Companyname;
      this.PropertysSelect = "";
      const jsonData = {
        Propertyid: 0
      };
      GetPropertys(jsonData).then(res => {
        //获取项目
        this.PropertysList = this._.filter(
          res.Content,
          item => item.Companyid === data.Companyid
        );
      });
    },
    getPropertyDeatil(data) {
      // console.log(data);
      this.PropertysSelect = data.Propertyname;
      localStorage.setItem("projectSelected", JSON.stringify(data));
      //选择项目，自定义搜索字段
      // 拼接项目和状态两个的ID ---TODO可以优化写法！
      this.FilterCond = {
        //不存在状态
        Filter: `Companyid.=.${data.Companyid}&Propertyid.=.${data.Propertyid}`
      };
      this.mescroll.resetUpScroll();
      this.hasprojectStatus = !this.hasprojectStatus;
    },
    reselectCompany() {
      this.companysSelect = "";
      this.PropertysSelect = "";
    },
    getStatus(key) {
      //点击状态，选择状态，自定义搜索字段
      if (key === "all") {
        this.FilterCond = {};
      } else {
        this.FilterCond = {
          Filter: `Contractstatushow.=.${key}`
        };
      }
      this.mescroll.resetUpScroll();
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
      GetContractMgmt(data)
        .then(res => {
          console.log(res);
          // 请求的列表数据
          let arr = JSON.parse(res.Content);
          // console.log(arr);
          if (arr.length === 0) {
            this.hasToast = !this.hasToast;
          }
          // 如果是第一页需手动制空列表
          if (page.num === 1) this.dataList = [];
          // 把请求到的数据添加到列表
          this.dataList = this._.uniqBy(this.dataList.concat(arr), "Rentalid");
          console.log("拉回来的数组数据=>", arr.length);

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

.header {
  box-shadow: 0 0px 0px 0 #fff !important; //重叠头部
}

.searchPart {
  padding: 0 40px;
  @include fj(space-between);
  background-color: #fff;
  .fs-search {
    height: 36px;
    border-radius: 18px;
    margin: 5px 0;
  }
  .searchInput {
    border: 1px solid #ccc;
    width: 88%;
  }
  .cancel {
    @include sc(30px, rgb(105, 167, 254));
    @include flexCenter;
  }
}
.filter {
  background-color: #fff;
  @include fd(row);
  box-shadow: 0 4px 14px 0 rgba(126, 158, 230, 0.15);
  padding: 10px 0;
  .projectFilter {
    border-right: 1px solid #ccc;
  }
  .projectStatus,
  .projectFilter {
    width: 50%;
    @include flexCenter;
    .filterTitle {
      //状态，项目文字
      @include sc(28px, rgba(30, 30, 30, 1));
      font-family: $familyR;
      margin-right: 12px;
    }
  }
  .nav {
    background-color: #fff;
    box-shadow: 0 -4px 14px 0 rgba(126, 158, 230, 0.15);
    .close {
      //弹出层关闭
      display: flex;
      justify-content: flex-end;
      margin-right: 50px;
      margin-top: 20px;
      .iconfont {
        color: rgba(136, 136, 136, 1);
      }
    }
    .projectSelect {
      .selectTitle {
        @include flexCenter;
        @include sc(32px, rgba(30, 30, 30, 1));
        padding-bottom: 50px;
      }
      .selectNav {
        padding: 0 40px;
        span {
          @include sc(28px, rgba(136, 136, 136, 1));
          padding: 16px;
        }
        .active {
          background-color: rgba(105, 167, 254, 0.08);
          border: 2px solid rgba(105, 167, 254, 0.3);
          @include sc(28px, rgba(105, 167, 254, 1));
        }
        .iActive {
          @include sc(28px, rgba(105, 167, 254, 1));
        }
      }
      .selectCompanys {
        margin-top: 50px;
        div:first-child {
          background-color: rgba(243, 248, 253, 1);
          padding: 26px 40px;
          @include sc(32px, rgba(30, 30, 30, 1));
        }
        ul {
          li {
            background-color: rgba(249, 249, 249, 1);
            margin: 4px 0;
            padding: 26px 40px;
            @include sc(30px, rgba(30, 30, 30, 1));
          }
        }
      }
    }
  }

  //状态选择
  .status {
    @include borderStyle(#f4f6f8);
    position: absolute;
    z-index: 100;
    right: 4px;
    top: 154px;
    width: 50%;
    background-color: #fff;
    @include fd(column);
    a {
      @include sc(28px, rgba(30, 30, 30, 1));
      width: 100%;
      @include flexCenter;
      padding: 10px;
      &:hover {
        background-color: rgba(105, 167, 254, 1);
      }
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
        background: rgb(105, 167, 254);
      }
      //执行中
      .Execing {
        background: rgba(98, 198, 255, 1);
      }
      //变更中
      .Voing {
        background: rgb(149, 154, 255);
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
        background: rgb(59, 222, 186);
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
        .cycleText {
          @include sc(24px, rgba(174, 174, 174, 1));
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
.mescroll-totop {
  background-color: red;
}
#NoData {
  position: absolute;
  @include flexCenter;
  height: 80%;
  width: 100%;
}
</style>

