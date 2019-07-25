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
      <component :is="dispaly" @closeForecast="closeForecast" />
    </div>

    <div class="select-mode">
      <div class="text">시간대별</div>
      <div class="mode-wrapper">
        <div :class="modeClass('Temperature')" @click="changeMode('Temperature')">온도</div>
        <div :class="modeClass('RainProb')" @click="changeMode('RainProb')">강수</div>
        <div :class="modeClass('Humidity')" @click="changeMode('Humidity')">습도</div>
      </div>
    </div>
    <div class="location">현재 위치</div>
  </div>
</template>

<script>
import Weather from '../components/Weather.vue';
import RainProb from '../components/RainProb.vue';
import Temperature from '../components/Temperature.vue';
import Humidity from '../components/Humidity.vue';

export default {
  components: {
    Weather,
    RainProb,
    Temperature,
    Humidity,
  },

  data() {
    return {
      dispaly: 'Weather',
      date: 'today',
    };
  },

  methods: {
    changeMode(mode) {
      this.dispaly = mode;
    },
    closeForecast() {
      this.dispaly = 'Weather';
    },
    modeClass(mode) {
      if (mode === this.dispaly) {
        return 'mode select';
      } else {
        return 'mode';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 400px;
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
      color: darkgray;
      font-size: 16px;
      line-height: 30px;
      text-align: center;
      box-sizing: border-box;
    }

    .selected {
      color: #0074d9;
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
  padding: 0 10px;
  line-height: 30px;
  border-top: 1px solid #f1f1f1;

  .text {
    float: left;
  }

  .mode-wrapper {
    display: flex;
    float: right;

    .mode {
      margin-left: 10px;
      color: darkgray;
      cursor: pointer;
    }

    .select {
      color: black;
      font-weight: blod;
    }
  }
}
.location {
  height: 30px;
  padding: 0 10px;
  line-height: 30px;
  border-top: 1px solid #f1f1f1;
}
</style>
