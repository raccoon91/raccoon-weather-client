import { Title1 } from "components/atoms";
import { colorOptions, titleSizeOptions } from "../configs";

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

const Template = (args) => {
  return <Title1 {...args}>타이틀</Title1>;
};

export const Default = Template.bind({});
Default.args = {
  color: "black",
  size: "xl",
  weight: "bold",
};
