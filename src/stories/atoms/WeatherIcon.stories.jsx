import { WeatherIcon } from "components/atoms";
import { weatherOptions } from "../configs";

export default {
  title: "Atoms/Weather Icon",
  component: WeatherIcon,
  argTypes: {
    type: {
      options: Object.keys(weatherOptions),
      control: { type: "radio" },
    },
    size: { control: "number" },
    sky: { table: { disable: true } },
    rainType: { table: { disable: true } },
    date: { table: { disable: true } },
  },
};

const Template = ({ type }) => {
  const args = weatherOptions[type];

  return <WeatherIcon {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  size: 10,
  type: "Day",
};
