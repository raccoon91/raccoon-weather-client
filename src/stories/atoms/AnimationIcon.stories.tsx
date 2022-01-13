import { AnimationIcon } from "components/atoms";
import { weatherOptions } from "stories/configs";
import type { Story } from "stories/storybook";

export default {
  title: "Atoms/Animation Icon",
  component: AnimationIcon,
  argTypes: {
    type: {
      options: Object.keys(weatherOptions),
      control: { type: "radio" },
    },
    size: { control: "number" },
    isLoad: { table: { disable: true } },
    imageSize: { table: { disable: true } },
    sky: { table: { disable: true } },
    rainType: { table: { disable: true } },
    date: { table: { disable: true } },
  },
};

interface TemplateProps {
  isLoad: boolean;
  type: string;
  size: number;
}

const Template: Story<TemplateProps> = (args) => {
  const props = weatherOptions[args.type];

  return <AnimationIcon isLoad={args.isLoad} size={args.size} {...props} />;
};

export const Default = Template.bind({});
Default.args = {
  isLoad: true,
  size: 10,
  type: "Day",
};
