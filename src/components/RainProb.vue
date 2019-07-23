<template>
  <div class="rain-container">
    <apexcharts type="line" height="130" :options="rainProb.chartOptions" :series="rainProb.series"></apexcharts>
  </div>
</template>

<script>
import Apexcharts from 'vue-apexcharts';

export default {
  name: 'RainProb',

  components: {
    Apexcharts,
  },

  computed: {
    rainProb() {
      return this.$store.getters.rainProb;
    },
  },

  created() {
    this.$store.dispatch('setRainProb');
  },
};
</script>

<style lang="scss" scoped>
.rain-container {
  height: 130px;
}
</style>
