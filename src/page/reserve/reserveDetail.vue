<template>
  <div class="reservePart">
    <x-header :left-options="{backText: ''}" class="header">预定</x-header>
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
          <div class="cientInfo">订单详情</div>
          <section class="formInfo">
            <div>
              <label for>下单日期</label>
              <input type="text" placeholder="请选择客户" required>
            </div>
            <div>
              <label for>预定截止日期</label>
              <input type="number" name id>
            </div>
            <div>
              <label for>总面积</label>
              <input type="number" name id>
            </div>
            <div>
              <label for>定金</label>
              <input type="number" name id>
            </div>
            <div>
              <label for>备注</label>
              <input type="number" name id>
            </div>
          </section>
        </section>
        <section class="main">
          <div class="cientInfo">附件</div>
          <section class="formInfo upload">
            <div>
              <label for>附件</label>
              <input type="file">
              <button>上传</button>
            </div>
          </section>
        </section>
        <section class="button">
          <button class="save">保存</button>
          <button class="submit">提交</button>
        </section>
      </form>
    </section>
  </div>
</template>


<script>
import { XHeader } from "vux";

export default {
  name: "reserveDetail",
  data() {
    return {};
  },
  created() {},
  components: {
    XHeader
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
        font-family: $fr;
      }
      .qi {
        @include sc(32px, rgba(255, 255, 255, 1));
        font-family: fm;
      }
    }
    .main {
      .cientInfo {
        @include sc(28px, #1e1e1e);
        font-family: $fr;
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
        @include wh(320px, 88px);
        @include sc(36px, $fc);
        @include borderRadius(44px);
        font-family: fm;
        margin-top: 40px;
        box-shadow: 0 4px 20px 0 rgba(96, 137, 210, 0.17);
      }
      .save {
        background: linear-gradient(
          to left,
          rgba(120, 202, 255, 1),
          rgba(55, 185, 255, 1)
        );
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


