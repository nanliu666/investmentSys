<template>
  <div class="addSign">
    <div class="appTopOther"></div>
    <x-header :left-options="{showBack: false}" class="header">
      <img src="../../assets/images/返回@3x.png" slot="left" class="fs-backICon" alt @click="goback">
      加签
    </x-header>
    <section class="ApprovalFlow" id="const">
      <div class="contractTitle">
        <span class="approveHistory">当前位置</span>
      </div>
      <ul class="flowMain">
        <li>
          <div class="flowLeft">
            <div class="flowFlag">
              <!-- <img v-if="hasCheckShow(item)" src="../../assets/images/椭圆形@2x.png" alt> -->
              <!-- <img v-if="hasRejectShow(item)" src="../../assets/images/椭圆形@2x (1).png" alt> -->
              <!-- <img v-if="hasAgreeShow(item)" src="../../assets/images/椭圆形@2x (2).png" alt> -->
              <img src="../../assets/images/椭圆形@2x (2).png" alt>
            </div>
            <span class="iconTittle">待审</span>
            <div class="shuxianBox">
              <div class="shuxian"></div>
            </div>
          </div>
          <div class="flowRight">
            <div class="top">2018-11-12</div>
            <div class="main">
              <div class="mainTop">审批人:张三搜索</div>
            </div>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>


<script>
import { XHeader } from "vux";
import { GetFollowUp, EditFollowUp, DeleteFollowup } from "@/axios/api";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      TrackList: [],
      hasNodata: false,
      showMenus: -1,
      menus: {
        menu1: "编辑",
        menu2: "删除"
      }
    };
  },
  components: {
    XHeader
  },
  name: "addSign",
  created() {
    this.onLoad();
  },
  methods: {
    goback() {
      this.$router.back(-1);
    },
    onLoad() {}
  }
};
</script>

<style scoped lang="scss">
@import "src/assets/sass/mixin";
.addSign {
  height: 100%;
  .ApprovalFlow {
    .contractTitle {
      @include fj;
      @include sc(28px, rgba(136, 136, 136, 1));
      padding: 20px 40px;
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
  }
}
</style>


