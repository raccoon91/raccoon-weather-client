<template>
  <div class="container">
    <div class="date-container">
      <div class="date-wrapper">
        <div class="date tody selected">오늘</div>
      </div>
      <div class="date-wrapper">
        <div class="date tomorrow">내일</div>
      </div>
    </div>

    <div class="main-contents">
      <component :is="dispaly" />
    </div>

    <div class="select-mode">
      <div class="text">시간대별</div>
      <div class="mode-wrapper">
        <div class="mode" @click="changeMode">강수</div>
      </div>
    </div>
    <div class="location">현재 위치</div>
  </div>
</template>

<script>
import Weather from '../components/Weather.vue';

export default {
  components: {
    Weather,
  },

  data() {
    return {
      dispaly: 'Weather',
      date: 'today',
    };
  },

  methods: {
    changeMode() {
      this.dispaly = 'RainProb';
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 400px;
  border-top: 1px solid #f1f1f1;
  border-bottom: 1px solid #f1f1f1;
  font-family: 'Sunflower', sans-serif;
}
.date-container {
  display: flex;
  height: 30px;
  border-bottom: 1px solid #f1f1f1;

  .date-wrapper {
    width: 200px;
    height: 30px;

    .date {
      width: 50px;
      height: 30px;
      margin: 0 auto;
      color: #f1f1f1;
      font-size: 16px;
      line-height: 30px;
      text-align: center;
      box-sizing: border-box;
    }

    .selected {
      color: blue;
      font-weight: bold;
      border-bottom: 2px solid #0074d9;
    }
  }
}
.main-contents {
  height: 130px;
}
.select-mode {
  height: 30px;
  line-height: 30px;
  border-top: 1px solid #f1f1f1;

  .text {
    float: left;
  }

  .mode-wrapper {
    float: right;
  }
}
.location {
  height: 30px;
  line-height: 30px;
  border-top: 1px solid #f1f1f1;
}
</style>
