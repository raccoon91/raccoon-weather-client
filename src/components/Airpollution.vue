<template>
  <div :class="['airpollution-container', color(text)]">
    <div class="value">{{value}}</div>
    <div class="mark">㎍/㎥</div>
    <div class="text">{{text}}</div>
  </div>
</template>

<script>
export default {
  name: 'Airpollution',

  props: {
    type: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      text: '좋음',
    };
  },

  methods: {
    airpollutionGrade(value) {
      if (this.type === 'pm10') {
        switch (true) {
          case value <= 30:
            this.text = '좋음';
            break;
          case value <= 80:
            this.text = '보통';
            break;
          case value <= 100:
            this.text = '나쁨';
            break;
          default:
            this.text = '매우나쁨';
            break;
        }
      } else {
        switch (true) {
          case value <= 15:
            this.text = '좋음';
            break;
          case value <= 35:
            this.text = '보통';
            break;
          case value <= 75:
            this.text = '나쁨';
            break;
          default:
            this.text = '매우나쁨';
            break;
        }
      }
    },
    color(text) {
      switch (text) {
        case '좋음':
          return 'good';
        case '보통':
          return 'normal';
        case '나쁨':
          return 'bad';
        default:
          return 'very-bad';
      }
    },
  },

  created() {
    this.airpollutionGrade(this.value);
  },
};
</script>

<style lang="scss" scoped>
.airpollution-container {
  display: flex;
  align-items: center;
}

.good {
  color: #0074d9;
}

.normal {
  color: #2ecc40;
}

.bad {
  color: #ff851b;
}

.very-bad {
  color: #ff4136;
}

.mark {
  margin-left: 3px;
  margin-right: 10px;
  font-size: 12px;
}
</style>
