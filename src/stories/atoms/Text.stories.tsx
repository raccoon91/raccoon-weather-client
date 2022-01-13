import { Text } from "components/atoms";
import { colorOptions, textSizeOptions } from "stories/configs";
import type { Story } from "stories/storybook";

export default {
  title: "Atoms/Text",
  component: Text,
  argTypes: {
    color: {
      options: colorOptions,
      control: { type: "select" },
    },
    size: {
      options: textSizeOptions,
      control: { type: "select" },
    },
    weight: {
      options: ["normal", "bold"],
      control: { type: "radio" },
    },
  },
};

interface TemplateProps {
  color: TColor;
  size: TTextSize;
  weight: string;
}

const Template: Story<TemplateProps> = (args) => {
  return <Text {...args}>텍스트</Text>;
};

export const Default = Template.bind({});
Default.args = {
  color: "black",
  size: "sm",
  weight: "normal",
};
