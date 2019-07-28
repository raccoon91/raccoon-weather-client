<template>
  <div class="today-container">
    <weather v-if="display==='weather'" :city="location.city" />
    <forecast v-else @closeForecast="closeForecast" :mode="display" />

    <div class="select-mode">
      <div class="text">시간대별</div>
      <div class="mode-wrapper">
        <div :class="modeClass('temp')" @click="changeMode('temp')">온도</div>
        <div :class="modeClass('rainProb')" @click="changeMode('rainProb')">강수</div>
        <div :class="modeClass('humidity')" @click="changeMode('humidity')">습도</div>
      </div>
    </div>
  </div>
</template>

<script>
import Weather from '../components/Weather.vue';
import Forecast from '../components/Forecast.vue';

export default {
  name: 'Today',

  components: {
    Weather,
    Forecast,
  },

  data() {
    return {
      display: 'weather',
      date: 'today',
    };
  },

  computed: {
    location() {
      return this.$store.getters.location || {};
    },
  },

  methods: {
    closeForecast() {
      this.display = 'weather';
    },
    changeMode(mode) {
      this.display = mode;
    },
    modeClass(mode) {
      if (mode === this.display) {
        return 'mode select';
      } else {
        return 'mode';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.today-container {
  height: 160px;
}

.select-mode {
  display: flex;
  justify-content: space-between;
  height: 30px;
  padding: 0 10px;
  line-height: 30px;
  border-top: 1px solid #f1f1f1;

  .mode-wrapper {
    display: flex;

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
</style>
