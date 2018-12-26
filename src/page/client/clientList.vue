<template>
  <div>
    <x-header :left-options="{backText: ''}" class="header">
      客户管理
      <a class="add" slot="right" @click="gotoAdd">＋</a>
    </x-header>
    <search
      @on-change="getResult"
      position="absolute"
      auto-scroll-to-top
      top="46px"
      ref="search"
      @on-cancel="searchCancel"
      @on-focus="getFocus"
    ></search>
    <section class="searchContent" v-show="hasSearch">
      <div class="searchResult">
        <div class="searchTitle">找到{{searchList.length}}个联系人</div>
        <li
          class="searchMain"
          v-for="(item, index) in searchList"
          :key="index"
          @click="getDeatil(item)"
        >
          <span>{{item | strSubstring}}</span>
          <span>{{item}}</span>
        </li>
      </div>
    </section>
    <section class="clientMain" v-for="(Item, index) in actualAlphabetList" :key="index">
      <div class="navTo" :id="'anchor-'+ Item">{{Item}}</div>
      <section class="nameList">
        <li
          class="nameLi"
          v-for="(item, index) in nameList[index]"
          :key="index"
          @click="getDeatil(item)"
        >
          <span>{{item | strSubstring}}</span>
          <span>{{item}}</span>
        </li>
      </section>
    </section>
    <section class="rightNav">
      <a
        class="alphabet"
        v-for="(item, index) in alphabetList"
        :key="index"
        @click="goAnchor('#anchor-'+item)"
      >{{item}}</a>
    </section>
  </div>
</template>

<script>
import { XHeader, XButton, Search } from "vux";
import { GetCustomer } from "@/axios/api";
import { pinyinUtil } from "@/assets/js/pinyinUtil"; //拼音首字母转化
export default {
  name: "clientList",
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
    //锚点跳转
    goAnchor(selector) {
      this.$el.querySelector(selector).scrollIntoView();
    },
    onLoad() {
      const data = {
        Urlpara: {
          Pageindex: 1,
          Pageindex: 10
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
        const alphabetTest = /^[a-zA-Z]+$/; //测试字符是否只含有英文符号
        Object.keys(A).map((item, index) => {
          // if(alphabetTest.test(item)) {
          this.actualAlphabetList.push(item);
          // }
        });
        this.nameList = Object.values(A);
      });
    },
    getResult(val) {
      if (!!val) {
        this.searchList = this._.filter(this.allNameList, item => {
          return item.includes(val);
        });
      } else if (val === "") {
        this.searchList = [];
      }
    },
    getFocus() {
      this.hasSearch = !this.hasSearch;
    },
    searchCancel() {
      this.searchList = [];
      this.hasSearch = !this.hasSearch;
    },
    gotoAdd() {
      //去新增联系人页面
      this.$router.push({ name: "clientAdd" });
    },
    getDeatil(data) {
      // 去联系人详情页面
      let selectData = this._.filter(this.clientAllData, item => {
        return item.Name === data;
      });
      this.$router.push({
        name: "clientDetail",
        params: { id: selectData[0].Accountid }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/sass/mixin";
.add {
  font-size: 44px !important;
  color: rgba(136, 136, 136, 1) !important;
}

.searchContent {
  position: fixed;
  top: 170px;
  left: 0;
  width: 100%;
  height: 100%;
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
.clientMain {
  .navTo {
    padding: 20px 40px;
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
  top: 160px;
  .alphabet {
    margin: 4px 0;
    @include flexCenter;
    @include sc(24px, rgba(136, 136, 136, 1));
  }
}
</style>
