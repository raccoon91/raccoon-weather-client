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
      <!-- <component :is="dispaly" @closeForecast="closeForecast" /> -->
      <weather v-if="dispaly==='weather'" :city="location.city" />
      <forecast v-else @closeForecast="closeForecast" :mode="dispaly" />
    </div>

    <div class="select-mode">
      <div class="text">시간대별</div>
      <div class="mode-wrapper">
        <div :class="modeClass('temp')" @click="changeMode('temp')">온도</div>
        <div :class="modeClass('rainProb')" @click="changeMode('rainProb')">강수</div>
        <div :class="modeClass('humidity')" @click="changeMode('humidity')">습도</div>
      </div>
    </div>
    <div class="location-container">
      <div class="text">현재 위치</div>
      <div class="location-wrapper">
        <div class="location">{{location.r1}}</div>
        <div class="location">{{location.r2}}</div>
        <div class="location">{{location.r3}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Weather from '../components/Weather.vue';
import Forecast from '../components/Forecast.vue';

export default {
  components: {
    Weather,
    Forecast,
  },

  data() {
    return {
      dispaly: 'weather',
      date: 'today',
    };
  },

  computed: {
    location() {
      return this.$store.getters.location || {};
    },
  },

  methods: {
    changeMode(mode) {
      this.dispaly = mode;
    },
    closeForecast() {
      this.dispaly = 'weather';
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
.location-container {
  height: 30px;
  padding: 0 10px;
  line-height: 30px;
  border-top: 1px solid #f1f1f1;

  .text {
    float: left;
  }

  .location-wrapper {
    float: right;
    display: flex;

    .location {
      margin-left: 7px;
    }
  }
}
</style>
