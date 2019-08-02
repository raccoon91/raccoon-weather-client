export default {
  methods: {
    iconPath(condition, hour) {
      const [sky, pty] = condition;
      const date = this.dateCheck(hour);

      if (pty === 0) {
        switch (sky) {
          case 1:
            return `/assets/images/sun-${date}.png`;
          case 2:
            return `/assets/images/cloud-${date}.png`;
          case 3:
            return `/assets/images/cloud-${date}.png`;
          default:
            return '/assets/images/cloud.png';
        }
      } else if (pty === 1 || pty === 2) {
        return '/assets/images/rain.png';
      } else if (pty === 3) {
        return '/assets/images/snow.png';
      } else if (pty === 4) {
        return `/assets/images/shower-${date}.png`;
      }

      return `/assets/images/sun-${date}.png`;
    },
    dateCheck(hour) {
      if (Number(hour) >= 6 && Number(hour) <= 18) {
        return 'morning';
      }
      return 'night';
    },
  },
};
