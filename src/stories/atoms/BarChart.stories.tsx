import { Box, BarChart } from "components/atoms";
import { labelsMockData, barChartMockData } from "stories/configs";
import type { Story } from "stories/storybook";

export default {
  title: "Atoms/Bar Chart",
  component: BarChart,
  argTypes: {
    labels: { table: { disable: true } },
    datasets: { table: { disable: true } },
    options: { table: { disable: true } },
  },
};

interface TemplateProps {
  labels: string[];
  datasets: number[];
}

const Template: Story<TemplateProps> = (args) => {
  return (
    <Box w="60rem" h="20rem" bgc="white">
      <BarChart {...args} />
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  labels: labelsMockData,
  datasets: barChartMockData,
};
