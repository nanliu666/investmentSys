<template>
  <div class="businessTrack">
    <x-header :left-options="{backText: ''}" class="header">跟踪记录</x-header>
    <div class="uintNumber">下次跟踪时间: 2019-11-12</div>
    <section class="ApprovalFlow" id="const">
      <ul class="flowMain">
        <li>
          <div class="flowLeft">
            <div class="flowLeftFlag">
              <div class="flowFlag">
                <div class="flowCircle"></div>
              </div>
            </div>
            <div class="shuxianBox">
              <div class="shuxian"></div>
            </div>
          </div>
          <div class="flowRight">
            <div class="top">2018-11-12</div>
            <div class="main">
              <div class="mainTop">
                <div class="mainTopT">
                  <span>跟踪状态: 有机会</span>
                  <span>···</span>
                </div>
                <div class="mainTopB">
                  <span>跟踪人: 张大大</span>
                  <span>跟踪方式: 微信跟踪</span>
                </div>
              </div>
              <div class="mainBottom">备注: 无</div>
            </div>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>


<script>
import { XHeader } from "vux";
import { GetPropertys } from "@/axios/api";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  components: {
    XHeader
  },
  name: "businessTrack",
  created() {
    this.onLoad();
  },

  methods: {
    onLoad() {}
  }
};
</script>

<style scoped lang="scss">
@import "src/assets/sass/mixin";
.uintNumber {
  background-color: rgba(231, 237, 244, 1);
  @include wh(100%, 88px);
  @include sc(26px, rgba(30, 30, 30, 1));
  @include flexHCenter;
  padding: 0 34px;
}
.ApprovalFlow {
  .flowMain {
    padding: 30px 40px 0;
    font-family: $fr;
    li {
      @include fd;
      &:last-child {
        .shuxian {
          width: 0 !important;
        }
      }
      .flowLeftFlag {
        @include flexWCenter;
        margin-bottom: 4px;
      }
      .flowLeft {
        .flowFlag {
          @include wh(46px, 46px);
          background-color: rgb(230, 237, 247);
          border-radius: 23px;
          @include flexCenter;
          .flowCircle {
            @include wh(18px, 18px);
            border-radius: 8px;
            background-color: rgba(105, 167, 254, 1);
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
            @include wh(2px, 208px);
            background: rgb(229, 233, 239);
          }
        }
      }
      .flowRight {
        .top {
          @include sc(24px, rgba(136, 136, 136, 1));
          margin-bottom: 8px;
        }
        .main {
          background-color: #fff;
          @include wh(600px, 208px);
          padding: 24px 30px;
          .mainTop {
            margin-bottom: 30px;
            .mainTopT {
              height: 44px;
              line-height: 44px;
              margin-bottom: 10px;
              @include fj;
              span:first-child {
                font-family: $fm;
                @include sc(32px, rgba(30, 30, 30, 1));
              }
              span:last-child {
                color: rgba(105, 167, 254, 1);
                font-size: 50px;
              }
            }
            .mainTopB {
              @include sc(28px, rgba(136, 136, 136, 1));
            }
          }
          .mainBottom {
            @include sc(24px, rgba(136, 136, 136, 1));
            padding-bottom: 20px;
          }
        }
      }
    }
  }
}
</style>


