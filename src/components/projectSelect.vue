<template>
  <section class="filter">
    <div class="projectFilter">
      <span class="filterTitle" @click="openProjectStatus">项目</span>
      <span class="imgBox" @click="openProjectStatus">
        <img src="../assets/images/下拉@3x.png" class="fs-dropImg" v-show="!hasprojectStatus" alt>
      </span>
      <span class="imgBox" @click="openProjectStatus">
        <img
          src="../assets/images/下拉@3x.png"
          class="fs-dropImg"
          style="transform:rotate(180deg);"
          v-show="hasprojectStatus"
          alt
        >
      </span>
      <popup v-model="hasprojectStatus" :show-mask="showMask" class="nav">
        <div class="close" @click="openProjectStatus">×
          <!-- <i class="iconfont icon-guanbi"></i> -->
        </div>
        <section class="projectSelect">
          <div class="selectTitle">请选择</div>
          <div class="selectNav">
            <span
              :class="[!!companysSelect ? 'active' : '']"
              @click="reselectCompany"
            >{{companysSelect ? companysSelect : '选择公司'}}</span>
            <span :class="[!!companysSelect ? 'iActive' : '']">>></span>
            <span
              v-if="companysSelect"
              :class="[!!PropertysSelect ? 'active' : '']"
            >{{PropertysSelect ? PropertysSelect : '选择项目'}}</span>
          </div>
          <div class="selectCompanys" v-if="!companysSelect">
            <div>公司名称</div>
            <ul>
              <li
                v-for="item in companysList"
                :key="item.Companyid"
                @click="getCompanyDeatil(item)"
              >{{item.Companyname}}</li>
              <li v-if="companysList.length === 0">暂无公司</li>
            </ul>
          </div>
          <div class="selectCompanys" v-if="!!companysSelect">
            <div>项目名称</div>
            <ul>
              <li
                v-for="item in PropertysList"
                :key="item.Propertyid"
                @click="getPropertyDeatil(item)"
              >{{item.Propertyname}}</li>
              <li v-if="PropertysList.length === 0">暂无项目</li>
            </ul>
          </div>
        </section>
      </popup>
    </div>
    <div class="projectStatus">
      <span class="filterTitle" @click="openStatus">状态</span>
      <span class="imgBox" @click="openStatus">
        <img src="../assets/images/下拉@3x.png" class="fs-dropImg" v-show="!hasStatus" alt>
      </span>
      <span class="imgBox" @click="openStatus">
        <img
          src="../assets/images/下拉@3x.png"
          class="fs-dropImg"
          style="transform:rotate(180deg);"
          v-show="hasStatus"
          alt
        >
      </span>
      <!-- 选择状态 -->
      <transition
        name="custom-classes-transition"
        enter-active-class="animated fadeInDownBig"
        leave-active-class="animated fadeOutUpBig"
      >
        <section v-if="hasStatus" class="status">
          <div class="statusTop">
            <div v-for="(value, key) in statusDetail" :key="key">
              <span
                :class="activeClass === value ? 'statusActive' : ''"
                @click="getStatusDetail(key, value)"
              >{{value}}</span>
            </div>
          </div>
          <button class="ensureButton" @click="getStatus">确定</button>
        </section>
      </transition>
    </div>
  </section>
</template>

<script>
import { Popup, XInput } from "vux";
import { GetCompanyies, GetPropertys } from "@/axios/api";

export default {
  components: {
    Popup
  },
  created() {
    this.getCompany();
  },
  data() {
    return {
      activeClass: "所有状态",
      statusDetailSelect: "all",
      showMask: false,
      hasStatus: false,
      hasprojectStatus: false,
      companysSelect: "",
      PropertysList: [],
      companysList: [],
      statusName: "",
      PropertysSelect: ""
    };
  },
  methods: {
    openStatus() {
      this.hasStatus = !this.hasStatus;
      this.hasprojectStatus = false;
    },
    openProjectStatus() {
      //项目切换
      this.hasprojectStatus = !this.hasprojectStatus;
      this.hasStatus = false;
    },
    getCompany() {
      const data = {
        Companyid: 0
      };
      GetCompanyies(data).then(res => {
        this.companysList = res.Content;
      });
    },
    getCompanyDeatil(data) {
      //获得公司
      this.companysSelect = data.Companyname;
      this.PropertysSelect = "";
      const jsonData = {
        Propertyid: 0
      };
      GetPropertys(jsonData).then(res => {
        //获取项目
        this.PropertysList = this._.filter(
          res.Content,
          item => item.Companyid === data.Companyid
        );
      });
    },
    getPropertyDeatil(data) {
      this.PropertysSelect = data.Propertyname;
      //选择项目，自定义搜索字段
      this.FilterCond = {
        Filter: `Companyid=${data.Companyid}&Propertyid=${data.Propertyid}`
      };
      this.$emit("FilterUpdate", this.FilterCond);
      this.hasprojectStatus = !this.hasprojectStatus;
    },
    reselectCompany() {
      this.companysSelect = "";
      this.PropertysSelect = "";
    },
    getStatusDetail(key, value) {
      this.statusDetailSelect = key;
      this.activeClass = value;
    },
    getStatus() {
      //点击状态，选择状态，自定义搜索字段
      if (this.statusDetailSelect === "all") {
        this.FilterCond = {};
      } else {
        switch (this.comName) {
          case "reserveList":
            this.statusName = "Recordstatus";
            break;
          case "businessList":
            this.statusName = "Recordstatus";
            break;
          case "contractList":
            this.statusName = "Contractstatushow";
            break;
        }
        this.FilterCond = {
          Filter: `${this.statusName}='${this.statusDetailSelect}'`
        };
      }
      this.$emit("FilterUpdate", this.FilterCond);
      this.hasStatus = !this.hasStatus;
    }
  },
  props: {
    statusDetail: Object,
    comName: String
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/sass/mixin";

.filter {
  background-color: #fff;
  @include fd(row);
  box-shadow: 0 4px 14px 0 rgba(126, 158, 230, 0.15);
  @include wh(100%, 90px);
  .projectFilter {
    position: relative;
    &::after {
      position: absolute;
      content: "";
      width: 1px;
      height: 32px;
      background-color: rgba(219, 219, 219, 1);
      right: 0;
    }
  }
  .projectStatus,
  .projectFilter {
    width: 50%;
    @include flexCenter;
    .filterTitle {
      //状态，项目文字
      @include sc(28px, rgba(30, 30, 30, 1));
      font-family: $fr;
      margin-right: 12px;
    }
  }
  .nav {
    height: 100% !important;
    top: 150px;
    background-color: #fff;
    box-shadow: 0 -4px 14px 0 rgba(126, 158, 230, 0.15);
    .close {
      //弹出层关闭
      display: flex;
      justify-content: flex-end;
      margin-right: 50px;
      margin-top: 20px;
      font-size: 50px;
      color: rgba(136, 136, 136, 1);

      .iconfont {
        color: rgba(136, 136, 136, 1);
      }
    }
    .projectSelect {
      .selectTitle {
        @include flexCenter;
        @include sc(32px, rgba(30, 30, 30, 1));
        padding-bottom: 50px;
      }
      .selectNav {
        padding: 0 40px;
        span {
          @include sc(28px, rgba(136, 136, 136, 1));
          padding: 16px;
        }
        .active {
          background-color: rgba(105, 167, 254, 0.08);
          border: 1px solid rgba(105, 167, 254, 0.3);
          @include sc(28px, rgba(105, 167, 254, 1));
        }
        .iActive {
          @include sc(28px, rgba(105, 167, 254, 1));
        }
      }
      .selectCompanys {
        margin-top: 50px;
        div:first-child {
          background-color: rgba(243, 248, 253, 1);
          padding: 26px 40px;
          @include sc(32px, rgba(30, 30, 30, 1));
        }
        ul {
          li {
            background-color: rgba(249, 249, 249, 1);
            margin: 4px 0;
            padding: 26px 40px;
            @include sc(30px, rgba(30, 30, 30, 1));
          }
        }
      }
    }
  }

  //状态选择
  .status {
    position: absolute;
    z-index: 100;
    right: 4px;
    top: 230px;
    width: 100%;
    background-color: #fff;
    @include fd(column);

    .statusTop {
      border-top: 1px solid rgba(235, 237, 239, 1);
      display: flex;
      flex-flow: row wrap;
      div {
        width: 50%;
        @include flexCenter;
        span {
          display: inline-block;
          @include flexCenter;
          @include sc(28px, rgba(30, 30, 30, 1));
          border: 1px solid rgba(235, 237, 239, 1);
          @include wh(240px, 72ox);
          padding: 16px 60px;
          margin-top: 25px;
        }
      }
      .statusActive {
        color: rgba(105, 167, 254, 1);
        background-color: rgba(105, 167, 254, 0.05);
        border: 1px solid rgba(105, 167, 254, 0.5);
      }
    }
    .ensureButton {
      @include wh(100%, 88px);
      margin-top: 20px;
      @include flexCenter;
      background-color: rgba(105, 167, 254, 1);
      @include sc(34px, rgba(255, 255, 255, 1));
    }
  }
}
</style>

