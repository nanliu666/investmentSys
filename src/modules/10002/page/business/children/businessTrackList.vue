<template>
  <div class="businessTrackList">
    <div class="appTopOther"></div>
    <x-header :left-options="{showBack: false}" class="header">
      <img
        src="../../../assets/images/返回@3x.png"
        slot="left"
        class="fs-backICon"
        alt
        @click="gobackByrouter()"
      >
      跟踪记录
      <img
        src="../../../assets/images/addNew.png"
        @click="addTrack"
        slot="right"
        class="fs-addNew"
        alt
      >
    </x-header>
    <div v-if="TrackList.length !== 0">
      <div class="uintNumber">下次跟踪时间: {{TrackList[0].Nextfollowupdate | dataFrm('YYYY-MM-DD') }}</div>
      <section class="ApprovalFlow" id="const">
        <ul class="flowMain">
          <li v-for="(item, index) in TrackList" :key="index">
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
              <div class="top">{{item.Followupdate | dataFrm('YYYY-MM-DD')}}</div>
              <div class="main">
                <div class="mainTop">
                  <div class="mainTopT">
                    <span class="trackTittle">跟踪状态: {{item.Probability}}</span>
                    <span class="trackDot" @click="EditTrack(index)">···</span>
                    <div class="menu" v-show="showMenus === index">
                      <span @click="EditorTrack(item)">编辑</span>
                      <span @click="deleteTrack(item)">删除</span>
                    </div>
                  </div>
                  <div class="mainTopB">
                    <span>跟踪人: {{item.Agentname}}</span>
                    <span>跟踪方式: {{item.Followuptype}}</span>
                  </div>
                </div>
                <div class="mainBottom">备注: {{item.Remark}}</div>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </div>
    <section class="noData" v-if="hasNodata">
      <div class="imgBox">
        <img src="../../../assets/images/分组.png" alt>
        <div class="nodataTittle">暂无跟踪记录</div>
      </div>
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
  name: "businessTrackList",
  created() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      let data = {
        Prospectid: this.$route.params.id
      };
      GetFollowUp(data).then(res => {
        this.TrackList = JSON.parse(res.Content);
        if (this.TrackList.length === 0) {
          this.hasNodata = !this.hasNodata;
        }
      });
    },
    addTrack() {
      this.$router.push({
        name: "businessTackAdd",
        query: {
          from: "businessTrackList"
        },
        params: {
          data: JSON.parse(sessionStorage.getItem("businessTrackList"))
        }
      });
    },
    EditTrack(index) {
      this.showMenus = index;
    },
    EditorTrack(data) {
      this.$router.push({
        name: "businessTackAdd",
        query: {
          from: "businessTrackDeatil"
        },
        params: {
          data: data,
          id: data.Prospectid
        }
      });
    },
    deleteTrack(data) {
      let jsonData = {
        Prospectfollowupid: data.Prospectfollowupid
      };
      DeleteFollowup(jsonData).then(res => {
        if (!!res.Success) {
          this.$vux.toast.show({
            text: "删除失败！",
            type: "warn"
          });
        } else {
          this.$vux.toast.show({
            text: "删除成功！",
            type: "success"
          });
        }
        this.onLoad();
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "src/assets/sass/mixin";
.businessTrackList {
  height: 100%;
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
                position: relative;
                height: 44px;
                line-height: 44px;
                margin-bottom: 10px;
                @include fj;
                .trackTittle {
                  font-family: $fm;
                  @include sc(32px, rgba(30, 30, 30, 1));
                }
                .trackDot {
                  color: rgba(105, 167, 254, 1);
                  font-size: 50px;
                }
                .menu {
                  font-family: $fm;
                  @include sc(32px, rgba(30, 30, 30, 1));
                  position: absolute;
                  right: -10px;
                  top: 40px;
                  @include fd(column);
                  border: 1px solid #ccc;
                  span {
                    padding: 10px;
                  }
                  span:last-child {
                    border-top: 1px solid #ccc;
                  }
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
  .noData {
    height: 80%;
    .imgBox {
      @include center;
      .nodataTittle {
        @include sc(30px, rgba(136, 136, 136, 1));
        @include flexCenter;
      }
    }
  }
}
</style>


