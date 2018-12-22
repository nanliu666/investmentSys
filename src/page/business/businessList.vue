<template>
  <div class="businessListPart">
    <x-header :left-options="{backText: ''}" class="header">商机管理</x-header>
    <section class="filter">
      <div class="projectFilter">
        <span>项目</span>

        <!-- <img class="row-img" src="@/assets/images/下拉@3x.png" alt> -->
      </div>
      <div @click="openStatus">
        <span>状态</span>
        <x-icon type="ios-arrow-down" size="25" v-if="!hasStatus"></x-icon>
        <x-icon type="ios-arrow-up" size="25" v-if="hasStatus"></x-icon>
        <!-- <img class="row-img" src="@/assets/images/下拉@3x.png" alt> -->
        <!-- 选择状态 -->
        <transition
          name="custom-classes-transition"
          enter-active-class="animated bounceInDown"
          leave-active-class="animated bounceOutRight"
        >
          <section v-if="hasStatus" class="status">
            <a
              v-text="statusDetail[Item]"
              v-for="(Item, index) in statusList"
              :key="index"
              @click.native="openStatus"
              :href="'#anchor-'+index"
            ></a>
          </section>
        </transition>
      </div>
    </section>
    <section class="content">
      <section class="newBuiness" v-for="(Item, index) in statusList" :key="index">
        <div class="Btitle" v-text="statusDetail[Item]" :id="'anchor-'+index"></div>
        <router-link
          tag="li"
          to="businessDetail"
          v-for="(item, index) in dataSource[Item]"
          :key="index"
        >
          <div class="top">
            <span>月亮湾二期 1506</span>
            <span
              :class="getbusinessStatus(item.Recordstatus)"
              v-text="statusDetail[item.Recordstatus]"
            ></span>
          </div>
          <div class="bottom">
            <div class="client">
              <div>
                <label>意向客户：</label>
                <span class="text">{{item.Accountname}}</span>
              </div>
              <div class="phone">
                <label>联系电话:</label>
                <span class="text">{{item.Phone}}</span>
              </div>
            </div>
            <div class="trace">
              <span>
                <label>跟踪次数:</label>
                <span class="text">{{item.Countfollowup}}</span>
              </span>
              <button class="lookRecord">查看记录</button>
            </div>
            <div>
              <label>最后接触日期：</label>
              <span class="text">{{item.Lastdate | dataFrm}}</span>
            </div>
          </div>
        </router-link>
      </section>
    </section>
    <section class="addNew" @click="addNew">
      <span>＋</span>
    </section>
    <section class="more">没有更多了</section>
  </div>
</template>


<script>
import { XHeader } from "vux";

import {
  GetBizOpportunity,
  GetBizOpportunityDetail,
  GetBizopprtunityDropdown
} from "@/axios/api";

export default {
  name: "businessList",
  data() {
    return {
      hasState: true,
      hasSearch: true,
      hasStatus: false,
      statusList: [], // 状态
      dataSource: [], // 数据源
      statusDetail: {
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
  created() {
    this.onLoad();
  },
  components: {
    XHeader
  },
  methods: {
    openStatus() {
      this.hasStatus = !this.hasStatus;
    },
    //新增商机
    addNew() {
      this.$router.push({ name: "businessAdd" });
    },
    getbusinessStatus(data) {
      switch (data) {
        case "Active":
          this.businessStatus = "Active";
          return this.businessStatus;
          break;
        case "Booked":
          this.businessStatus = "Booked";
          return this.businessStatus;
          break;
        case "Signed":
          this.businessStatus = "Signed";
          return this.businessStatus;
          break;
      }
    },
    onLoad() {
      var data = {
        Bizopportunity: {},
        Prospectid: 0
      };
      var Urlpara = {
        Urlpara: {
          Pageindex: 1,
          Pagesize: 10
        }
      };
      GetBizOpportunity(Urlpara).then(res => {
        let data = this._.groupBy(JSON.parse(res.Content), "Recordstatus");
        this.statusList = Object.keys(data);
        this.dataSource = data;
        // console.log(JSON.parse(res.Content));
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "src/assets/sass/mixin";
.businessListPart {
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
    .row-img {
      max-width: 26px;
      max-height: 11px;
    }
    .decollator {
      //分隔符
      @include wh(4px, 32px);
      color: rgba(219, 219, 219, 1);
    }
  }
  .content {
    padding: 10px 40px 0;
    .Btitle {
      margin-bottom: 12px;
      @include sc(28px, rgba(30, 30, 30, 1));
      font-family: $familyR;
    }
    li {
      margin-bottom: 20px;
      @include borderRadius(8px);
      box-shadow: 0 0 4px 10px 0 rgba(126, 158, 230, 0.15);
      background-color: $fc;
      .top {
        //详情头部
        @include fj(space-between);
        padding: 30px;
        border-bottom: 1px dashed rgba(72, 121, 230, 1); /*no*/
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
        //新商机
        .Active {
          background: linear-gradient(
            to left,
            rgba(96, 229, 139, 1),
            rgba(10, 188, 108, 1)
          );
        }
        //签约
        .Signed {
          background: linear-gradient(
            to left,
            rgba(40, 140, 241, 1),
            rgba(120, 202, 255, 1)
          );
        }
        //预定
        .Booked {
          background: linear-gradient(
            to left,
            rgba(123, 110, 240, 1),
            rgba(202, 154, 210, 1)
          );
        }
        .lost {
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
        // div:last-child {
        //   margin-top: 40px;
        // }
        .trace {
          display: flex;
          span {
            margin-right: 26px;
          }
        }
      }
    }
  }
  .addNew {
    @include wh(120px, 120px);
    border-radius: 50%;
    background-color: #fff;
    position: fixed;
    bottom: 28px;
    right: 40px;
    box-shadow: 0 2px 14px 0 rgba(126, 158, 230, 0.15);
    @include flexCenter;
    span {
      color: rgba(72, 121, 230, 1);
      font-size: 58px;
    }
  }
  .more {
    @include flexCenter;
    margin-bottom: 26px;
    @include sc(24px, rgba(136, 136, 136, 1));
    font-family: $familyR;
  }
}
</style>



