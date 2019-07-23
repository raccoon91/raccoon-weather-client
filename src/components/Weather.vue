<template>
  <div>
    <div class="weather-container">
      <img src="/assets/images/sun-morning.png" />
      <div class="contents">
        <div class="main">
          <div class="city">{{weather.city}}</div>
          <div class="temp">{{weather.temp}}℃</div>
        </div>
        <div class="yesterday">어제{{weather.yesterday_temp}}</div>
        <div class="rain-prop">강수확률 {{weather.pop}}%</div>
        <div class="airpollution-container">
          <div class="text">미세먼지</div>
          <div class="air">{{weather.pm10}}</div>
          <div class="text">초미세먼지</div>
          <div class="air">{{weather.pm25}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Weather',

  computed: {
    weather() {
      return this.$store.getters.weather;
      mainmain;
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

    .main {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      font-size: 22px;
      font-weight: bold;

      .city {
        margin-right: 10px;
      }
    }
  }

  .airpollution-container {
    display: flex;
    align-items: center;
  }
}
</style>
