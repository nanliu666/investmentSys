<template>
  <div>
    <x-header :left-options="{backText: ''}" class="header">合同详情</x-header>
    <div style="height:44px;">
      <sticky ref="sticky" :disabled="disabled" :check-sticky-support="false">
        <tab
          :line-width="1"
          custom-bar-width="60px"
          bar-active-color="rgba(105, 167, 254, 1)"
          active-color="rgba(30, 30, 30, 1)"
          default-color="rgba(136, 136, 136, 1)"
          ref="tab"
          v-model="tabIndex"
        >
          <tab-item
            class="vux-center"
            v-for="(item, index) in infoList"
            :key="index"
            @click.native="goAnchor(item)"
          >{{item}}</tab-item>
        </tab>
      </sticky>
    </div>
    <div class="vux-sticky-fill" style="height:44px;"></div>
    <section>
      <section class="contractMain" v-for="item in Contactmain" :key="item.Rentalid">
        <div class="contractTitle" ref="main" id="main">合同主体</div>
        <li class="contractLi">
          <span>合同编号</span>
          <span class="Rentalid">{{item.Rentalid}}</span>
        </li>
        <li class="contractLi">
          <span>客户</span>
          <span>{{item.Debtorname}}</span>
        </li>
        <li class="contractLi">
          <span>品牌</span>
          <span>{{item.Brandname}}</span>
        </li>
        <li class="contractLi">
          <span>租赁单元</span>
          <span class="Rentalid">{{item.Unitdesc}}</span>
        </li>
        <li class="contractLi">
          <span>合同开始日期</span>
          <span>{{item.Defaultstartdate | dataFrm('YYYY-MM-DD')}}</span>
        </li>
        <li class="contractLi">
          <span>合同结束日期</span>
          <span>{{item.Defaultexpirydate | dataFrm('YYYY-MM-DD')}}</span>
        </li>
        <li class="contractLi">
          <span>租赁面积（平方米）</span>
          <span>{{item.Totalrentalarea | formatNumber}}</span>
        </li>
        <li class="contractLi">
          <span>合同金额</span>
          <span>￥{{item.Contractamt | formatNumber}}</span>
        </li>
        <li class="contractLi">
          <span>净金额（天/平方米/元)</span>
          <span>{{item.Netprice | formatNumber}}</span>
        </li>
        <li class="contractLi">
          <span>表面租金（天/平方米/元)</span>
          <span>{{item.Validprice | formatNumber}}</span>
        </li>

        <li class="contractLi">
          <span>备注</span>
          <span>{{item.Remark}}</span>
        </li>
      </section>
      <section class="contractCost">
        <div class="contractTitle" ref="const" id="const">费用信息</div>
        <div class="contractCostMain" v-if="Contractcharges.length !== 0">
          <div class="contractCostMainTitle">合同费用</div>
          <div class="contractClassify">
            <span>费用名称</span>
            <span>支付周期</span>
            <span>费用标准</span>
            <span>计费方式</span>
          </div>
          <li v-for="(item) in Contractcharges" :key="item.Rentalid">
            <div class="contractClassifyList" @click="changeDetail">
              <span>{{item.Itemname || '' || 111}}</span>
              <span>{{item.Billingfrequencystring|| ''}}</span>
              <span>{{item.Rentstandardtypestring|| ''}}</span>
              <span>{{item.Calculatemethodstring|| ''}}</span>
            </div>
            <div class="iconRow" @click="changeDetail">
              <x-icon type="ios-arrow-down" size="25" v-show="hasStatus"></x-icon>
              <x-icon type="ios-arrow-up" size="25" v-show="!hasStatus"></x-icon>
            </div>
            <div class="contractClassifyDetail" v-if="!hasStatus">
              <li>
                <span>付款类型:</span>
                <span>{{item.PriceModeString || ''}}</span>
              </li>
              <li>
                <span>付款日:</span>
                <span>{{item.Payday|| ''}}</span>
              </li>
              <li>
                <span>首期金额:</span>
                <span>¥600.00</span>
              </li>
              <li>
                <span>首期开始日期:</span>
                <span>{{item.Paymentstartdate | dataFrm('YYYY-MM-DD')|| ''}}</span>
              </li>
              <li>
                <span>首期结束日期:</span>
                <span>{{item.Paymentenddate | dataFrm('YYYY-MM-DD')|| ''}}</span>
              </li>
              <li>
                <span>计费周期:</span>
                <span>{{item.Frequencymodestring|| ''}}</span>
              </li>
              <li>
                <span>是否自然月账单:</span>
                <span>{{item.Isfirstdaybillingstring|| ''}}</span>
              </li>
            </div>
          </li>
        </div>
        <div class="contractCostMain" v-if="Contractcommission.length !== 0">
          <div class="contractCostMainTitle">抽成</div>
          <div class="contractClassify">
            <span>抽成类型</span>
            <span>支付周期</span>
            <span>补差周期</span>
            <span>补差方式</span>
          </div>
          <li v-for="(item, index) in Contractcommission" :key="index">
            <div class="contractSomeList">
              <span>{{item.Rentstandardtypestring || '' }}</span>
              <span>{{item.Rentstandardtypestring || '' }}</span>
              <span>{{item.Differencemethodstring || '' }}</span>
              <span>{{item.Differencefrequencystring || '' }}</span>
            </div>
          </li>
        </div>
        <div class="contractCostMain" v-if="Contractrentfree.length !== 0">
          <div class="contractCostMainTitle">免租期</div>
          <div class="contractClassify">
            <span>费项名称</span>
            <span>铺位编号</span>
            <span>减免方式</span>
            <span>免租值</span>
          </div>
          <li v-for="(item, index) in Contractrentfree" :key="index">
            <div class="contractSomeList">
              <span>{{item.Billitem}}</span>
              <span>{{item.Unitno}}</span>
              <span>半年</span>
              <span>{{item.Amount | formatNumber}}</span>
            </div>
          </li>
        </div>
        <div class="contractCostMain" v-if="ContractDeposit.length !== 0">
          <div class="contractCostMainTitle">保证金</div>
          <div class="contractClassify">
            <span>费项名称</span>
            <span>付款日期</span>
            <span>保证金</span>
          </div>
          <li v-for="(item, index) in ContractDeposit" :key="index">
            <div class="contractSomeList">
              <span>{{item.Itemname}}</span>
              <span>{{item.Documentdate | dataFrm('YYYY-MM-DD')}}</span>
              <span>{{item.Documentamt | formatNumber}}</span>
            </div>
          </li>
        </div>
      </section>
      <section class="contractOther">
        <div class="contractTitle" id="other">其他</div>
        <section class="otherMain" v-if="Contractoptions.length !== 0">
          <div class="otherMainTitle">权利条款</div>
          <div class="otherMainClassify">
            <span>条款名称</span>
            <span>条款内容</span>
          </div>
          <li v-for="(item, index) in Contractoptions" :key="index">
            <div class="contractSomeList">
              <span>{{item.Description }}</span>
              <span>{{item.Remark }}</span>
            </div>
          </li>
        </section>
        <section class="otherMain" v-if="Contractenclosure.length !== 0">
          <div class="otherMainTitle">附件</div>
          <div class="otherfujianLi" v-for="(item) in Contractenclosure" :key="item.Guid">
            <div>
              <span>
                <svg
                  class="icon"
                  aria-hidden="true"
                  v-show="postfixFileName(item.Documentname)  ===( 'doc' || 'docx')"
                >
                  <use xlink:href="#icon-doc"></use>
                </svg>
                <svg
                  class="icon"
                  aria-hidden="true"
                  v-if="postfixFileName(item.Documentname)  === 'pdf'"
                >
                  <use xlink:href="#icon-PDFtubiao"></use>
                </svg>
                <svg
                  class="icon"
                  aria-hidden="true"
                  v-if="postfixFileName(item.Documentname)  === ('xls' || 'xlsx')"
                >
                  <use xlink:href="#icon-excel"></use>
                </svg>
                <svg
                  class="icon"
                  aria-hidden="true"
                  v-if="postfixFileName(item.Documentname)  === ('jpg' || 'jpeg')"
                >
                  <use xlink:href="#icon-jpg"></use>
                </svg>
                <svg
                  class="icon"
                  aria-hidden="true"
                  v-if="postfixFileName(item.Documentname)  === 'png'"
                >
                  <use xlink:href="#icon-PNG"></use>
                </svg>
                <svg
                  class="icon"
                  aria-hidden="true"
                  v-if="postfixFileName(item.Documentname)  === 'gif'"
                >
                  <use xlink:href="#icon-GIF"></use>
                </svg>
                <svg
                  class="icon"
                  aria-hidden="true"
                  v-if="postfixFileName(item.Documentname)  === ('ppt' || 'pptx')"
                >
                  <use xlink:href="icon-ppt"></use>
                </svg>
                <svg
                  class="icon"
                  aria-hidden="true"
                  v-if="postfixFileName(item.Documentname)  === 'dwg'"
                >
                  <use xlink:href="#icon-DWG"></use>
                </svg>
                <svg
                  class="icon"
                  aria-hidden="true"
                  v-if="postfixFileName(item.Documentname)  === 'txt'"
                >
                  <use xlink:href="#icon-filetext"></use>
                </svg>
                <svg
                  class="icon"
                  aria-hidden="true"
                  v-if="postfixFileName(item.Documentname)  === 'rar'"
                >
                  <use xlink:href="#icon-RARtubiao"></use>
                </svg>
                <svg
                  class="icon"
                  aria-hidden="true"
                  v-if="postfixFileName(item.Documentname)  === 'zip'"
                >
                  <use xlink:href="#icon-RARtubiao"></use>
                </svg>
              </span>
              <span>{{item.Documentname | splitFileName}}</span>
            </div>
            <button @click="getContractenclosure(item)">查看</button>
          </div>
        </section>
      </section>
    </section>
    <section class="nomore">没有更多了</section>
  </div>
</template>
<script>
import { XHeader, Tab, TabItem, Sticky } from "vux";
import { GetContractMgmtDetail, DocumentLibrary } from "@/axios/api";
export default {
  name: "contractList",
  data() {
    return {
      tabIndex: 0,
      infoList: ["合同主体", "费用信息", "其他"],
      scrolled: "",
      contractData: {},
      Contactmain: [],
      ContractDeposit: [],
      ContractGuarantee: [],
      Contractcharges: [],
      Contractcommission: [],
      Contractenclosure: [],
      Contractoptions: [],
      Contractrentfree: [],
      hasStatus: true,
      disabled:
        typeof navigator !== "undefined" &&
        /iphone/i.test(navigator.userAgent) &&
        /ucbrowser/i.test(navigator.userAgent)
    };
  },
  components: { XHeader, Tab, TabItem, Sticky },
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
    postfixFileName(text) {
      let fileName = text.lastIndexOf("."); //取到文件名开始到最后一个点的长度
      let fileNameLength = text.length; //取到文件名长度
      let fileFormat = text.substring(fileName + 1, fileNameLength); //截取
      return fileFormat;
    },
    getContractenclosure(data) {
      const jsonData = {
        id: data.Guid
      };
      //TODO 补充预览
      window.open(
        `http://10.122.10.244:82/ydzs/DocumentLibrary/Download.ashx?id=${
          data.Guid
        }`
      );
    },
    goAnchor(data) {
      let selector = "";
      switch (data) {
        case "合同主体":
          selector = "#main";
          break;
        case "费用信息":
          selector = "#const";
          break;
        case "其他":
          selector = "#other";
          break;
      }
      this.$el
        .querySelector(selector)
        .scrollIntoView({ block: "start", behavior: "smooth" });
    },
    handleScroll: _.debounce(function() {
      //页面滚动高度
      this.scrolled =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (this.scrolled > document.getElementById("const").offsetTop) {
        this.tabIndex = 1;
      } else if (this.scrolled > document.getElementById("other").offsetTop) {
        this.tabIndex = 2;
      } else {
        this.tabIndex = 0;
      }
    }, 100),
    changeDetail() {
      //改变费用显示状态
      this.hasStatus = !this.hasStatus;
    },
    onLoad() {
      const data = this.$route.params.data;
      GetContractMgmtDetail(data).then(res => {
        this.contractData = res;
        this.Contactmain = JSON.parse(res.Contactmain); //合同主体
        this.ContractDeposit = JSON.parse(res.ContractDeposit); //保证金
        this.ContractGuarantee = JSON.parse(res.ContractGuarantee);
        this.Contractcharges = JSON.parse(res.Contractcharges); //管理费用
        this.Contractcommission = JSON.parse(res.Contractcommission); //抽成
        this.Contractenclosure = JSON.parse(res.Contractenclosure); //附件
        this.Contractoptions = JSON.parse(res.Contractoptions); //权利条款
        this.Contractrentfree = JSON.parse(res.Contractrentfree); //免租期
        // console.log(
        //   this.$options.filters["postfixFileName"](
        //     this.Contractenclosure[0].Documentname
        //   )
        // );
        // console.log("附件=>",this.postfixFileName(this.Contractenclosure.Documentname) );
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/sass/mixin";
.contractTitle {
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
      @include fj(space-between);
      padding: 18px 24px;
      span {
        @include sc(28px, rgba(136, 136, 136, 1));
      }
    }
    li {
      position: relative;
      .contractSomeList {
        padding: 30px 24px;
        @include fj(space-between);
        span {
          @include flexCenter;
        }
      }
      .contractClassifyList {
        padding: 30px 24px;
        @include fj(space-between);
        span {
          @include flexCenter;
        }
      }
      .iconRow {
        //箭头定位
        position: absolute;
        right: -24px;
        top: 30px;
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
      @include fj(space-between);
      padding: 18px 24px;
      margin: 0 40px;
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
}
</style>

