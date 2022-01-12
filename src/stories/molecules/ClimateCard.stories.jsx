import { ClimateCard } from "components/molecules";

export default {
  title: "Molecules/Climate Card",
  component: ClimateCard,
  argTypes: {
    title: { control: "text" },
    isLoad: { table: { disable: true } },
    chart: { table: { disable: true } },
    w: { table: { disable: true } },
    h: { table: { disable: true } },
    p: { table: { disable: true } },
    m: { table: { disable: true } },
  },
};

const Template = (args) => <ClimateCard {...args} />;

export const Card = Template.bind({});
Card.args = {
  isLoad: true,
  title: "타이틀",
  chart: null,
  w: "40rem",
  h: "20rem",
};

export const Skeleton = Template.bind({});
Skeleton.args = {
  isLoad: false,
  title: "타이틀",
  chart: null,
  w: "40rem",
  h: "20rem",
};
