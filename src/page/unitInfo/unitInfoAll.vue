<template>
  <div>
    <x-header :left-options="{backText: ''}" class="header">星月湾第二期</x-header>
    <section class="uintInfoAll">
      <section class="uintOne clear">
        <div class="uintFloor">14F</div>
        <div class="unitRoom">
          <div>1407</div>
          <div>1407</div>
          <div class="rented">1407</div>
          <div class="reserve">1407</div>
          <div class="noRented">1407</div>
          <div>1407</div>
          <div>1407</div>
          <div>1407</div>
          <div>1407</div>
          <div>1407</div>
        </div>
      </section>
      <section class="uintOne clear">
        <div class="uintFloor">15F</div>
        <div class="unitRoom">
          <div>1407</div>
          <div>1407</div>
          <div class="rented">1407</div>
          <div class="reserve">1407</div>
          <div class="noRented">1407</div>
          <div>1407</div>
          <div>1407</div>
          <div>1407</div>
          <div>1407</div>
          <div>1407</div>
        </div>
      </section>
      <section class="uintOne clear">
        <div class="uintFloor">14F</div>
        <div class="unitRoom">
          <div>1407</div>
          <div>1407</div>
          <div class="rented">1407</div>
          <div class="reserve">1407</div>
          <div class="noRented">1407</div>
          <div>1407</div>
          <div>1407</div>
          <div>1407</div>
          <div>1407</div>
          <div>1407</div>
        </div>
      </section>
      <section class="uintOne clear">
        <div class="uintFloor">15F</div>
        <div class="unitRoom">
          <div>1407</div>
          <div>1407</div>
          <div class="rented">1407</div>
          <div class="reserve">1407</div>
          <div class="noRented">1407</div>
          <div>1407</div>
          <div>1407</div>
          <div>1407</div>
          <div>1407</div>
          <div>1407</div>
        </div>
      </section>
      <section class="uintOne clear">
        <div class="uintFloor">14F</div>
        <div class="unitRoom">
          <div>1407</div>
          <div>1407</div>
          <div class="rented">1407</div>
          <div class="reserve">1407</div>
          <div class="noRented">1407</div>
          <div>1407</div>
          <div>1407</div>
          <div>1407</div>
          <div>1407</div>
          <div>1407</div>
        </div>
      </section>
      <section class="uintOne clear">
        <div class="uintFloor">15F</div>
        <div class="unitRoom">
          <div>1407</div>
          <div>1407</div>
          <div class="rented">1407</div>
          <div class="reserve">1407</div>
          <div class="noRented">1407</div>
          <div>1407</div>
          <div>1407</div>
          <div>1407</div>
          <div>1407</div>
          <div>1407</div>
        </div>
      </section>
      <section class="uintOne clear">
        <div class="uintFloor">14F</div>
        <div class="unitRoom">
          <div>1407</div>
          <div>1407</div>
          <div class="rented">1407</div>
          <div class="reserve">1407</div>
          <div class="noRented">1407</div>
          <div>1407</div>
          <div>1407</div>
          <div>1407</div>
          <div>1407</div>
          <div>1407</div>
        </div>
      </section>
      <section class="uintOne clear">
        <div class="uintFloor">15F</div>
        <div class="unitRoom">
          <div>1407</div>
          <div>1407</div>
          <div class="rented">1407</div>
          <div class="reserve">1407</div>
          <div class="noRented">1407</div>
          <div>1407</div>
          <div>1407</div>
          <div>1407</div>
          <div>1407</div>
          <div>1407</div>
        </div>
      </section>
      <section class="uintOne clear">
        <div class="uintFloor">14F</div>
        <div class="unitRoom">
          <div>1407</div>
          <div>1407</div>
          <div class="rented">1407</div>
          <div class="reserve">1407</div>
          <div class="noRented">1407</div>
          <div>1407</div>
          <div>1407</div>
          <div>1407</div>
          <div>1407</div>
          <div>1407</div>
        </div>
      </section>
      <section class="uintOne clear">
        <div class="uintFloor">15F</div>
        <div class="unitRoom">
          <div>1407</div>
          <div>1407</div>
          <div class="rented">1407</div>
          <div class="reserve">1407</div>
          <div class="noRented">1407</div>
          <div>1407</div>
          <div>1407</div>
          <div>1407</div>
          <div>1407</div>
          <div>1407</div>
        </div>
      </section>
    </section>
    <footer class="footer">
      <div class="rente-pater">
        <span class="rente-text">当前可租单元：</span>
        <span class="rente-number">483</span>
        <span class="rente-pu">铺</span>
      </div>
      <div class="joinfloor">进入楼层平面图</div>
    </footer>
  </div>
</template>


<script>
import { GetUnitByBlock, GetBlocks, GetPropertys } from "@/axios/api";
import { XHeader } from "vux";
export default {
  name: "unitALL",
  created() {
    this.onLoad();
  },
  components: {
    XHeader
  },
  methods: {
    onLoad() {
      let data = {
        Blockid: 0
      };
      GetBlocks(data).then(res => {
        console.log(res);
      });
      console.log(this.$route.params);
    }
  }
};
</script>

<style scoped lang="scss">
@import "src/assets/sass/mixin";
.uintInfoAll {
  margin-bottom: 100px;
  padding-top: 10px;
  .uintOne {
    background-color: $fc;
    padding: 40px;
    padding-right: 0;
    margin-bottom: 20px;
    .uintFloor {
      width: 10%;
      float: left;
      @include sc(44px, #888);
      font-family: $fm;
    }
    .unitRoom {
      float: left;
      width: 90%;
      @include flexwrap(wrap);
      div {
        @include flexCenter;
        width: 20%;
        padding: 10px 30px;
        margin: 0 0 20px 20px;
        background-color: #78caff;
        @include sc(30px, $fc);
        font-family: $fm;
      }
      .rented {
        background-color: #ffab56;
      }
      .reserve {
        background-color: #4879e6;
      }
      .noRented {
        background-color: #cedfea;
      }
    }
  }
}
.footer {
  @include fj(space-between);
  @include flexHCenter;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 18px 37px;
  height: 96px;
  background-color: $fc;
  box-shadow: 0 -2px 7px 0 rgba(126, 158, 230, 0.15);
  .rente-pater {
    font-family: $fr;
    @include flexHCenter;
    .rente-text {
      @include sc(30px, rgba(136, 136, 136, 1));
    }
    .rente-number {
      @include sc(30px, #4879e6);
    }
    .rente-pu {
      @include sc(30px, rgb(66, 66, 66));
    }
  }
  .joinfloor {
    @include borderStyle(rgba(72, 121, 230, 0.5));
    @include flexHCenter;
    height: 60px;
    border-radius: 30px;
    @include sc(30px, rgba(72, 121, 230, 1));
    padding: 5px 20px;
  }
}
</style>


