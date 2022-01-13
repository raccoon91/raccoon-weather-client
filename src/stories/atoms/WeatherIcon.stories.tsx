import { WeatherIcon } from "components/atoms";
import { weatherOptions } from "stories/configs";
import type { Story } from "stories/storybook";

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

interface TemplateProps {
  type: string;
  size: number;
}

const Template: Story<TemplateProps> = (args) => {
  const props = weatherOptions[args.type];

  return <WeatherIcon {...props} size={args.size} />;
};

export const Default = Template.bind({});
Default.args = {
  size: 10,
  type: "Day",
};
