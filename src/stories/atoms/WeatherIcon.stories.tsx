import { ComponentStory, ComponentMeta } from "@storybook/react";
import { WeatherIcon } from "components/atoms";

export default {
  title: "Atoms/Weather Icon",
  component: WeatherIcon,
  argTypes: {
    size: { control: "number" },
    sky: { control: "number" },
    rainType: { control: "number" },
    date: { control: "date" },
  },
} as ComponentMeta<typeof WeatherIcon>;

const Template: ComponentStory<typeof WeatherIcon> = (args) => <WeatherIcon {...args} />;

export const Day = Template.bind({});
Day.args = {
  size: 10,
  sky: 1,
  rainType: 0,
  date: "2022-01-01 08:00",
};

export const Night = Template.bind({});
Night.args = {
  size: 10,
  sky: 1,
  rainType: 0,
  date: "2022-01-01 20:00",
};

export const CloudDay = Template.bind({});
CloudDay.args = {
  size: 10,
  sky: 3,
  rainType: 0,
  date: "2022-01-01 08:00",
};

export const CloudNight = Template.bind({});
CloudNight.args = {
  size: 10,
  sky: 3,
  rainType: 0,
  date: "2022-01-01 20:00",
};

export const Cloud = Template.bind({});
Cloud.args = {
  size: 10,
  sky: 2,
  rainType: 0,
  date: "2022-01-01 08:00",
};

export const RainyDay = Template.bind({});
RainyDay.args = {
  size: 10,
  sky: 3,
  rainType: 1,
  date: "2022-01-01 08:00",
};

export const RainyNight = Template.bind({});
RainyNight.args = {
  size: 10,
  sky: 3,
  rainType: 1,
  date: "2022-01-01 20:00",
};

export const RainDrop = Template.bind({});
RainDrop.args = {
  size: 10,
  sky: 3,
  rainType: 4,
  date: "2022-01-01 20:00",
};

export const SnowyDay = Template.bind({});
SnowyDay.args = {
  size: 10,
  sky: 3,
  rainType: 2,
  date: "2022-01-01 08:00",
};

export const SnowyNight = Template.bind({});
SnowyNight.args = {
  size: 10,
  sky: 3,
  rainType: 2,
  date: "2022-01-01 20:00",
};
