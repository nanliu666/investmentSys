<template>
  <div>
    <div class="allHeader">
      <div class="appTopOther"></div>
      <x-header :left-options="{showBack: false}" class="header">
        <img
          src="../../assets/images/返回@3x.png"
          slot="left"
          class="fs-backICon"
          alt
          @click="goback()"
        >
        客户管理
        <a class="add" slot="right" @click="gotoAdd">＋</a>
      </x-header>
      <search
        @on-change="getResult"
        position="absolute"
        auto-scroll-to-top
        top="70px"
        ref="search"
        @on-cancel="searchCancel"
        @on-focus="getFocus"
      ></search>
    </div>
    <section class="searchContent" v-show="hasSearch">
      <div class="searchResult">
        <div class="searchTitle">找到{{searchList.length}}个联系人</div>
        <li
          class="searchMain"
          v-for="(item, index) in searchList"
          :key="index"
          @click="getDeatil(item.Name)"
        >
          <span>{{item.Name | strSubstring(1)}}</span>
          <span>{{item.Name}}</span>
        </li>
      </div>
    </section>
    <div class="clientList">
      <section
        class="clientMain"
        v-show="!hasSearch"
        v-for="(Item, index) in actualAlphabetList"
        :key="index"
      >
        <a
          :name="'anchor-' + Item"
          style=" position: relative;top: -110px;display: block;height: 0;overflow: hidden;"
        ></a>

        <a class="navTo">{{Item}}</a>
        <section class="nameList">
          <li
            class="nameLi"
            v-for="(item, index) in nameList[index]"
            :key="index"
            @click="getDeatil(item)"
          >
            <span>{{item | strSubstring(1)}}</span>
            <span>{{item}}</span>
          </li>
        </section>
      </section>
    </div>
    <section class="rightNav">
      <a
        class="alphabet"
        v-for="(item, index) in alphabetList"
        :key="index"
        :href="'#anchor-' + item"
      >{{item}}</a>
    </section>
  </div>
</template>

<script>
import { XHeader, XButton, Search } from "vux";
import { mapState, mapMutations } from "vuex";
import { GetCustomer } from "@/axios/api";
import { pinyinUtil } from "@/assets/js/pinyinUtil"; //拼音首字母转化
export default {
  name: "clientList",
  computed: {
    ...mapState(["toPageName"]) //从需要调用联系人列表组件的进入的时候，拿到vuex内的来的路由名称
  },
  data() {
    return {
      hasSearch: false,
      clientAllData: [], // 客户所有的数据
      allNameList: [],
      nameList: [],
      searchList: [],
      actualAlphabetList: [], //实际字母列表
      alphabetList: [
        //右侧字母导航
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ]
    };
  },
  components: {
    XHeader,
    Search,
    XButton
  },
  created() {
    this.onLoad();
  },
  methods: {
    ...mapMutations(["CLIENT_DETAIL"]),
    //锚点跳转
    goAnchor(selector) {
      this.$el.querySelector(selector).scrollIntoView();
    },
    onLoad() {
      const data = {
        Urlpara: {
          Pageindex: 1,
          Pagesize: 300
        }
      };
      GetCustomer(data).then(res => {
        //对中文名字按照字母排序
        let nameArr = [];
        let nameArr1 = [];
        this._.forEach(JSON.parse(res.Content), item => {
          nameArr.push(item.Name);
          nameArr1.push(item.Name);
        });
        this.allNameList = nameArr1;
        this.clientAllData = JSON.parse(res.Content);
        nameArr.sort(function(a, b) {
          return a.toString().localeCompare(b);
        });
        //A暂存名字列表
        let A = this._.groupBy(nameArr, function(item) {
          return pinyinUtil.getFirstLetter(item).slice(0, 1);
        });
        Object.keys(A).map((item, index) => {
          this.actualAlphabetList.push(item);
        });
        this.nameList = Object.values(A);
      });
    },
    getResult: _.debounce(function(val) {
      if (!!val) {
        const data = {
          Urlpara: {
            Pageindex: 1,
            Pagesize: 40,
            Filter: `Keyword.like.${val}`
          }
        };
        GetCustomer(data).then(res => {
          this.searchList = JSON.parse(res.Content);
        });
      } else if (val === "") {
        this.searchList = [];
      }
    }, 800),
    getFocus() {
      this.hasSearch = !this.hasSearch;
    },
    searchCancel() {
      this.searchList = [];
      this.hasSearch = !this.hasSearch;
    },
    gotoAdd() {
      //去新增联系人页面
      this.$router.push({
        name: "clientAdd",
        query: {
          from: "clientList"
        }
      });
    },
    getDeatil(data) {
      // 去联系人详情页面
      let selectData = this._.filter(this.clientAllData, item => {
        return item.Name === data;
      });
      if (this.$route.query.from === "reserveAddFromUint") {
        this.CLIENT_DETAIL(selectData[0]);
        this.$router.replace({
          name: "reserveAddFromUint"
        });
      } else if (this.$route.query.from === "reserveAdd") {
        //如果是从预订新增进来，把联系人存起去vuex，并且回去预订新增
        this.CLIENT_DETAIL(selectData[0]);
        this.$router.replace({
          name: "reserveAdd"
        });
      } else if (this.$route.query.from === "businessAdd") {
        this.CLIENT_DETAIL(selectData[0]);
        this.$router.replace({ name: "businessAdd" });
      } else {
        this.$router.push({
          name: "clientDetail",
          params: { id: selectData[0].Accountid },
          query: {
            from: "clientList"
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/sass/mixin";
.allHeader {
  background-color: #fff;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1;
  box-shadow: 0 4px 14px 0 rgba(126, 158, 230, 0.15);
}

.add {
  font-size: 44px !important;
  color: rgba(136, 136, 136, 1) !important;
}

.searchContent {
  position: fixed;
  top: 260px;
  left: 0;
  width: 100%;
  height: 1000%;
  background-color: #f8f8ff;
  z-index: 10;
  .searchResult {
    padding: 20px 40px;
    background-color: #fff;
    .searchTitle {
      padding: 20px 0;
      border-bottom: 2px solid #ccc;
      @include sc(28px, #ccc);
    }
    .searchMain {
      padding: 20px 0;
      @include fd(row);
      span {
        @include flexCenter;
        &:first-child {
          @include wh(60px, 60px);
          @include borderRadius(30px);
          margin-right: 20px;
          background-color: rgba(72, 121, 230, 1);
          @include sc(30px, $fc);
        }
        &:last-child {
          @include sc(30px, rgba(0, 0, 0, 1));
        }
      }
      border-bottom: 2px solid rgba(236, 236, 236, 1);
      &:last-child {
        border: 0;
      }
    }
  }
}
.clientList {
  margin-top: 240px;
}
.clientMain {
  .navTo {
    // margin-top: -80px;
    // padding: 80px;
    padding: 0px 40px;
    height: 76px;
    line-height: 76px;
    background-color: rgb(244, 246, 248);
    @include sc(28px, rgba(30, 30, 30, 1));
  }
  .nameList {
    padding: 0 40px;
    background-color: $fc;
    .nameLi {
      padding: 20px 0;
      @include fd(row);
      span {
        @include flexCenter;
        &:first-child {
          @include wh(60px, 60px);
          @include borderRadius(30px);
          margin-right: 20px;
          background-color: rgba(72, 121, 230, 1);
          @include sc(30px, $fc);
        }
        &:last-child {
          @include sc(30px, rgba(0, 0, 0, 1));
        }
      }
      border-bottom: 2px solid rgba(236, 236, 236, 1);
      &:last-child {
        border: 0;
      }
    }
  }
}
.rightNav {
  position: fixed;
  right: 38px;
  top: 300px;
  .alphabet {
    margin: 4px 0;
    @include flexCenter;
    @include sc(24px, rgba(136, 136, 136, 1));
  }
}
</style>
