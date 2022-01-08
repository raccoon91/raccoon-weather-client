import { ComponentStory, ComponentMeta } from "@storybook/react";
import { WeatherCard } from "components/molecules";

export default {
  title: "Moleules/Weather Card",
  component: WeatherCard,
  argTypes: {
    title: { control: "text" },
    value: { control: "number" },
    unit: { control: "text" },
  },
} as ComponentMeta<typeof WeatherCard>;

const Template: ComponentStory<typeof WeatherCard> = (args) => <WeatherCard {...args} />;

export const Loaded = Template.bind({});
Loaded.args = {
  isLoad: true,
  title: "타이틀",
  value: 10,
  unit: "%",
  chart: null,
  w: "40rem",
  h: "20rem",
};

export const Skeleton = Template.bind({});
Skeleton.args = {
  isLoad: false,
  title: "타이틀",
  value: 10,
  unit: "%",
  chart: null,
  w: "40rem",
  h: "20rem",
};
