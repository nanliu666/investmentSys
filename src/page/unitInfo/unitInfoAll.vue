<template>
  <div>
    <x-header :left-options="{backText: ''}" class="header" @click.native="openProjecySelct">
      {{projectTittle}}
      <x-icon type="ios-arrow-down" size="23" v-show="!hasprojectStatus"></x-icon>
      <x-icon type="ios-arrow-up" size="23" v-show="hasprojectStatus"></x-icon>
    </x-header>
    <div style="height:44px;">
      <sticky ref="sticky" :disabled="disabled" :check-sticky-support="false">
        <tab
          class="tab"
          :scroll-threshold="5"
          :line-width="1"
          custom-bar-width="60px"
          :bar-active-color="barActiveColor"
          active-color="rgba(30, 30, 30, 1)"
          default-color="rgba(136, 136, 136, 1)"
        >
          <tab-item selected @on-item-click="getStatus(0)">
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
          <tab-item @on-item-click="getStatus(4)">
            <div class="tabDiv">
              <div class="all">1</div>全部
            </div>
          </tab-item>
        </tab>
      </sticky>
    </div>
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
            >{{item[0].Floor}} F</a>
          </div>
          <div class="goNextPage" @click="goNextPage">
            <x-icon type="ios-arrow-down" class="icon"></x-icon>
          </div>
        </div>
        <div class="bottom">
          <img src="../../assets/images/gotoAll.png" alt>
        </div>
      </section>
      <section class="main">
        <li
          class="mainLi"
          v-for="(item, index) in floorList"
          :key="index"
          :id="'anchor-'+ item[0].Floor"
        >
          <div
            v-for="(Item, index) in item[0].Unitlist"
            :class="getbusinessStatus(Item.Recordstatusstringcode)"
            :key="index"
          >{{Item.Unitno | strSubstring(4)}}</div>
        </li>
      </section>
    </section>
  </div>
</template>


<script>
import { GetUnitByBlock, GetBlocks, GetPropertys } from "@/axios/api";
import { XHeader, Tab, TabItem, Sticky } from "vux";
export default {
  data() {
    return {
      activeClass: 0,
      requestData: {},
      allBlock: [],
      floorList: [],
      floorListCount: 1,
      floorListDisplay: [],
      projectTittle: "",
      barActiveColor: "#78caff",
      hasprojectStatus: false,
      disabled:
        typeof navigator !== "undefined" &&
        /iphone/i.test(navigator.userAgent) &&
        /ucbrowser/i.test(navigator.userAgent)
    };
  },
  components: { XHeader, Tab, TabItem, Sticky },
  name: "unitALL",
  created() {
    this.onLoad();
  },
  methods: {
    floorLi(key, item) {
      this.activeClass = key;
      const selector = `#anchor-${item[0].Floor}`;
      this.goAnchor(selector);
    },
    goAnchor(selector) {
      this.$el
        .querySelector(selector)
        .scrollIntoView({ block: "start", behavior: "smooth" });
    },
    goPrePage() {
      this.floorListCount -= 1;
      if (this.floorListCount * 5 > 0) {
        this.activeClass = 0;
        this.floorListDisplay = this.floorList.slice(
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
      if (this.floorListCount * 5 <= this.floorList.length + 5) {
        this.floorListDisplay = this.floorList.slice(
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
      switch (index) {
        case 0:
          this.barActiveColor = "#78caff";
          this.requestData.Statucode = "UnitAvailable";
          this.requestData.Blockid = 1;
          this.getUnitBlock();
          break;
        case 1:
          this.barActiveColor = "#4879e6";
          break;
        case 2:
          this.barActiveColor = "#ffab56";
          break;
        case 3:
          this.barActiveColor = "rgba(206, 223, 234, 1)";
          break;
        case 4:
          this.barActiveColor = "rgb(102, 153, 255)";
          break;
      }
    },
    onLoad() {
      this.requestData = {
        Blockid: 0,
        Statucode: "",
        Floorno: "",
        Startdate: "",
        Enddate: ""
      };
      GetUnitByBlock(this.requestData).then(res => {
        this.allBlock = res.Content;
        this.hasProject();
      });
    },
    getUnitBlock() {
      GetUnitByBlock(this.requestData).then(res => {
        this.allBlock = res.Content;
      });
    },
    hasProject() {
      if (this.allBlock.length === 0) {
        //没有数据返回
      } else if (this.allBlock.length === 1) {
        //该用户只有一个项目
        this.projectTittle = this.allBlock[0].Blockname;
        this.floorList = this._.chain(this.allBlock[0].Floorlist)
          .groupBy("Floor")
          .orderBy(function(item) {
            return item[0].Floor;
          })
          .value();
        this.floorListDisplay = this.floorList.slice(0, 5);
      } else {
        //该用户有多个项目，需要选择项目
      }
    },
    openProjecySelct() {
      this.hasprojectStatus = !this.hasprojectStatus;
    }
  }
};
</script>

<style scoped lang="scss">
@import "src/assets/sass/mixin";
.tab {
  @include fj;
  .tabDiv {
    @include flexCenter;
    div {
      @include wh(24px, 24px);
      margin-right: 10px;
      color: transparent;
    }
  }
}
.all {
  background-color: rgb(102, 153, 255);
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
  position: relative;
  .navBar {
    position: fixed;
    top: 260px;
    @include wh(108px, 60%);
    .top {
      background-color: #fff;
      position: relative;
      .goPrePage,
      .goNextPage {
        @include flexCenter;
        height: 108px;
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
          border-bottom: 1px solid rgba(235, 237, 239, 1);
          &:first-child {
            border-top: 1px solid rgba(235, 237, 239, 1);
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
        @include wh(58px, 58px);
      }
    }
  }
  .main {
    padding: 60px 40px 0px 168px;
    .mainLi {
      margin-bottom: 30px;
      display: flex;
      flex-wrap: wrap;
      div {
        width: 20%;
        height: 60px;
        line-height: 60px;
        @include flexCenter;
        @include ellipsis;
        margin-right: 6.6%;
        margin-bottom: 20px;
        @include sc(30px, rgba(255, 255, 255, 1));
        font-family: $fm;
        &:nth-child(4n + 4) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>


