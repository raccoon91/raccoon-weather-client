<template>
  <div class="rain-container">
    <img src="/assets/icon/close.png" class="close" @click="clickCloseButton" />
    <apexcharts type="line" height="100" :options="options" :series="series" />
    <div class="icon-wrapper">
      <div v-for="(condition, index) in conditionList" :key="index">
        <img :src="iconPath(condition)" class="icon" />
      </div>
    </div>
  </div>
</template>

<script>
import Apexcharts from 'vue-apexcharts';
import icon from './weatherIcon.js';

export default {
  name: 'Forecast',

  mixins: [icon],

  components: {
    Apexcharts,
  },

  props: {
    mode: {
      type: String,
      required: true,
    },
  },

  computed: {
    conditionList() {
      return this.$store.getters.condition;
    },
    series() {
      return [
        {
          data: this.$store.getters[this.mode],
        },
      ];
    },
    options() {
      return {
        chart: {
          height: 100,
          animations: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        tooltip: {
          enabled: false,
        },
        colors: ['gray'],
        dataLabels: {
          enabled: true,
          formatter: val => {
            if (this.mode === 'temp') {
              return `${Math.floor(val)}℃`;
            } else {
              return `${Math.floor(val)}%`;
            }
          },
          style: {
            fontSize: '12px',
            fontFamily: 'Sunflower, sans-serif',
            colors: ['black'],
          },
        },
        stroke: {
          curve: 'smooth',
          width: 2,
        },
        markers: {
          colors: '#0074d9',
          size: 4,
        },
        xaxis: {
          categories: this.$store.getters.categories,
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: true,
            offsetY: 5,
          },
        },
        yaxis: {
          axisBorder: {
            show: false,
          },
        },
        grid: {
          show: false,
        },
        legend: {
          show: true,
          position: 'top',
        },
      };
    },
  },

  methods: {
    clickCloseButton() {
      this.$emit('closeForecast');
    },
  },

  created() {
    this.$store.dispatch('setForecast');
  },
};
</script>

<style lang="scss" scoped>
.rain-container {
  position: relative;
  height: 130px;
}
.close {
  position: absolute;
  top: 3px;
  right: 3px;
  width: 10px;
  height: 10px;
  cursor: pointer;
  z-index: 10;
}
.icon-wrapper {
  position: absolute;
  bottom: -3px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 40px;
}
.icon {
  width: 40px;
  height: 40px;
}
</style>
