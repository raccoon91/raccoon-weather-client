export default {
  methods: {
    iconPath(condition) {
      const [sky, pty] = condition;

      if (pty === 0) {
        switch (sky) {
          case 1:
            return '/assets/images/sun-morning.png';
          case 2:
            return '/assets/images/cloud-morning.png';
          case 3:
            return '/assets/images/cloud-morning.png';
          case 4:
            return '/assets/images/cloud.png';
          default:
        }
      } else if (pty === 1 || pty === 2) {
        return '/assets/images/rain.png';
      } else if (pty === 3) {
        return '/assets/images/snow.png';
      }

      return null;
    },
  },
};
