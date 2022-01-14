import { Box, MapChart } from "components/atoms";

export default {
  title: "Atoms/Map Chart",
  component: MapChart,
  argTypes: {
    onClick: { table: { disable: true } },
  },
};

const Template = () => {
  return (
    <Box w="40rem" h="40rem" bgc="white">
      <MapChart />
    </Box>
  );
};

export const Default = Template.bind({});
