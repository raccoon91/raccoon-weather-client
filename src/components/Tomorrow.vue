<template>
  <div class="tomorrow-container">
    <apexcharts type="line" height="180" :options="chartOptions" :series="series" />
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
  name: 'Tomorrow',

  mixins: [icon],

  components: {
    Apexcharts,
  },

  computed: {
    conditionList() {
      const tomorrow = this.$store.getters.tomorrow || {};

      return tomorrow.condition;
    },
    series() {
      const tomorrow = this.$store.getters.tomorrow || {};

      return [
        {
          name: '강수확률',
          data: tomorrow.rainProbData,
        },
        {
          name: '온도',
          data: tomorrow.tempData,
        },
        {
          name: '습도',
          data: tomorrow.humidityData,
        },
      ];
    },
    chartOptions() {
      const tomorrow = this.$store.getters.tomorrow || {};

      return {
        chart: {
          animations: {
            // enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        tooltip: {
          x: {
            show: true,
            formatter: (value, { dataPointIndex }) => {
              return `내일 ${tomorrow.categories[dataPointIndex]}시`;
            },
          },
          y: {
            formatter: (value, { series, seriesIndex, dataPointIndex, w }) => {
              const name = w.config.series[seriesIndex].name;

              if (name === '온도') {
                return `${value}℃`;
              } else {
                return `${value}%`;
              }
            },
          },
        },
        colors: ['#2E93fA', '#66DA26', '#546E7A'],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 2,
        },
        grid: {
          show: false,
        },
        markers: {
          colors: ['#2E93fA', '#66DA26', '#546E7A'],
          size: 4,
        },
        xaxis: {
          categories: tomorrow.categories,
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
          show: false,
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
        },
      };
    },
  },

  created() {
    this.$store.dispatch('setTomorrow');
  },
};
</script>

<style lang="scss" scoped>
.tomorrow-container {
  position: relative;
  height: 220px;
}
.icon-wrapper {
  position: absolute;
  bottom: 0;
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
