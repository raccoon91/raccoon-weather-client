import { Box, GradientLineChart } from "components/atoms";
import { labelsMockData, gradientLineChartMockData } from "stories/configs";
import type { Story } from "stories/storybook";

export default {
  title: "Atoms/Gradient Line Chart",
  component: GradientLineChart,
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
      <GradientLineChart {...args} />
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  labels: labelsMockData,
  datasets: gradientLineChartMockData,
};
