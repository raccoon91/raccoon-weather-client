import { UnitText } from "components/molecules";
import { colorOptions, titleSizeOptions, textSizeOptions } from "../configs";

export default {
  title: "Molecules/Unit Text",
  component: UnitText,
  argTypes: {
    unit: { control: "text" },
    value: { control: "number" },
    vSize: {
      options: titleSizeOptions,
      control: { type: "select" },
    },
    uSize: {
      options: textSizeOptions,
      control: { type: "select" },
    },
    color: {
      options: colorOptions,
      control: { type: "select" },
    },
    w: { table: { disable: true } },
    h: { table: { disable: true } },
    m: { table: { disable: true } },
  },
};

const Template = (args) => <UnitText {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: 10,
  unit: "%",
  vSize: "2xl",
  uSize: "xl",
  color: "black",
};
