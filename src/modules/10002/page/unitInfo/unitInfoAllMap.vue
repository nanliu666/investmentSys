<template>
  <div class="unitInfoAllMap">
    <div class="allHeader">
      <div class="appTopOther"></div>
      <x-header :left-options="{showBack: false}" class="header">
        <div slot="left" @click="goback()" class="fs-backBox">
          <img src="../../assets/images/返回@3x.png" class="fs-backICon" alt>
        </div>
        <div class="headerTittle" @click="openProjecySelct">{{headerTittle}}</div>
        <span class="imgBox">
          <img
            src="../../assets/images/下拉@3x.png"
            class="fs-dropImg"
            v-show="!hasprojectStatus"
            alt
          >
        </span>
        <span class="imgBox">
          <img
            src="../../assets/images/下拉@3x.png"
            class="fs-dropImg"
            v-show="hasprojectStatus"
            alt
            style="transform:rotate(180deg);"
          >
        </span>
      </x-header>
      <tab
        v-if="!hasUintNumber"
        class="tab"
        :scroll-threshold="5"
        :line-width="1"
        custom-bar-width="60px"
        :bar-active-color="barActiveColor"
        active-color="rgba(30, 30, 30, 1)"
        default-color="rgba(136, 136, 136, 1)"
      >
        <tab-item selected @on-item-click="getStatus(4)">
          <div class="tabDiv all">全部</div>
        </tab-item>
        <tab-item @on-item-click="getStatus(0)">
          <div class="tabDiv">
            <div class="toRent">1</div>可租
          </div>
        </tab-item>
        <tab-item @on-item-click="getStatus(1)">
          <div class="tabDiv">
            <div class="reserve">1</div>已预定
          </div>
        </tab-item>
        <tab-item @on-item-click="getStatus(2)">
          <div class="tabDiv">
            <div class="rented">1</div>已租
          </div>
        </tab-item>
        <tab-item @on-item-click="getStatus(3)">
          <div class="tabDiv">
            <div class="noRented">1</div>不可租
          </div>
        </tab-item>
      </tab>
      <!-- <div class="uintNumber" v-if="hasUintNumber">当前楼盘可租单元: {{uintNumber}}</div> -->
    </div>
    <popup v-model="hasprojectStatus" position="bottom" class="nav" :show-mask="showMask">
      <div class="close" @click="openProjecySelct">
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
            @click="reselectProject"
            v-if="companysSelect"
            :class="[!!PropertysSelect ? 'active' : '']"
          >{{PropertysSelect ? PropertysSelect : '选择项目'}}</span>
          <span :class="[!!PropertysSelect ? 'iActive' : '']" v-if="!!PropertysSelect">>></span>
          <span
            v-if="companysSelect && PropertysSelect"
            :class="[!!blockSelect ? 'active' : '']"
          >{{blockSelect ? blockSelect : '选择楼栋'}}</span>
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
        <div class="selectCompanys" v-if="!!companysSelect && !PropertysSelect">
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
        <div class="selectCompanys" v-if="!!PropertysSelect">
          <div>楼栋名称</div>
          <ul>
            <li
              v-for="item in blocksList"
              :key="item.Blockid"
              @click="getPropertyBlock(item)"
            >{{item.Blockname}}</li>
            <li v-if="blocksList.length === 0">暂无楼栋</li>
          </ul>
        </div>
      </section>
    </popup>
    <popup
      v-model="hasUnitDetail"
      position="bottom"
      class="UnitDetail"
      v-for="(key, value) in unitDetailSelect"
      :key="value"
    >
      <div class="top">
        <div class="topLeft">
          <span class="unitNo">{{unitDetailSelect.Unitno}}</span>
          <span class="unitStatus"></span>
        </div>
        <div class="topRight" @click="openUnitDetail">×</div>
      </div>
      <div class="main">
        <li>
          <span>租赁面积:</span>
          <span>{{unitDetailSelect.Usablearea | formatNumber(0)}}M²</span>
        </li>
        <!-- <li>
          <span>当前商机数:</span>
          <span>{{unitDetailSelect.Prospectnum}}</span>
        </li>-->
      </div>
      <div class="bottom" v-if="unitDetailSelect.Status === 0">
        <button @click="addReserve(unitDetailSelect)">新增预定</button>
        <button @click="addNewBusiness(unitDetailSelect)">新增商机</button>
      </div>
    </popup>
    <section class="uintInfoAll">
      <section class="navBar">
        <div class="top">
          <div class="goPrePage" @click="goPrePage">
            <x-icon type="ios-arrow-up" class="icon"></x-icon>
          </div>
          <div class="floorList" ref="floorList">
            <a
              ref="floorListLi"
              @click="floorLi(key,item)"
              v-for="(item, key) in floorListDisplay"
              :class="activeClass == key ? 'active' : ''"
              :key="key"
            >{{item.Floorno}} F</a>
          </div>
          <div class="goAllPage" :class="activeClass == 1 ? 'active' : ''" @click="goALLFloor">全部</div>
          <div class="goNextPage" @click="goNextPage">
            <x-icon type="ios-arrow-down" class="icon"></x-icon>
          </div>
        </div>
        <div class="bottom" @click="goUint">
          <img src="../../assets/images/分组 9.png" alt>
        </div>
      </section>
      <div class="kong"></div>
      <section class="MapDiv">
        <div id="unitInfoAllMap"></div>
      </section>
    </section>
    <section class="noData" v-if="noData">
      <img src="../../assets/images/noData.png" alt>
      <div class="noDataTittle">暂无数据</div>
    </section>

    <section class="footer" v-if="hasUintNumber">
      <div class="footerLeft">
        <span class="leftTittle">已选中单元</span>
        <div class="leftContent">
          <span v-for="(item, index) in uintVuexList" :key="index">{{item.Unitno}}</span>
        </div>
      </div>
      <button class="footerRight" @click="getUintList">确定</button>
    </section>
  </div>
</template>


<script>
import {
  GetCompanyies,
  GetUnitByBlockCompanyProject,
  GetBlocks,
  GetBlockList,
  GetPropertys
} from "@/axios/api";
import { XHeader, Tab, TabItem, Sticky, Popup } from "vux";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      Map: {},
      localStorageProject: {},
      MapBlockList: [],
      hasUintNumber: false,
      uintVuexList: [],
      uintNumber: "",
      showMask: false,
      noData: false,
      unitDetailSelect: {},
      headerTittle: "",
      companysSelect: "",
      PropertysSelect: "",
      blockSelect: "",
      PropertysList: [],
      companysList: [],
      blocksList: [],
      activeClass: 0,
      requestData: {},
      allBlock: [],
      allBlockFoorList: [],
      floorList: [],
      FloorSelectlist: [],
      floorListCount: 1,
      floorListDisplay: [],
      barActiveColor: "#4879e6",
      hasprojectStatus: false,
      hasUnitDetail: false
    };
  },
  components: { XHeader, Tab, TabItem, Sticky, Popup },
  name: "unitInfoAllMap",
  beforeRouteEnter(to, from, next) {
    if (from.name === "reserveAdd") {
      to.meta.isBack = true;
    }
    // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
    next();
  },
  created() {
    this.onLoad();
  },
  computed: {
    ...mapState(["scrollTop", "toPageName", "uintDetailList"])
  },

  methods: {
    goUint() {
      this.$router.push({
        name: "unitInfoALL",
        query: {
          from: "unitInfoAllMap"
        }
      });
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
      this.PropertysSelect = data.Propertyname;
      this.getBlock(data);
    },
    getBlock(data) {
      let JsonData = {
        Blockid: 0
      };
      GetBlocks(JsonData).then(res => {
        //获取符合条件的楼栋
        this.blocksList = this._.filter(
          res.Content,
          item => item.Propertyid === data.Propertyid
        );
      });
    },
    getPropertyBlock(data) {
      this.blockSelect = data.Blockname;
      Object.assign(data, { Propertyname: this.PropertysSelect });
      Object.assign(data, { Companyname: this.companysSelect });
      localStorage.setItem("project", JSON.stringify(data));
      this.localStorageProject = JSON.parse(localStorage.getItem("project"));
      this.headerTittle = `${this.localStorageProject.Propertyname}·${
        this.localStorageProject.Blockname
      }`;
      this.getUnitBlock();
      this.hasprojectStatus = !this.hasprojectStatus;
    },
    reselectCompany() {
      this.companysSelect = "";
      this.PropertysSelect = "";
      this.blockSelect = "";
    },
    reselectProject() {
      this.PropertysSelect = "";
      this.blockSelect = "";
    },

    //单元详细信息
    getUnitDetail(data) {
      if (
        //底部删选信息
        this.$route.query.from === "reserveAdd" ||
        this.$route.query.from === "businessAdd"
      ) {
        this.getUintID(data);
      } else {
        this.hasUnitDetail = !this.hasUnitDetail;
        this.unitDetailSelect = data;
      }
    },
    getUintID(data) {
      let A = this._.findIndex(this.uintVuexList, item => {
        return item.Unitid === data.Unitid;
      });
      if (A === -1) {
        this.uintVuexList.push(data);
      } else {
        let i = this.uintVuexList.indexOf(data);
        this.uintVuexList.splice(i, 1);
      }
      this.UINT_DETAIL(this.uintVuexList);
    },
    onLoad() {
      this.UINT_DETAIL();

      this.localStorageProject = JSON.parse(localStorage.getItem("project"));
      if (!!this.localStorageProject) {
        this.headerTittle = `${this.localStorageProject.Propertyname}·${
          this.localStorageProject.Blockname
        }`;
        this.requestData.Companyid = this.localStorageProject.Companyid;
        this.requestData.Projectid = this.localStorageProject.Propertyid;
        this.getUnitBlock();
      } else {
        this.openProjecySelct();
      }
      this.getCompany();
    },
    getUintList() {
      if (this.toPageName === "reserveAdd") {
        this.$router.replace({ name: "reserveAdd" });
      } else if (this.toPageName === "businessAdd") {
        this.$router.replace({ name: "businessAdd" });
      }
    },
    openUnitDetail() {
      this.hasUnitDetail = !this.hasUnitDetail;
    },
    getUintStatus(data) {
      switch (data) {
        case "UnitAVAILABLE":
          return "可租";
          break;
        case "UnitINACTIVE":
          return "已租";
          break;
        case "UnitACTIVE":
          return "不可租";
          break;
        case "RT_RentalStatus_Booked ":
          return "已预定";
          break;
      }
    },
    ...mapMutations(["RESERVEADD", "UINT_DETAIL"]),

    addReserve(data) {
      this.RESERVEADD(data);
      this.$router.push({
        name: "reserveAddFromUint",
        params: {
          data: data
        },
        query: {
          from: "unitInfoAll"
        }
      });
    },
    addNewBusiness(data) {
      // console.log(data)
      this.$router.push({
        name: "businessAdd",
        params: {
          data: data
        },
        query: {
          from: "unitInfoAll"
        }
      });
    },

    goPrePage() {
      this.floorListCount -= 1;
      if (this.floorListCount * 5 > 0) {
        this.activeClass = 0;
        this.floorListDisplay = this.FloorSelectlist[0].slice(
          (this.floorListCount - 1) * 5,
          this.floorListCount * 5
        );
      } else {
        this.floorListCount += 1;
        this.$vux.toast.show({
          text: "已无更多楼层",
          type: "cancel",
          time: "1000"
        });
      }
    },
    goNextPage() {
      this.floorListCount += 1;
      this.activeClass = 0;
      if (this.floorListCount * 5 < this.FloorSelectlist[0].length + 5) {
        this.floorListDisplay = this.FloorSelectlist[0].slice(
          (this.floorListCount - 1) * 5,
          this.floorListCount * 5
        );
      } else {
        this.floorListCount -= 1;
        this.$vux.toast.show({
          text: "已无更多楼层",
          type: "cancel",
          time: "1000"
        });
      }
    },
    goALLFloor() {
      this.activeClass = 1;
      this.allBlockFoorList = this.allBlock.Floorlist;
      this.getFloorData();
    },
    floorLi(key, item) {
      this.allBlockFoorList = item;
      this.Map.init({ defaultFloor: key + 1 });
      this.activeClass = key;
    },
    getbusinessStatus(data) {
      let strDatd = this.$options.filters.firstUpperCase(data);
      switch (strDatd) {
        //预定
        case "Rt_rentalstatus_booked":
          return "reserve";
          break;
        //可租
        case "Unitavailable":
          return "toRent";
          break;
        //不可租
        case "Unitactive":
          return "noRented";
          break;
        // 已租
        case "Unitinactive":
          return "rented";
          break;
      }
    },
    getStatus(index) {
      if (index === 0) {
        // this.requestData.Statucode = "UnitAvailable";
        this.Map.colorPalette.fliterGraph(0);
      } else if (index === 1) {
        // this.requestData.Statucode = "RT_RentalStatus_Booked";
        this.Map.colorPalette.fliterGraph(2);
      } else if (index === 2) {
        // this.requestData.Statucode = "UnitINACTIVE";
        this.Map.colorPalette.fliterGraph(1);
      } else if (index === 3) {
        // this.requestData.Statucode = "UnitActive";
        this.Map.colorPalette.fliterGraph(3);
      } else {
        // this.requestData.Statucode = "";
        this.Map.colorPalette.showAllGraph();
      }
    },
    getUnitBlock() {
      let data = {
        Blockid: this.localStorageProject.Blockid,
        SystemCode: ""
      };

      GetBlockList(data).then(res => {
        this.allBlock = JSON.parse(res);

        this.hasProject();
        let NowDate = moment()
          .format("YYYY-M-DD")
          .toString();
        this.Map = new IFCA_VIEW("#unitInfoAllMap", this.allBlock, {
          Range: NowDate,
          Align: "center",
          floorListOff: false,
          MagnifierOff: false
        });
        this.Map.colorPalette.autoMapColor("Status", [
          { Title: "可租", Value: 0, Color: "#97D6FF" },
          { Title: "不可租", Value: 1, Color: "#CEDFEA" },
          { Title: "预定", Value: 2, Color: "#69A7FE" },
          { Title: "已租", Value: 3, Color: "#FFAB56" }
        ]);
        this.Map.OnDraw = floor => {
          this.Map.bindData(floor.Unitlist);
          this.Map.colorPalette.hide();
          this.Map.on("ontouchend", msg => {
            console.log(msg);
            this.getUnitDetail(msg.msg);
          });
        };
      });

      //     this.$http
      // .post(
      //   // `${this.HOST}PlanLayout/WebService/MapBusiness.asmx/GetBlockList`,
      //   `http://gz.ifca.com.cn:9999/ydzs/PlanLayout/WebService/MapBusiness.asmx/GetBlockList`,
      //   data
      // )
      // .then(res => {
      //   this.allBlock = JSON.parse(res);
      //   this.hasProject();
      //   let NowDate = moment()
      //     .format("YYYY-M-DD")
      //     .toString();
      //   console.log(this.allBlock);
      //   var Map = new IFCA_VIEW("#unitInfoAllMap", this.allBlock, {
      //     Range: NowDate,
      //     Align: "center",
      //     floorListOff: false,
      //     MagnifierOff: false
      //   });
      //   Map.setScale(1);
      // })
      // .catch(err => {
      //   console.log(err);
      // });
    },
    getFloorData() {
      this.floorList = this._.chain(this.allBlockFoorList)
        .groupBy("Floor")
        .orderBy(
          function(item) {
            return item[0].Floor;
          },
          ["desc"]
        )
        .filter(item => {
          return item[0].Unitlist.length !== 0;
        })
        .value();
      this.FloorSelectlist = this._.chain(this.allBlock.Floorlist)
        .groupBy("Floor")
        .orderBy(
          function(item) {
            return item[0].Floor;
          },
          ["desc"]
        )
        .filter(item => {
          return item[0].Unitlist.length !== 0;
        })
        .value();
    },
    hasProject() {
      //项目数据
      this.allBlockFoorList = this.allBlock.Floorlist;
      console.log(this.allBlock);
      this.getFloorData();
      this.floorListDisplay = this.FloorSelectlist[0].slice(0, 5);
    },
    openProjecySelct() {
      this.hasprojectStatus = !this.hasprojectStatus;
    }
  }
};
</script>

<style scoped lang="scss">
@import "src/assets/sass/mixin";
.unitInfoAllMap {
  height: 100%;
  position: relative;
  .MapDiv {
    z-index: 1;
    position: absolute;
    top: 230px;
    width: 100%;
    height: 80%;
    #unitInfoAllMap {
      width: 100%;
      height: 100%;
    }
  }
}
.allHeader {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1;
  box-shadow: 0 4px 14px 0 rgba(126, 158, 230, 0.15);
}
.footer {
  position: fixed;
  bottom: 0px;
  background-color: #fff;
  @include wh(100%, 96px);
  line-height: 96px;
  @include flexHCenter;
  @include fj;
  padding: 40px;
  box-shadow: 0 -4px 14px 0 rgba(126, 158, 230, 0.15);
  .footerLeft {
    display: flex;
    width: 80%;
    .leftTittle {
      width: 30%;
      @include flexCenter;
      @include sc(30px, rgba(30, 30, 30, 1));
    }
    .leftContent {
      width: 70%;
      @include ellipsis;
      @include sc(30px, rgba(105, 167, 254, 1));
      span {
        margin-left: 10px;
        width: 25%;
      }
    }
  }
  .footerRight {
    @include wh(168px, 60px);
    border-radius: 30px;
    border: 1px solid rgba(105, 167, 254, 1);
    background-color: #fff;
    @include sc(28px, rgba(105, 167, 254, 1));
  }
}
.uintNumber {
  background-color: rgba(231, 237, 244, 1);
  @include wh(100%, 88px);
  @include sc(26px, rgba(30, 30, 30, 1));
  @include flexHCenter;
  padding: 0 34px;
}
#anchorScroll {
  position: fixed;
  top: -250px;
}
.header {
  box-shadow: 0 0px 0px 0 #fff !important; //重叠头部
  .headerTittle {
    font-weight: 500;
    font-family: $fr;
    @include sc(34px, rgba(3, 3, 3, 1));
  }
  // img {
  //   @include wh(26px, 11px);
  //   margin-left: 8px;
  // }
}
.tab {
  margin-top: -2px;
  @include fj;
  .tabDiv {
    @include sc(28px, rgba(30, 30, 30, 1));
    @include flexCenter;
    div {
      @include wh(24px, 24px);
      margin-right: 10px;
      color: transparent;
    }
  }
  .all {
    position: relative;
    &::before {
      position: absolute;
      content: "";
      background-color: rgba(219, 219, 219, 1);
      width: 1px;
      height: 24px;
      right: 0;
    }
  }
}

.toRent {
  background: #78caff;
}
.rented {
  //已租
  background-color: #ffab56;
}
.reserve {
  //已预定
  background-color: #4879e6;
}
.noRented {
  //不可租
  background-color: #cedfea;
}
.uintInfoAll {
  height: 100%;
  .kong {
    height: 20%;
  }
  .navBar {
    position: fixed;
    z-index: 99;
    top: 260px;
    @include wh(108px, 60%);
    .top {
      background-color: #fff;
      position: relative;
      .goPrePage,
      .goNextPage,
      .goAllPage {
        @include flexCenter;
        height: 108px;
      }
      .goAllPage {
        color: rgba(136, 136, 136, 1);
        border-top: 1px solid rgba(235, 237, 239, 1);
        border-bottom: 1px solid rgba(235, 237, 239, 1);
      }
      .active {
        color: rgba(30, 30, 30, 1);
      }
      .icon {
        @include sc(52px, rgba(219, 219, 219, 1));
        &:hover {
          color: rgba(30, 30, 30, 1);
        }
      }
      .floorList {
        overflow: hidden;
        height: 540px;
        a {
          @include flexCenter;
          height: 108px;
          @include sc(36px, rgba(136, 136, 136, 1));
          font-family: $fr;
          border-top: 1px solid rgba(235, 237, 239, 1);
          &:last-child {
            border-bottom: 1px solid rgba(235, 237, 239, 1);
          }
        }
        .active {
          color: rgba(30, 30, 30, 1);
        }
      }
    }
    .bottom {
      background-color: #fff;
      margin-top: 24px;
      @include wh(108px, 108px);
      @include flexCenter;
      img {
        @include wh(58px, 40px);
      }
    }
  }
}
.nav {
  // height: 100% !important;
  top: 140px;
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
        border: 1px solid rgba(105, 167, 254, 0.3);
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
.noData {
  @include center;
  .noDataTittle {
    @include flexCenter;
    @include sc(30px, rgba(136, 136, 136, 1));
    font-family: $fr;
  }
}

.UnitDetail {
  background-color: #fff;
  padding: 26px 40px;
  font-family: $fr;
  .top {
    @include wh(100%, 60px);
    @include fj;
    margin-bottom: 20px;
    @include flexHCenter;
    .topLeft {
      .unitNo {
        @include sc(44px, rgba(30, 30, 30, 1));
        margin-right: 18px;
      }
      @include flexHCenter;
      .unitStatus {
        @include sc(24px, rgba(255, 255, 255, 1));
        padding: 4px 20px;
      }
    }
    .topRight {
      font-size: 60px;
    }
  }
  .main {
    background-color: rgb(243, 247, 253);
    padding: 36px 0 24px 36px;
    li {
      &:nth-child(1) {
        margin-bottom: 8px;
      }
      &:nth-child(2) {
        margin-bottom: 8px;
      }
      &:nth-child(3) {
        margin-bottom: 24px;
      }
      span {
        font-family: $fr;
        &:first-child {
          @include sc(30px, rgba(136, 136, 136, 1));
        }
        &:last-child {
          @include sc(30px, rgba(30, 30, 30, 1));
        }
      }
    }
  }
  .bottom {
    margin-top: 26px;
    @include fj(flex-end);
    button {
      margin-left: 16px;
      border: 1px solid rgba(105, 167, 254, 1);
      @include wh(168px, 60px);
      border-radius: 30px;
      background-color: #fff;
      @include sc(28px, rgba(105, 167, 254, 1));
    }
  }
}
</style>


