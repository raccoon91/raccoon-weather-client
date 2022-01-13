import { Grid } from "components/atoms";
import { ClimateCard } from "components/molecules";
import type { Story } from "stories/storybook";

export default {
  title: "Molecules/Climate Card",
  component: ClimateCard,
  argTypes: {
    title: { control: "text" },
    area: { table: { disable: true } },
    isLoad: { table: { disable: true } },
    chart: { table: { disable: true } },
    desktopOnly: { table: { disable: true } },
    w: { table: { disable: true } },
    h: { table: { disable: true } },
  },
};

interface TemplateProps {
  isLoad: boolean;
  title: string;
  chart: null;
  w: string;
  h: string;
}

const Template: Story<TemplateProps> = (args) => (
  <Grid w="40rem" h="20rem">
    <ClimateCard {...args} />
  </Grid>
);

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
