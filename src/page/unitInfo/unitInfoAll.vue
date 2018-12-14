<template>
  <div>
    <header-top headerText="星月湾第二期"></header-top>
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
import { apiUnitALL } from "@/axios/api";
import headerTop from "@/components/headerTOP";
export default {
  name: "unitALL",
  created() {
    this.onLoad();
  },
  components: {
    headerTop
  },
  methods: {
    onLoad() {
      apiUnitALL().then(res => {
        // console.log(res.data.d);
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "src/assets/sass/mixin";
.uintInfoAll {
  margin-bottom: 2.2rem;
  .uintOne {
    background-color: $fc;
    padding: 0.87rem;
    padding-right: 0;
    margin-bottom: 0.2rem;
    .uintFloor {
      width: 10%;
      float: left;
      @include sc(22px, #888);
      font-family: $familyMedium;
    }
    .unitRoom {
      float: left;
      width: 90%;
      @include flexwrap(wrap);
      div {
        @include flexCenter;
        width: 20%;
        padding: 0.22rem 0.65rem;
        margin-left: 0.43rem;
        margin-bottom: 0.2rem;
        background-color: #78caff;
        @include sc(15px, $fc);
        font-family: $familyMedium;
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
  padding: 0.39rem 0.78rem;
  height: 2.1rem;
  background-color: $fc;
  box-shadow: 0 -2px 7px 0 rgba(126, 158, 230, 0.15);
  .rente-pater {
    font-family: $familyR;
    @include flexHCenter;
    .rente-text {
      @include sc(15px, rgba(136, 136, 136, 1));
    }
    .rente-number {
      @include sc(15px, #4879e6);
    }
    .rente-pu {
      @include sc(15px, rgb(66, 66, 66));
    }
  }
  .joinfloor {
    @include borderStyle(rgba(72, 121, 230, 0.5));
    height: 1.3rem;
    border-radius: 0.75rem;
    @include sc(14px, rgba(72, 121, 230, 1));
    padding: 0.22rem 0.96rem;
  }
}
</style>


