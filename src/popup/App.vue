<template>
  <div class="container">
    <div class="date-container">
      <div class="date-wrapper">
        <div :class="dateClass('today')" @click="changeDate('today')">오늘</div>
      </div>
      <div class="date-wrapper">
        <div :class="dateClass('tomorrow')" @click="changeDate('tomorrow')">내일</div>
      </div>
    </div>

    <div :class="['main-contents', mainClass()]">
      <today v-if="date === 'today'" />
      <tomorrow v-else />
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
import Today from '../components/Today.vue';
import Tomorrow from '../components/Tomorrow.vue';

export default {
  components: {
    Today,
    Tomorrow,
  },

  data() {
    return {
      date: 'today',
    };
  },

  computed: {
    location() {
      return this.$store.getters.location || {};
    },
  },

  methods: {
    changeDate(date) {
      this.date = date;
    },
    dateClass(date) {
      if (date === this.date) {
        return 'date selected';
      } else {
        return 'date';
      }
    },
    mainClass() {
      if (this.date === 'tomorrow') {
        return 'tomorrow';
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
      cursor: pointer;
    }

    .selected {
      color: #0074d9;
      font-weight: bold;
      border-bottom: 2px solid #0074d9;
    }
  }
}
.main-contents {
  height: 160px;
  transition: height 0.3s ease-out;
}
.tomorrow {
  height: 220px;
}
.location-container {
  display: flex;
  justify-content: space-between;
  height: 30px;
  padding: 0 10px;
  line-height: 30px;
  border-top: 1px solid #f1f1f1;

  .location-wrapper {
    display: flex;

    .location {
      margin-left: 7px;
    }
  }
}
</style>
