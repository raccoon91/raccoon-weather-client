import { WeatherCard } from "components/molecules";

export default {
  title: "Molecules/Weather Card",
  component: WeatherCard,
  argTypes: {
    title: { control: "text" },
    value: { control: "number" },
    unit: { control: "text" },
    isLoad: { table: { disable: true } },
    chart: { table: { disable: true } },
    w: { table: { disable: true } },
    h: { table: { disable: true } },
    p: { table: { disable: true } },
    m: { table: { disable: true } },
  },
};

const Template = (args) => <WeatherCard {...args} />;

export const Card = Template.bind({});
Card.args = {
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
