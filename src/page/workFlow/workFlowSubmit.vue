<template>
  <div class="addSign">
    <div class="appTopOther"></div>
    <x-header :left-options="{showBack: false}" class="header">
      <img src="../../assets/images/返回@3x.png" slot="left" class="fs-backICon" alt @click="goback">
      提交
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
            </div>
            <div class="shuxianBox">
              <div class="shuxian"></div>
            </div>
          </div>
          <div class="flowRight">1111</div>
        </li>
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
          <div class="flowRight">1111</div>
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
          .shuxianBox {
            width: 100%;
            @include flexWCenter;
            margin-bottom: 10px;
            .shuxian {
              padding: 6px 0;
              @include wh(2px, 208px);
              background: rgba(244, 246, 248, 1);
            }
          }
        }
        .flowRight {
        }
      }
    }
    .addContent {
      @include sc(30px, rgba(136, 136, 136, 1));
      font-family: $fr;
      .addContentLi {
        background-color: #fff;
        @include wh(100%, 96px);
        line-height: 96px;
        @include fj;
        @include flexHCenter;
        padding: 40px;
        margin-bottom: 4px;
        &:last-child {
          margin: 0;
        }
        .liRight {
          @include fj;
          @include sc(30px, rgba(30, 30, 30, 1));

          .radio-box {
            display: inline-block;
            @include fj;
            position: relative;
            margin-right: 30px;
            &:last-child {
              margin-right: 0px;
            }
            .flowFlag {
              @include flexCenter;
              margin-right: 10px;
              img {
                @include wh(46px, 46px);
              }
              .noCheched {
                @include wh(46px, 46px);
                border-radius: 23px;
                border: 1px solid rgba(219, 219, 219, 1);
              }
            }
            .input-radio {
              display: inline-block;
              position: absolute;
              opacity: 0;
              width: 25px;
              height: 25px;
              cursor: pointer;
              left: 0px;
              outline: none;
              -webkit-appearance: none;
            }
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


