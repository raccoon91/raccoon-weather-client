import { Button } from "components/atoms";
import { variantOptions, textSizeOptions } from "stories/configs";
import type { Story } from "stories/storybook";

export default {
  title: "Atoms/Button",
  component: Button,
  argTypes: {
    variant: {
      options: variantOptions,
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
  variant: TVariant;
  size: TTextSize;
  weight: string;
}

const Template: Story<TemplateProps> = (args) => {
  return <Button {...args}>클릭</Button>;
};

export const Default = Template.bind({});
Default.args = {
  variant: "primary",
  size: "lg",
  weight: "normal",
};
