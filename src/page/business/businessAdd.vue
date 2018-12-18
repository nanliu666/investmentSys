<template>
  <div class="reservePart">
    <header-top headerText="新增商机"></header-top>
    <section class="content">
      <div class="reseveTitle">
        <div class="danyuan">当前预定单元</div>
        <div class="qi">星月湾·东街二期 &nbsp; 403</div>
      </div>
      <form action>
        <section class="main">
          <div class="cientInfo">客户信息</div>
          <section class="formInfo">
            <div>
              <label for>
                客户姓名
                <span class="start">*</span>
              </label>
              <input type="text" placeholder="请选择客户" required>
              <i class="iconfont icon-youjiantou"></i>
            </div>
            <div>
              <label for>手机号码</label>
              <input type="number" name id>
            </div>
          </section>
        </section>
        <section class="main">
          <div class="cientInfo">商机信息</div>
          <section class="formInfo">
            <div>
              <label for>商机来源</label>
              <input type="text" placeholder="请选择客户" required>
              <i class="iconfont icon-youjiantou"></i>
            </div>
            <div>
              <label for>总面积</label>
              <input type="number" name id>
            </div>
            <div>
              <label for>预计成交金额</label>
              <input type="number" name id>
            </div>
            <div>
              <label for>紧急程度</label>
              <!-- <input type="number" name id> -->
              <popup></popup>
              <i class="iconfont icon-youjiantou"></i>
            </div>
            <div>
              <label for>备注</label>
              <input type="number" name id>
            </div>
          </section>
        </section>
        <section class="button">
          <button class="submit">保存</button>
        </section>
      </form>
    </section>
  </div>
</template>


<script>
import headerTop from "@/components/headerTOP";
import popup from "@/components/popup";
import {
  GetBizOpportunity,
  GetBizOpportunityDetail,
  GetBizopprtunityDropdown
} from "@/axios/api";
export default {
  name: "reserve",
  data() {
    return {};
  },
  created() {
    this.onLoad()
  },
  components: {
    headerTop,
    popup
  },
  methods: {
    onLoad() {
      var data = {
        Bizopportunity: {},
        Prospectid: 0
      };
      GetBizopprtunityDropdown(data).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "src/assets/sass/mixin";
.reservePart {
  .content {
    padding-top: 90px;
    .reseveTitle {
      height: 160px;
      padding: 32px 40px;
      background: linear-gradient(
        to left,
        rgba(56, 153, 255, 1),
        rgba(74, 116, 226, 1)
      );
      box-shadow: 0 0 28px 0 rgba(96, 137, 210, 0.17);
      .danyuan {
        @include sc(28px, rgba(255, 255, 255, 1));
        margin-bottom: 10px;
        font-family: $familyR;
      }
      .qi {
        @include sc(32px, rgba(255, 255, 255, 1));
        font-family: $familyMedium;
      }
    }
    .main {
      .cientInfo {
        @include sc(28px, #1e1e1e);
        font-family: $familyR;
        padding: 16px 40px;
      }
      .formInfo {
        padding: 0 40px;
        background-color: #fff;
        div {
          position: relative;
          padding: 20px 0;
          border-bottom: 1px solid #ececec; /*no*/
          label {
            @include sc(30px, #888);
          }
          input {
            position: absolute;
            left: 240px;
          }
        }
        div:last-child {
          border-bottom: 0px solid #ececec; /*no*/
        }
        .start {
          color: red;
        }
        .icon-youjiantou {
          position: absolute;
          right: 8px;
          @include wh(8px, 16px);
          color: rgba(219, 219, 219, 1);
        }
      }
      .upload {
        div {
          @include fj(space-between);
          input {
            width: 60%;
          }
          button {
            @include wh(114px, 50px);
            @include borderRadius(25px);
            @include borderStyle(rgba(72, 121, 230, 1));
            @include sc(28px, rgba(72, 121, 230, 1));
            padding: 6px 18px;
            background-color: $fc;
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
        font-family: $familyMedium;
        margin-top: 40px;
        box-shadow: 0 4px 20px 0 rgba(96, 137, 210, 0.17);
      }
      .submit {
        background: linear-gradient(
          to left,
          rgba(56, 153, 255, 1),
          rgba(74, 116, 226, 1)
        );
      }
    }
  }
}
</style>


