<template>
  <div class="login">
    <div class="top">
      <section :style="{backgroundImage: 'url('+bgc+')'}">
        <div class="login-title">欢迎登陆移动招商平台</div>
        <ul>
          <li>
            <img src="../assets/images/手机@3x.png" alt>
            <input type="number" required placeholder="请输入账号">
          </li>
          <li>
            <img src="../assets/images/padlock-1@3x.png" alt>
            <input type="number" required placeholder="请输入密码">
          </li>
        </ul>
        <button type="submit">登录</button>
        <div class="forget-password">忘记密码</div>
      </section>
    </div>
    <footer class="bottom">
      <img src="../assets/images/分组@3x.png" alt>
    </footer>
  </div>
</template>


<script>
export default {
  data() {
    return {
      bgc: require("../assets/images/背景@3x.png") // 修复背景无法获取
    };
  }
};
</script>

<style scoped lang="scss">
@import "src/assets/sass/mixin";
.login {
  background-color: $fc;
  height: 100%;
  .top {
    height: 100%;
    padding-bottom: 88px;
    section {
      height: 50%;
      padding: 0 40px;
      background-repeat: no-repeat;
      background-size: 150% 100%;
      .login-title {
        @include sc(44px, $blue);
        padding: 130px 0 56px;
      }
      ul {
        position: relative;
        background-color: $fc;
        box-shadow: 0 0 28px 0 rgba(96, 137, 210, 0.17); /*px*/
        height: 246px;
        &::before {
          position: absolute;
          top: -10px; /*px*/
          height: 0;
          width: 0;
          left: 30%;
          margin-left: -10px; /*px*/
          content: " ";
          border-bottom: 10px solid $fc;
          border-left: 10px solid transparent; /*no*/
          border-right: 10px solid transparent; /*no*/
        }

        li {
          position: relative;
          height: 50%;
          @include flexCenter;
          @include fj(flex-start);
          img {
            margin: 0 36px;
            max-width: 32px;
          }
          input {
            border-left: 1px solid #888888; /*no*/
            padding-left: 24px;
            &::-webkit-input-placeholder {
              @include sc(30px, $DB);
            }
          }
        }

        li:first-child {
          border-bottom: 1px solid rgba(236, 236, 236, 1); /*no*/
        }
      }

      button {
        width: 100%;
        height: 88px;
        border-radius: 44px;
        margin: 66px 0 20px;
        background: linear-gradient(#3899ff, #4a74e2);
        box-shadow: 0 4px 28px 0 rgba(96, 137, 210, 0.17);
        @include sc(36px, $fc);
      }
      .forget-password {
        @include sc(28px, #666666);
        cursor: pointer;
      }
    }
  }
  .bottom {
    @include cl;
    height: 88px;
    margin-top: -88px;
    img {
      max-height: 40px;
    }
  }
}
</style>


