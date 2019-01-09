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
          :line-width="1"
          custom-bar-width="60px"
          :bar-active-color="barActiveColor"
          active-color="rgba(30, 30, 30, 1)"
          default-color="rgba(136, 136, 136, 1)"
        >
          <tab-item selected @on-item-click="getToRent">
            <div class="tabDiv">
              <div class="toRent">1</div>可租
            </div>
          </tab-item>
          <tab-item @on-item-click="getReserve">
            <div class="tabDiv">
              <div class="toRent reserve">1</div>已预定
            </div>
          </tab-item>
          <tab-item @on-item-click="getRented">
            <div class="tabDiv">
              <div class="toRent rented">1</div>已租
            </div>
          </tab-item>
          <tab-item @on-item-click="getNoRented">
            <div class="tabDiv">
              <div class="toRent noRented">1</div>不可租
            </div>
          </tab-item>
        </tab>
      </sticky>
    </div>
    <section class="uintInfoAll">
      <section class="navBar">
        <div class="top">
          <div class="goPrePage">
            <x-icon type="ios-arrow-up" class="icon"></x-icon>
          </div>
          <div class="floorList">
            <li>5F</li>
            <li>4F</li>
            <li>3F</li>
            <li>2F</li>
            <li>1F</li>
          </div>
          <div class="goNextPage">
            <x-icon type="ios-arrow-down" class="icon"></x-icon>
          </div>
        </div>
        <div class="bottom">
          <img src="../../assets/images/gotoAll.png" alt>
        </div>
      </section>
      <section class="main"></section>
    </section>
  </div>
</template>


<script>
import { GetUnitByBlock, GetBlocks, GetPropertys } from "@/axios/api";
import { XHeader, Tab, TabItem, Sticky } from "vux";
export default {
  data() {
    return {
      allBlock: [],
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
    getToRent() {
      this.barActiveColor = "#78caff";
    },
    getReserve() {
      this.barActiveColor = "#4879e6";
    },
    getRented() {
      this.barActiveColor = "#ffab56";
    },
    getNoRented() {
      this.barActiveColor = "rgba(206, 223, 234, 1)";
    },
    onLoad() {
      let data = {
        Blockid: 0,
        Statucode: "",
        Floorno: "",
        Startdate: "",
        Enddate: ""
      };
      GetUnitByBlock(data).then(res => {
        this.allBlock = res.Content;
        this.hasProject();
      });
    },
    hasProject() {
      if (this.allBlock.length === 0) {
        //没有数据返回
      } else if (this.allBlock.length === 1) {
        //该用户只有一个项目
        console.log(this.allBlock);
        this.projectTittle = this.allBlock[0].Blockname;
      } else {
        //该用户有多个项目，需要选择项目
        console.log(2);
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
  .tabDiv {
    @include flexCenter;
    .toRent {
      @include wh(24px, 24px);
      margin-right: 10px;
      color: transparent;
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
  }
}
.uintInfoAll {
  position: relative;
  .navBar {
    position: fixed;
    // @include flexCenter;
    top: 260px;
    @include wh(108px, 60%);
    .top {
      background-color: #fff;
      .goPrePage,
      .goNextPage {
        @include flexCenter;
        height: 108px;
      }
      .icon {
        @include sc(52px, rgba(219, 219, 219, 1));
      }
      .floorList {
        li {
          @include flexCenter;
          height: 108px;
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
}
</style>


