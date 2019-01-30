<template>
  <div class="addSign">
    <div class="appTopOther"></div>
    <x-header :left-options="{showBack: false}" class="header">
      <img src="../../assets/images/返回@3x.png" slot="left" class="fs-backICon" alt @click="goback">
      提交
      <span slot="right">加签</span>
    </x-header>
    <section class="ApprovalFlow">
      <div class="contractTitle">审批流程</div>
      <ul class="flowMain">
        <li>
          <div class="flowLeft">
            <div class="flowLeftFlag">
              <div class="flowFlag">
                <div class="flowCircle"></div>
              </div>
              <div>提交</div>
            </div>
            <div class="shuxianBox">
              <div class="shuxian"></div>
            </div>
          </div>
          <div class="flowRight">
            <div>
              <span>发起人:</span>
              <span class="RightName">张连峰</span>
            </div>
            <span></span>
          </div>
        </li>
        <li>
          <div class="flowLeft">
            <div class="flowLeftFlag">
              <div class="flowFlag">
                <div class="flowCircle"></div>
              </div>
              <div>提交</div>
            </div>
            <div class="shuxianBox">
              <div class="shuxian"></div>
            </div>
          </div>
          <div class="flowRight">
            <div>
              <span>审批人:</span>
              <span class="RightName">张连峰</span>
            </div>
            <span class="getApprove">></span>
          </div>
        </li>
      </ul>
    </section>
    <section class="ApprovalFlow">
      <group title="提交意见">
        <x-textarea placeholder="请填写提交意见" class="textarea" :max="200"></x-textarea>
      </group>
    </section>
    <section class="button">
      <x-button class="submit" @click.native="submit">提交</x-button>
    </section>
  </div>
</template>


<script>
import { XHeader, XTextarea, XButton, Group } from "vux";
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
      },
      radio: "1",
      radios: [
        {
          label: "前",
          value: "1",
          isChecked: true
        },
        {
          label: "后",
          value: "2",
          isChecked: false
        }
      ]
    };
  },
  components: {
    XHeader,
    XButton,
    XTextarea,
    Group
  },
  name: "addSign",
  created() {
    this.onLoad();
  },
  methods: {
    check(index) {
      // 先取消所有选中项
      this.radios.forEach(item => {
        item.isChecked = false;
      });
      //再设置当前点击项选中
      this.radio = this.radios[index].value;
      // 设置值，以供传递
      this.radios[index].isChecked = true;
    },
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
        position: relative;
        height: 100%;
        @include fd;
        &:last-child {
          .shuxian {
            width: 0 !important;
          }
        }
        .flowLeft {
          width: 20%;
          height: 100%;
          @include fd(column);
          margin-right: 24px;
          .flowLeftFlag {
            height: 20%;
            @include fd(column);
            @include flexCenter;
            @include sc(28px, rgba(136, 136, 136, 1));
            font-family: $fr;
            margin-bottom: 4px;
            .flowFlag {
              @include wh(46px, 46px);
              background-color: rgb(230, 237, 247);
              border-radius: 23px;
              @include flexCenter;
              margin-bottom: 10px;
              .flowCircle {
                @include wh(18px, 18px);
                border-radius: 8px;
                background-color: rgba(105, 167, 254, 1);
              }
            }
          }
          .shuxianBox {
            left: 0;
            width: 100%;
            @include flexWCenter;
            margin-bottom: 10px;
            .shuxian {
              padding: 6px 0;
              @include wh(2px, 38px);
              // background: rgba(244, 246, 248, 1);
              background: red;
            }
          }
        }
        .flowRight {
          @include fj;
          background-color: rgba(243, 247, 253, 1);
          @include sc(30px, rgba(136, 136, 136, 1));
          font-family: $fr;
          @include wh(100%, 100px);
          @include flexHCenter;
          padding: 0 40px;
          .RightName {
            @include sc(30px, rgba(30, 30, 30, 1));
          }
          .getApprove {
            float: right;
          }
        }
      }
    }
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
      background: rgba(105, 167, 254, 1);
    }
  }
}
</style>


