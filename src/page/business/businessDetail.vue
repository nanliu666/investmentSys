<template>
  <div class="reservePart">
    <section class="businessHeader fs-header">
      <div @click="goback">
        <img src="../../assets/images/返回@2x.png" alt>
      </div>
      <div class="headerTitle">商机详情</div>
      <div @click="showMenus = true" class="more">···</div>
    </section>
    <section v-for="(item, index) in businessDetail" :key="index">
      <section class="client">
        <div class="clientTittle">意向客户</div>
        <div class="clientName">{{item.Agentname}}</div>
        <div class="clientPhone">
          <span class="iconfont icon-002dianhua"></span>
          <span class="phone">{{item.Phone}}</span>
          <span
            class="copyPhone"
            v-clipboard:copy="item.Phone"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
          >复制</span>
        </div>
      </section>
      <section class="tail">
        <div class="tailTop">
          <div class="tailTopLi">
            <span class="tailTopLiTop">跟踪状态</span>
            <span class="tailTopLiBottom" v-text="statusDetail[item.Recordstatus]">机会渺茫</span>
          </div>
          <div class="tailTopLi">
            <span class="tailTopLiTop">上次跟踪时间</span>
            <span class="tailTopLiBottom">{{item.Lastdate | dataFrm('YYYY-MM-DD')}}</span>
          </div>
        </div>
        <div class="tailBottom" @click="getTrack(item)">查看跟踪记录 >></div>
      </section>
      <section class="businessInfo">
        <div class="infoTittle">商机信息</div>
        <ul class="infoMain">
          <li>
            <span class="mainTittle">意向单元</span>
            <span class="mainContent">{{item.Unitdesc}}</span>
          </li>
          <li>
            <span class="mainTittle">商机来源</span>
            <span class="mainContent">{{item.Sourcename}}</span>
          </li>
          <li>
            <span class="mainTittle">期望铺位面积(m²)</span>
            <span class="mainContent">500</span>
          </li>
          <li>
            <span class="mainTittle">备注</span>
            <span class="mainContent">{{item.Remark}}</span>
          </li>
        </ul>
        <div class="reserveButton">
          <button>预定</button>
        </div>
      </section>
    </section>
    <actionsheet :menus="menus" v-model="showMenus" show-cancel @on-click-menu="businessAct"></actionsheet>
  </div>
</template>


<script>
import { GetBizOpportunityDetail, DeleteBizOpportunity } from "@/axios/api";
import { Actionsheet } from "vux";
export default {
  name: "businessDetail",
  data() {
    return {
      menus: {
        menu1: "编辑",
        menu2: "删除",
        menu3: "移交",
        menu4: "流失"
      },
      showMenus: false,
      businessDetail: [],
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
    let jsonData = {
      Bizopportunity: {
        Prospectid: Number(this.$route.params.id)
      }
    };
    GetBizOpportunityDetail(jsonData).then(res => {
      this.businessDetail = JSON.parse(res.Bizopprtunity).Datasource;
      console.log(JSON.parse(res.Bizopprtunity));
    });
  },
  components: {
    Actionsheet
  },
  methods: {
    getTrack(data) {
      this.$router.push({
        name: "businessTrack",params: {
          data: data
        }
      });
    },
    businessAct(key, item) {
      console.log(item);
      switch (item) {
        case "编辑":
          console.log("编辑");
          break;
        case "删除":
          console.log("删除");
          let data = {
            Prospectid: this.$route.params.id
          };
          DeleteBizOpportunity(data).then(res => {
            if (!!res.Success) {
              this.$vux.toast.show({
                text: "删除成功！",
                type: "success"
              });
              this.$router.push({
                name: "businessList",
                params: {
                  isLoad: true
                }
              });
            } else {
              this.$vux.toast.show({
                text: "此商机非新商机，不能删除！",
                type: "warn"
              });
            }
          });
          break;
        case "流失":
          console.log("流失");
          break;
        case "移交":
          console.log("移交");
          break;
      }
    },
    goback() {
      this.$router.back(-1);
    },
    onCopy(e) {
      this.$vux.toast.show({
        text: "复制成功！",
        type: "success"
      });
    },
    onError() {
      this.$vux.toast.show({
        text: "复制失败，请手动输入！",
        type: "warn"
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "src/assets/sass/mixin";
.reservePart {
  .fs-header {
    @include wh(100%, 40px);
  }
  .businessHeader {
    @include fj;
    @include flexHCenter;
    padding: 18px 40px;
    font-family: $fm;
    background: linear-gradient(
      90deg,
      rgba(103, 185, 255, 1) 0%,
      rgba(92, 128, 255, 1) 100%
    );
    color: rgba(255, 255, 255, 1) !important;
    font-size: 34px !important;
    img {
      @include wh(18px, 30px);
    }
    .headerTitle {
      @include sc(34px, rgba(255, 255, 255, 1));
    }
    .more {
      @include flexCenter;
      @include sc(60px, $fc);
    }
  }
  .client {
    margin-top: -1px;
    padding: 20px 40px 50px;
    background: linear-gradient(
      90deg,
      rgba(103, 185, 255, 1) 0%,
      rgba(92, 128, 255, 1) 100%
    );
    color: $fc;
    .clientTittle {
      font-size: 28px;
      font-family: $fr;
      opacity: 0.8;
    }
    .clientName {
      font-family: $fm;
      font-size: 44px;
      font-weight: 500;
      padding-bottom: 36px;
    }
    .clientPhone {
      font-size: 28px;
      .copyPhone {
        font-size: 24px;
        background-color: rgba(38, 81, 196, 0.3);
        font-family: $fr;
        border-radius: 21px;
        @include wh(90px, 42px);
        margin-left: 18px;
        padding: 4px 20px;
      }
    }
  }
  .tail {
    background-color: #fff;
    .tailTop {
      padding: 30px 0;
      border-bottom: 6px solid #f4f6f8;
      @include fj(space-around);
      .tailTopLi {
        @include fd(column);
        position: relative;
        .tailTopLiTop {
          font-family: $fr;
          @include sc(28px, rgba(136, 136, 136, 1));
          @include flexCenter;
        }
        .tailTopLiBottom {
          font-family: $fm;
          @include sc(32px, rgba(30, 30, 30, 1));
          @include flexCenter;
        }
        &:first-child {
          &::before {
            position: absolute;
            right: -128px;
            content: "";
            width: 1px;
            height: 80px;
            background-color: rgba(174, 174, 174, 1);
            color: rgba(174, 174, 174, 1);
          }
        }
      }
    }
    .tailBottom {
      @include wh(100%, 88px);
      @include flexCenter;
      font-family: $fr;
      @include sc(28px, rgba(136, 136, 136, 1));
    }
  }
  .businessInfo {
    .infoTittle {
      padding: 20px 26px;
      @include sc(28px, rgba(136, 136, 136, 1));
      font-family: $fr;
    }
    .infoMain {
      li {
        @include fj;
        font-family: $fr;
        background-color: #fff;
        margin-bottom: 4px;
        padding: 26px 40px;
        &:last-child {
          margin-bottom: 0px;
        }
        .mainTittle {
          @include sc(30px, rgba(136, 136, 136, 1));
        }
        .mainContent {
          width: 60%;
          display: flex;
          justify-content: flex-end;
          @include sc(30px, rgba(30, 30, 30, 1));
        }
      }
    }
    .reserveButton {
      padding: 58px 40px 0;
      button {
        background-color: rgba(105, 167, 254, 1);
        width: 100%;
        height: 88px;
        border-radius: 44px;
        font-family: $fm;
        @include sc(34px, rgba(255, 255, 255, 1));
      }
    }
  }
}
</style>


