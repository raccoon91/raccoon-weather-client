<template>
  <div>
    <div class="weather-container">
      <img :src="iconPath([weather.sky, weather.pty])" />
      <div class="contents">
        <div class="content-wrapper bold">
          <div class="city">{{city}}</div>
          <div class="temp">
            {{weather.temp}}
            <span class="bold-mark">℃</span>
          </div>
        </div>
        <div class="content-wrapper">
          <div class="content-title">어제</div>
          <div class="content">
            {{weather.yesterday_temp}}
            <span class="mark">℃</span>
          </div>
        </div>
        <div class="content-container">
          <div class="content-wrapper margin-right">
            <div class="content-title">강수확률</div>
            <div class="content">
              {{weather.pop}}
              <span class="mark">%</span>
            </div>
          </div>
          <div class="content-wrapper">
            <div class="content-title">습도</div>
            <div class="content">
              {{weather.humidity}}
              <span class="mark">%</span>
            </div>
          </div>
        </div>
        <div class="content-wrapper">
          <div class="content-title">미세먼지</div>
          <airpollution type="pm10" :value="Number(weather.pm10)" />
        </div>
        <div class="content-wrapper">
          <div class="content-title">초미세먼지</div>
          <airpollution type="pm25" :value="Number(weather.pm25)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import icon from './weatherIcon.js';
import Airpollution from './Airpollution.vue';

export default {
  name: 'Weather',

  mixins: [icon],

  components: {
    Airpollution,
  },

  props: {
    city: {
      type: String,
      required: true,
    },
  },

  computed: {
    weather() {
      return this.$store.getters.weather;
    },
  },

  created() {
    this.$store.dispatch('setWeather');
  },
};
</script>

<style lang="scss" scoped>
.weather-container {
  display: flex;
  height: 130px;

  img {
    width: 130px;
    height: 130px;
  }

  .contents {
    padding: 10px 30px;
    font-size: 14px;

    .content-container {
      display: flex;
    }

    .content-wrapper {
      display: flex;
      align-items: center;
    }

    .margin-right {
      margin-right: 10px;
    }

    .content-title {
      margin-right: 7px;
    }

    .bold {
      margin-bottom: 5px;
      font-size: 22px;
      font-weight: bold;
    }

    .city {
      margin-right: 10px;
    }

    .bold-mark {
      font-size: 18px;
    }

    .mark {
      font-size: 12px;
    }
  }

  .airpollution-container {
    display: flex;
    align-items: center;
  }
}
</style>
