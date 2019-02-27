<template>
  <div class="reservePart">
    <div class="appTopHome"></div>
    <section class="businessHeader fs-header">
      <div @click="gobackByrouter()">
        <img src="../../assets/images/返回@2x.png"  class="fs-backICon" alt>
      </div>
      <div class="headerTitle">商机详情</div>
      <div @click="showMenus = true" class="more">···</div>
    </section>
    <section v-for="(item, index) in businessDetail" :key="index">
      <section class="client">
        <div class="clientTittle">意向客户</div>
        <div class="clientName">{{item.Accountname}}</div>
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
            <!-- <span class="tailTopLiBottom" v-text="statusDetail[item.Recordstatus]">机会渺茫</span> -->
            <span class="tailTopLiBottom">{{!!item.Probability ? item.Probability : '未跟踪'}}</span>
          </div>
          <div class="tailTopLi">
            <span class="tailTopLiTop">上次跟踪时间</span>
            <span v-if="item.Followupdate === null" class="tailTopLiBottom">--</span>
            <span class="tailTopLiBottom" v-else>{{item.Followupdate | dataFrm('YYYY-MM-DD')}}</span>
          </div>
        </div>
        <div class="tailBottom" @click="getTrack(item)">查看跟踪记录 >></div>
      </section>
      <section class="businessInfo">
        <div class="infoTittle">商机信息</div>
        <ul class="infoMain">
          <li>
            <span class="mainTittle">意向单元</span>
            <span class="mainContent">{{`${item.Unitdesc}`}}</span>
          </li>
          <li>
            <span class="mainTittle">商机来源</span>
            <span class="mainContent">{{item.Sourcename}}</span>
          </li>
          <li>
            <span class="mainTittle">期望铺位面积(m²)</span>
            <span class="mainContent">{{item.Expunitarea | formatNumber(0)}}</span>
          </li>
          <li>
            <span class="mainTittle">备注</span>
            <span class="mainContent remark">{{item.Remark}}</span>
          </li>
        </ul>
        <div v-if="hasBook" class="reserveButton">
          <button @click="getReserve">预定</button>
        </div>
      </section>
    </section>
    <actionsheet :menus="menus" v-model="showMenus" show-cancel @on-click-menu="businessAct"></actionsheet>
  </div>
</template>


<script>
import {
  GetBizOpportunityDetail,
  DeleteBizOpportunity,
  BizProspecttransfer
} from "@/axios/api";
import { Actionsheet, Confirm, Radio, Group } from "vux";
import { mapMutations, mapState } from "vuex";

export default {
  name: "businessDetail",
  data() {
    return {
      hasBook: true,
      hasliushi: false,
      hasyijiao: false,
      FailtypeDropdownList: [],
      FailtypeDropdownListSelect: [],
      FailtypeDropdownListDisplay: [],
      BizProspecttransferList: [],
      BizProspecttransferListSelect: [],
      BizProspecttransferListDisplay: [],
      yijiaoRemark: "",
      confirShow: false,
      confirmTittle: "",
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
      },
      ProspectData: {
        //流失数据
        Transfer: {
          Prospectid: "",
          Failtypeid: "",
          Faildescription: "",
          Faildate: ""
        }
      }
    };
  },
  created() {
    this.onLoad();
  },
  components: {
    Actionsheet,
    Confirm,
    Group,
    Radio
  },
  mounted() {
    // GetFailtypeDropdown("").then(res => {
    //   this.FailtypeDropdownList = res.Option.Dropdownfailtypeid;
    //   this.FailtypeDropdownListDisplay = this.FailtypeDropdownList.map(item => {
    //     return item.Text;
    //   });
    // });
  },
  computed: {
    ...mapState(["reserveObj"])
  },
  methods: {
    ...mapMutations(["RESERVEADD"]),
    onLoad() {
      if (
        JSON.parse(localStorage.getItem("businessDetail")).Recordstatus !==
        "Active"
      ) {
        delete this.menus.menu2;
        this.hasBook = !this.hasBook;
      }
      let jsonData = {
        Bizopportunity: {
          Prospectid: Number(this.$route.params.id)
        }
      };
      GetBizOpportunityDetail(jsonData).then(res => {
        console.log(JSON.parse(res.Bizopprtunity));
        this.businessDetail = JSON.parse(res.Bizopprtunity).Datasource.slice(
          0,
          1
        );
      });
    },
    getReserve() {
      this.RESERVEADD(this.businessDetail[0]);
      this.$router.push({
        name: "reserveAdd",
        query: {
          from: "businessDetail"
        }
      });
    },
    onLiushiChange(val) {
      this.FailtypeDropdownListSelect = this.FailtypeDropdownList.filter(
        item => {
          return item.Text === val;
        }
      );
    },
    onYijiaoChange(val) {
      this.BizProspecttransferListSelect = this.BizProspecttransferList.filter(
        item => {
          return item.Text === val;
        }
      );
    },
    onConfirm() {
      if (this.hasliushi) {
        this.ProspectData.Transfer.Prospectid = this.businessDetail[0].Prospectid;
        this.ProspectData.Transfer.Failtypeid = this.FailtypeDropdownListSelect[0].Value;
        this.ProspectData.Transfer.Faildescription = this.FailtypeDropdownListSelect[0].Text;
        this.ProspectData.Transfer.Faildate = moment();
        DropProspecttransfer(this.ProspectData).then(res => {
          if (!!res.Success) {
            this.$vux.toast.show({
              text: "流失失败！",
              type: "warn"
            });
          } else {
            this.$vux.toast.show({
              text: "流失成功！",
              type: "success"
            });
            this.gotobusinessList();
          }
        });
      } else {
        // sessionStorage.setItem('businessDetail', JSON.stringify(this.businessDetail[0]))
        // this.$router.push({name: 'businessTransfer'})
      }
    },
    getTrack(data) {
      sessionStorage.setItem("businessTrackList", JSON.stringify(data));
      this.$router.push({
        name: "businessTrackList",
        params: {
          id: data.Prospectid,
          data: data
        }
      });
    },
    gotobusinessList() {
      this.$router.push({
        name: "businessList",
        params: {
          isLoad: true
        }
      });
    },
    businessAct(key, item) {
      sessionStorage.setItem(
        "businessDetail",
        JSON.stringify(this.businessDetail[0])
      );
      switch (item) {
        case "编辑":
      this.RESERVEADD(this.businessDetail[0]);
// console.log('商机详情', this.businessDetail[0])
          this.$router.push({
            name: "businessEdit",
            query: {
              from: "businessDetail"
            },
            // params: {
            //   data: this.businessDetail[0]
            // }
          });
          break;
        case "删除":
          let data = {
            Prospectid: this.$route.params.id
          };
          DeleteBizOpportunity(data).then(res => {
            this.$vux.toast.show({
              text: "删除成功！",
              type: "success"
            });
            this.gotobusinessList();
          });
          break;
        case "移交":
          this.$router.push({ name: "businessTransfer" });
          break;
        case "流失":
          this.$router.push({ name: "businessLost" });
          break;
      }
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


