import { Box, ScatterPlot } from "components/atoms";
import { labelsMockData, scatterPlotMockData } from "stories/configs";
import type { Story } from "stories/storybook";

export default {
  title: "Atoms/Scatter Plot",
  component: ScatterPlot,
  argTypes: {
    labels: { table: { disable: true } },
    datasets: { table: { disable: true } },
    options: { table: { disable: true } },
  },
};

interface TemplateProps {
  labels: string[];
  datasets: number[][];
}

const Template: Story<TemplateProps> = (args) => {
  return (
    <Box w="60rem" h="20rem" bgc="white">
      <ScatterPlot {...args} />
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  labels: labelsMockData,
  datasets: scatterPlotMockData,
};
