<template>
  <div class="reservePart">
    <div class="appTopOther"></div>
    <x-header
      :left-options="{showBack: false}"
      class="header"
      :right-options="{showMore: showMore}"
      @on-click-more="showMenus = true"
    >
      <img
        src="../../assets/images/返回@3x.png"
        slot="left"
        class="fs-backICon"
        alt
        @click="gobackByrouter()"
      >
      预定详情
    </x-header>
    <actionsheet @on-click-menu="getMenu" :menus="menus" v-model="showMenus" show-cancel></actionsheet>
    <section class="content" v-for="(item, index) in reseveDetail" :key="index">
      <div class="group">
        <div class="cientInfo">客户信息</div>
        <li class="groupLi">
          <div class="liLeft">
            <span>客户姓名</span>
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
          </div>
          <div class="liRight" :class="[!!item.Userphone ? 'cellValueClass' : 'placeholderClass']">
            <span>{{!!item.Userphone ? item.Userphone : '暂无联系人电话'}}</span>
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
            <span v-if="!item.Resunitdesc">暂无预定单元</span>
          </div>
        </li>
        <li class="groupLi">
          <div class="liLeft">
            <span>预定开始日期</span>
          </div>
          <div
            class="liRight"
            :class="[!!item.Bookstartdate ? 'cellValueClass' : 'placeholderClass']"
          >
            <span v-if="!!item.Bookstartdate">{{item.Bookstartdate | dataFrm('YYYY-MM-DD')}}</span>
            <span v-if="!item.Bookstartdate">暂无预定开始日期</span>
          </div>
        </li>
        <li class="groupLi">
          <div class="liLeft">
            <span>预定结束日期</span>
          </div>
          <div
            class="liRight"
            :class="[!!item.Bookexpirydate ? 'cellValueClass' : 'placeholderClass']"
          >
            <span v-if="!!item.Bookexpirydate">{{item.Bookexpirydate | dataFrm('YYYY-MM-DD')}}</span>
            <span v-if="!item.Bookexpirydate">暂无预定结束日期</span>
          </div>
        </li>

        <li class="groupLi">
          <div class="liLeft">
            <span>租赁面积(m²)</span>
          </div>
          <div class="liRight" :class="[!!item.Rentalarea ? 'cellValueClass' : 'placeholderClass']">
            <input
              readonly
              type="number"
              placeholder="暂无预定单元面积"
              style="text-align: right"
              v-model="item.Rentalarea"
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
            <span class="remark" v-if="!!item.Remark">{{item.Remark }}</span>
            <span v-if="!item.Remark">暂无备注</span>
          </div>
        </li>
      </div>
      <section class="button">
        <x-button v-if="hasSubmit" class="submit" @click.native="submit">提交</x-button>
        <x-button v-if="hasVoid" class="submit" @click.native="Void">作废</x-button>
      </section>
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
  XButton,
  Radio,
  Datetime,
  Popup
} from "vux";
import {
  GetReserveMgmtDetail,
  DeleteReserveMgmt,
  VoidReserveMgmt
} from "@/axios/api";
import { mapMutations, mapState } from "vuex";
export default {
  name: "reserve",
  data() {
    return {
      hasSubmit: true,
      hasVoid: false,
      showMore: true,
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
    XButton,
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
    Void() {
      let data = {
        Bookid: this.reseveDetail[0].Bookid
      };
      VoidReserveMgmt(data).then(res => {
        this.$vux.toast.show({
          text: "成功！",
          type: "success"
        });
        // this.$router.meta.isLoad = true;
        this.$router.push({ name: "reserveList" });
      });
    },
    submit() {
      this.$router.push({
        name: "workFlowSubmit",
        query: {
          from: "reserveDetail"
        },
        params: {
          id: this.reseveDetail[0].Bookid,
          data: this.reseveDetail[0]
        }
      });
    },
    getMenu(menuKey, menuItem) {
      switch (menuItem) {
        case "编辑":
          console.log(this.reseveDetail[0]);
          this.RESERVEADD(this.reseveDetail[0]);
          this.$router.push({
            name: "reserveEdit",
            query: {
              from: "reserveDetail"
            }
          });
          break;
        case "删除":
          let data = {
            Bookid: this.$route.params.data.Bookid
          };
          DeleteReserveMgmt(data).then(res => {
            if (res.Success !== false) {
              this.$router.push({ name: "reserveList" });
            }
          });
          break;
      }
    },
    ...mapMutations(["TO_PAGE_NAME", "RESERVEADD"]),
    onLoad() {
      if (
        this.$options.filters.firstUpperCase(
          JSON.parse(sessionStorage.getItem("reserveDetail")).Recordstatus
        ) !== "Active"
      ) {
        this.hasSubmit = !this.hasSubmit;
        this.showMore = !this.showMore;
      }
      // console.log(JSON.parse(sessionStorage.getItem("reserveDetail")).Recordstatus)
      if (
        this.$options.filters.firstUpperCase(
          JSON.parse(sessionStorage.getItem("reserveDetail")).Recordstatus
        ) === "Approved"
      ) {
        this.hasVoid = !this.hasVoid;
      }
      const data = {
        Reservemgmt: {
          Bookid: this.$route.params.id
        }
      };
      GetReserveMgmtDetail(data).then(res => {
        this.reseveDetail = res.Datasource;
      });
    }
  }
};
</script>
