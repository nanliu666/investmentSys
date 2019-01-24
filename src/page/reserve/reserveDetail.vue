<template>
  <div class="reservePart">
    <div class="appTopOther"></div>
    <x-header
      :left-options="{showBack: false}"
      class="header"
      :right-options="{showMore: true}"
      @on-click-more="showMenus = true"
    >
      <img src="../../assets/images/返回@3x.png" slot="left" class="fs-backICon" alt @click="goback">
      预定详情
    </x-header>
    <actionsheet @on-click-menu="getMenu" :menus="menus" v-model="showMenus" show-cancel></actionsheet>
    <section class="content" v-for="(item, index) in reseveDetail" :key="index">
      <div class="group">
        <div class="cientInfo">客户信息</div>
        <li class="groupLi">
          <div class="liLeft">
            <span>客户姓名</span>
            <span class="badge">*</span>
          </div>
          <div
            class="liRight"
            :class="[!!item.Accountname ? 'cellValueClass' : 'placeholderClass']"
          >
            <span>{{!!item.Accountname ? item.Accountname : '暂无联系人'}}</span>
          </div>
        </li>
        <li class="groupLi">
          <div class="liLeft">
            <span>手机号码</span>
            <span class="badge">*</span>
          </div>
          <div
            class="liRight"
            :class="[!!item.Accountname ? 'cellValueClass' : 'placeholderClass']"
          >
            <span>{{!!item.Accountname ? item.Accountname : '暂无联系人电话'}}</span>
          </div>
        </li>
        <div class="cientInfo">单元信息</div>
        <li class="groupLi">
          <div class="liLeft">
            <span>预定单元</span>
          </div>
          <div
            class="liRight"
            :class="[!!item.Resunitdesc ? 'cellValueClass' : 'placeholderClass']"
          >
            <span v-if="!!item.Resunitdesc">{{item.Resunitdesc }}</span>
            <span v-if="!item.Defaultstartdate">暂无预定单元</span>
          </div>
        </li>
        <li class="groupLi">
          <div class="liLeft">
            <span>预定开始日期</span>
          </div>
          <div
            class="liRight"
            :class="[!!item.Defaultstartdate ? 'cellValueClass' : 'placeholderClass']"
          >
            <span v-if="!!item.Defaultstartdate">{{item.Defaultstartdate | dataFrm('YYYY-MM-DD')}}</span>
            <span v-if="!item.Defaultstartdate">暂无预定开始日期</span>
          </div>
        </li>
        <li class="groupLi">
          <div class="liLeft">
            <span>预定结束日期</span>
          </div>
          <div
            class="liRight"
            :class="[!!item.Defaultexpirydate ? 'cellValueClass' : 'placeholderClass']"
          >
            <span v-if="!!item.Defaultexpirydate">{{item.Defaultexpirydate | dataFrm('YYYY-MM-DD')}}</span>
            <span v-if="!item.Defaultexpirydate">暂无预定结束日期</span>
          </div>
        </li>

        <li class="groupLi">
          <div class="liLeft">
            <span>面积(m²)</span>
          </div>
          <div class="liRight" :class="[!!unitArea ? 'cellValueClass' : 'placeholderClass']">
            <input
              readonly
              type="number"
              placeholder="暂无预定单元面积"
              style="text-align: right"
              v-model="unitArea"
            >
          </div>
        </li>
        <li class="groupLi">
          <div class="liLeft">
            <span>定金(￥)</span>
          </div>
          <div class="liRight" :class="[!!item.Bookamt ? 'cellValueClass' : 'placeholderClass']">
            <span v-if="!!item.Bookamt">{{item.Bookamt }}</span>
            <span v-if="!item.Bookamt">暂无预定定金金额</span>
          </div>
        </li>
        <li class="groupLi">
          <div class="liLeft">
            <span>备注</span>
          </div>
          <div class="liRight" :class="[!!item.Remark ? 'cellValueClass' : 'placeholderClass']">
            <span v-if="!!item.Remark">{{item.Remark }}</span>
            <span v-if="!item.Remark">暂无备注</span>
          </div>
        </li>
      </div>
    </section>
  </div>
</template>


<script>
import {
  XHeader,
  Group,
  Actionsheet,
  Picker,
  PopupHeader,
  Radio,
  Datetime,
  Popup
} from "vux";
import { GetReserveMgmtDetail, DeleteReserveMgmt } from "@/axios/api";
import { mapMutations, mapState } from "vuex";
export default {
  name: "reserve",
  data() {
    return {
      showMenus: false,
      menus: {
        menu1: "编辑",
        menu2: "删除"
      },
      reseveDetail: [],
      reseveStartTime: "",
      reseveEndTime: "",
      Remark: "", //备注
      clientDataName: "", //姓名
      clientDataPhone: "", //电话
      businessList: [], //当前意向
      unitArea: "" //铺位面积
    };
  },
  components: {
    XHeader,
    Actionsheet,
    Group,
    Picker,
    Datetime,
    PopupHeader,
    Popup,
    Radio
  },
  beforeRouteLeave(to, from, next) {
    this.TO_PAGE_NAME(from.name); //离开的时候在vuex存起来本组件的路由名称
    next();
  },
  computed: {
    ...mapState(["uintDetailList", "clientDetail"])
  },
  created() {
    this.onLoad();
  },
  methods: {
    getMenu(menuKey, menuItem) {
      switch (menuItem) {
        case "编辑":
          this.$router.push({
            name: "reserveAdd",
            query: {
              from: "reserveDetail"
            },
            params:{
              data: this.reseveDetail[0]
            }
          });
          break;
        case "删除":
          let data = {
            Bookid: this.$route.params.data.Bookid
          };
          DeleteReserveMgmt(data).then(res => {
            if (!!res.Success) {
              this.$router.push({ name: "reserveList" });
            }
          });
          break;
      }
    },
    ...mapMutations(["TO_PAGE_NAME", "RESERVEADD"]),
    goback() {
      this.$router.back(-1);
    },
    onLoad() {
      const data = {
        Reservemgmt: {
          Bookid: this.$route.params.data.Bookid
        }
      };
      GetReserveMgmtDetail(data).then(res => {
        this.reseveDetail = res.Datasource;
        console.log(this.reseveDetail);
      });
    }
  }
};
</script>
<style lang="scss">
@import "src/assets/sass/mixin";
.cellValueClass {
  font-family: $fr;
  @include sc(30px, rgba(30, 30, 30, 1));
}
.placeholderClass {
  font-family: $fr;
  @include sc(30px, rgba(209, 209, 209, 1));
}
.fs-backICon {
  @include wh(7px, 13px);
}
.fs-goaheadICon {
  margin-left: 4px;
  @include wh(6px, 10px);
}
</style>
<style scoped lang="scss">
@import "src/assets/sass/mixin";
.reservePart {
  .content {
    .reseveTitle {
      background-color: #fff;
      .danyuan {
        @include sc(30px, rgba(136, 136, 136, 1));
        padding: 32px 40px 0;
        margin-bottom: 10px;
        font-family: $fr;
      }
      .qi {
        @include sc(34px, rgba(30, 30, 30, 1));
        padding: 0 40px;
        font-family: $fm;
        border-bottom: 2px solid rgb(244, 246, 248);
      }
      .shangji {
        @include fj(space-between);
        @include wh(100%, 96px);
        @include flexHCenter;
        padding: 0 40px;
        font-family: $fr;
        @include sc(32px, rgba(136, 136, 136, 1));
        .shangjiNum {
          @include sc(32px, rgba(105, 167, 254, 1));
        }
      }
    }
    .cientInfo {
      @include sc(28px, rgba(136, 136, 136, 1));
      padding: 16px 40px;
      background-color: $bc;
    }
    .button {
      @include fj(space-around);
      button {
        @include wh(640px, 88px);
        @include sc(36px, $fc);
        @include borderRadius(44px);
        font-family: $fm;
        margin-top: 40px;
        box-shadow: 0 4px 20px 0 rgba(96, 137, 210, 0.17);
      }
      .submit {
        background: linear-gradient(
          to left,
          rgba(56, 153, 255, 1),
          rgba(74, 116, 226, 1)
        );
      }
    }
    .group {
      .groupLi {
        background-color: #fff;
        @include wh(100%, 96px);
        @include fj;
        padding: 0 40px;
        @include flexHCenter;
        border-bottom: 4px solid #f4f6f8;
        .liLeft {
          width: 36%;
          @include fj(flex-start);
          @include sc(30px, rgba(136, 136, 136, 1));
          .badge {
            margin-left: 4px;
            @include flexCenter;
            background-color: #fff;
            color: red;
          }
        }
        .liRight {
          @include fj(flex-end);
          @include flexHCenter;
          width: 64%;
          .liRightContent {
            text-align: right;
            width: 100%;
            @include ellipsis;
            span {
              margin-left: 5px;
            }
          }
          input {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>



