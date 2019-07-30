<template>
  <div class="loading-container">
    <div class="loading-wrapper">
      <div class="loading-circle" />
      <img src="/assets/icon/loading.png" class="loading-icon" />
    </div>
  </div>
</template>

<script>
export default { name: 'Loading' };
</script>

<style lang="scss" scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 150px;
}
.loading-wrapper {
  position: relative;
  width: 100px;
  height: 100px;
}
.loading-circle {
  position: absolute;
  width: 100px;
  height: 100px;
  border-top: 3px solid #0074d9;
  border-right: 3px solid white;
  border-bottom: 3px solid #0074d9;
  border-left: 3px solid white;
  border-radius: 50px;
  box-sizing: border-box;
  opacity: 0.7;
  animation: circle 1.5s linear infinite;
}
.loading-icon {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 60px;
  height: 60px;
  opacity: 0.7;
  animation: blink 1.5s linear infinite;
}

@keyframes blink {
  0% {
    opacity: 0.9;
  }
  40% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0.9;
  }
}

@keyframes circle {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
