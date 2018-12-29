<template>
  <div>
    <x-header :left-options="{backText: ''}" class="header" @click.native="maskshow">星月湾第二期</x-header>
    <div>
      <popup v-model="maskShow" position="top">
        <section class="nav">
          <div>
            <li
              v-for="(item, index) in companys"
              :key="index"
              @click="getpropertys(index)"
            >{{item.Companyname}}</li>
          </div>
          <div>
            <li
              v-for="(item, index) in selectPropertys"
              :key="index"
              @click="getAreas(index)"
            >{{item.Propertyname}}</li>
          </div>
          <div>
            <router-link
              tag="li"
              to="unitAll"
              v-for="(item, index) in selectBlock"
              :key="index"
              @click="getBlock(index)"
            >{{item.Blockname}}</router-link>
          </div>
        </section>
      </popup>
    </div>

    <section class="uintOption">
      <div class="option-title">我的项目</div>
      <section class="content">
        <div v-for="(item, index) in myPropertys" :key="index">
          <span @click="Property2all(index)">{{item.Blockname}}</span>
        </div>
      </section>
    </section>
  </div>
</template>


<script>
import { Popup, XHeader } from "vux";
import {
  GetPropertys,
  GetBlocks,
  GetUnitByBlock,
  GetUnitinfoAll,
  GetPropertyAreas,
  GetCompanyies
} from "@/axios/api";
export default {
  data() {
    return {
      hasRow: true,
      unitOp: true,
      maskShow: false,
      companys: [],
      myPropertys: [], // 我的项目
      selectPropertys: [],
      selectPropertyarea: [],
      selectBlock: []
    };
  },

  created() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      GetBlocks({ Blockid: 0 }).then(res => {
        this.myPropertys = res.Content;
      });
      //获取公司 初始
      GetCompanyies({ Companyid: 0 }).then(res => {
        this.companys = res.Content;
      });
    },
    // 获取项目
    getpropertys(index) {
      const companyID = this.companys[index].Companyid;
      GetPropertys({ Propertyid: 0 }).then(res => {
        let data = this._.chain(res.Content)
          .filter(function(item) {
            return item.Companyid === companyID;
          })
          .value();
        this.selectPropertys = data;
      });
    },
    // 获取分区
    getAreas(index) {
      const areaID = this.selectPropertys[index].Propertyid;
      GetPropertyAreas({ PropertyAreaid: 0 }).then(res => {
        let data = this._.chain(res.Content)
          .filter(item => {
            return item.Propertyid === areaID;
          })
          .value();
        this.selectPropertyarea = data;
      });
      this.getBlock(index);
    },

    // 获取楼栋
    getBlock(index) {
      const areaID = this.selectPropertys[index].Propertyid;
      GetBlocks({ Blockid: 0 }).then(res => {
        let data = this._.chain(res.Content)
          .filter(item => {
            return item.Propertyid === areaID;
          })
          .value();
        this.selectBlock = data;
      });
    },

    maskshow() {
      this.maskShow = !this.maskShow;
    },
    Property2all(index) {
      let params = this.myPropertys[index];
      console.log(this.myPropertys[index]);
      this.$router.push({
        name: "unitAll",
        params
      });
    }
  },
  components: {
    XHeader,
    Popup
  }
};
</script>

<style scoped lang="scss">
@import "src/assets/sass/mixin";
.header {
  z-index: 600;
}
.uintOption {
  padding: 10px 40px 0;
  .option-title {
    @include sc(16px * 2, #1e1e1e);
    margin-bottom: 17px * 2;
  }
  .content {
    @include flexwrap(wrap);
    @include fj(space-between);
    div {
      padding: 14px 54px;
      margin: 12px 0;
      background-color: $fc;
      span {
        font-family: $familyMedium;
        @include sc(30px, #888888);
      }
      @include borderStyle(#ececec);
    }
  }
}
.nav {
  margin-top: 80px;
  @include fj(space-around);
  background-color: $fc;
  div {
    flex-grow: 1;
    flex: 0 0 33.33%;
    border-right: 1px solid #ccc; /*no*/
    &:last-child {
      border: 0;
    }
    li {
      @include flexCenter;
      padding: 10px;
    }
  }
}
</style>


