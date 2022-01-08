import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ClimateCard } from "components/molecules";

export default {
  title: "Moleules/Climate Card",
  component: ClimateCard,
  argTypes: {
    title: { control: "text" },
  },
} as ComponentMeta<typeof ClimateCard>;

const Template: ComponentStory<typeof ClimateCard> = (args) => <ClimateCard {...args} />;

export const Loaded = Template.bind({});
Loaded.args = {
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
