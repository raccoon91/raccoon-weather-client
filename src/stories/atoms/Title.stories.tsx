import { Title1 } from "components/atoms";
import { colorOptions, titleSizeOptions } from "stories/configs";
import type { Story } from "stories/storybook";

export default {
  title: "Atoms/Title",
  component: Title1,
  argTypes: {
    color: {
      options: colorOptions,
      control: { type: "select" },
    },
    size: {
      options: titleSizeOptions,
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
  size: TTitleSize;
  weight: string;
}

const Template: Story<TemplateProps> = (args) => {
  return <Title1 {...args}>타이틀</Title1>;
};

export const Default = Template.bind({});
Default.args = {
  color: "black",
  size: "xl",
  weight: "bold",
};
