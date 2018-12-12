<template>
  <div class="login">
    <div class="top">
      <section>
        <div class="login-title">欢迎登陆移动招商平台</div>
        <ul>
          <li>
            <img src="../assets/images/手机.png" alt>
            <input type="number" required placeholder="请输入账号">
          </li>
          <li>
            <img src="../assets/images/padlock-1.png" alt>
            <input type="number" required placeholder="请输入密码">
          </li>
        </ul>
        <button type="submit">登陆</button>
        <div class="forget-password">忘记密码</div>
      </section>
    </div>
    <footer class="bottom">
      <img src="../assets/images/分组.png" alt>
    </footer>
  </div>
</template>


<script>
export default {};
</script>

<style scoped lang="scss">
@import "src/assets/sass/mixin";
.login {
  background-color: $fc;
  height: 100%;
  .top {
    height: 100%;
    padding-bottom: 2.3rem;
    section {
      height: 50%;
      @include bis150("../assets/images/背景@3x.png");
      padding: 0 1rem;

      .login-title {
        @include sc(0.8rem, $blue);
        padding: 3rem 0 1.4rem;
      }
      ul {
        position: relative;
        padding: 0 0.8rem;
        background-color: $fc;
        box-shadow: 0 0 14px 0 #6089d2;
        &::before {
          position: absolute;
          top: -10px;
          height: 0;
          width: 0;
          left: 30%;
          margin-left: -10px;
          content: " ";
          border-bottom: 10px solid $fc;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
        }

        li {
          position: relative;
          height: 2.6rem;
          @include flexCenter;
          @include fj(flex-start);
          img {
            margin-right: 18px;
          }
          input {
            border-left: 1px solid #888888;
            padding-left: 12px;
            &::-webkit-input-placeholder {
              @include sc(15px, $DB);
            }
          }
        }

        li:first-child {
          border-bottom: 1px solid #ccc;
        }
      }

      button {
        width: 100%;
        height: 2rem;
        border-radius: 1rem;
        margin: 1.3rem 0 0.8rem 0;
        background: linear-gradient(#3899ff, #4a74e2);
        box-shadow: 0 2px 14px 0 #6089D2;
        @include sc(18px, $fc);
      }
      .forget-password {
        @include sc(14px, #666666);
        cursor:pointer;
      }
    }
  }
  .bottom {
    @include cl;
    height: 2.3rem;
    margin-top: -2.3rem;
  }
}
</style>


