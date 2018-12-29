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
          v-model="index"
        >
          <tab-item class="vux-center" v-for="(item, index) in infoList" :key="index">{{item}}</tab-item>
        </tab>
        <!-- <tab
          :line-width="1"
          custom-bar-width="60px"
          bar-active-color="rgba(105, 167, 254, 1)"
          active-color="rgba(30, 30, 30, 1)"
          default-color="rgba(136, 136, 136, 1)"
          ref="tab"
        >
          <tab-item selected @on-item-click="goAnchor('#main')">合同主体</tab-item>
          <tab-item @on-item-click="goAnchor('#const')">费用信息</tab-item>
          <tab-item @on-item-click="goAnchor('#other')">其他</tab-item>
        </tab>-->
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
          <span>{{item.Unitdesc}}</span>
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
          <span>{{item.Contractamt | formatNumber}}</span>
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
          <li v-for="(item, index) in Contractcharges" :key="index">
            <div class="contractClassifyList" @click="changeDetail">
              <span>{{item.Itemname || ''}}</span>
              <span>{{item.Billingfrequencystring|| ''}}</span>
              <span>{{item.Rentstandardtypestring|| ''}}</span>
              <span>{{item.Calculatemethodstring|| ''}}</span>
            </div>
            <div class="iconRow" @click="changeDetail">
              <x-icon type="ios-arrow-down" size="25" v-show="!hasStatus"></x-icon>
              <x-icon type="ios-arrow-up" size="25" v-show="hasStatus"></x-icon>
            </div>
            <div class="contractClassifyDetail" v-if="!hasStatus">
              <li>
                <span>付款类型:</span>
                <span></span>
              </li>
              <li>
                <span>付款日:</span>
                <span>每月{{item.Payday|| ''}}号</span>
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
        <div class="contractCostMain" v-if="!Contractcommission.length !== 0">
          <div class="contractCostMainTitle">抽成</div>
          <div class="contractClassify">
            <span>抽成类型</span>
            <span>支付周期</span>
            <span>补差周期</span>
            <span>补差方式</span>
          </div>
          <li v-for="(item, index) in Contractcommission" :key="index">
            <div class="contractSomeList">
              <span>{{item.Rentstandardtypestring}}</span>
              <span>{{item.Rentstandardtypestring}}</span>
              <span>{{item.Differencemethodstring | dataFrm('YYYY-MM-DD')}}</span>
              <span>{{item.Differencefrequencystring | dataFrm('YYYY-MM-DD')}}</span>
            </div>
          </li>
        </div>
        <div class="contractCostMain" v-if="!Contractoptions.length !== 0">
          <div class="contractCostMainTitle">免租期</div>
          <div class="contractClassify">
            <span>抽成类型</span>
            <span>支付周期</span>
            <span>补差周期</span>
            <span>补差方式</span>
          </div>
          <li>
            <div class="contractSomeList">
              <span>纯抽成</span>
              <span>1月付</span>
              <span>半年</span>
              <span>信用卡</span>
            </div>
          </li>
        </div>
        <div class="contractCostMain" v-if="!ContractDeposit.length !== 0">
          <div class="contractCostMainTitle">保证金</div>
          <div class="contractClassify">
            <span>抽成类型</span>
            <span>支付周期</span>
            <span>补差周期</span>
            <span>补差方式</span>
          </div>
          <li>
            <div class="contractSomeList">
              <span>纯抽成</span>
              <span>1月付</span>
              <span>半年</span>
              <span>信用卡</span>
            </div>
          </li>
        </div>
      </section>
      <section class="contractOther">
        <div class="contractTitle" id="other">其他</div>
        <section class="otherMain">
          <div class="contractCostMainTitle">附件</div>
          <div class="otherfujianLi">
            <span>月亮湾意向书</span>
            <button>查看</button>
          </div>
          <div class="otherfujianLi">
            <span>月亮湾意向书</span>
            <button>查看</button>
          </div>
        </section>
      </section>
    </section>
    <section class="nomore">没有更多了</section>
  </div>
</template>
<script>
import { XHeader, Tab, TabItem, Sticky } from "vux";
import { GetContractMgmtDetail } from "@/axios/api";
export default {
  name: "contractList",
  data() {
    return {
      index: 0,
      infoList: ["合同主体", "费用信息", "费用信息"],
      scrolled: "",
      contractData: {},
      Contactmain: [],
      ContractDeposit: [],
      ContractGuarantee: [],
      Contractcharges: [],
      Contractcommission: [],
      Contractenclosure: "",
      Contractoptions: [],
      Contractrentfree: [],
      hasStatus: false,
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
  created() {
    this.onLoad();
  },
  methods: {
    goAnchor(selector) {
      this.$el
        .querySelector(selector)
        .scrollIntoView({ block: "start", behavior: "smooth" });
    },
    // handleScroll() {
    //   //页面滚动高度
    //   console.log(document.getElementById("const").offsetTop);
    //   this.scrolled =
    //     document.documentElement.scrollTop || document.body.scrollTop;
    //   if (this.scrolled === 90) {
    //     this.index = 0;
    //   } else if (this.scrolled == document.getElementById("const").offsetTop) {
    //     this.index = 1;
    //   } else if (this.scrolled == document.getElementById("other").offsetTop) {
    //     this.index = 2;
    //   }
    // },
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
        this.Contractenclosure = res.Contractenclosure; //附件
        this.Contractoptions = JSON.parse(res.Contractoptions); //权利条款
        this.Contractrentfree = JSON.parse(res.Contractoptions); //免租期
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
        padding: 30px 0 30px 24px;
        @include fj(space-between);
        span {
          @include flexCenter;
        }
      }
      .iconRow {
        //箭头定位
        position: absolute;
        right: -44px;
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
    .contractCostMainTitle {
      @include sc(32px, rgba(30, 30, 30, 1));
      padding: 26px 40px;
      border-bottom: 2px solid rgba(244, 246, 248, 1);
    }
    .otherfujianLi {
      @include fj(space-between);
      border-bottom: 2px solid rgba(244, 246, 248, 1);

      padding: 26px 40px;
      span {
        @include sc(30px, rgba(30, 30, 30, 1));
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

