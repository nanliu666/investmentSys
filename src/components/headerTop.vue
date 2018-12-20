<template>
  <div class="header">
    <div class="header-main">
      <section v-if="hasSEO" class="header-top">
        <section class="header-goback" @click="goback">
          <img src="../assets/images/返回@3x.png" alt>
        </section>
        <section class="header-title">
          <span v-if="headerText" class="header-text">{{headerText}}</span>
          <span class="header-row">
            <img class="row-img" v-if="hasRow" src="@/assets/images/下拉@3x.png" alt>
          </span>
        </section>
        <span v-if="hasSearch" @click="SEOChange">
          <i class="iconfont icon-fangdajing"></i>
        </span>
      </section>
      <div v-if="searchClick" class="seoPart">
        <input type="text" name id placeholder="请输入相关商机字段">
        <i class="iconfont icon-fangdajing"></i>
        <span @click="SEOChange">取消</span>
      </div>
    </div>
    <section class="filter" v-if="hasState">
      <div>
        <span>状态</span>
        <img class="row-img" src="@/assets/images/下拉@3x.png" alt>
      </div>
      <span class="decollator">|</span>
      <div>
        <span>项目</span>
        <img class="row-img" src="@/assets/images/下拉@3x.png" alt>
      </div>
    </section>
  </div>
</template>


<script>
// api
import { GetUnitinfoAll } from "@/axios/api";

export default {
  data() {
    return {
      searchClick: false,
      hasSEO: true,
      sourceList: []
    };
  },
  props: {
    headerText: {
      type: String
    },
    hasState: {
      type: Boolean
    },
    unitOp: {
      type: Boolean
    },
    hasRow: {
      type: Boolean
    }, //有箭头
    hasSearch: {
      type: Boolean
    }
  },
  methods: {
    SEOChange() {
      this.searchClick = !this.searchClick;
      this.hasSEO = !this.hasSEO;
    },
    onChange(val) {
      let [Companyid, Propertyid, Areaid] = val;
      this.$router.push({
        name: "unitAll",
        params: {
          Companyid,
          Propertyid,
          Areaid
        }
      });
    },
    goback() {
      this.$router.go(-1);
    },
    unitLoadData() {
      GetUnitinfoAll("").then(res => {
        let arrTemp = [];
        let Blocks = res.Content[0].Blocks;
        let Companys = res.Content[0].Companys;
        let PropertyAreas = res.Content[0].PropertyAreas;
        let Propertys = res.Content[0].Propertys;
        //先处理公司
        Companys.forEach((item, index) => {
          let newObj = {};
          newObj.name = item.Companyname;
          newObj.value = item.Companyid.toString();
          arrTemp.push(newObj);
        });
        Propertys.forEach((item, index) => {
          let newObj = {};
          newObj.name = item.Propertyname;
          newObj.value = item.Propertyid.toString();
          newObj.parent = item.Companyid.toString();
          arrTemp.push(newObj);
        });
        PropertyAreas.forEach((item, index) => {
          let newObj = {};
          newObj.name = item.Areaname;
          newObj.value = item.Areaid.toString();
          newObj.parent = item.Propertyid.toString();
          arrTemp.push(newObj);
        });
        Blocks.map(item => {
          let newObj = {};
          newObj.name = item.Blockname;
          newObj.value = item.Blockid.toString();
          newObj.parent = item.Propertyid.toString();
          arrTemp.push(newObj);
        });
        this.sourceList = arrTemp;
        console.log(res.Content[0]);
      });
    }
  },
  created() {
    // this.unitLoadData();
  },
  computed: {}
};
</script>

<style scoped lang="scss">
@import "src/assets/sass/mixin";
.header {
  position: fixed;
  width: 100%;
  background-color: $fc;
  box-shadow: 0 4px 14px 0 rgba(126, 158, 230, 0.15);
  .header-main {
    padding: 20px 40px;
    .header-top {
      @include fj(space-between);
      .header-goback {
        display: flex;
        @include flexHCenter;
        img {
          max-width: 14px;
          max-height: 26px;
        }
      }
      .header-title {
        @include flexWCenter;
        width: 100%;
        .header-text {
          font-family: $familyMedium;
          font-size: 34px; /*px*/
          color: #030303;
        }
        .header-row {
          @include flexCenter;
          margin: 18px 8px;
        }
      }
    }
    .seoPart {
      //搜索框部分
      @include flexHCenter;
      @include fj(space-between);
      position: relative;
      height: 44px;
      input {
        @include borderStyle(rgb(204, 204, 204));
        @include borderRadius(22px);
        padding: 4px 10px;
        width: 80%;
        height: 100%;
      }
      i {
        position: absolute;
        right: 150px;
      }
      span {
        @include sc(32px, rgb(102, 153, 255));
        margin-right: 20px;
      }
    }
  }
  .row-img {
    max-width: 26px;
    max-height: 11px;
  }
  .filter {
    @include fj(space-around);
    border-top: 1px solid rgb(228, 228, 228);
    padding: 24px 0;
    div {
      span {
        //状态，项目文字
        @include sc(28px, rgba(30, 30, 30, 1));
        font-family: $familyR;
        margin-right: 12px;
      }
    }
    .decollator {
      //分隔符
      @include wh(4px, 32px);
      color: rgba(219, 219, 219, 1);
    }
  }
}
</style>


