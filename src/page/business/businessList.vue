<template>
  <div class="businessListPart">
    <header-top headerText="商机管理" :hasState="hasState" :hasSearch="hasSearch"></header-top>
    <section class="content">
      <section class="newBuiness">
        <div class="Btitle">新商机</div>
        <li>
          <div class="top">
            <span>月亮湾二期 1506</span>
            <span class="new">新商机</span>
          </div>
          <div class="bottom">
            <div class="client">
              <span>
                <label>意向客户：</label>
                <span class="text">张三</span>
              </span>
              <span class="phone">
                <label>联系电话:</label>
                <span class="text">13422565567</span>
              </span>
            </div>
            <div class="trace">
              <span>
                <label>跟踪次数:</label>
                <span class="text">7</span>
              </span>
              <button class="lookRecord">查看记录</button>
            </div>
            <div>
              <label>最后接触日期：</label>
              <span class="text">2018-11-23</span>
            </div>
          </div>
        </li>
      </section>
      <section class="newBuiness">
        <div class="Btitle">已报价</div>
        <li>
          <div class="top">
            <span>月亮湾二期 1506</span>
            <span class="offered">已报价</span>
          </div>
          <div class="bottom">
            <div class="client">
              <span>
                <label>意向客户：</label>
                <span class="text">张三</span>
              </span>
              <span class="phone">
                <label>联系电话:</label>
                <span class="text">13422565567</span>
              </span>
            </div>
            <div class="trace">
              <span>
                <label>跟踪次数:</label>
                <span class="text">7</span>
              </span>
              <button class="lookRecord">查看记录</button>
            </div>
            <div>
              <label>最后接触日期：</label>
              <span class="text">2018-11-23</span>
            </div>
          </div>
        </li>
      </section>
      <section class="newBuiness">
        <div class="Btitle">已签约</div>
        <li>
          <div class="top">
            <span>月亮湾二期 1506</span>
            <span class="reserve">已签约</span>
          </div>
          <div class="bottom">
            <div class="client">
              <span>
                <label>意向客户：</label>
                <span class="text">张三</span>
              </span>
              <span class="phone">
                <label>联系电话:</label>
                <span class="text">13422565567</span>
              </span>
            </div>
            <div class="trace">
              <span>
                <label>跟踪次数:</label>
                <span class="text">7</span>
              </span>
              <button class="lookRecord">查看记录</button>
            </div>
            <div>
              <label>最后接触日期：</label>
              <span class="text">2018-11-23</span>
            </div>
          </div>
        </li>
      </section>
      <section class="newBuiness">
        <div class="Btitle">已流失</div>
        <li>
          <div class="top">
            <span>月亮湾二期 1506</span>
            <span class="lost">已流失</span>
          </div>
          <div class="bottom">
            <div class="client">
              <span>
                <label>意向客户：</label>
                <span class="text">张三</span>
              </span>
              <span class="phone">
                <label>联系电话:</label>
                <span class="text">13422565567</span>
              </span>
            </div>
            <div class="trace">
              <span>
                <label>跟踪次数:</label>
                <span class="text">7</span>
              </span>
              <button class="lookRecord">查看记录</button>
            </div>
            <div>
              <label>最后接触日期：</label>
              <span class="text">2018-11-23</span>
            </div>
          </div>
        </li>
      </section>
    </section>
    <section class="addNew">
      <span>＋</span>
    </section>
    <section class="more">没有更多了</section>
  </div>
</template>


<script>
import headerTop from "@/components/headerTOP";
import { GetBizOpportunity, GetBizOpportunityDetail,GetBizopprtunityDropdown } from "@/axios/api";

export default {
  name: "businessList",
  data() {
    return {
      hasState: true,
      hasSearch: true
    };
  },
  created() {
    this.onLoad();
  },
  components: {
    headerTop
  },
  methods: {
    onLoad() {
      var data = {
        Bizopportunity: {},
        Prospectid: 1
      };
      var data1 = {
        Bizopportunity : {
          Prospectid : 0
        }
      }
      GetBizOpportunityDetail(data1).then(res => {
        console.log(res)
      })
    }
  }
};
</script>

<style scoped lang="scss">
@import "src/assets/sass/mixin";
.businessListPart {
  .content {
    padding: 200px 40px 0;
    .Btitle {
      margin-bottom: 12px;
      @include sc(28px, rgba(30, 30, 30, 1));
      font-family: $familyR;
    }
    li {
      margin-bottom: 20px;
      @include borderRadius(8px);
      box-shadow: 0 0 4px 10px 0 rgba(126, 158, 230, 0.15);
      background-color: $fc;
      .top {
        //详情头部
        @include fj(space-between);
        padding: 30px;
        border-bottom: 1px dashed rgba(72, 121, 230, 1); /*no*/
        span:first-child {
          @include sc(32px, rgba(30, 30, 30, 1));
          font-family: $familyMedium;
        }
        span:last-child {
          padding: 6px 10px;
          @include borderRadius(4px);

          @include sc(20px, rgba(255, 255, 255, 1));
          font-family: $familyR;
        }
        //新商机
        .new {
          background: linear-gradient(
            to left,
            rgba(96, 229, 139, 1),
            rgba(10, 188, 108, 1)
          );
        }
        .offered {
          background: linear-gradient(
            to left,
            rgba(40, 140, 241, 1),
            rgba(120, 202, 255, 1)
          );
        }
        .reserve {
          background: linear-gradient(
            to left,
            rgba(123, 110, 240, 1),
            rgba(202, 154, 210, 1)
          );
        }
        .lost {
          background: linear-gradient(
            to left,
            rgba(203, 220, 234, 1),
            rgba(173, 188, 198, 1)
          );
        }
      }
      .bottom {
        // 底部
        padding: 28px 30px;
        div {
          margin-bottom: 20px;
          label {
            @include sc(28px, rgba(136, 136, 136, 1));
            font-family: $familyR;
          }
          .text {
            @include sc(28px, rgba(30, 30, 30, 1));
          }
          .lookRecord {
            @include flexCenter;
            height: 50px;
            background-color: $fc;
            @include borderRadius(25px);
            @include sc(28px, rgba(72, 121, 230, 1));
            font-family: $familyR;
            border: 1px solid rgba(72, 121, 230, 1); /*no*/
            padding: 0px 26px;
          }
          .phone {
            margin-left: 86px;
          }
        }
        div:last-child {
          margin-top: 40px;
        }
        .trace {
          display: flex;
          span {
            margin-right: 26px;
          }
        }
      }
    }
  }
  .addNew {
    @include wh(120px, 120px);
    border-radius: 50%;
    background-color: #fff;
    position: fixed;
    bottom: 28px;
    right: 40px;
    box-shadow: 0 2px 14px 0 rgba(126, 158, 230, 0.15);
    @include flexCenter;
    span {
      color: rgba(72, 121, 230, 1);
      font-size: 58px;
    }
  }
  .more {
    @include flexCenter;
    margin-bottom: 26px;
    @include sc(24px, rgba(136, 136, 136, 1));
    font-family: $familyR;
  }
}
</style>


