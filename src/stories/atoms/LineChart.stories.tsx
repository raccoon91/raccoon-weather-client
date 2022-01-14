import { Box, LineChart } from "components/atoms";
import { lineChartMockData } from "stories/configs";
import type { Story } from "stories/storybook";

export default {
  title: "Atoms/Line Chart",
  component: LineChart,
  argTypes: {
    datasets: { table: { disable: true } },
    options: { table: { disable: true } },
  },
};

interface TemplateProps {
  datasets: number[];
}

const Template: Story<TemplateProps> = (args) => {
  return (
    <Box w="60rem" h="20rem" bgc="white">
      <LineChart {...args} />
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  datasets: lineChartMockData,
};
