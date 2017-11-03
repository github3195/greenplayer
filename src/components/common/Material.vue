<!-- Material.vue 资料，球员球队赛事教练协会 -->
<style lang="less" scoped>
  .material {
    font-size: .28rem;
    color: #282828;
    width: 100%;
    .item {
      position: relative;
      padding: .2rem;
      min-height: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        white-space: nowrap;
        margin-right: .2rem;
      }
    }
    .uniform-content {
      display: flex;
      .uniforms {
        display: flex;
        align-items: center;
      }
      .color-container {
        border: 1px solid #a0a0a0;
      }
      .uniform-color {
        display: block;
        width: .6rem;
        height: .18rem;
        border-bottom: 1px solid #a0a0a0;
        &:last-child {
          border-bottom: 0;
        }
      }
      .uniform-cover {
        width: .8rem;
        height: .8rem;
        line-height: .8rem;
        font-size: .2rem;
        font-weight: 100;
        text-align: center;
        color: #a0a0a0;
        background: url(//share.greenplayer.cn/share/img/icon/uniform-trans.png);
        background-size: 100% 100%;
      }
    }
    .sponsor {
      padding: 0 .2rem;
      .title {
        line-height: .8rem;
      }
      .sponsor-item {
        float: left;
        width: 25%;
        text-align: center;
        .portrait {
          margin: 0 auto;
          width: 1rem;
          height: 1rem;
        }
        .name {
          margin: .2rem 0;
          line-height: .3rem;
          font-size: .2rem;
        }
      }
    }
    .personnel {
      padding: 0 .2rem;
      .title {
        line-height: .8rem;
      }
    }
    .phone-detail {
      display: flex;
      align-items: center;
      .phone-number {
        border-right: 1px solid #a0a0a0;
        padding: .1rem .2rem;
        margin-right: .2rem;
      }
      .phone-call {
        display: block;
        box-sizing: border-box;
        width: .5rem;
        height: .5rem;
        background-image: url(//share.greenplayer.cn/share/img/icon/phone.png);
        background-size: 100% 100%;
      }
    }
    .address {
      .map-container {
        width: 100%;
        height: 4.5rem;
        padding: 0 .2rem .2rem;
      }
      .map {
        width: 100%;
        height: 100%;
      }
    }
    .court-service {
      .court-service-list {
        padding: 0 .8rem .2rem;
        font-size: .24rem;
        color: #646464;
      }
      .court-service-item {
        display: flex;
        justify-content: space-between;
        height: .5rem;
      }
    }
    .intro {
      padding: 0 .2rem;
      .title {
        line-height: .6rem;
      }
      .content {
        padding-bottom: .2rem;
        padding-left: .4rem;
        line-height: .36rem;
        word-break: break-all;
        white-space: pre-line;
      }
    }
  }
</style>

<template>
  <div class="material">
    <div class="item border-bottom founding-time" v-if="material.foundingTime">
      <div class="title">成立时间：</div>
      <div class="content">{{material.foundingTime}}</div>
    </div>
    <div class="item border-bottom age" v-if="material.age">
      <div class="title">年龄：</div>
      <div class="content">{{material.age}}</div>
    </div>
    <div class="item border-bottom height" v-if="material.height">
      <div class="title">身高：</div>
      <div class="content">{{material.height}}</div>
    </div>
    <div class="item border-bottom weight" v-if="material.weight">
      <div class="title">体重：</div>
      <div class="content">{{material.weight}}</div>
    </div>
    <div class="item border-bottom area" v-if="material.area">
      <div class="title">地区：</div>
      <div class="content">{{material.area}}</div>
    </div>
    <div class="item border-bottom area" v-if="material.position">
      <div class="title">擅长位置：</div>
      <div class="content">{{material.position}}</div>
    </div>
    <div class="item border-bottom court" v-if="material.court">
      <div class="title">主场：</div>
      <div class="content">{{material.court}}</div>
    </div>
    <div class="item border-bottom uniform" v-if="material.uniform">
      <div class="title">球衣：</div>
      <div class="content uniform-content">
        <div class="uniforms home" style="margin-right:.2rem;">
          <span>主：</span>
          <div class="color-container"
               v-if="material.uniform.homeUniform.coat && material.uniform.homeUniform.pant && material.uniform.homeUniform.sock">
            <i class="uniform-color" :style="{background: material.uniform.homeUniform.coat}"></i>
            <i class="uniform-color" :style="{background: material.uniform.homeUniform.pant}"></i>
            <i class="uniform-color" :style="{background: material.uniform.homeUniform.sock}"></i>
          </div>
          <div class="uniform-cover" v-else><b>未设</b></div>
        </div>
        <div class="uniforms away">
          <span>客：</span>
          <div class="color-container"
               v-if="material.uniform.awayUniform.coat && material.uniform.awayUniform.pant && material.uniform.awayUniform.sock">
            <i class="uniform-color" :style="{background: material.uniform.awayUniform.coat}"></i>
            <i class="uniform-color" :style="{background: material.uniform.awayUniform.pant}"></i>
            <i class="uniform-color" :style="{background: material.uniform.awayUniform.sock}"></i>
          </div>
          <div class="uniform-cover" v-else><b>未设</b></div>
        </div>
      </div>
    </div>
    <div class="item border-bottom combat" v-if="material.combat">
      <div class="title">战斗力：</div>
      <div class="content">{{material.combat}}</div>
    </div>
    <div class="item border-bottom game-date" v-if="material.gameDate">
      <div class="title">赛事时间：</div>
      <div class="content">{{material.gameDate}}</div>
    </div>
    <div class="item border-bottom host-city" v-if="material.hostCity">
      <div class="title">举办城市：</div>
      <div class="content">{{material.hostCity}}</div>
    </div>
    <div class="item border-bottom field" v-if="material.field">
      <div class="title">举办场地：</div>
      <div class="content">{{material.field}}</div>
    </div>
    <div class="item border-bottom contcat" v-if="material.contact" @click="goPlayerHome(material.contactId)">
      <div class="title">联系人：</div>
      <div class="content" style="color:#32b847;">{{material.contact}}</div>
    </div>
    <div class="item border-bottom deadline" v-if="material.deadline">
      <div class="title">报名截止时间：</div>
      <div class="content">{{material.deadline}}</div>
    </div>
    <div class="item border-bottom company" v-if="material.company">
      <div class="title">主办/协办单位：</div>
      <div class="content">{{material.company}}</div>
    </div>
    <div class="sponsor border-bottom" v-if="material.sponsor">
      <div class="title">赞助商：</div>
      <ul class="sponsor-list _clearfix">
        <li class="sponsor-item" v-for="item in material.sponsor">
          <div class="portrait">
            <img class="_fullimg" :src="item.portrait" alt="">
          </div>
          <div class="name _ellipsis">{{item.sponsorName}}</div>
        </li>
      </ul>
    </div>
    <div class="personnel border-bottom" v-if="material.personnel">
      <div class="title">工作人员：</div>
      <div class="personnel-list"></div>
    </div>
    <div class="item border-bottom telephone" v-if="material.telephone">
      <div class="title">电话：</div>
      <div class="content phone-detail">
        <div class="phone-number">{{material.telephone}}</div>
        <a :href="'tel:' + material.telephone" class="phone-call"></a>
      </div>
    </div>
    <div class="address border-bottom" v-if="material.address">
      <div class="item">
        <div class="title">地址：</div>
        <div class="content">{{material.address}}</div>
      </div>
      <div class="map-container" v-if="material.mapConfig.latitude && material.mapConfig.longitude">
        <div class="map">
          <a-map :mapConfig="material.mapConfig"></a-map>
        </div>
      </div>
    </div>
    <div class="border-bottom court-service" v-if="material.courtService">
      <div class="item">
        <div class="title">球场服务：</div>
      </div>
      <div class="court-service-list">
        <div class="court-service-item" v-for="item in material.courtService">
          <div>{{item.serviceName}}</div>
          <div>￥{{item.cost}}</div>
        </div>
      </div>
    </div>
    <div class="item border-bottom" v-if="material.scale">
      <div class="title">支持赛制：</div>
      <div class="content">{{material.scale}}</div>
    </div>
    <div class="item border-bottom" v-if="material.courtSize">
      <div class="title">球场大小：</div>
      <div class="content">{{material.courtSize}}</div>
    </div>
    <div class="item border-bottom" v-if="material.sodType">
      <div class="title">草皮类型：</div>
      <div class="content">{{material.sodType}}</div>
    </div>
    <div class="intro">
      <div class="title">简介：</div>
      <div class="content">{{material.intro}}</div>
    </div>
  </div>
</template>

<script>
  import AMap from '../tools/Map'

  export default {
    data () {
      return {
      }
    },
    props: {
      material: ''
    },
    computed: {},
    mounted () {},
    methods: {
      goPlayerHome (id) {
        let sendData = {
          type: 'goThirdParty',
          targetType: 1,
          targetId: id
        }
        if (this.$sendDataToClient(sendData)) {
          return
        }
        this.$router.push({
          path: 'thirdpartyhome',
          query: {
            pageType: 1,
            playerId: id
          }
        })
      }
    },
    components: { AMap }
  }
</script>
