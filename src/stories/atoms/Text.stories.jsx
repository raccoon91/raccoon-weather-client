import { Text } from "components/atoms";
import { colorOptions, textSizeOptions } from "../configs";

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

const Template = (args) => {
  return <Text {...args}>텍스트</Text>;
};

export const Default = Template.bind({});
Default.args = {
  color: "black",
  size: "sm",
  weight: "normal",
};
