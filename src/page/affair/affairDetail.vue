<template>
  <div>
    <x-header :left-options="{backText: ''}" class="header">审批详情</x-header>
    <div style="height:44px;">
      <sticky ref="sticky" :disabled="disabled" :check-sticky-support="false">
        <tab
          :line-width="1"
          custom-bar-width="60px"
          bar-active-color="rgba(105, 167, 254, 1)"
          active-color="rgba(30, 30, 30, 1)"
          default-color="rgba(136, 136, 136, 1)"
        >
          <tab-item
            class="vux-center"
            v-for="(item, index) in infoList"
            :selected="tabSelect === item"
            :key="index"
            @on-item-click="goAnchor(item)"
          >{{item}}</tab-item>
        </tab>
      </sticky>
    </div>
    <div class="vux-sticky-fill" style="height:44px;"></div>
    <section>
      <section
        class="contractMain"
        id="main"
        v-for="(item, index) in contractMainList"
        :key="index"
      >
        <div class="contractTitle" ref="main">单据详情</div>
        <li class="contractLi">
          <span>预定单元</span>
          <span class="Rentalid">{{item.companys}}</span>
        </li>
        <li class="contractLi">
          <span>客户姓名</span>
          <span>{{item.clientName}}</span>
        </li>
        <li class="contractLi">
          <span>面积</span>
          <span>{{item.area}}</span>
        </li>
        <li class="contractLi">
          <span>定金</span>
          <span class="Rentalid">￥ {{item.deposit}}</span>
        </li>
        <li class="contractLi">
          <span>租赁单元</span>
          <span>{{item.danyuan}}</span>
        </li>
        <li class="contractLi">
          <span>预定日期</span>
          <span>{{item.yuding}}</span>
        </li>
        <li class="contractLi">
          <span>预定开始日期</span>
          <span>{{item.yudingStart}}</span>
        </li>
        <li class="contractLi">
          <span>预定结束日期</span>
          <span>{{item.yudingEnd}}</span>
        </li>
        <li class="contractLi">
          <span>备注</span>
          <span>{{item.remask}}</span>
        </li>
      </section>
      <section class="ApprovalFlow" id="const">
        <div class="contractTitle">
          审批流程
          <span class="approveHistory" @click="getHistoryDetail">审批历史&nbsp;>></span>
        </div>
        <ul class="flowMain">
          <li v-for="(item, index) in flowListActual" :key="index">
            <div class="flowLeft">
              <span class="iconbox agreeing">
                <i class="iconfont icon-location"></i>
              </span>
              <span class="iconTittle">{{item.SectionRows[0].Value}}</span>
              <div class="shuxianBox">
                <div class="shuxian"></div>
              </div>
            </div>
            <div class="flowRight">
              <div class="top">{{item.SectionRows[2].Value | dataFrm('YYYY-MM-DD')}}</div>
              <div class="main">
                <div class="mainTop">审批人:{{item.SectionRows[3].Value}}</div>
                <div class="mainBottom">审批意见: {{item.SectionRows[1].Value}}</div>
              </div>
            </div>
          </li>
        </ul>
        <div class="getAll" @click="getFlowAll" v-if="!hasGetAll">查看全部</div>
        <div class="getAll" @click="getFlowPart" v-if="hasGetAll">隐藏部分</div>
      </section>
      <section class="contractOther" id="other">
        <div class="contractTitle">附件</div>
        <section class="otherMain" v-if="fujianList.length !== 0">
          <div class="otherMainTitle">附件</div>
          <div class="otherfujianLi" v-for="(item, index) in fujianList" :key="index">
            <div>
              <span>
                <svg
                  class="icon"
                  aria-hidden="true"
                  v-show="postfixFileName(item.FileName)  ===( 'doc' || 'docx')"
                >
                  <use xlink:href="#icon-doc"></use>
                </svg>
                <svg
                  class="icon"
                  aria-hidden="true"
                  v-if="postfixFileName(item.FileName)  === 'pdf'"
                >
                  <use xlink:href="#icon-PDFtubiao"></use>
                </svg>
                <svg
                  class="icon"
                  aria-hidden="true"
                  v-if="postfixFileName(item.FileName)  == ('xls' || 'xlsx')"
                >
                  <use xlink:href="#icon-excel"></use>
                </svg>
                <svg
                  class="icon"
                  aria-hidden="true"
                  v-if="postfixFileName(item.FileName)  === ('jpg' || 'jpeg')"
                >
                  <use xlink:href="#icon-jpg"></use>
                </svg>
                <svg
                  class="icon"
                  aria-hidden="true"
                  v-if="postfixFileName(item.FileName)  === 'png'"
                >
                  <use xlink:href="#icon-PNG"></use>
                </svg>
                <svg
                  class="icon"
                  aria-hidden="true"
                  v-if="postfixFileName(item.FileName)  === 'gif'"
                >
                  <use xlink:href="#icon-GIF"></use>
                </svg>
                <svg
                  class="icon"
                  aria-hidden="true"
                  v-if="postfixFileName(item.FileName)  === 'dwg'"
                >
                  <use xlink:href="#icon-DWG"></use>
                </svg>
                <svg
                  class="icon"
                  aria-hidden="true"
                  v-if="postfixFileName(item.FileName)  === ('ppt' || 'pptx')"
                >
                  <use xlink:href="icon-ppt"></use>
                </svg>
                <svg
                  class="icon"
                  aria-hidden="true"
                  v-if="postfixFileName(item.FileName)  === 'txt'"
                >
                  <use xlink:href="#icon-filetext"></use>
                </svg>
                <svg
                  class="icon"
                  aria-hidden="true"
                  v-if="postfixFileName(item.FileName)  === 'rar'"
                >
                  <use xlink:href="#icon-RARtubiao"></use>
                </svg>
                <svg
                  class="icon"
                  aria-hidden="true"
                  v-if="postfixFileName(item.FileName)  === 'zip'"
                >
                  <use xlink:href="#icon-RARtubiao"></use>
                </svg>
              </span>
              <span>{{item.FileName | splitFileName}}</span>
            </div>
            <button @click="getContractenclosure(item)">查看</button>
          </div>
        </section>
      </section>
    </section>
    <section class="nomore">没有更多了</section>
    <popup v-model="haspopup" position="bottom" class="popupHistory">
      <div class="close" @click="getHistoryDetail">
        <i class="iconfont icon-guanbi"></i>
      </div>
      <ul class="flowMain">
        <li v-for="(item, index) in flowListActual" :key="index">
          <div class="flowLeft">
            <span class="iconbox agreeing">
              <i class="iconfont icon-location"></i>
            </span>
            <span class="iconTittle">{{item.SectionRows[0].Value}}</span>
            <div class="shuxianBox">
              <div class="shuxian"></div>
            </div>
          </div>
          <div class="flowRight">
            <div class="top">{{item.SectionRows[2].Value | dataFrm('YYYY-MM-DD')}}</div>
            <div class="main">
              <div class="mainTop">审批人:{{item.SectionRows[3].Value}}</div>
              <div class="mainBottom">审批意见: {{item.SectionRows[1].Value}}</div>
            </div>
          </div>
        </li>
      </ul>
    </popup>
  </div>
</template>
<script>
import { XHeader, Tab, TabItem, Sticky, Popup } from "vux";
import {
  GetToDoDetail,
  GetToDoHistory,
  GetToDoFile,
  GetToDoFlows
} from "@/axios/api";
export default {
  name: "contractList",
  data() {
    return {
      haspopup: false,
      hasGetAll: false,
      infoList: ["单据详情", "审批流程", "附件"],
      tabSelect: "单据详情",
      scrolled: "",
      contractMain: {},
      contractMainList: [],
      flowList: [],
      flowListActual: [],
      fujianList: [],
      disabled:
        typeof navigator !== "undefined" &&
        /iphone/i.test(navigator.userAgent) &&
        /ucbrowser/i.test(navigator.userAgent)
    };
  },
  components: { XHeader, Tab, TabItem, Sticky, Popup },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  created() {
    this.onLoad();
  },
  methods: {
    getHistoryDetail() {
      this.haspopup = !this.haspopup;
      this.flowListActual = this.flowList;
    },
    getFlowAll() {
      this.flowListActual = this.flowList;
      this.hasGetAll = !this.hasGetAll;
    },
    getFlowPart() {
      this.flowListActual = this.flowList.slice(0, 3);
      this.hasGetAll = !this.hasGetAll;
    },
    onLoad() {
      const jsonData = {
        Platformkey: this.$route.params.id
      };
      GetToDoDetail(jsonData).then(res => {
        let data = res[0].SectionTables[0].SectionRows;
        this.$set(this.contractMain, "companys", data[0].Value);
        this.$set(this.contractMain, "clientName", data[1].Value);
        this.$set(this.contractMain, "area", data[3].Value);
        this.$set(this.contractMain, "deposit", data[7].Value); //定金
        this.$set(this.contractMain, "danyuan", data[2].Value); //租赁单元
        this.$set(this.contractMain, "yuding", data[4].Value); //预定日期
        this.$set(this.contractMain, "yudingStart", data[5].Value); //预定开始日期
        this.$set(this.contractMain, "yudingEnd", data[6].Value); //预定介绍日期
        this.$set(this.contractMain, "remask", data[8].Value); //备注
        this.contractMainList.push(this.contractMain);
      });
      GetToDoHistory(jsonData).then(res => {
        this.flowList = res.SectionTables;
        if (this.flowList.length > 3) {
          this.flowListActual = this.flowList.slice(0, 3);
        } else {
          this.flowListActual = this.flowList;
        }
      });
      GetToDoFile(jsonData).then(res => {
        console.log("附件", res);
        this.fujianList = res;
      });
    },
    postfixFileName(text) {
      let fileName = text.lastIndexOf("."); //取到文件名开始到最后一个点的长度
      let fileNameLength = text.length; //取到文件名长度
      let fileFormat = text.substring(fileName + 1, fileNameLength); //截取
      return fileFormat;
    },
    getContractenclosure(data) {
      switch (this.postfixFileName(data.FileName)) {
        case "jpg" || "jpeg" || "png" || "gif" || "dwg":
          console.log("我是图片");
          break;
        case "doc" || "docx":
          console.log("我是word");
          break;
        case "xls" || "xlsx":
          console.log("我是elcel");
          break;
        case "pdf":
          console.log("我是pdf");
          break;
        case "ppt" || "pptx":
          console.log("ppt");
          break;
        case "txt":
          console.log("我是txt");
          break;
        case "rar":
          console.log("我是rar");
          break;
        case "zip":
          console.log("我是zip");
          break;
      }
      console.log((this.postfixFileName(data.FileName) ) === ('xls' || 'xlsx'))
      //TODO 补充预览
      // window.open(
      //   `http://10.122.10.244:82/ydzs/DocumentLibrary/Download.ashx?id=${
      //     data.Guid
      //   }`
      // );
    },
    goAnchor(data) {
      let selector = "";
      // this.tabSelect = data;
      switch (data) {
        case "单据详情":
          selector = "#main";
          break;
        case "审批流程":
          selector = "#const";
          break;
        case "附件":
          selector = "#other";
          break;
      }
      this.$el
        .querySelector(selector)
        .scrollIntoView({ block: "start", behavior: "smooth" });
    },
    handleScroll() {
      //页面滚动高度
      this.scrolled =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (this.scrolled > document.getElementById("const").offsetTop) {
        this.tabSelect = "审批流程";
      }
      if (this.scrolled > document.getElementById("other").offsetTop) {
        console.log("jinru");
        this.tabSelect = "附件";
      }
      if (this.scrolled < document.getElementById("const").offsetTop) {
        this.tabSelect = "单据详情";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/sass/mixin";
.contractTitle {
  @include fj;
  @include sc(28px, rgba(136, 136, 136, 1));
  padding: 20px 40px;
}
.contractLi {
  background-color: #fff;
  @include fj(space-between);
  padding: 26px 40px;
  border-bottom: 2px solid rgb(244, 246, 248);
  &:last-child {
    border: 0;
  }
  span {
    &:first-child {
      @include sc(30px, rgba(136, 136, 136, 1));
    }
    &:last-child {
      @include sc(30px, rgba(30, 30, 30, 1));
    }
  }
}
.contractCost {
  .contractCostMain {
    padding: 10px 40px;
    background-color: #fff;
    .contractCostMainTitle {
      @include sc(32px, rgba(30, 30, 30, 1));
      padding: 26px 0;
    }
    .contractClassify {
      background-color: rgba(243, 247, 253, 1);
      @include fj(space-around);
      padding: 18px 0px;
      span {
        @include sc(28px, rgba(136, 136, 136, 1));
      }
    }
    .contractSomeList {
      //抽成
      padding: 30px 0px;
      @include fj(space-around);
      div {
        @include flexCenter;
        width: 25%;
      }
      .width30 {
        width: 30%;
        @include flexCenter;
      }
    }
    li {
      position: relative;
      .contractClassifyList {
        padding: 30px 0px;
        margin-right: -20px;
        @include fj(space-around);
        span {
          width: 25%;
          @include flexCenter;

          &:last-child {
            width: 38%;
          }
          &:nth-child(1) {
            width: 32%;
          }
        }
      }
    }

    .contractClassifyDetail {
      border-bottom: 2px solid rgba(244, 246, 248, 1);
      border-top: 2px solid rgba(244, 246, 248, 1);
      &:last-child {
        border-bottom: 0px solid rgba(244, 246, 248, 1);
      }
      li {
        //每个li
        font-size: 28px;
        padding: 10px 0;
        span {
          &:first-child {
            @include sc(28px, rgba(136, 136, 136, 1));
          }
          &:last-child {
            @include sc(28px, rgba(30, 30, 30, 1));
          }
        }
      }
    }
  }
}
.flowMain {
  background-color: #fff;
  padding: 30px 40px 0;
  font-family: $fr;
  li {
    @include fd;
    &:last-child {
      .shuxian {
        width: 0 !important;
      }
    }
    .flowLeft {
      width: 20%;
      @include fd(column);
      margin-right: 24px;
      .iconbox {
        @include wh(50px, 50px);
        border-radius: 25px;
        @include flexCenter;
        margin-bottom: 8px;
        .iconfont {
          font-size: 20px;
          @include flexCenter;
        }
      }
      .agree {
        background-color: rgba(90, 204, 155, 1);
        .iconfont {
          color: #fff;
        }
      }
      .agreeing {
        background-color: rgba(105, 167, 254, 1);
      }
      .iconTittle {
        @include sc(24px, rgba(136, 136, 136, 1));
        @include flexCenter;
      }
      .shuxianBox {
        width: 100%;
        @include flexWCenter;
        margin-bottom: 10px;
        .shuxian {
          padding: 6px 0;
          @include wh(2px, 106px);
          background: rgb(244, 246, 248);
        }
      }
    }
    .flowRight {
      .top {
        @include sc(24px, rgba(136, 136, 136, 1));
        margin-bottom: 8px;
      }
      .main {
        background: rgba(243, 247, 253, 1);
        @include wh(600px, 138px);
        padding: 24px 0 0 24px;
        .mainTop {
          @include sc(30px, rgba(80, 80, 80, 1));
          margin-bottom: 8px;
        }
        .mainBottom {
          @include sc(24px, rgba(136, 136, 136, 1));
        }
      }
    }
  }
}
.ApprovalFlow {
  .getAll {
    @include sc(28px, rgba(80, 80, 80, 1));
    padding: 20px;
    @include flexCenter;
    background-color: #fff;
    border-top: 1px solid rgb(244, 246, 248);
  }
}

.contractOther {
  .otherMain {
    background-color: #fff;
    .otherMainTitle {
      @include sc(32px, rgba(30, 30, 30, 1));
      padding: 26px 40px;
      border-bottom: 2px solid rgba(244, 246, 248, 1);
    }
    .otherMainClassify {
      background-color: rgba(243, 247, 253, 1);
      @include fj(space-around);
      padding: 18px 0px;
      span {
        @include sc(28px, rgba(136, 136, 136, 1));
      }
    }
    li {
      .contractSomeList {
        padding: 30px 64px;
        @include fj(space-between);
        span:first-child {
          width: 40%;
          @include ellipsis;
        }
        span:last-child {
          width: 60%;
          @include ellipsis;
        }
      }
    }
    .otherfujianLi {
      @include fj(space-between);
      border-bottom: 2px solid rgba(244, 246, 248, 1);
      padding: 26px 40px;
      div {
        @include fd(row);
        span {
          @include sc(30px, rgba(30, 30, 30, 1));
          @include flexHCenter;
          margin-right: 6px;
        }
      }
      button {
        height: 50px;
        width: 144px;
        padding: 6px 30px;
        border-radius: 25px;
        border: 2px solid rgba(105, 167, 254, 1);
        color: rgba(105, 167, 254, 1);
        background-color: #fff;
      }
    }
  }
}
.nomore {
  @include sc(24px, rgba(174, 174, 174, 1));
  @include flexCenter;
  margin: 30px;
}
.Rentalid {
  width: 60%;
  text-overflow: ellipsis;
  display: flex;
  justify-content: flex-end;
}
.popupHistory {
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
}
</style>

