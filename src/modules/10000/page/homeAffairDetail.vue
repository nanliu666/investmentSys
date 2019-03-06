<template>
  <div class="affairDetail">
    <div class="headerTab">
      <div class="appTopOther"></div>
      <x-header :left-options="{showBack: false}" class="header">
        <div slot="left" @click="gobackByrouter()" class="fs-backBox">
          <img src="../assets/images/返回@3x.png" class="fs-backICon" alt>
        </div>
        <span v-if="isContract">合同审批详情</span>
        <span v-if="!isContract">预定审批详情</span>
      </x-header>
      <tab
        :line-width="1"
        custom-bar-width="60px"
        bar-active-color="rgba(105, 167, 254, 1)"
        active-color="rgba(30, 30, 30, 1)"
        default-color="rgba(136, 136, 136, 1)"
      >
        <tab-item class="vux-center" @on-item-click="goAnchor('单据详情')">单据详情</tab-item>
        <tab-item class="vux-center" @on-item-click="goAnchor('审批流程')">审批流程</tab-item>
        <tab-item class="vux-center" @on-item-click="goAnchor('附件')">附件</tab-item>
      </tab>
    </div>
    <div class="mainSection" id="main">
      <section>
        <section class="contractMain" v-for="(item, index) in contractMainList" :key="index">
          <div class="contractTitle" v-if="isContract" ref="main">合同主体</div>
          <div class="contractTitle" v-if="!isContract" ref="main">单据详情</div>
          <li class="contractLi">
            <span>项目名称</span>
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
          <li v-if="isContract" class="contractLi">
            <span>公司品牌</span>
            <span class="Rentalid">{{item.contractBrand }}</span>
          </li>
          <li v-if="isContract" class="contractLi">
            <span>租赁开始时间</span>
            <span class="Rentalid">{{item.contractStart }}</span>
          </li>
          <li v-if="isContract" class="contractLi">
            <span>租赁结束时间</span>
            <span class="Rentalid">{{item.contractEnd }}</span>
          </li>
          <li v-if="isContract" class="contractLi">
            <span>租金总额</span>
            <span class="Rentalid">￥ {{item.contractDeosit }}</span>
          </li>
          <li v-if="isContract" class="contractLi">
            <span>管理费</span>
            <span class="Rentalid">￥ {{item.contractCost }}</span>
          </li>
          <li v-if="isContract" class="contractLi">
            <span>净租金</span>
            <span class="Rentalid">￥ {{item.contractJingCost }}</span>
          </li>
          <li v-if="isContract" class="contractLi">
            <span>表面租金</span>
            <span class="Rentalid">￥ {{item.contractBiaoCost }}</span>
          </li>
          <li v-if="isContract" class="contractLi">
            <span>首付款</span>
            <span class="Rentalid">￥ {{item.contractShouCost }}</span>
          </li>
          <li v-if="!isContract" class="contractLi">
            <span>定金</span>
            <span class="Rentalid">￥ {{item.deposit}}</span>
          </li>
          <li v-if="!isContract" class="contractLi">
            <span>预定单元</span>
            <span>{{item.danyuan}}</span>
          </li>
          <li v-if="!isContract" class="contractLi">
            <span>品牌名称</span>
            <span>{{item.yuding}}</span>
          </li>
          <li v-if="!isContract" class="contractLi">
            <span>预定开始日期</span>
            <span>{{item.yudingStart}}</span>
          </li>
          <li v-if="!isContract" class="contractLi">
            <span>预定结束日期</span>
            <span>{{item.yudingEnd}}</span>
          </li>
          <li v-if="!isContract" class="contractLi">
            <span>备注</span>
            <span>{{item.remask}}</span>
          </li>
        </section>
        <a
          id="const"
          ref="const"
          style=" position: relative;top: -110px;display: block;height: 0;overflow: hidden;"
        ></a>
        <section class="ApprovalFlow">
          <div class="contractTitle">
            审批流程
            <span class="approveHistory" @click="getHistoryDetail">审批历史&nbsp;>></span>
          </div>
          <ul class="flowMain">
            <li v-for="(item, index) in flowListActual" :key="index">
              <div class="flowLeft">
                <div class="flowFlag">
                  <img v-if="hasCheckShow(item)" src="../assets/images/椭圆形@2x.png" alt>
                  <img v-if="hasRejectShow(item)" src="../assets/images/椭圆形@2x (1).png" alt>
                  <img v-if="hasAgreeShow(item)" src="../assets/images/椭圆形@2x (2).png" alt>
                </div>
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
        <a
          id="other"
          style=" position: relative;top: -110px;display: block;height: 0;overflow: hidden;"
        ></a>
        <section class="contractOther" id="other">
          <div class="contractTitle">附件</div>
          <section v-if="fujianList.length === 0" class="noFujian">暂无附件</section>
          <section class="otherMain" v-if="fujianList.length !== 0">
            <div class="otherMainTitle">附件</div>
            <div class="otherfujianLi" v-for="(item, index) in fujianList" :key="index">
              <div>
                <span>
                  <svg
                    class="icon"
                    aria-hidden="true"
                    v-show="postfixFileName(item.FileName)  === 'docx'"
                  >
                    <use xlink:href="#icon-doc"></use>
                  </svg>
                  <svg
                    class="icon"
                    aria-hidden="true"
                    v-show="postfixFileName(item.FileName)  ==='doc' "
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
                    v-if="postfixFileName(item.FileName)  == 'xls'"
                  >
                    <use xlink:href="#icon-excel"></use>
                  </svg>
                  <svg
                    class="icon"
                    aria-hidden="true"
                    v-if="postfixFileName(item.FileName)  ==   'xlsx'"
                  >
                    <use xlink:href="#icon-excel"></use>
                  </svg>
                  <svg
                    class="icon"
                    aria-hidden="true"
                    v-if="postfixFileName(item.FileName)  ===  'jpeg'"
                  >
                    <use xlink:href="#icon-jpg"></use>
                  </svg>
                  <svg
                    class="icon"
                    aria-hidden="true"
                    v-if="postfixFileName(item.FileName)  === 'jpg' "
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
                    v-if="postfixFileName(item.FileName)  === 'pptx' "
                  >
                    <use xlink:href="icon-ppt"></use>
                  </svg>
                  <svg
                    class="icon"
                    aria-hidden="true"
                    v-if="postfixFileName(item.FileName)  === 'ppt' "
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
      <section class="footer" v-if="false">
        <button class="addSign" @click="WorkFlowAddSign">加签</button>
        <button class="reject" @click="WorkFlowReject">驳回</button>
        <button class="submit" @click="WorkFlowAgree">同意</button>
      </section>
      <section class="nomore">没有更多了</section>
      <popup v-model="haspopup" position="bottom" class="popupHistory">
        <div class="close" @click="getHistoryDetail">
          <i class="iconfont icon-guanbi"></i>
        </div>
        <ul class="flowMain">
          <li v-for="(item, index) in flowListActual" :key="index">
            <div class="flowLeft">
              <div class="flowFlag">
                <img v-if="hasCheckShow(item)" src="../assets/images/椭圆形@2x.png" alt>
                <img v-if="hasRejectShow(item)" src="../assets/images/椭圆形@2x (1).png" alt>
                <img v-if="hasAgreeShow(item)" src="../assets/images/椭圆形@2x (2).png" alt>
              </div>
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
    <!-- </view-box> -->
  </div>
</template>
<script>
import { XHeader, Tab, TabItem, Sticky, Popup, ViewBox } from "vux";
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
      isContract: false,
      hasHandle: true,
      affairDetail: {},
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
  components: { XHeader, Tab, TabItem, Sticky, Popup, ViewBox },
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
    WorkFlowAddSign() {
      this.$router.push({
        name: "addSign",
        query: {
          from: "affairDetail"
        },
        params: {
          id: this.$route.params.id,
          linkMan: this.flowList[0].SectionRows[3].Value,
          Platformkey: this.$route.params.id
        }
      });
    },
    WorkFlowReject() {
      this.$router.push({
        name: "WorkFlowReject",
        query: {
          from: "affairDetail"
        },
        params: {
          id: this.$route.params.id,
          linkMan: this.flowList[0].SectionRows[3].Value,
          Platformkey: this.$route.params.id
        }
      });
    },
    WorkFlowAgree() {
      this.$router.push({
        name: "WorkFlowAgree",
        query: {
          from: "affairDetail"
        },
        params: {
          id: this.$route.params.id,
          linkMan: this.flowList[0].SectionRows[3].Value,
          Platformkey: this.$route.params.id
        }
      });
    },
    hasRejectShow(data) {
      //驳回
      if (data.SectionRows[0].Value.includes("驳回")) {
        return true;
      } else {
        return false;
      }
    },
    hasCheckShow(data) {
      //待审
      if (data.SectionRows[0].Value.includes("待审")) {
        return true;
      } else {
        return false;
      }
    },
    hasAgreeShow(data) {
      //批准或者提交
      if (
        data.SectionRows[0].Value.includes("批准") ||
        data.SectionRows[0].Value.includes("提交")
      ) {
        return true;
      } else {
        return false;
      }
    },
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
      this.affairDetail = JSON.parse(localStorage.getItem("affairDetail"));
      if (
        !!this.affairDetail.Messagecontent &&
        this.affairDetail.Messagecontent.includes("合同")
      ) {
        this.isContract = !this.isContract;
      }
      const jsonData = {
        Platformkey: this.$route.params.id
      };
      GetToDoDetail(jsonData).then(res => {
        let data = res[0].SectionTables[0].SectionRows;
        this.$set(this.contractMain, "companys", data[0].Value); //项目名称
        this.$set(this.contractMain, "clientName", data[1].Value); //客户名称
        this.$set(this.contractMain, "danyuan", data[2].Value); //租赁单元
        this.$set(this.contractMain, "area", data[3].Value); //单元面积
        if (!!this.isContract) {
          this.$set(this.contractMain, "contractBrand", data[4].Value); //公司品牌
          this.$set(this.contractMain, "contractStart", data[5].Value); //租赁开始时间
          this.$set(this.contractMain, "contractEnd", data[6].Value); //租赁结束时间
          this.$set(this.contractMain, "contractDeosit", data[7].Value); //租金总额
          this.$set(this.contractMain, "contractCost", data[8].Value); //管理费
          this.$set(this.contractMain, "contractJingCost", data[9].Value); //净租金
          this.$set(this.contractMain, "contractBiaoCost", data[10].Value); //表面租金
          this.$set(this.contractMain, "contractShouCost", data[11].Value); //首付款
        } else {
          this.$set(this.contractMain, "deposit", data[7].Value); //定金
          this.$set(this.contractMain, "danyuan", data[2].Value); //租赁单元
          this.$set(this.contractMain, "yuding", data[4].Value); //预定日期
          this.$set(this.contractMain, "yudingStart", data[5].Value); //预定开始日期
          this.$set(this.contractMain, "yudingEnd", data[6].Value); //预定介绍日期
          this.$set(this.contractMain, "remask", data[8].Value); //备注
        }
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
      //附件路径待解决
      if (typeof cordova === "object" && typeof cordova.exec === "function") {
        cordova.exec(null, null, "ifcaPlugIns", "attachmentPreview", [
          {
            fileName: data.FileName,
            fileUrl: this.toAbsURL(
              "http://10.122.10.244:82/ydzs/DocumentLibrary/Download.ashx?id=" +
                data.FileUrl.split("&")[1].split("=")[1]
            )
          }
        ]);
      } else {
        document.addEventListener(
          "deviceready",
          () => {
            cordova.exec(null, null, "ifcaPlugIns", "attachmentPreview", [
              {
                fileName: data.FileName,
                fileUrl: this.toAbsURL(
                  "http://10.122.10.244:82/ydzs/DocumentLibrary/Download.ashx?id=" +
                    data.FileUrl.split("&")[1].split("=")[1]
                )
              }
            ]);
          },
          false
        );
      }
    },
    goAnchor(data) {
      let selector = "";
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
        this.tabSelect = "附件";
      }
      if (this.scrolled < document.getElementById("const").offsetTop) {
        this.tabSelect = "单据详情";
      }
    }
  }
};
</script>
<style lang="scss">
.weui-tab__panel {
  padding-bottom: 0 !important;
}
</style>
<style lang="scss" scoped>
@import "src/assets/sass/mixin";
.affairDetail {
  height: 100%;
  .headerTab {
    background-color: #fff;
    position: fixed;
    width: 100%;
  }
  .mainSection {
    padding-top: 250px;
  }
  .noFujian {
    font-family: $fr;
    @include sc(32px, rgba(136, 136, 136, 1));
    @include flexCenter;
  }
  .footer {
    @include wh(100%, 96px);
    box-shadow: 0 -4px 14px 0 rgba(126, 158, 230, 0.15);
    padding: 0 40px;
    line-height: 96px;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    @include fd;
    @include fj(flex-end);
    @include flexHCenter;
    button {
      @include wh(168px, 60px);
      @include flexCenter;
      border-radius: 30px;
      margin-left: 20px;
      @include sc(30px, rgba(255, 255, 255, 1));
    }
    .addSign {
      background-color: rgba(105, 167, 254, 1);
    }
    .reject {
      background-color: rgba(255, 171, 86, 1);
    }
    .submit {
      background-color: rgba(105, 167, 254, 1);
    }
  }
  .contractTitle {
    @include fj;
    @include sc(28px, rgba(136, 136, 136, 1));
    padding: 20px 40px;
  }
  .contractLi {
    width: 100%;
    background-color: #fff;
    @include fj(space-between);
    padding: 26px 40px;
    border-bottom: 2px solid rgb(244, 246, 248);
    &:last-child {
      border: 0;
    }
    span {
      &:first-child {
        width: 30%;
        @include sc(30px, rgba(136, 136, 136, 1));
      }
      &:last-child {
        text-align: right;
        width: 70%;
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
        .flowFlag {
          @include flexCenter;
          img {
            @include wh(46px, 46px);
          }
        }
        width: 20%;
        @include fd(column);
        margin-right: 24px;
        .iconTittle {
          margin-top: 6px;
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
    margin: 30px 30px 120px;
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
}
</style>

