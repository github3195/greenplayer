<!-- DetailsItem.vue 可编辑项列表 -->
<style lang="less" scoped>
  .details {
    font-size: .28rem;
    color: #282828;
    .details-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: .2rem;
      line-height: .6rem;
    }
    .details-item-ud {
      padding: .2rem;
      line-height: .6rem;
    }
    .title {
      white-space: nowrap;
      margin-right: .2rem;
    }
    .content-input {
      width: 1.2rem;
      margin-right: .1rem;
      border-width: 1px;
      border: 1px solid #c4c4c4;
      text-align: center;
      &:focus {
        border: 1px solid #c4c4c4;
      }
    }
    .text-desc {
      padding-left: .4rem;
      color: #646464;
    }
    .text-desc-input {
      margin-left: 10%;
      width: 80%;
      height: 1.2rem;
      color: #646464;
    }
    .more-icon {
      position: relative;
      padding-right: .3rem;
      &::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        width: .2rem;
        height: .2rem;
        border-top: 1px solid #a0a0a0;
        border-right: 1px solid #a0a0a0;
        transform: rotate(45deg);
      }
    }
  }
</style>

<template>
  <div class="details">
    <div class="details-item border-bottom" v-if="data.courtName">
      <div class="title">场地：</div>
      <div class="content">{{data.courtName}}</div>
    </div>
    <div class="details-item border-bottom" v-if="data.scheduleDate">
      <div class="title">时间：</div>
      <div class="content">{{data.scheduleDate}}</div>
    </div>
    <div class="details-item border-bottom" v-if="data.scaleName">
      <div class="title">赛制：</div>
      <div class="content">{{data.scaleName}}</div>
    </div>
    <div class="details-item border-bottom">
      <div class="title">召集对象：</div>
      <!-- <div class="content" :class="{'more-icon': editable}">散客</div> -->
      <select v-if="editable" v-model="data.callTargetId">
        <option value="4">散客</option>
        <option value="3">球队</option>
      </select>
      <div class="content" v-else>{{data.callTargetId==3?'球队':data.callTargetId==4?'散客':''}}</div>
    </div>
    <div class="details-item border-bottom">
      <div class="title">最低成行人数：</div>
      <div v-if="editable"><input type="number" min="0" class="content-input" v-model="data.minAllowNumber">人</div>
      <div v-else class="content">{{data.minAllowNumber}}人</div>
    </div>
    <div class="details-item-ud border-bottom">
      <div class="title">备注：</div>
      <textarea class="text-desc-input" v-if="editable" placeholder="点击输入备注信息" v-model="data.comment">{{data.comment}}</textarea>
      <div class="text-desc" v-else>{{data.comment}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    props: {
      editable: '',
      data: ''
    },
    updated () {
      if (!this.editable) {
        this.$sendDataToClient({
          type: 'getDataFromClient',
          contentType: 'courtConveneInfo'
        })
      }
    },
    methods: {
    }
  }
</script>
