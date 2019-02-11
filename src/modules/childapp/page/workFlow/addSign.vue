<template>
  <div class="addSign">
    <div class="appTopOther"></div>
    <x-header :left-options="{showBack: false}" class="header">
      <img src="../../assets/images/返回@3x.png" slot="left" class="fs-backICon" alt @click="goback">
      加签
    </x-header>
    <section class="ApprovalFlow">
      <div class="contractTitle">当前位置</div>
      <ul class="flowMain">
        <li>
          <div class="flowLeft">
            <div class="flowFlag">
              <img src="../../assets/images/椭圆形@2x.png" alt>
            </div>
            <span class="iconTittle">待审</span>
            <div class="shuxianBox">
              <div class="shuxian"></div>
            </div>
          </div>
          <div class="flowRight">
            <div class="top">2018-11-12</div>
            <div class="main">
              <div class="mainTop">审批人:张三</div>
            </div>
          </div>
        </li>
      </ul>
    </section>
    <section class="ApprovalFlow">
      <div class="contractTitle">加签内容</div>
      <ul class="addContent">
        <li class="addContentLi">
          <div>加签位置</div>
          <div class="liRight">
            <div
              class="radio-box"
              v-for="(item,index) in radios"
              :key="index"
              @click="check(index)"
            >
              <div class="flowFlag">
                <img v-if="item.isChecked" src="../../assets/images/椭圆形@2x (2).png" alt>
                <span v-if="!item.isChecked" class="noCheched"></span>
              </div>
              <input
                v-model="radio"
                :value="item.value"
                class="input-radio"
                :checked="item.isChecked"
                type="radio"
              >
              {{item.label}}
            </div>
          </div>
        </li>
        <li class="addContentLi">
          <div>加签人</div>
          <div class="liRight">请选择 ></div>
        </li>
      </ul>
    </section>
    <section class="ApprovalFlow">
      <!-- <div class="contractTitle">本人审批意见</div> -->
      <group title="本人审批意见">
        <x-textarea placeholder="请填写审批意见" class="textarea" :max="200"></x-textarea>
      </group>
    </section>
  </div>
</template>


<script>
import { XHeader, XTextarea, Group } from "vux";
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
        // &:last-child {
        //   .shuxian {
        //     width: 0 !important;
        //   }
        // }
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
}
</style>


