import { AnimationIcon } from "components/atoms";
import { weatherOptions } from "../configs";

export default {
  title: "Atoms/Animation Icon",
  component: AnimationIcon,
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

  return <AnimationIcon {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  size: 10,
  type: "Day",
};
