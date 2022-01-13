import { Grid } from "components/atoms";
import { WeatherCard } from "components/molecules";
import type { Story } from "stories/storybook";

export default {
  title: "Molecules/Weather Card",
  component: WeatherCard,
  argTypes: {
    title: { control: "text" },
    value: { control: "number" },
    unit: { control: "text" },
    area: { table: { disable: true } },
    isLoad: { table: { disable: true } },
    chart: { table: { disable: true } },
    w: { table: { disable: true } },
    h: { table: { disable: true } },
  },
};

interface TemplateProps {
  isLoad: boolean;
  title: string;
  value: number;
  unit: string;
  chart: null;
  w: string;
  h: string;
}

const Template: Story<TemplateProps> = (args) => (
  <Grid w="40rem" h="20rem">
    <WeatherCard {...args} />
  </Grid>
);

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
