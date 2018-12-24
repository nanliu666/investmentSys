<template>
  <div class="reservePart">
    <x-header
      :left-options="{backText: ''}"
      :right-options="{showMore: true}"
      class="header"
      @on-click-more="showMenus = true"
    >月亮湾 第二期1506</x-header>
    <actionsheet :menus="menus" v-model="showMenus" show-cancel></actionsheet>
    <section class="content">
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
              <input type="number" name id>
            </div>
            <div>
              <label for>备注</label>
              <input type="number" name id>
            </div>
          </section>
        </section>

        <section class="button">
          <button class="submit">预定</button>
          <button class="reserve">签约</button>
          <button class="losse">流失</button>
          <button class="moveto">移交</button>
        </section>
      </form>
    </section>
  </div>
</template>


<script>
import { GetBizOpportunityDetail } from "@/axios/api";
import { XHeader, Actionsheet } from "vux";
export default {
  name: "businessDetail",
  data() {
    return {
      menus: {
        menu1: "删除",
        menu2: "编辑"
      },
      showMenus: false
    };
  },
  created() {
    let data = {
      Bizopportunity: {
        Prospectid: 562
      }
    }
    GetBizOpportunityDetail(data).then(res => {
      console.log(JSON.parse(res.Bizopprtunity).Option);
    })
    console.log(this.$route.params.id)
  },
  components: {
    XHeader,
    Actionsheet
  },
  methods: {}
};
</script>

<style scoped lang="scss">
@import "src/assets/sass/mixin";
.reservePart {
  .content {
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
      background-color: #fff;
      height: 98px;
      position: fixed;
      width: 100%;
      bottom: 0;
      display: flex;
      align-items: center;
      flex-direction: row-reverse;
      padding: 0 30px;
      button {
        @include wh(168px, 60px);
        @include sc(28px, $fc);
        @include borderRadius(30px);
        font-family: $familyMedium;
        margin: 0 8px;
        box-shadow: 0 0px 20px 0 rgba(96, 137, 210, 0.17);
      }
      .submit {
        background: linear-gradient(
          to left,
          rgba(56, 153, 255, 1),
          rgba(74, 116, 226, 1)
        );
      }
      .losse {
        background: linear-gradient(
          to left,
          rgba(203, 220, 234, 1),
          rgba(173, 188, 198, 1)
        );
      }
      .reserve {
        background: linear-gradient(
          to left,
          rgba(120, 202, 255, 1),
          rgba(55, 185, 255, 1)
        );
      }
    }
  }
}
</style>


